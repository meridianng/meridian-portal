import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Product mapping: which GAS plan unlocks which products
function getProductsForPlan(plan: string): string[] {
  switch (plan) {
    case 'v2_tool':   return ['terminal']
    case 'v2_course': return ['course']
    case 'v2_combo':  return ['terminal', 'course']
    case 'full':      return ['terminal', 'course', 'dictionary', 'bizbooks']
    default:          return []
  }
}

export async function POST(request: NextRequest) {
  try {
    const { key } = await request.json()

    if (!key || typeof key !== 'string' || key.trim().length < 10) {
      return NextResponse.json(
        { error: 'Please enter a valid key.' },
        { status: 400 }
      )
    }

    const cleanKey = key.trim()

    // ── Step 1: Verify key against Google Apps Script ──────
    const gasUrl = process.env.GAS_URL
    if (!gasUrl) {
      console.error('GAS_URL not configured')
      return NextResponse.json(
        { error: 'Server configuration error. Please email hello@meridianng.com.' },
        { status: 500 }
      )
    }

    let gasData: { email: string; license: { valid: boolean; plan?: string; hasTool?: boolean; hasCourse?: boolean; reason?: string } }

    try {
      const gasResponse = await fetch(gasUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'getUserInfo',
          token: cleanKey,
          params: {},
        }),
        // 10 second timeout
        signal: AbortSignal.timeout(10000),
      })

      if (!gasResponse.ok) {
        throw new Error(`GAS returned ${gasResponse.status}`)
      }

      gasData = await gasResponse.json()
    } catch (fetchErr) {
      console.error('GAS fetch error:', fetchErr)
      return NextResponse.json(
        { error: 'Could not verify your key right now. Please try again in a moment.' },
        { status: 503 }
      )
    }

    // Check if key is valid
    if (!gasData.license?.valid) {
      const reason = gasData.license?.reason
      let message = 'This key was not found. Double-check your purchase email.'
      if (reason === 'not_found')    message = 'Key not found. Check your purchase email for the correct key.'
      if (reason === 'no_email')     message = 'Invalid key format. Try copy-pasting directly from your email.'
      return NextResponse.json({ error: message }, { status: 401 })
    }

    const plan     = gasData.license.plan || 'v2_tool'
    const products = getProductsForPlan(plan)

    // ── Step 2: Get current user from Supabase session ────
    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll() },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch {}
          },
        },
      }
    )

    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Your session expired. Please sign in again.' },
        { status: 401 }
      )
    }

    // ── Step 3: Check if key is already used by someone else ──
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id, meridian_key')
      .eq('meridian_key', cleanKey)
      .maybeSingle()

    if (existingProfile && existingProfile.id !== user.id) {
      return NextResponse.json(
        { error: 'This key is already linked to a different account. Contact hello@meridianng.com if this is wrong.' },
        { status: 409 }
      )
    }

    // ── Step 4: Update user profile ───────────────────────
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        meridian_key: cleanKey,
        plan:         plan,
        updated_at:   new Date().toISOString(),
      })
      .eq('id', user.id)

    if (profileError) {
      console.error('Profile update error:', profileError)
      return NextResponse.json(
        { error: 'Failed to save your key. Please try again.' },
        { status: 500 }
      )
    }

    // ── Step 5: Upsert product access rows ────────────────
    if (products.length > 0) {
      const rows = products.map(product => ({
        user_id: user.id,
        product: product,
        granted_at: new Date().toISOString(),
      }))

      const { error: accessError } = await supabase
        .from('product_access')
        .upsert(rows, { onConflict: 'user_id,product', ignoreDuplicates: true })

      if (accessError) {
        console.error('Product access error:', accessError)
        // Non-fatal — profile was saved, we can retry access later
      }
    }

    // ── Success ───────────────────────────────────────────
    return NextResponse.json({
      success:  true,
      plan:     plan,
      products: products,
      email:    gasData.email || user.email,
    })

  } catch (err) {
    console.error('Activate route error:', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again or email hello@meridianng.com.' },
      { status: 500 }
    )
  }
}
