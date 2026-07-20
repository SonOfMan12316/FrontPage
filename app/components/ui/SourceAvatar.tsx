interface Props {
  letter: string
  color: string
  size?: 'xs' | 'sm' | 'md'
}

export function SourceAvatar({ letter, color, size = 'sm' }: Props) {
  const cls =
    size === 'xs' ? 'w-4 h-4 text-[9px]' :
    size === 'sm' ? 'w-6 h-6 text-xs' :
                    'w-8 h-8 text-sm'

  return (
    <span
      className={`${cls} rounded flex items-center justify-center font-bold text-white flex-shrink-0 select-none`}
      style={{ backgroundColor: color }}
    >
      {letter}
    </span>
  )
}
