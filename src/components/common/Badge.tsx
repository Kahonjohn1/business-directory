import type { BusinessCategory } from '../../types/business'

interface BadgeProps {
  category: BusinessCategory | 'All'
  size?: 'sm' | 'md'
}

/**
 * Visual color mapping for each business category with distinct Light and Dark mode styling.
 */
const categoryStyles: Record<BusinessCategory | 'All', string> = {
  'All': 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
  'Technology': 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800',
  'Restaurants & Food': 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
  'Finance': 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
  'Healthcare': 'bg-teal-50 text-teal-800 border-teal-200 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800',
  'Education': 'bg-indigo-50 text-indigo-800 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800',
  'Fashion': 'bg-fuchsia-50 text-fuchsia-800 border-fuchsia-200 dark:bg-fuchsia-950/60 dark:text-fuchsia-300 dark:border-fuchsia-800',
  'Real Estate': 'bg-violet-50 text-violet-800 border-violet-200 dark:bg-violet-950/60 dark:text-violet-300 dark:border-violet-800',
  'Marketing & Advertising': 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800',
  'Professional Services': 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800',
}

/**
 * Accessible Badge component displaying the category pill with distinct color-coding.
 */
export function Badge({ category, size = 'sm' }: BadgeProps) {
  const sizeClasses = size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm'
  const colorClass = categoryStyles[category] || categoryStyles['All']

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border transition-colors ${sizeClasses} ${colorClass}`}
    >
      {category}
    </span>
  )
}
