import React from 'react'
import { Search, X } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onClear: () => void
  placeholder?: string
}

/**
 * Controlled SearchBar component with dark mode support, clear button, and Escape key listener.
 */
export function SearchBar({
  value,
  onChange,
  onClear,
  placeholder = 'Search by business name, specialty, state, or location...',
}: SearchBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape' && value) {
      e.preventDefault()
      onClear()
    }
  }

  return (
    <div className="relative w-full">
      {/* Explicit Accessible Label for Screen Readers */}
      <label htmlFor="business-search" className="sr-only">
        Search businesses by name, specialty, state, or location
      </label>

      {/* Leading Search Icon */}
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
        <Search className="w-5 h-5" aria-hidden="true" />
      </div>

      {/* Controlled Search Input */}
      <input
        id="business-search"
        name="business-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full pl-11 pr-10 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm shadow-sm transition focus:border-primary-600 dark:focus:border-primary-400 focus-visible:ring-2 focus-visible:ring-primary-600 dark:focus-visible:ring-primary-400 focus-visible:ring-offset-2 min-h-[44px]"
      />

      {/* Clear Button */}
      {value.length > 0 && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search input"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors focus-visible:outline-none focus-visible:text-slate-900 dark:focus-visible:text-white"
        >
          <div className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
            <X className="w-4 h-4" aria-hidden="true" />
          </div>
        </button>
      )}
    </div>
  )
}
