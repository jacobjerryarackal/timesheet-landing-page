'use client'

import { useState } from 'react'
import { FiPlus, FiClock, FiCheckCircle, FiAlertCircle, FiTrendingUp, FiCalendar, FiUser, FiLogOut } from 'react-icons/fi'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import Button from '@/components/Button/Button'
import styles from './page.module.css'

interface Timesheet {
  id: string
  date: string
  hours: number
  description: string
  project: string
  status: 'pending' | 'approved' | 'rejected'
}

interface DashboardClientProps {
  user: any
  profile: any
  timesheets: Timesheet[]
  weeklyTotal: number
  weeklyTarget: number
  dailyTarget: number
}

export default function DashboardClient({
  user,
  profile,
  timesheets: initialTimesheets,
  weeklyTotal,
  weeklyTarget,
  dailyTarget,
}: DashboardClientProps) {
  const [timesheets, setTimesheets] = useState(initialTimesheets)
  const [showForm, setShowForm] = useState(false)
  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    hours: 8,
    project: '',
    description: '',
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const handleAddEntry = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { data, error } = await supabase
      .from('timesheets')
      .insert({
        user_id: user.id,
        date: newEntry.date,
        hours: newEntry.hours,
        project: newEntry.project,
        description: newEntry.description,
        status: 'pending',
      })
      .select()
      .single()

    if (!error && data) {
      setTimesheets([data, ...timesheets])
      setShowForm(false)
      setNewEntry({
        date: new Date().toISOString().split('T')[0],
        hours: 8,
        project: '',
        description: '',
      })
    }
    setLoading(false)
  }

  const progress = (weeklyTotal / weeklyTarget) * 100

  return (
    <div className={styles.dashboard}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.headerTitle}>My Dashboard</h1>
          <p className={styles.headerSubtitle}>
            Track your 8-hour daily goal and 40-hour weekly target
          </p>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.userInfo}>
            <div className={styles.userAvatar}>
              {profile?.full_name?.charAt(0) || user.email?.charAt(0)}
            </div>
            <div className={styles.userDetails}>
              <span className={styles.userName}>{profile?.full_name || 'User'}</span>
              <span className={styles.userEmail}>{user.email}</span>
            </div>
          </div>
          <Button type="outline" size="small" onClick={handleLogout} icon={<FiLogOut />}>
            Logout
          </Button>
        </div>
      </header>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: '#3b82f6' }}>
            <FiClock />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Weekly Progress</span>
            <span className={styles.statValue}>
              {weeklyTotal.toFixed(1)} / {weeklyTarget} hrs
            </span>
          </div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${Math.min(progress, 100)}%'` }}
            ></div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: '#10b981' }}>
            <FiCheckCircle />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Daily Target</span>
            <span className={styles.statValue}>{dailyTarget} hours</span>
          </div>
          <div className={styles.statNote}>
            {progress >= 100 ? '✓ Goal achieved!' : `${(progress).toFixed(0)}% complete`}
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: '#8b5cf6' }}>
            <FiTrendingUp />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Pending Approval</span>
            <span className={styles.statValue}>
              {timesheets.filter(ts => ts.status === 'pending').length}
            </span>
          </div>
          <div className={styles.statNote}>Last 7 days</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: '#f59e0b' }}>
            <FiCalendar />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>This Month</span>
            <span className={styles.statValue}>
              {timesheets
                .filter(ts => new Date(ts.date).getMonth() === new Date().getMonth())
                .reduce((sum, ts) => sum + ts.hours, 0).toFixed(1)} hrs
            </span>
          </div>
          <div className={styles.statNote}>Track consistently</div>
        </div>
      </div>

      {/* Add Entry Button */}
      <div className={styles.addEntry}>
        <Button
          type="primary"
          size="medium"
          onClick={() => setShowForm(!showForm)}
          icon={<FiPlus />}
        >
          {showForm ? 'Cancel' : 'Add Timesheet Entry'}
        </Button>
      </div>

      {/* Add Entry Form */}
      {showForm && (
        <form onSubmit={handleAddEntry} className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                value={newEntry.date}
                onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="hours">Hours (max 24)</label>
              <input
                type="number"
                id="hours"
                min="0"
                max="24"
                step="0.5"
                value={newEntry.hours}
                onChange={(e) => setNewEntry({ ...newEntry, hours: parseFloat(e.target.value) })}
                required
              />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="project">Project</label>
              <input
                type="text"
                id="project"
                value={newEntry.project}
                onChange={(e) => setNewEntry({ ...newEntry, project: e.target.value })}
                placeholder="e.g., Client Project"
                required
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              rows={3}
              value={newEntry.description}
              onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
              placeholder="What did you work on?"
              required
            />
          </div>
          <Button type="primary" size="medium" disabled={loading}>
            {loading ? 'Saving...' : 'Save Entry'}
          </Button>
        </form>
      )}

      {/* Timesheets Table */}
      <div className={styles.tableSection}>
        <h2 className={styles.tableTitle}>Recent Timesheets</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Project</th>
                <th>Hours</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {timesheets.length === 0 ? (
                <tr>
                  <td colSpan={5} className={styles.emptyState}>
                    No entries yet. Start tracking your time!
                  </td>
                </tr>
              ) : (
                timesheets.slice(0, 10).map((ts) => (
                  <tr key={ts.id}>
                    <td>{new Date(ts.date).toLocaleDateString()}</td>
                    <td>{ts.project}</td>
                    <td>{ts.hours}</td>
                    <td>{ts.description}</td>
                    <td>
                      <span className={`${styles.status} ${styles[ts.status]}`}>
                        {ts.status === 'pending' && <FiAlertCircle />}
                        {ts.status === 'approved' && <FiCheckCircle />}
                        {ts.status === 'rejected' && '❌'}
                        {ts.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}