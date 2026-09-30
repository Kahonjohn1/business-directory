import { NavLink, Link } from 'react-router-dom'
import { Building2 } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
      isActive
        ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white'
        : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
    }`

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-slate-900/80 transition-colors">
      {/* Skip to Main Content Link for Keyboard Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-md focus:shadow-md focus:outline-none"
      >
        Skip to main content
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Brand Logo & Name */}
          <Link to="/" className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded-xl p-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-naija-600 text-white shadow-sm transition-transform group-hover:scale-105">
              <Building2 className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white block leading-tight">
                NaijaDirectory
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                Verified Nigerian Businesses
              </span>
            </div>
          </Link>

          {/* Navigation & Controls */}
          <div className="flex items-center gap-3 sm:gap-6">
            <nav aria-label="Primary Navigation" className="flex items-center gap-1 sm:gap-2">
              <NavLink to="/" end className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to="/businesses" className={navLinkClass}>
                Directory
              </NavLink>
            </nav>

            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700" aria-hidden="true" />

            {/* Theme Toggle Button */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
