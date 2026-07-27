'use client'

import { useRef } from 'react'

const LENGTH = 6

interface OtpInputProps {
  digits: string[]
  onChange: (digits: string[]) => void
}

export function OtpInput({ digits, onChange }: OtpInputProps) {
  const inputs = useRef<(HTMLInputElement | null)[]>([])

  function handleChange(i: number, val: string) {
    if (val.length > 1) {
      const chars = val.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, LENGTH).split('')
      const next = Array(LENGTH).fill('')
      chars.forEach((c, idx) => { next[idx] = c })
      onChange(next)
      inputs.current[Math.min(chars.length, LENGTH - 1)]?.focus()
      return
    }
    const char = val.toUpperCase().replace(/[^A-Z0-9]/g, '')
    const next = [...digits]
    next[i] = char
    onChange(next)
    if (char && i < LENGTH - 1) inputs.current[i + 1]?.focus()
  }

  function handleKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !digits[i] && i > 0) inputs.current[i - 1]?.focus()
    if (e.key === 'ArrowLeft'  && i > 0)              inputs.current[i - 1]?.focus()
    if (e.key === 'ArrowRight' && i < LENGTH - 1)     inputs.current[i + 1]?.focus()
  }

  return (
    <div className="flex gap-2 justify-center">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={el => { inputs.current[i] = el }}
          className="auth-otp-box"
          type="text"
          inputMode="text"
          maxLength={LENGTH}
          value={d}
          onChange={e => handleChange(i, e.target.value)}
          onKeyDown={e => handleKeyDown(i, e)}
          onFocus={e => e.target.select()}
          autoFocus={i === 0}
          autoComplete="one-time-code"
        />
      ))}
    </div>
  )
}
