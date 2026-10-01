/**
 * TypeScript Data Models and Contracts for NaijaDirectory
 */

/**
 * 9 Key Nigerian Industry Categories represented as a strict string union.
 */
export type BusinessCategory =
  | 'Technology'
  | 'Restaurants & Food'
  | 'Finance'
  | 'Healthcare'
  | 'Education'
  | 'Fashion'
  | 'Real Estate'
  | 'Marketing & Advertising'
  | 'Professional Services'

/**
 * Immutable array of all available categories for filters and discovery cards.
 */
export const BUSINESS_CATEGORIES: readonly BusinessCategory[] = [
  'Technology',
  'Restaurants & Food',
  'Finance',
  'Healthcare',
  'Education',
  'Fashion',
  'Real Estate',
  'Marketing & Advertising',
  'Professional Services',
] as const

/**
 * Core Business entity interface.
 */
export interface Business {
  /** Unique identifier used for routing (e.g. 'flutterwave', 'terra-kulture') */
  id: string

  /** Display name of the Nigerian business */
  name: string

  /** Category classification */
  category: BusinessCategory

  /** Specific street address or district (e.g. '8 Providence St, Lekki Phase 1') */
  location: string

  /** Nigerian State/Territory (e.g. 'Lagos', 'Abuja (FCT)') */
  state?: string

  /** Full in-depth description rendered on the Business Detail page */
  description: string

  /** Short 1-2 sentence excerpt for the Business Card grid */
  shortDescription: string

  /** Public image URL */
  imageUrl: string

  /** Accessible description of the business image for screen readers */
  imageAlt: string

  /** Official website URL (or Finelib listing) */
  website?: string

  /** Contact phone number */
  phone?: string

  /** Official customer/inquiry email */
  email?: string

  /** Rating score (1.0 to 5.0) */
  rating?: number

  /** Review count */
  reviewCount?: number

  /**
   * Opening hours, one human-readable entry per day
   * (e.g. 'Monday - Friday: 9:00 AM - 5:00 PM').
   * Optional because not every listing publishes a schedule.
   */
  openingHours?: string[]

  /** Flag to spotlight business on the Landing Page */
  featured?: boolean
}

/**
 * Filter state representing active search criteria in the directory.
 */
export interface DirectoryFilters {
  searchQuery: string
  selectedCategory: BusinessCategory | 'All'
  selectedState?: string | 'All'
}

/**
 * Standardized network lifecycle statuses.
 */
export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error'

/**
 * Generic container for asynchronous data operations.
 */
export interface AsyncState<T> {
  data: T | null
  status: AsyncStatus
  error: string | null
}
