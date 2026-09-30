import { AlertTriangle, RefreshCw } from 'lucide-react'

interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
}

/**
 * ErrorState component with dark mode support.
 */
export function ErrorState({
  title = "We couldn't load the directory.",
  message = 'There was an issue communicating with our servers. Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="bg-red-50/70 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-2xl p-8 sm:p-10 text-center max-w-lg mx-auto shadow-sm my-8"
    >
      <div className="w-14 h-14 bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-red-200 dark:border-red-800">
        <AlertTriangle className="w-7 h-7" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-bold text-red-900 dark:text-red-200 tracking-tight">{title}</h3>
      <p className="mt-2 text-sm text-red-700 dark:text-red-400 leading-relaxed">{message}</p>

      {onRetry && (
        <div className="mt-6">
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white text-sm font-semibold shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 min-h-[44px]"
          >
            <RefreshCw className="w-4 h-4" aria-hidden="true" />
            <span>Try Again</span>
          </button>
        </div>
      )}
    </div>
  )
}
