import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Search,
  ArrowRight,
  TrendingUp,
  MapPin,
  Building2,
  Utensils,
  Landmark,
  Activity,
  GraduationCap,
  Sparkles,
  Home,
  Megaphone,
  Briefcase,
} from 'lucide-react'
import { BUSINESS_CATEGORIES, type BusinessCategory } from '../types/business'
import { mockBusinesses } from '../data/mockBusinesses'
import { BusinessCard } from '../components/directory/BusinessCard'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

// Category icon helper mapping
const categoryIcons: Record<BusinessCategory, React.ComponentType<{ className?: string }>> = {
  'Technology': Building2,
  'Restaurants & Food': Utensils,
  'Finance': Landmark,
  'Healthcare': Activity,
  'Education': GraduationCap,
  'Fashion': Sparkles,
  'Real Estate': Home,
  'Marketing & Advertising': Megaphone,
  'Professional Services': Briefcase,
}

export function HomePage() {
  useDocumentTitle('NaijaDirectory | Discover Verified Nigerian Businesses')

  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  // Count businesses per category
  const getCategoryCount = (category: BusinessCategory) => {
    return mockBusinesses.filter((b) => b.category === category).length
  }

  // Curated featured businesses
  const featuredBusinesses = mockBusinesses.filter((b) => b.featured).slice(0, 3)

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const query = searchQuery.trim()
    if (query) {
      navigate(`/businesses?search=${encodeURIComponent(query)}`)
    } else {
      navigate('/businesses')
    }
  }

  const handleCategoryClick = (category: BusinessCategory) => {
    navigate(`/businesses?category=${encodeURIComponent(category)}`)
  }

  return (
    <div className="space-y-16 sm:space-y-20">
      {/* 1. HERO SECTION */}
      <section className="relative text-center max-w-4xl mx-auto pt-4 sm:pt-8">
        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight sm:leading-tight">
          Discover & Connect with Businesses Across{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-naija-600 to-sky-600 dark:from-naija-400 dark:to-sky-400">
            Nigeria
          </span>
        </h1>

        {/* Supporting Description */}
        <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Explore verified fintech unicorns, cultural restaurants, healthcare specialists, fashion houses, and top professional firms across Lagos, Abuja, and major commercial hubs.
        </p>

        {/* Prominent Search Bar Experience */}
        <form
          onSubmit={handleSearchSubmit}
          className="mt-8 max-w-2xl mx-auto flex flex-col sm:flex-row gap-3 bg-white dark:bg-slate-800 p-2 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg"
        >
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Search className="w-5 h-5" aria-hidden="true" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search companies, restaurants, clinics, or locations..."
              className="w-full pl-11 pr-4 py-3.5 bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm sm:text-base focus:outline-none"
              aria-label="Search businesses"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-naija-600 hover:bg-naija-700 text-white font-semibold text-sm sm:text-base shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-naija-600 focus-visible:ring-offset-2 min-h-[44px]"
          >
            <span>Search Directory</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </form>

        {/* Quick Suggestion Pills */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="font-medium text-slate-700 dark:text-slate-300">Popular:</span>
          {(['Technology', 'Restaurants & Food', 'Finance', 'Healthcare'] as BusinessCategory[]).map(
            (cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryClick(cat)}
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
              >
                {cat}
              </button>
            )
          )}
        </div>
      </section>

      {/* 2. TRUST / METRIC STRIP */}
      <section
        aria-label="Platform Highlights"
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto"
      >
        <div className="bg-white dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 text-center shadow-sm">
          <div className="text-2xl font-bold text-naija-600 dark:text-naija-400">25+ Verified</div>
          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Researched Nigerian Listings
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 text-center shadow-sm">
          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">9 Core Sectors</div>
          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Tech, Food, Health, Finance & More
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 text-center shadow-sm">
          <div className="text-2xl font-bold text-slate-900 dark:text-white flex items-center justify-center gap-1">
            <MapPin className="w-5 h-5 text-rose-500" />
            <span>Lagos & Abuja</span>
          </div>
          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Leading Commercial Hubs
          </div>
        </div>
      </section>

      {/* 3. POPULAR CATEGORIES DISCOVERY GRID */}
      <section aria-labelledby="sectors-heading" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <div className="text-xs font-bold text-naija-600 dark:text-naija-400 uppercase tracking-wider">
              Browse by Industry
            </div>
            <h2 id="sectors-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
              Popular Business Sectors
            </h2>
          </div>
          <Link
            to="/businesses"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {/* 9 Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BUSINESS_CATEGORIES.map((category) => {
            const Icon = categoryIcons[category] || Building2
            const count = getCategoryCount(category)

            return (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryClick(category)}
                className="group flex items-center justify-between p-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-left transition-all shadow-sm hover:shadow"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center transition-colors group-hover:bg-naija-100 group-hover:text-naija-700 dark:group-hover:bg-naija-900/50 dark:group-hover:text-naija-300">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white text-sm sm:text-base group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {category}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {count} verified listings
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </button>
            )
          })}
        </div>
      </section>

      {/* 4. FEATURED BUSINESSES SHOWCASE */}
      <section aria-labelledby="featured-heading" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <div className="text-xs font-bold text-naija-600 dark:text-naija-400 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Handpicked Spotlight</span>
            </div>
            <h2 id="featured-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
              Featured Nigerian Enterprises
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Top innovative companies and cultural staples shaping commerce in Nigeria.
            </p>
          </div>
          <Link
            to="/businesses"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline shrink-0"
          >
            <span>Explore All 25 Businesses</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {/* 3-column Card Showcase */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredBusinesses.map((business) => (
            <div key={business.id} className="h-full">
              <BusinessCard business={business} />
            </div>
          ))}
        </div>
      </section>

      {/* 5. CALL TO ACTION STRIP */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-12 text-center shadow-lg space-y-6 border border-slate-700">
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          Looking for a specific business or service?
        </h2>
        <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Filter by sector, search by city or district, and view complete contact details and official websites.
        </p>
        <div>
          <Link
            to="/businesses"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-naija-600 hover:bg-naija-700 text-white font-semibold text-base shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-naija-400 min-h-[44px]"
          >
            <span>Open Complete Business Directory</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  )
}
