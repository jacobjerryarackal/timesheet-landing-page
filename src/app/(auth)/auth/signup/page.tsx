'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FiMail, FiLock, FiUser, FiLogIn, FiGithub, FiTwitter } from 'react-icons/fi'
import { FaGoogle } from 'react-icons/fa'
import Button from '@/components/Button/Button'
import { createClient } from '@/utils/supabase/client'
import styles from './page.module.css'

export default function SignupPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [validationErrors, setValidationErrors] = useState<{
    fullName?: string
    email?: string
    password?: string
    confirmPassword?: string
  }>({})
  const router = useRouter()
  const supabase = createClient()

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const validateForm = () => {
    const errors: typeof validationErrors = {}
    
    if (!fullName.trim()) {
      errors.fullName = 'Full name is required'
    }
    
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
    
    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password'
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }
    
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setLoading(true)
    setError(null)

    const { error: signUpError, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
    } else {
      // After signup, create profile record (optional - handled by trigger or signup)
      // For simplicity, we'll just redirect to login with a success message
      router.push('/login?message=Check your email to confirm your account')
    }
  }

  const handleOAuthSignup = async (provider: 'google' | 'github' | 'twitter') => {
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
            <h1 className={styles.heroTitle}>Join TimeTrack Pro</h1>
            <p className={styles.heroSubtitle}>
              Start tracking your 8-hour daily goals and 40-hour weekly targets today.
            </p>
            <div className={styles.features}>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>✓</span>
                <span>Daily time tracking</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>✓</span>
                <span>Weekly summaries</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>✓</span>
                <span>Productivity insights</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>✓</span>
                <span>Team collaboration</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side – signup form */}
        <div className={styles.formPanel}>
          <div className={styles.formContainer}>
            <h2 className={styles.formTitle}>Create your account</h2>
            <p className={styles.formSubtitle}>
              Already have an account?{' '}
              <Link href="/login" className={styles.link}>
                Sign in
              </Link>
            </p>

            <form onSubmit={handleEmailSignup} className={styles.form} noValidate>
              <div className={styles.inputGroup}>
                <label htmlFor="fullName" className={styles.label}>
                  <FiUser className={styles.inputIcon} /> Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value)
                    if (validationErrors.fullName) {
                      setValidationErrors({ ...validationErrors, fullName: undefined })
                    }
                  }}
                  onBlur={() => validateForm()}
                  placeholder="John Doe"
                  required
                  className={`${styles.input} ${validationErrors.fullName ? styles.inputError : ''}`}
                  disabled={loading}
                />
                {validationErrors.fullName && (
                  <span className={styles.fieldError}>{validationErrors.fullName}</span>
                )}
              </div>

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

              <div className={styles.inputGroup}>
                <label htmlFor="confirmPassword" className={styles.label}>
                  <FiLock className={styles.inputIcon} /> Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value)
                    if (validationErrors.confirmPassword) {
                      setValidationErrors({ ...validationErrors, confirmPassword: undefined })
                    }
                  }}
                  onBlur={() => validateForm()}
                  placeholder="••••••••"
                  required
                  className={`${styles.input} ${validationErrors.confirmPassword ? styles.inputError : ''}`}
                  disabled={loading}
                />
                {validationErrors.confirmPassword && (
                  <span className={styles.fieldError}>{validationErrors.confirmPassword}</span>
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
                {loading ? 'Creating account...' : 'Sign up'}
              </Button>
            </form>

            <div className={styles.divider}>
              <span>or continue with</span>
            </div>

            <div className={styles.socialButtons}>
              <button
                onClick={() => handleOAuthSignup('google')}
                className={styles.socialButton}
                disabled={loading}
                title="Sign up with Google"
              >
                <FaGoogle />
              </button>
              <button
                onClick={() => handleOAuthSignup('github')}
                className={styles.socialButton}
                disabled={loading}
                title="Sign up with GitHub"
              >
                <FiGithub />
              </button>
              <button
                onClick={() => handleOAuthSignup('twitter')}
                className={styles.socialButton}
                disabled={loading}
                title="Sign up with Twitter"
              >
                <FiTwitter />
              </button>
            </div>

            <p className={styles.terms}>
              By signing up, you agree to our{' '}
              <Link href="/terms" className={styles.link}>
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className={styles.link}>
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}