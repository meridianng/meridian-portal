import { createClient } from '@/lib/supabase/server'
import LandingPage from './landing/LandingPage'

export default async function HomePage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return <LandingPage />
}
