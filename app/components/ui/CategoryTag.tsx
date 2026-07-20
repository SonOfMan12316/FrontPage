import type { CategoryId } from '@/lib/types'
import { CATEGORIES } from '@/lib/mock-data'

interface Props {
  categoryId: CategoryId
  categoryName: string
}

export function CategoryTag({ categoryId, categoryName }: Props) {
  const cat = CATEGORIES.find(c => c.id === categoryId)
  const bg   = cat?.bgHex   ?? '#f3f4f6'
  const text = cat?.textHex ?? '#374151'

  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium leading-none"
      style={{ backgroundColor: bg, color: text }}
    >
      {categoryName}
    </span>
  )
}
