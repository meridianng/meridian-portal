import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Plan → products mapping
// Covers all naming variations GAS might send
function getProductsForPlan(plan: string): string[] {
  switch (plan) {
    case 'v2_tool':            return ['terminal']
    case 'v2_course':          return ['course']
    case 'v2_dictionary':      return ['dictionary']
    case 'v2_tradaq':          return ['tradaq']
    case 'v2_meridian access': return ['terminal', 'course', 'dictionary', 'tradaq']
    case 'v2_combo':           return ['terminal', 'course', 'dictionary', 'tradaq']
    case 'full':               return ['terminal', 'course', 'dictionary', 'tradaq']
    default:                   return []
  }
}
function mergePlans(existing: string, incoming: string): string {
  const BUNDLE = 'v2_meridian access'
  
  // Bundle beats everything
  if (existing === BUNDLE || incoming === BUNDLE) return BUNDLE
  
  // Same plan — no change
  if (existing === incoming) return incoming
  
  // Accumulate individual products to see if they now have the bundle
  const PRODUCTS = ['v2_tool', 'v2_course', 'v2_dictionary', 'v2_tradaq']
  const allOwned = new Set([...getProductsForPlan(existing), ...getProductsForPlan(incoming)])
  const coreProducts = ['terminal', 'course', 'dictionary']
  const hasAll = coreProducts.every(p => allOwned.has(p))
  
  if (hasAll) return BUNDLE
  
  // Otherwise return a combined label — or just return incoming
  // (product_access is the real gate, plan is cosmetic)
  return incoming
}
export async function POST(request: NextRequest) {
  try {
    const { key } = await request.json()

    if (!key || typeof key !== 'string' || key.trim().length < 10) {
      return NextResponse.json({ error: 'Please enter a valid key.' }, { status: 400 })
    }

    const cleanKey = key.trim()

    // ── 1. Verify key against GAS ─────────────────────────────
    const gasUrl = process.env.GAS_URL
    if (!gasUrl) {
      return NextResponse.json(
        { error: 'Server configuration error. Email hello@meridianng.com.' },
        { status: 500 }
      )
    }

    let gasData: {
      email: string
      license: { valid: boolean; plan?: string; reason?: string }
    }

    try {
      const gasRes = await fetch(gasUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'getUserInfo', token: cleanKey, params: {} }),
        signal: AbortSignal.timeout(12000),
      })
      if (!gasRes.ok) throw new Error(`GAS ${gasRes.status}`)
      gasData = await gasRes.json()
    } catch (err) {
      console.error('GAS fetch error:', err)
      return NextResponse.json(
        { error: 'Could not verify your key right now. Please try again in a moment.' },
        { status: 503 }
      )
    }

    if (!gasData.license?.valid) {
      return NextResponse.json(
        { error: 'Key not found. Check your purchase email or contact hello@meridianng.com.' },
        { status: 401 }
      )
    }

    const plan     = gasData.license.plan || 'v2_tool'
    const products = getProductsForPlan(plan)

    // ── 2. Get the currently signed-in user ───────────────────
    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
  get(name: string) { return cookieStore.get(name)?.value },
  set(name: string, value: string, options: any) {
    try { cookieStore.set({ name, value, ...options }) } catch (error) {}
  },
  remove(name: string, options: any) {
    try { cookieStore.set({ name, value: '', ...options }) } catch (error) {}
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

    // ── 3. Check if key is already used by a DIFFERENT account ─
    // (Same account re-activating is fine — idempotent)
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('meridian_key', cleanKey)
      .maybeSingle()

    if (existingProfile && existingProfile.id !== user.id) {
      return NextResponse.json(
        {
          error:
            'This key has already been activated on another account. ' +
            'If you bought this as a gift, the recipient must use their own account. ' +
            'Contact hello@meridianng.com if you need help.',
        },
        { status: 409 }
      )
    }

    // ── 4. Update profile — additive plan merge ───────────────────
const { data: currentProfile } = await supabase
  .from('profiles')
  .select('plan, meridian_key')
  .eq('id', user.id)
  .single()

const existingPlan = currentProfile?.plan || ''
const mergedPlan   = mergePlans(existingPlan, plan)

const keyToStore = currentProfile?.meridian_key || cleanKey

const { error: profileError } = await supabase
  .from('profiles')
  .update({ 
    meridian_key: keyToStore,
    plan: mergedPlan,
    updated_at: new Date().toISOString() 
  })
  .eq('id', user.id)

if (profileError) {
  console.error('Profile update error:', profileError)
  return NextResponse.json(
    { error: 'Failed to save your key. Please try again.' },
    { status: 500 }
  )
}

    // ── 5. Grant product access rows ──────────────────────────
    if (products.length > 0) {
      const rows = products.map(product => ({
        user_id:    user.id,
        product,
        granted_at: new Date().toISOString(),
      }))
      await supabase
        .from('product_access')
        .upsert(rows, { onConflict: 'user_id,product', ignoreDuplicates: true })
    }

    return NextResponse.json({ success: true, plan, products })
  } catch (err) {
    console.error('Activate route error:', err)
    return NextResponse.json(
      { error: 'Something went wrong. Email hello@meridianng.com.' },
      { status: 500 }
    )
  }
}
