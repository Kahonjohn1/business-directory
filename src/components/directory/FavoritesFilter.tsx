interface FavoritesFilterProps {
  /** Whether the directory is currently narrowed to favorited businesses. */
  showFavoritesOnly: boolean
  /** Called with the newly selected option. */
  onChange: (showFavoritesOnly: boolean) => void
}

/**
 * FavoritesFilter component providing an accessible two-option pill group
 * that switches the directory between all businesses and favorites only.
 * Styling mirrors CategoryFilter so the two filters read as one control set.
 */
export function FavoritesFilter({
  showFavoritesOnly,
  onChange,
}: FavoritesFilterProps) {
  const options = [
    { label: 'All Businesses', value: false },
    { label: 'Favorites', value: true },
  ]

  return (
    <div
      role="group"
      aria-label="Show all businesses or favorites only"
      className="flex flex-wrap items-center gap-2"
    >
      {options.map((option) => {
        const isSelected = showFavoritesOnly === option.value

        return (
          <button
            key={option.label}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={isSelected}
            className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-naija-600 dark:focus-visible:ring-naija-400 focus-visible:ring-offset-2 min-h-[38px] ${
              isSelected
                ? 'bg-naija-600 text-white border border-naija-600 shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-750'
            }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}