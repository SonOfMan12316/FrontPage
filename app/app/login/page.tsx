import Link from 'next/link'
import { AuthLogo } from '@/components/auth/AuthLogo'
import { AuthButton } from '@/components/auth/AuthButton'

export default function LoginPage() {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-bg-secondary p-6">
      <div className="auth-appear w-full max-w-xs flex flex-col items-center gap-7">

        <AuthLogo />

        <h1 className="text-2xl font-semibold tracking-tight text-text-primary m-0 text-center">
          Log in to Frontpage
        </h1>

        <div className="w-full flex flex-col gap-3">
          <div className="w-full flex flex-col gap-2.5">
            <AuthButton type="button">Continue with Google</AuthButton>

            <Link
              href="/email"
              className="w-full flex items-center justify-center py-3 px-5 rounded-full text-[0.9375rem] font-medium no-underline text-text-primary border border-transparent transition-colors hover:border-border outline-none"
            >
              Continue with email
            </Link>
          </div>

          <p className="text-sm text-text-secondary m-0 text-center">
            Don&rsquo;t have an account?{' '}
            <Link href="/signup" className="text-text-primary font-medium no-underline hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
