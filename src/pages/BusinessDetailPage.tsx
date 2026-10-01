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
  Heart,
  Clock,
} from 'lucide-react'
import { useBusinessDetail } from '../hooks/useBusinessDetail'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useFavorites } from '../context/FavoritesContext'
import { Badge } from '../components/common/Badge'
import { ErrorState } from '../components/common/ErrorState'

/**
 * Strips the scheme and leading www from a website URL so the contact list can
 * show a short, readable hostname instead of a full address. Falls back to the
 * original string if the URL cannot be parsed, so a malformed listing still
 * renders rather than breaking the page.
 */
function getHostname(url: string): string {
  try {
    const hostname = new URL(url).hostname.replace(/^www\./, '')
    // Parsing can still succeed with an empty hostname, e.g. 'javascript:alert(1)',
    // so treat that the same as a parse failure and show the original string.
    return hostname || url
  } catch {
    return url
  }
}

/**
 * Splits a schedule entry such as 'Monday - Friday: 9:00 AM - 6:00 PM' into its
 * day range and time range so the two can sit on either side of a row. Split on
 * the first colon only, which keeps times such as '9:00 AM' intact.
 */
function splitSchedule(entry: string): { days: string; time: string } {
  const separator = entry.indexOf(':')

  if (separator === -1) {
    return { days: entry, time: '' }
  }

  return {
    days: entry.slice(0, separator).trim(),
    time: entry.slice(separator + 1).trim(),
  }
}

/**
 * BusinessDetailPage with full Light and Dark mode styling.
 */
