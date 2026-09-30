import React from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

interface LayoutProps {
  children: React.ReactNode
}

/**
 * Global Layout providing sticky header, main content boundary,
 * and footer with full Light and Dark theme responsiveness.
 */
export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}
