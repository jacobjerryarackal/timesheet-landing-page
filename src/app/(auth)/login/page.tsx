'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FiMail, FiLock, FiLogIn, FiGithub, FiTwitter } from 'react-icons/fi'
import { FaGoogle } from 'react-icons/fa'
import Button from '@/components/Button/Button'
import { createClient } from '@/utils/supabase/client'
import styles from './page.module.css'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
      router.refresh()
    }
  }

  const handleOAuthLogin = async (provider: 'google' | 'github' | 'twitter') => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Left side – decorative */}
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Welcome Back!</h1>
            <p className={styles.heroSubtitle}>
              Track your 8-hour daily goals and 40-hour weekly targets.
            </p>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>500+</span>
                <span className={styles.statLabel}>Teams</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>1.2M</span>
                <span className={styles.statLabel}>Hours</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>94%</span>
                <span className={styles.statLabel}>Productivity</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side – login form */}
        <div className={styles.formPanel}>
          <div className={styles.formContainer}>
            <h2 className={styles.formTitle}>Sign in to your account</h2>
            <p className={styles.formSubtitle}>
              New here?{' '}
              <Link href="/signup" className={styles.link}>
                Create an account
              </Link>
            </p>

            <form onSubmit={handleEmailLogin} className={styles.form}>
              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>
                  <FiMail className={styles.inputIcon} /> Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className={styles.input}
                  disabled={loading}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.label}>
                  <FiLock className={styles.inputIcon} /> Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className={styles.input}
                  disabled={loading}
                />
              </div>

              {error && <div className={styles.error}>{error}</div>}

              <Button
                type="primary"
                size="large"
                fullWidth
                disabled={loading}
                icon={<FiLogIn />}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>

            <div className={styles.divider}>
              <span>or continue with</span>
            </div>

            <div className={styles.socialButtons}>
              <button
                onClick={() => handleOAuthLogin('google')}
                className={styles.socialButton}
                disabled={loading}
              >
                <FaGoogle />
              </button>
              <button
                onClick={() => handleOAuthLogin('github')}
                className={styles.socialButton}
                disabled={loading}
              >
                <FiGithub />
              </button>
              <button
                onClick={() => handleOAuthLogin('twitter')}
                className={styles.socialButton}
                disabled={loading}
              >
                <FiTwitter />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}