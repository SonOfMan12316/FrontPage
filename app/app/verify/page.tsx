'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { AuthLogo } from '@/components/auth/AuthLogo'
import { AuthButton } from '@/components/auth/AuthButton'
import { OtpInput } from '@/components/auth/OtpInput'

const OTP_LENGTH = 6

function VerifyContent() {
  const params = useSearchParams()
  const email = params.get('email') ?? ''

  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''))
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (digits.join('').length < OTP_LENGTH) return
    // TODO: Firebase verifyOTP / checkActionCode
    setSubmitted(true)
  }

  const isComplete = digits.every(d => d !== '')

  if (submitted) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-bg-secondary p-6">
        <div className="auth-appear w-full max-w-xs flex flex-col items-center gap-7 text-center">
          <AuthLogo />
          <h1 className="text-2xl font-semibold tracking-tight text-text-primary m-0">You&rsquo;re in</h1>
          <p className="text-sm text-text-secondary m-0">Redirecting you to your feed&hellip;</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-dvh flex items-center justify-center bg-bg-secondary p-6">
      <div className="auth-appear w-full max-w-xs flex flex-col items-center gap-7">

        <AuthLogo />

        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-text-primary m-0">
            Check your email
          </h1>
          {email && (
            <p className="text-sm text-text-secondary mt-1 mb-0 leading-relaxed">
              We sent a login link and code to<br />
              <strong className="font-semibold text-text-primary">{email}</strong>
            </p>
          )}
        </div>

        <form className="w-full flex flex-col gap-2.5" onSubmit={handleSubmit}>
          <OtpInput digits={digits} onChange={setDigits} />
          <AuthButton type="submit" disabled={!isComplete}>
            Verify code
          </AuthButton>
        </form>

        <p className="text-sm text-text-secondary m-0 text-center">
          Didn&rsquo;t get an email?{' '}
          <button
            type="button"
            onClick={() => { /* TODO: Firebase resend */ }}
            className="text-text-primary font-medium bg-transparent border-none p-0 cursor-pointer text-sm hover:underline outline-none"
          >
            Resend
          </button>
        </p>

        <Link href="/email" className="text-sm text-text-secondary no-underline transition-colors hover:text-text-primary">
          Use a different email
        </Link>
      </div>
    </div>
  )
}

export default function VerifyPage() {
  return (
    <Suspense>
      <VerifyContent />
    </Suspense>
  )
}
