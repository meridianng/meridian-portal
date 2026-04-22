import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import BizBooksClient from './BizBooksClient'

export default async function BizBooksPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: access } = await supabase
    .from('product_access')
    .select('product')
    .eq('user_id', user.id)
    .eq('product', 'bizbooks')
    .maybeSingle()

  return <BizBooksClient hasAccess={!!access} />
}
