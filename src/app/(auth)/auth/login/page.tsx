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
  const [validationErrors, setValidationErrors] = useState<{ email?: string; password?: string }>({})
  const router = useRouter()
  const supabase = createClient()

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const validateForm = () => {
    const errors: { email?: string; password?: string } = {}
    
    if (!email) {
      errors.email = 'Email is required'
    } else if (!validateEmail(email)) {
      errors.email = 'Please enter a valid email address'
    }
    
    if (!password) {
      errors.password = 'Password is required'
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
    }
    
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
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
    setError(null)
    
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
              <Link href="/auth/signup" className={styles.link}>
                Create an account
              </Link>
            </p>

            <form onSubmit={handleEmailLogin} className={styles.form} noValidate>
              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>
                  <FiMail className={styles.inputIcon} /> Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (validationErrors.email) {
                      setValidationErrors({ ...validationErrors, email: undefined })
                    }
                  }}
                  onBlur={() => validateForm()}
                  placeholder="you@example.com"
                  required
                  className={`${styles.input} ${validationErrors.email ? styles.inputError : ''}`}
                  disabled={loading}
                />
                {validationErrors.email && (
                  <span className={styles.fieldError}>{validationErrors.email}</span>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.label}>
                  <FiLock className={styles.inputIcon} /> Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (validationErrors.password) {
                      setValidationErrors({ ...validationErrors, password: undefined })
                    }
                  }}
                  onBlur={() => validateForm()}
                  placeholder="••••••••"
                  required
                  className={`${styles.input} ${validationErrors.password ? styles.inputError : ''}`}
                  disabled={loading}
                />
                {validationErrors.password && (
                  <span className={styles.fieldError}>{validationErrors.password}</span>
                )}
              </div>

              {error && (
                <div className={styles.error}>
                  {error.includes('provider is not enabled') ? (
                    <>
                      <strong>OAuth not configured.</strong> Please enable the provider in your Supabase dashboard.
                    </>
                  ) : (
                    error
                  )}
                </div>
              )}

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
                title="Sign in with Google"
              >
                <FaGoogle />
              </button>
              <button
                onClick={() => handleOAuthLogin('github')}
                className={styles.socialButton}
                disabled={loading}
                title="Sign in with GitHub"
              >
                <FiGithub />
              </button>
              <button
                onClick={() => handleOAuthLogin('twitter')}
                className={styles.socialButton}
                disabled={loading}
                title="Sign in with Twitter"
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