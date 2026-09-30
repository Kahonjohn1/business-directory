export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-8 mt-auto transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            &copy; {currentYear} NaijaDirectory. Verified Nigerian Business Hub.
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            Data referenced from Finelib directory research. Educational frontend development project.
          </p>
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 sm:mt-0">
          Built with React 19, TypeScript, Tailwind CSS & WCAG 2.1 AA Principles.
        </p>
      </div>
    </footer>
  )
}
