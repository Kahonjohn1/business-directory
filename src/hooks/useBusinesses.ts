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

  // Fetch businesses from the service layer
  const loadBusinesses = useCallback(async () => {
    setStatus('loading')
    setError(null)
    try {
      const data = await businessService.getAll()
      setBusinesses(data)
      setStatus('success')
    } catch (err) {
      const message = err instanceof Error ? err.message : "We couldn't load the directory."
      setError(message)
      setStatus('error')
    }
  }, [])

  useEffect(() => {
    loadBusinesses()
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
    retry: loadBusinesses,
    totalCount: businesses.length,
    matchedCount: filteredBusinesses.length,
  }
}
