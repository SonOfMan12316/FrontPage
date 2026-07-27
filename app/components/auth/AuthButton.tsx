interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export function AuthButton({ children, className = '', ...props }: AuthButtonProps) {
  return (
    <button
      {...props}
      className={`w-full flex items-center justify-center py-3 px-5 bg-[#112044] text-white border-none rounded-full text-[0.9375rem] font-medium cursor-pointer transition-colors hover:bg-[#0d1a35] active:scale-[0.99] disabled:opacity-40 disabled:cursor-default outline-none ${className}`}
    >
      {children}
    </button>
  )
}
