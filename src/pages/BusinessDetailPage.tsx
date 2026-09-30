import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  MapPin,
  Globe,
  Phone,
  Mail,
  Star,
  ExternalLink,
  Building,
} from 'lucide-react'
import { useBusinessDetail } from '../hooks/useBusinessDetail'
import { Badge } from '../components/common/Badge'
import { ErrorState } from '../components/common/ErrorState'

/**
 * BusinessDetailPage with full Light and Dark mode styling.
 */
export function BusinessDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { business, status, error, isNotFound, retry } = useBusinessDetail(id)

  // 1. Loading State
  if (status === 'loading') {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
        <div className="h-6 w-36 bg-slate-200 dark:bg-slate-700 rounded" />
        <div className="w-full aspect-[21/9] sm:aspect-[16/7] bg-slate-200 dark:bg-slate-700 rounded-3xl" />
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-4">
          <div className="h-8 w-2/3 bg-slate-200 dark:bg-slate-700 rounded" />
          <div className="h-5 w-1/3 bg-slate-200 dark:bg-slate-700 rounded" />
          <div className="space-y-2 pt-4">
            <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded" />
            <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-700 rounded" />
            <div className="h-4 w-4/6 bg-slate-200 dark:bg-slate-700 rounded" />
          </div>
        </div>
      </div>
    )
  }

  // 2. Network / Server Error
  if (status === 'error') {
    return (
      <div className="max-w-md mx-auto py-12">
        <ErrorState
          title="Could not load business details"
          message={error || 'An error occurred while fetching this listing.'}
          onRetry={retry}
        />
        <div className="text-center mt-6">
          <Link
            to="/businesses"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-800"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Directory</span>
          </Link>
        </div>
      </div>
    )
  }

  // 3. Graceful 404 / Non-Existent Business ID
  if (isNotFound || !business) {
    return (
      <div className="max-w-lg mx-auto py-16 text-center">
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-slate-200 dark:border-slate-700">
          <Building className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Business Not Found</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed">
          We could not find any business listing matching ID &ldquo;{id}&rdquo;. It may have been removed or the URL may be incorrect.
        </p>
        <div className="mt-8">
          <Link
            to="/businesses"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 font-semibold text-sm shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Business Directory</span>
          </Link>
        </div>
      </div>
    )
  }

  // 4. Success State
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back to Directory Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center justify-between">
        <Link
          to="/businesses"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-primary-600 rounded-lg p-1"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back to Directory</span>
        </Link>
        <div className="flex items-center gap-2">
          {business.state && (
            <span className="text-xs font-semibold text-naija-700 dark:text-naija-400 bg-naija-50 dark:bg-naija-950/50 px-2.5 py-1 rounded-full border border-naija-200 dark:border-naija-800">
              {business.state}
            </span>
          )}
          <span className="text-xs text-slate-400 dark:text-slate-500">
            ID: <code className="text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">{business.id}</code>
          </span>
        </div>
      </nav>

      {/* Hero Banner Image */}
      <div className="relative w-full aspect-[21/9] sm:aspect-[16/7] rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
        <img
          src={business.imageUrl}
          alt={business.imageAlt}
          // If the remote image fails to load, hide it so the placeholder
          // background shows instead of a broken-image icon.
          onError={(event) => {
            event.currentTarget.style.visibility = 'hidden'
          }}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
          <Badge category={business.category} size="md" />
        </div>
      </div>

      {/* Main Details Card */}
      <article className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 p-6 sm:p-8 md:p-10 shadow-sm space-y-8">
        {/* Title, Rating & Location Header */}
        <div className="border-b border-slate-100 dark:border-slate-700 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {business.name}
            </h1>

            {business.rating && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-300 shrink-0 self-start sm:self-auto">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" aria-hidden="true" />
                <span className="font-bold text-sm">{business.rating}</span>
                {business.reviewCount && (
                  <span className="text-xs text-amber-700 dark:text-amber-500">({business.reviewCount} reviews)</span>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm mt-3">
            <MapPin className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" aria-hidden="true" />
            <span>{business.location}</span>
          </div>
        </div>

        {/* Full Business Description */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">About this Business</h2>
          <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed whitespace-pre-line">
            {business.description}
          </p>
        </div>

        {/* Contact & Action Surface */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-700">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
            Get in Touch & Connect
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            {business.website ? (
              <a
                href={business.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-naija-600 hover:bg-naija-700 dark:bg-naija-700 dark:hover:bg-naija-600 text-white font-semibold text-sm shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-naija-600 focus-visible:ring-offset-2 min-h-[44px]"
              >
                <Globe className="w-4 h-4" aria-hidden="true" />
                <span>Visit Official Website</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : null}

            {business.phone && (
              <a
                href={`tel:${business.phone}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-semibold text-sm border border-slate-200 dark:border-slate-600 shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 min-h-[44px]"
              >
                <Phone className="w-4 h-4 text-slate-600 dark:text-slate-400" aria-hidden="true" />
                <span>Call {business.phone}</span>
              </a>
            )}

            {business.email && (
              <a
                href={`mailto:${business.email}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-semibold text-sm border border-slate-200 dark:border-slate-600 shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 min-h-[44px]"
              >
                <Mail className="w-4 h-4 text-slate-600 dark:text-slate-400" aria-hidden="true" />
                <span>Email Business</span>
              </a>
            )}
          </div>
        </div>
      </article>
    </div>
  )
}