export function BusinessDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { business, status, error, isNotFound, retry } = useBusinessDetail(id)

  // Favorites live in context, so the button stays in sync with the heart on
  // the directory cards and with the Favorites filter without any extra wiring.
  const { isFavorite, toggleFavorite } = useFavorites()

  // The title uses the real business name once the data has loaded, and falls
  // back to a descriptive label while loading, missing, or failing.
  const pageTitle =
    business?.name ??
    (isNotFound
      ? 'Business Not Found'
      : status === 'error'
        ? 'Business Unavailable'
        : 'Business Details')

  useDocumentTitle(`${pageTitle} | NaijaDirectory`)

  // 1. Loading State
  if (status === 'loading') {
    return (
      <div className="max-w-6xl mx-auto space-y-6 animate-pulse">
        <div className="h-6 w-36 bg-slate-200 dark:bg-slate-700 rounded" />
        <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
          <div className="lg:col-span-2 space-y-6">
            <div className="w-full aspect-[21/9] sm:aspect-[16/7] bg-slate-200 dark:bg-slate-700 rounded-3xl" />
            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-4">
              <div className="h-8 w-2/3 bg-slate-200 dark:bg-slate-700 rounded" />
              <div className="h-4 w-40 bg-slate-200 dark:bg-slate-700 rounded" />
              <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-700 rounded" />
              <div className="space-y-2 pt-4">
                <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded" />
                <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-700 rounded" />
                <div className="h-4 w-4/6 bg-slate-200 dark:bg-slate-700 rounded" />
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
            <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded" />
            <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded" />
            <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-700 rounded" />
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
  const isFavorited = isFavorite(business.id)
  const rating = business.rating
  const filledStars = rating != null ? Math.round(rating) : 0
  const reviewCount = business.reviewCount
  const schedule = business.openingHours ?? []

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Back to Directory Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center justify-between gap-4">
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

      {/* Single column on mobile and tablet, split into content + sidebar on desktop */}
      <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
        {/* ============ Primary Content ============ */}
        <div className="lg:col-span-2 space-y-6">
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

          {/* Name, Rating, Favorite Toggle, Location & Description */}
          <article className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 p-6 sm:p-8 md:p-10 shadow-sm space-y-8">
            <header className="border-b border-slate-100 dark:border-slate-700 pb-6 space-y-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {business.name}
                </h1>

                {/* Favorite / Unfavorite Toggle, driven by FavoritesContext */}
                <button
                  type="button"
                  onClick={() => toggleFavorite(business.id)}
                  aria-pressed={isFavorited}
                  title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
                  className={`inline-flex items-center justify-center gap-2 w-full sm:w-auto shrink-0 min-h-[44px] px-5 py-3 rounded-xl text-sm font-semibold shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800 active:scale-[0.98] motion-reduce:active:scale-100 ${
                    isFavorited
                      ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 ring-1 ring-rose-300 dark:ring-rose-800 hover:bg-rose-100 dark:hover:bg-rose-900/60'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 ring-1 ring-slate-300 dark:ring-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 shrink-0 transition-transform duration-150 ease-out motion-reduce:transition-none ${
                      isFavorited
                        ? 'fill-rose-500 text-rose-500 dark:fill-rose-400 dark:text-rose-400 scale-110'
                        : 'scale-100'
                    }`}
                    aria-hidden="true"
                  />
                  <span>{isFavorited ? 'Saved to Favorites' : 'Add to Favorites'}</span>
                </button>
              </div>

              {/* Rating */}
              {rating != null && (
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <div className="flex items-center gap-0.5" aria-hidden="true">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= filledStars
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-slate-200 text-slate-200 dark:fill-slate-700 dark:text-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    <span className="font-bold text-slate-900 dark:text-white">{rating}</span> out of 5
                    {reviewCount != null && (
                      <span>
                        {' '}
                        &middot; {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
                      </span>
                    )}
                  </p>
                </div>
              )}

              {/* Location */}
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
                <MapPin className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" aria-hidden="true" />
                <span>{business.location}</span>
              </div>
            </header>

            {/* Full Business Description */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">About this Business</h2>
              <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed whitespace-pre-line">
                {business.description}
              </p>
            </div>
          </article>
        </div>

        {/* ============ Contact & Hours Sidebar ============ */}
        <aside className="space-y-6 lg:sticky lg:top-6">
          {/* Contact & Action Surface */}
          <section className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 p-6 shadow-sm">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Contact
            </h2>

            <dl className="mt-5 space-y-4">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Category
                </dt>
                <dd className="mt-1.5">
                  <Badge category={business.category} size="sm" />
                </dd>
              </div>

              {business.website && (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Website
                  </dt>
                  <dd className="mt-1.5">
                    <a
                      href={business.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 break-all focus-visible:ring-2 focus-visible:ring-primary-600 rounded transition-colors duration-150 motion-reduce:transition-none"
                    >
                      <Globe className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>{getHostname(business.website)}</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-70" aria-hidden="true" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </dd>
                </div>
              )}

              {business.phone && (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Phone
                  </dt>
                  <dd className="mt-1.5">
                    <a
                      href={`tel:${business.phone}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 focus-visible:ring-2 focus-visible:ring-primary-600 rounded transition-colors duration-150 motion-reduce:transition-none"
                    >
                      <Phone className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" aria-hidden="true" />
                      <span>{business.phone}</span>
                    </a>
                  </dd>
                </div>
              )}

              {business.email && (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Email
                  </dt>
                  <dd className="mt-1.5">
                    <a
                      href={`mailto:${business.email}`}
className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 focus-visible:ring-2 focus-visible:ring-primary-600 rounded transition-colors duration-150 motion-reduce:transition-none"
                  >
                    <Mail className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" aria-hidden="true" />
                      <span className="break-all">{business.email}</span>
                    </a>
                  </dd>
                </div>
              )}
            </dl>

            {business.website && (
              <a
                href={business.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-xl bg-naija-600 hover:bg-naija-700 dark:bg-naija-700 dark:hover:bg-naija-600 text-white font-semibold text-sm shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-naija-600 focus-visible:ring-offset-2"
              >
                <Globe className="w-4 h-4" aria-hidden="true" />
                <span>Visit Official Website</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </section>

          {/* Opening Hours, only rendered when the listing publishes a schedule */}
          {schedule.length > 0 && (
            <section className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                <Clock className="w-4 h-4 text-slate-400 dark:text-slate-500" aria-hidden="true" />
                <span>Opening Hours</span>
              </h2>
              <ul className="mt-5 space-y-2.5">
                {schedule.map((entry) => {
                  const { days, time } = splitSchedule(entry)
                  return (
                    <li
                      key={entry}
                      className="flex items-baseline justify-between gap-3 text-sm border-b border-slate-100 dark:border-slate-700/60 last:border-b-0 pb-2.5 last:pb-0"
                    >
                      <span className="text-slate-600 dark:text-slate-400">{days}</span>
                      {time && (
                        <span className="font-semibold text-slate-900 dark:text-white text-right">{time}</span>
                      )}
                    </li>
                  )
                })}
              </ul>
            </section>
          )}
        </aside>
      </div>
    </div>
  )
}
