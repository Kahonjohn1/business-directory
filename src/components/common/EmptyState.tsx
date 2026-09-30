import { SearchX, RotateCcw } from 'lucide-react'

interface EmptyStateProps {
  title?: string
  message?: string
  onReset?: () => void
  resetLabel?: string
}

/**
 * EmptyState component with dark mode support.
 */
export function EmptyState({
  title = 'No businesses match your search.',
  message = 'Try adjusting your search terms, removing filters, or searching for a different keyword.',
  onReset,
  resetLabel = 'Clear all filters',
}: EmptyStateProps) {
  return (
    <div
      role="status"
      className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 sm:p-12 text-center max-w-lg mx-auto shadow-sm my-8"
    >
      <div className="w-14 h-14 bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-amber-200 dark:border-amber-800">
        <SearchX className="w-7 h-7" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">{title}</h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{message}</p>

      {onReset && (
        <div className="mt-6">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 text-sm font-semibold shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-slate-900 dark:focus-visible:ring-slate-100 focus-visible:ring-offset-2 min-h-[44px]"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>{resetLabel}</span>
          </button>
        </div>
      )}
    </div>
  )
}
