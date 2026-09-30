import { Link } from 'react-router-dom'
import { MapPin, ArrowRight, Star, Heart } from 'lucide-react'
import type { Business } from '../../types/business'
import { Badge } from '../common/Badge'
import { useFavorites } from '../../context/FavoritesContext'

interface BusinessCardProps {
  business: Business
}

/**
 * Presentational BusinessCard component with full Light and Dark mode styling.
 */
export function BusinessCard({ business }: BusinessCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const isFavorited = isFavorite(business.id)

  return (
    <article className="group flex flex-col h-full bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Business Thumbnail Image */}
      <div className="relative w-full aspect-[16/9] bg-slate-100 dark:bg-slate-700 overflow-hidden">
        <img
          src={business.imageUrl}
          alt={business.imageAlt}
          loading="lazy"
          // If the remote image fails to load, hide it so the placeholder
          // background shows instead of a broken-image icon.
          onError={(event) => {
            event.currentTarget.style.visibility = 'hidden'
          }}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
          <Badge category={business.category} />
          {business.state && (
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-900/80 text-white backdrop-blur-sm">
              {business.state}
            </span>
          )}
        </div>

        {/* Favorite / Unfavorite Toggle */}
        <button
          type="button"
          onClick={() => toggleFavorite(business.id)}
          aria-pressed={isFavorited}
          aria-label={`Favorite ${business.name}`}
          title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          className={`absolute top-3 right-3 z-10 inline-flex items-center justify-center p-2.5 rounded-full shadow-sm backdrop-blur-sm transition-colors focus-visible:ring-2 focus-visible:ring-primary-600 dark:focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:outline-none ${
            isFavorited
              ? 'bg-rose-50/95 dark:bg-rose-950/90 text-rose-500 dark:text-rose-400 ring-1 ring-rose-300 dark:ring-rose-800'
              : 'bg-white/85 dark:bg-slate-900/85 text-slate-500 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-400'
          }`}
        >
          <Heart
            className={`w-5 h-5 ${isFavorited ? 'fill-rose-500 dark:fill-rose-400' : ''}`}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Rating & Location Row */}
        <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
          <div className="flex items-center gap-1 min-w-0">
            <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" aria-hidden="true" />
            <span className="truncate">{business.location}</span>
          </div>
          {business.rating && (
            <div className="flex items-center gap-1 shrink-0 bg-slate-50 dark:bg-slate-700/60 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-600">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" aria-hidden="true" />
              <span className="font-semibold text-slate-700 dark:text-slate-200">{business.rating}</span>
            </div>
          )}
        </div>

        {/* Business Name */}
        <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors tracking-tight line-clamp-1">
          {business.name}
        </h3>

        {/* Short Description */}
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
          {business.shortDescription}
        </p>

        {/* Action Button Pinned to Bottom */}
        <div className="pt-5 mt-auto">
          <Link
            to={`/businesses/${business.id}`}
            aria-label={`View details for ${business.name}`}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/50 group-hover:bg-primary-600 dark:group-hover:bg-primary-500 text-slate-700 dark:text-slate-200 group-hover:text-white text-sm font-semibold border border-slate-200 dark:border-slate-600 group-hover:border-primary-600 dark:group-hover:border-primary-500 shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-primary-600 dark:focus-visible:ring-primary-400 focus-visible:ring-offset-2 min-h-[44px]"
          >
            <span>View Details</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  )
}
