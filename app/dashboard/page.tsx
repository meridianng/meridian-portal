import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import DashboardClient from './DashboardClient'
import type { Profile, ProductId } from '@/lib/types'

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [{ data: profile }, { data: accessRows }] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', user.id).single<Profile>(),
    supabase.from('product_access').select('product').eq('user_id', user.id),
  ])

  const accessSet = new Set<string>(
    (accessRows || []).map((r: { product: string }) => r.product)
  )

  return (
    <DashboardClient
      email={user.email || ''}
      name={profile?.full_name || user.email?.split('@')[0] || ''}
      plan={profile?.plan || null}
      key_={profile?.meridian_key || null}
      access={accessSet}
    />
  )
}
