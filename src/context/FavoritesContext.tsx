import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'

interface FavoritesContextType {
  /** IDs of every business currently marked as a favorite. */
  favoriteIds: string[]
  /** Whether the given business is favorited. */
  isFavorite: (id: string) => boolean
  /** Adds the business to favorites, or removes it if already present. */
  toggleFavorite: (id: string) => void
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

/**
 * FavoritesProvider holds the list of favorited business IDs for the whole app.
 *
 * The state sits above the pages so that a favorite set from the directory
 * grid is also reflected on the home page showcase, and vice versa. Only IDs
 * are stored rather than whole business objects, so the list cannot go stale
 * if the underlying listings change.
 *
 * State is intentionally in-memory only for now; persisting it to
 * localStorage is a separate follow-up.
 */
export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])

  const toggleFavorite = useCallback((id: string) => {
    setFavoriteIds((current) =>
      current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id]
    )
  }, [])

  const isFavorite = useCallback((id: string) => favoriteIds.includes(id), [favoriteIds])

  const value = useMemo(
    () => ({ favoriteIds, isFavorite, toggleFavorite }),
    [favoriteIds, isFavorite, toggleFavorite]
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites(): FavoritesContextType {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}