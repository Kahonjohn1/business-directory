import { useState, useEffect, useMemo, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { Business, BusinessCategory, AsyncStatus } from '../types/business'
import { BUSINESS_CATEGORIES } from '../types/business'
import { businessService } from '../services/businessService'
import { useFavorites } from '../context/FavoritesContext'

/**
 * Custom hook to manage the business directory state, async data fetching,
 * and search/category filtering synced with URL search parameters.
 */
export function useBusinesses() {
  const [searchParams, setSearchParams] = useSearchParams()

  // Favorites live in FavoritesContext so the heart buttons on the cards and
  // this filter always agree on what is favorited.
  const { favoriteIds } = useFavorites()

  const [businesses, setBusinesses] = useState<Business[]>([])
  const [status, setStatus] = useState<AsyncStatus>('loading')
  const [error, setError] = useState<string | null>(null)

  // Initialize filter state from URL query parameters
  const initialSearch = searchParams.get('search') || ''
  const initialCategoryParam = searchParams.get('category')
  const initialCategory: BusinessCategory | 'All' =
    initialCategoryParam && BUSINESS_CATEGORIES.includes(initialCategoryParam as BusinessCategory)
      ? (initialCategoryParam as BusinessCategory)
      : 'All'

  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [selectedCategory, setSelectedCategory] = useState<BusinessCategory | 'All'>(initialCategory)

  // Narrow the directory to favorited businesses only. This is intentionally
  // session-only UI state and is not written to the URL, so it resets on reload
  // alongside the favorites themselves.
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)

  // Sync internal state when URL searchParams change (e.g. from back/forward or landing page navigation)
  useEffect(() => {
    const urlSearch = searchParams.get('search') || ''
    const urlCat = searchParams.get('category')
    const validCat: BusinessCategory | 'All' =
      urlCat && BUSINESS_CATEGORIES.includes(urlCat as BusinessCategory)
        ? (urlCat as BusinessCategory)
        : 'All'

    // The URL always stores a trimmed value, so if the incoming query only
    // differs from what is already typed by surrounding whitespace, keep the
    // current raw value. This stops a trailing space being deleted from the
    // input box while the user is still typing a multi-word search.
    setSearchQuery((previous) => (previous.trim() === urlSearch.trim() ? previous : urlSearch))
    setSelectedCategory(validCat)
  }, [searchParams])

  // Update URL search parameters when filters change
  const updateUrlParams = useCallback(
    (newSearch: string, newCat: BusinessCategory | 'All') => {
      const params = new URLSearchParams()
      if (newSearch.trim()) {
        params.set('search', newSearch.trim())
      }
      if (newCat !== 'All') {
        params.set('category', newCat)
      }
      setSearchParams(params, { replace: true })
    },
    [setSearchParams]
  )

  const handleSetSearch = useCallback(
    (query: string) => {
      setSearchQuery(query)
      updateUrlParams(query, selectedCategory)
    },
    [selectedCategory, updateUrlParams]
  )

  const handleSetCategory = useCallback(
    (cat: BusinessCategory | 'All') => {
      setSelectedCategory(cat)
      updateUrlParams(searchQuery, cat)
    },
    [searchQuery, updateUrlParams]
  )

  // Fetch businesses from the service layer. Accepts an optional "is this still
  // the current request" check; when it reports true the response is discarded
  // instead of applied, so a slow reply from a superseded request can never
  // overwrite the state the user is actually looking at. This mirrors the
  // guard in useBusinessDetail.
  const loadBusinesses = useCallback(
    async (isOutdated: () => boolean = () => false) => {
      setStatus('loading')
      setError(null)
      try {
        const data = await businessService.getAll()
        if (isOutdated()) return
        setBusinesses(data)
        setStatus('success')
      } catch (err) {
        if (isOutdated()) return
        const message = err instanceof Error ? err.message : "We couldn't load the directory."
        setError(message)
        setStatus('error')
      }
    },
    []
  )

  useEffect(() => {
    let outdated = false

    loadBusinesses(() => outdated)

    // Runs when the component unmounts, marking the in-flight request stale so
    // its result is never written to state after teardown.
    return () => {
      outdated = true
    }
  }, [loadBusinesses])

  // Derived state: computed whenever businesses, searchQuery, selectedCategory,
  // showFavoritesOnly or the favorites list change
  const filteredBusinesses = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return businesses.filter((biz) => {
      // 1. Text search match across name, short description, full description, state, and location
      const matchesSearch =
        query === '' ||
        biz.name.toLowerCase().includes(query) ||
        biz.shortDescription.toLowerCase().includes(query) ||
        biz.description.toLowerCase().includes(query) ||
        biz.location.toLowerCase().includes(query) ||
        (biz.state && biz.state.toLowerCase().includes(query))

      // 2. Category match
      const matchesCategory =
        selectedCategory === 'All' || biz.category === selectedCategory

      // 3. Favorites match, applied only while the Favorites filter is active
      const matchesFavorites =
        !showFavoritesOnly || favoriteIds.includes(biz.id)

      // All active criteria must be satisfied (AND logic)
      return matchesSearch && matchesCategory && matchesFavorites
    })
  }, [businesses, searchQuery, selectedCategory, showFavoritesOnly, favoriteIds])

  // Helper actions
  const clearSearch = useCallback(() => {
    setSearchQuery('')
    updateUrlParams('', selectedCategory)
  }, [selectedCategory, updateUrlParams])

  const clearCategory = useCallback(() => {
    setSelectedCategory('All')
    updateUrlParams(searchQuery, 'All')
  }, [searchQuery, updateUrlParams])

  const clearFilters = useCallback(() => {
    setSearchQuery('')
    setSelectedCategory('All')
    setShowFavoritesOnly(false)
    setSearchParams(new URLSearchParams(), { replace: true })
  }, [setSearchParams])

  // Wrapped rather than exposed directly: ErrorState uses onClick={onRetry}, so
  // React hands the click event to this callback. Passing loadBusinesses itself
  // would deliver that event as the `isOutdated` argument and calling it would
  // throw. Mirrors the wrapper in useBusinessDetail.
  const retry = useCallback(() => {
    loadBusinesses()
  }, [loadBusinesses])

  return {
    businesses,
    filteredBusinesses,
    status,
    error,
    searchQuery,
    selectedCategory,
    showFavoritesOnly,
    setSearchQuery: handleSetSearch,
    setSelectedCategory: handleSetCategory,
    setShowFavoritesOnly,
    clearSearch,
    clearCategory,
    clearFilters,
    retry,
    totalCount: businesses.length,
    matchedCount: filteredBusinesses.length,
  }
}
