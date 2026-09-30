import { X } from 'lucide-react'
import type { BusinessCategory } from '../../types/business'

interface ResultCountProps {
  totalCount: number
  matchedCount: number
  searchQuery: string
  selectedCategory: BusinessCategory | 'All'
  onClearSearch: () => void
  onClearCategory: () => void
  onClearAll: () => void
}

/**
 * ResultCount displays the number of matching businesses and active filter tags
 * with dark mode support and polite aria-live announcements.
 */
export function ResultCount({
  totalCount,
  matchedCount,
  searchQuery,
  selectedCategory,
  onClearSearch,
  onClearCategory,
  onClearAll,
}: ResultCountProps) {
  const isFiltered = searchQuery.trim() !== '' || selectedCategory !== 'All'

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
      {/* Live Region Announcement for Assistive Technologies */}
      <div
        role="status"
        aria-live="polite"
        className="text-sm font-medium text-slate-700 dark:text-slate-300"
      >
        <span>
          Showing <strong className="text-slate-900 dark:text-white">{matchedCount}</strong> of{' '}
          <strong className="text-slate-900 dark:text-white">{totalCount}</strong> businesses
        </span>
      </div>

      {/* Active Filter Tags with Quick Dismiss */}
      {isFiltered && (
        <div className="flex flex-wrap items-center gap-2">
          {searchQuery.trim() !== '' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-200/80 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-medium">
              <span>Query: &ldquo;{searchQuery}&rdquo;</span>
              <button
                type="button"
                onClick={onClearSearch}
                aria-label={`Remove search filter for ${searchQuery}`}
                className="hover:text-slate-950 dark:hover:text-white focus-visible:outline-none"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </span>
          )}

          {selectedCategory !== 'All' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-naija-100 dark:bg-naija-950/60 text-naija-800 dark:text-naija-300 text-xs font-medium">
              <span>Category: {selectedCategory}</span>
              <button
                type="button"
                onClick={onClearCategory}
                aria-label={`Remove category filter for ${selectedCategory}`}
                className="hover:text-naija-950 dark:hover:text-white focus-visible:outline-none"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </span>
          )}

          <button
            type="button"
            onClick={onClearAll}
            className="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-semibold underline underline-offset-2 ml-1"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  )
}
