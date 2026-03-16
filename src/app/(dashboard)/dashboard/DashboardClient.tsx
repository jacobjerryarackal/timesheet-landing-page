'use client'

import { useState, useEffect } from 'react'
import {
  FiPlus,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiTrendingUp,
  FiCalendar,
  FiUser,
  FiLogOut,
  FiEdit2,
  FiTrash2,
  FiX,
  FiSave,
  FiFilter,
} from 'react-icons/fi'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import Button from '@/components/Button/Button'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
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

type Period = 'day' | 'week' | 'month' | 'year' | 'custom'

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
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<Timesheet>>({})
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('week')
  const [customRange, setCustomRange] = useState({ start: '', end: '' })
  const [selectedProject, setSelectedProject] = useState<string>('all')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const router = useRouter()
  const supabase = createClient()

  // Get unique projects for filter
  const projects = ['all', ...new Set(timesheets.map(ts => ts.project))]

  // Helper: filter timesheets by selected period and project
  const getFilteredTimesheets = (): Timesheet[] => {
    const now = new Date()
    let startDate: Date | null = null

    switch (selectedPeriod) {
      case 'day':
        startDate = new Date(now.setHours(0, 0, 0, 0))
        break
      case 'week':
        startDate = new Date(now.setDate(now.getDate() - now.getDay()))
        startDate.setHours(0, 0, 0, 0)
        break
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1)
        break
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1)
        break
      case 'custom':
        if (!customRange.start || !customRange.end) return timesheets
        return timesheets.filter(
          (ts) => ts.date >= customRange.start && ts.date <= customRange.end
        )
      default:
        return timesheets
    }

    let filtered = timesheets
    if (startDate) {
      filtered = filtered.filter((ts) => new Date(ts.date) >= startDate!)
    }
    // Apply project filter
    if (selectedProject !== 'all') {
      filtered = filtered.filter((ts) => ts.project === selectedProject)
    }
    return filtered
  }

  console.log(user.id)

  const filteredTimesheets = getFilteredTimesheets()
  const filteredTotal = filteredTimesheets.reduce((sum, ts) => sum + ts.hours, 0)
  const filteredPending = filteredTimesheets.filter((ts) => ts.status === 'pending').length

  // Chart data: group by date
  const chartData = filteredTimesheets.reduce((acc, ts) => {
    const existing = acc.find((item) => item.date === ts.date)
    if (existing) {
      existing.hours += ts.hours
    } else {
      acc.push({ date: ts.date, hours: ts.hours })
    }
    return acc
  }, [] as { date: string; hours: number }[]).sort((a, b) => a.date.localeCompare(b.date))

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const handleAddEntry = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage(null)

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

    if (error) {
      console.error('Insert error:', error)
      setErrorMessage(`Failed to save: ${error.message}`)
    } else if (data) {
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

  const handleEdit = (ts: Timesheet) => {
    setEditingId(ts.id)
    setEditForm(ts)
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingId) return
    setLoading(true)
    setErrorMessage(null)

    const { error } = await supabase
      .from('timesheets')
      .update({
        date: editForm.date,
        hours: editForm.hours,
        project: editForm.project,
        description: editForm.description,
      })
      .eq('id', editingId)

    if (error) {
      console.error('Update error:', error)
      setErrorMessage(`Failed to update: ${error.message}`)
    } else {
      setTimesheets(
        timesheets.map((ts) =>
          ts.id === editingId ? ({ ...ts, ...editForm } as Timesheet) : ts
        )
      )
      setEditingId(null)
      setEditForm({})
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this entry?')) return
    setLoading(true)
    setErrorMessage(null)

    const { error } = await supabase.from('timesheets').delete().eq('id', id)

    if (error) {
      console.error('Delete error:', error)
      setErrorMessage(`Failed to delete: ${error.message}`)
    } else {
      setTimesheets(timesheets.filter((ts) => ts.id !== id))
    }
    setLoading(false)
  }

  const progress = weeklyTotal / weeklyTarget

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

      {/* Period & Project Filters */}
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <button
            className={selectedPeriod === 'day' ? styles.active : ''}
            onClick={() => setSelectedPeriod('day')}
          >
            Day
          </button>
          <button
            className={selectedPeriod === 'week' ? styles.active : ''}
            onClick={() => setSelectedPeriod('week')}
          >
            Week
          </button>
          <button
            className={selectedPeriod === 'month' ? styles.active : ''}
            onClick={() => setSelectedPeriod('month')}
          >
            Month
          </button>
          <button
            className={selectedPeriod === 'year' ? styles.active : ''}
            onClick={() => setSelectedPeriod('year')}
          >
            Year
          </button>
          <button
            className={selectedPeriod === 'custom' ? styles.active : ''}
            onClick={() => setSelectedPeriod('custom')}
          >
            Custom
          </button>
          {selectedPeriod === 'custom' && (
            <div className={styles.customRange}>
              <input
                type="date"
                value={customRange.start}
                onChange={(e) => setCustomRange({ ...customRange, start: e.target.value })}
              />
              <span>to</span>
              <input
                type="date"
                value={customRange.end}
                onChange={(e) => setCustomRange({ ...customRange, end: e.target.value })}
              />
            </div>
          )}
        </div>

        <div className={styles.projectFilter}>
          <FiFilter />
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className={styles.projectSelect}
          >
            {projects.map((proj) => (
              <option key={proj} value={proj}>
                {proj === 'all' ? 'All Projects' : proj}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Error message display */}
      {errorMessage && (
        <div className={styles.errorBanner}>
          <FiAlertCircle /> {errorMessage}
        </div>
      )}

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: '#3b82f6' }}>
            <FiClock />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Filtered Total</span>
            <span className={styles.statValue}>{filteredTotal.toFixed(1)} hrs</span>
          </div>
          <div className={styles.statNote}>For selected filters</div>
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
            {progress >= 1 ? '✓ Goal achieved!' : `${Math.round(progress * 100)}% complete`}
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: '#8b5cf6' }}>
            <FiTrendingUp />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Pending Approval</span>
            <span className={styles.statValue}>{filteredPending}</span>
          </div>
          <div className={styles.statNote}>In filtered results</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: '#f59e0b' }}>
            <FiCalendar />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Entries</span>
            <span className={styles.statValue}>{filteredTimesheets.length}</span>
          </div>
          <div className={styles.statNote}>In filtered results</div>
        </div>
      </div>

      {/* Chart */}
      {chartData.length > 0 && (
        <div className={styles.chartContainer}>
          <h3>Hours by Day</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hours" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

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
        <h2 className={styles.tableTitle}>
          Timesheets {selectedPeriod !== 'custom' ? `(This ${selectedPeriod})` : '(Custom Range)'}
          {selectedProject !== 'all' && ` – Project: ${selectedProject}`}
        </h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Project</th>
                <th>Hours</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTimesheets.length === 0 ? (
                <tr>
                  <td colSpan={6} className={styles.emptyState}>
                    No entries match your filters. Add one!
                  </td>
                </tr>
              ) : (
                filteredTimesheets.map((ts) => (
                  <tr key={ts.id}>
                    {editingId === ts.id ? (
                      // Edit mode
                      <>
                        <td>
                          <input
                            type="date"
                            value={editForm.date || ''}
                            onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={editForm.project || ''}
                            onChange={(e) => setEditForm({ ...editForm, project: e.target.value })}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            step="0.5"
                            min="0"
                            max="24"
                            value={editForm.hours || 0}
                            onChange={(e) =>
                              setEditForm({ ...editForm, hours: parseFloat(e.target.value) })
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={editForm.description || ''}
                            onChange={(e) =>
                              setEditForm({ ...editForm, description: e.target.value })
                            }
                          />
                        </td>
                        <td>
                          <span className={`${styles.status} ${styles[ts.status]}`}>
                            {ts.status}
                          </span>
                        </td>
                        <td>
                          <div className={styles.actionButtons}>
                            <button onClick={handleUpdate} disabled={loading} title="Save">
                              <FiSave />
                            </button>
                            <button onClick={() => setEditingId(null)} disabled={loading} title="Cancel">
                              <FiX />
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      // View mode
                      <>
                        <td>{new Date(ts.date).toLocaleDateString()}</td>
                        <td>{ts.project}</td>
                        <td>{ts.hours}</td>
                        <td>{ts.description}</td>
                        <td>
                          <span className={`${styles.status} ${styles[ts.status]}`}>
                            {ts.status === 'pending' && <FiAlertCircle />}
                            {ts.status === 'approved' && <FiCheckCircle />}
                            {ts.status}
                          </span>
                        </td>
                        <td>
                          <div className={styles.actionButtons}>
                            <button onClick={() => handleEdit(ts)} disabled={loading} title="Edit">
                              <FiEdit2 />
                            </button>
                            <button onClick={() => handleDelete(ts.id)} disabled={loading} title="Delete">
                              <FiTrash2 />
                            </button>
                          </div>
                        </td>
                      </>
                    )}
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