import { Link } from 'react-router-dom'
import { Compass, ArrowLeft } from 'lucide-react'

/**
 * NotFoundPage: Catch-all 404 route for undefined URLs with dark mode support.
 */
export function NotFoundPage() {
  return (
    <div className="max-w-md mx-auto py-16 text-center">
      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-slate-200 dark:border-slate-700">
        <Compass className="w-8 h-8 text-primary-600 dark:text-primary-400" />
      </div>
      <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/50 px-2.5 py-1 rounded-full border border-primary-200 dark:border-primary-800">
        Error 404
      </span>
      <h1 className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
        Page Not Found
      </h1>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        The page you are looking for doesn&rsquo;t exist or has been moved to another location.
      </p>
      <div className="mt-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 font-semibold text-sm shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  )
}
