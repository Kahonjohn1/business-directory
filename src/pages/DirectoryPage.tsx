import { Sparkles } from 'lucide-react'
import { useBusinesses } from '../hooks/useBusinesses'
import { SearchBar } from '../components/directory/SearchBar'
import { CategoryFilter } from '../components/directory/CategoryFilter'
import { ResultCount } from '../components/directory/ResultCount'
import { BusinessGrid } from '../components/directory/BusinessGrid'
import { LoadingState } from '../components/common/LoadingState'
import { EmptyState } from '../components/common/EmptyState'
import { ErrorState } from '../components/common/ErrorState'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

/**
 * DirectoryPage: The main directory route (/businesses).
 * Reads initial filter state from URL search params (set by HomePage search).
 */
export function DirectoryPage() {
  useDocumentTitle('Business Directory | NaijaDirectory')

  const {
    filteredBusinesses,
    status,
    error,
    searchQuery,
    selectedCategory,
    setSearchQuery,
    setSelectedCategory,
    clearSearch,
    clearCategory,
    clearFilters,
    retry,
    totalCount,
    matchedCount,
  } = useBusinesses()

  return (
    <div className="space-y-8">
      {/* Directory Hero Section */}
      <section className="text-center max-w-3xl mx-auto pt-2 pb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-naija-50 dark:bg-naija-950/50 text-naija-700 dark:text-naija-300 text-xs font-semibold mb-4 border border-naija-200 dark:border-naija-800">
          <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Nigerian Business Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Explore Nigerian Businesses
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Search and filter verified businesses across Technology, Finance, Healthcare, Restaurants, Education, Fashion, Real Estate, and Professional Services.
        </p>
      </section>

      {/* Search & Filter Controls */}
      <section
        aria-label="Directory search and filters"
        className="bg-white dark:bg-slate-800 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-5"
      >
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={clearSearch}
        />

        <div className="pt-1">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2.5">
            Filter by Category
          </div>
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {status === 'success' && (
          <div className="border-t border-slate-100 dark:border-slate-700 pt-3">
            <ResultCount
              totalCount={totalCount}
              matchedCount={matchedCount}
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              onClearSearch={clearSearch}
              onClearCategory={clearCategory}
              onClearAll={clearFilters}
            />
          </div>
        )}
      </section>

      {/* Directory Listing Section */}
      <section aria-label="Business listings" className="pt-2">
        {status === 'loading' && <LoadingState count={6} />}

        {status === 'error' && (
          <ErrorState
            title="We couldn't load the directory."
            message={error || 'An unexpected error occurred while loading businesses.'}
            onRetry={retry}
          />
        )}

        {status === 'success' && filteredBusinesses.length === 0 && (
          <EmptyState
            title="No businesses match your search."
            message="We couldn't find any Nigerian businesses matching your search and category filter. Try clearing filters or using different keywords."
            onReset={clearFilters}
            resetLabel="Clear all filters"
          />
        )}

        {status === 'success' && filteredBusinesses.length > 0 && (
          <BusinessGrid businesses={filteredBusinesses} />
        )}
      </section>
    </div>
  )
}
