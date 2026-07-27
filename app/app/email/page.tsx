'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AuthLogo } from '@/components/auth/AuthLogo'
import { AuthButton } from '@/components/auth/AuthButton'

export default function EmailPage() {
  const [email, setEmail] = useState('')
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    // TODO: Firebase sendSignInLinkToEmail(email)
    router.push(`/verify?email=${encodeURIComponent(email)}`)
  }

  return (
    <div className="min-h-dvh flex items-center justify-center bg-bg-secondary p-6">
      <div className="auth-appear w-full max-w-xs flex flex-col items-center gap-7">

        <AuthLogo />

        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-text-primary m-0">
            Continue with email
          </h1>
          <p className="text-sm text-text-secondary mt-1 mb-0 leading-relaxed">
            We&rsquo;ll send a login link and code to your inbox.
          </p>
        </div>

        <div className="w-full flex flex-col gap-3">
          <form className="w-full flex flex-col gap-2.5" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoFocus
              required
              className="w-full py-3 px-4 bg-bg-primary text-text-primary text-[0.9375rem] rounded-lg outline-none border-[1.5px] border-[color-mix(in_srgb,var(--color-accent)_35%,transparent)] placeholder:text-text-tertiary"
            />
            <AuthButton type="submit">Send login link</AuthButton>
          </form>

          <Link href="/login" className="text-sm text-text-secondary no-underline text-center transition-colors hover:text-text-primary">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  )
}
