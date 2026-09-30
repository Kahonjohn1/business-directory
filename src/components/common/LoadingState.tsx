interface LoadingStateProps {
  count?: number
}

/**
 * Skeleton placeholder replicating the 3-column card grid during data fetching
 * with dark mode support.
 */
export function LoadingState({ count = 6 }: LoadingStateProps) {
  return (
    <div>
      {/* Accessible screen reader announcement */}
      <div className="sr-only" role="status" aria-live="polite">
        Businesses are loading...
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        aria-hidden="true"
      >
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm animate-pulse"
          >
            {/* Image Placeholder */}
            <div className="w-full aspect-[16/9] bg-slate-200 dark:bg-slate-700" />

            {/* Content Placeholder */}
            <div className="p-5 flex-1 flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-5 w-24 bg-slate-200 dark:bg-slate-700 rounded-full" />
                <div className="h-4 w-12 bg-slate-200 dark:bg-slate-700 rounded" />
              </div>
              <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-700 rounded" />
              <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-700 rounded" />
              <div className="space-y-2 pt-2">
                <div className="h-3.5 w-full bg-slate-200 dark:bg-slate-700 rounded" />
                <div className="h-3.5 w-5/6 bg-slate-200 dark:bg-slate-700 rounded" />
              </div>
              <div className="pt-4 mt-auto">
                <div className="h-10 w-full bg-slate-200 dark:bg-slate-700 rounded-xl" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
