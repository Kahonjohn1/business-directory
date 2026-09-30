import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

/**
 * Accessible theme switcher button toggling between light and dark modes.
 * Dynamically updates its aria-label and icon.
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative inline-flex items-center justify-center p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors focus-visible:ring-2 focus-visible:ring-primary-600 dark:focus-visible:ring-primary-400"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-amber-400 transition-transform hover:rotate-45" aria-hidden="true" />
      ) : (
        <Moon className="w-5 h-5 text-slate-700 transition-transform hover:-rotate-12" aria-hidden="true" />
      )}
    </button>
  )
}
