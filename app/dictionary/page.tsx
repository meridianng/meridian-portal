import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import DictionaryClient from './DictionaryClient'

export default async function DictionaryPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Check access
  const { data: access } = await supabase
    .from('product_access')
    .select('product')
    .eq('user_id', user.id)
    .eq('product', 'dictionary')
    .maybeSingle()

  const hasAccess = !!access

  return <DictionaryClient hasAccess={hasAccess} />
}
