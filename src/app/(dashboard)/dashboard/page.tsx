import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import DashboardClient from './DashboardClient'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: timesheets } = await supabase
    .from('timesheets')
    .select('*')
    .eq('user_id', user.id)
    .order('date', { ascending: false })

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const today = new Date()
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()))

  const weeklyTimesheets =
    timesheets?.filter((ts: any) => new Date(ts.date) >= startOfWeek) || []

  const weeklyTotal = weeklyTimesheets.reduce(
    (sum: number, ts: any) => sum + ts.hours,
    0
  )

  return (
    <DashboardClient
      user={user}
      profile={profile}
      timesheets={timesheets || []}
      weeklyTotal={weeklyTotal}
      weeklyTarget={40}
      dailyTarget={8}
    />
  )
}