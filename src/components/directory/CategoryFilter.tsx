import { BUSINESS_CATEGORIES, type BusinessCategory } from '../../types/business'

interface CategoryFilterProps {
  selectedCategory: BusinessCategory | 'All'
  onSelectCategory: (category: BusinessCategory | 'All') => void
}

/**
 * CategoryFilter component providing an accessible pill-button group
 * with full Light and Dark mode support.
 */
export function CategoryFilter({
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  const allCategories: Array<BusinessCategory | 'All'> = ['All', ...BUSINESS_CATEGORIES]

  return (
    <div
      role="group"
      aria-label="Filter businesses by category"
      className="flex flex-wrap items-center gap-2"
    >
      {allCategories.map((category) => {
        const isSelected = selectedCategory === category

        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelectCategory(category)}
            aria-pressed={isSelected}
            className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-naija-600 dark:focus-visible:ring-naija-400 focus-visible:ring-offset-2 min-h-[38px] ${
              isSelected
                ? 'bg-naija-600 text-white border border-naija-600 shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-750'
            }`}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}
