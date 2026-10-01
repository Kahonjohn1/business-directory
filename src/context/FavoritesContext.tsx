import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

interface FavoritesContextType {
  /** IDs of every business currently marked as a favorite. */
  favoriteIds: string[]
  /** Whether the given business is favorited. */
  isFavorite: (id: string) => boolean
  /** Adds the business to favorites, or removes it if already present. */
  toggleFavorite: (id: string) => void
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

const STORAGE_KEY = 'biz_directory_favorites'

/**
 * Turns the raw localStorage entry into a trustworthy list of IDs.
 *
 * Anything unexpected is discarded rather than trusted: malformed JSON, a
 * value that is not an array, or entries that are not strings. Because the key
 * is user-writable from the browser console and can survive a bad deploy, a
 * corrupted entry must never be able to crash the directory. Valid IDs in a
 * partially broken list are kept and duplicates collapsed, so one bad entry
 * does not cost the user everything they saved.
 */
function parseFavoriteIds(raw: string | null): string[] {
  if (!raw) {
    return []
  }

  try {
    const parsed: unknown = JSON.parse(raw)

    if (!Array.isArray(parsed)) {
      return []
    }

    return Array.from(new Set(parsed.filter((id): id is string => typeof id === 'string')))
  } catch {
    // Malformed JSON, so treat it as no saved favorites at all.
    return []
  }
}

/**
 * FavoritesProvider holds the list of favorited business IDs for the whole app.
 *
 * The state sits above the pages so that a favorite set from the directory
 * grid is also reflected on the home page showcase, and vice versa. Only IDs
 * are stored rather than whole business objects, so the list cannot go stale
 * if the underlying listings change.
 *
 * Saved IDs are persisted to localStorage and reloaded on start, so favorites
 * survive a refresh. Every read and write is guarded because storage can be
 * unavailable or full, and losing persistence is preferable to breaking the
 * app. IDs for listings that no longer exist are harmless: they simply never
 * match, so no pruning against the dataset is needed here.
 */
export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  // Read once during the initial render so a reload never flashes an empty
  // directory before the saved favorites appear.
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      return parseFavoriteIds(localStorage.getItem(STORAGE_KEY))
    } catch {
      // Storage blocked, e.g. private browsing or cookies disabled.
      return []
    }
  })

  const toggleFavorite = useCallback((id: string) => {
    setFavoriteIds((current) =>
      current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id]
    )
  }, [])

  const isFavorite = useCallback((id: string) => favoriteIds.includes(id), [favoriteIds])

  // Persist after every change. Writing on mount as well means a corrupted
  // entry is replaced with a clean list on the next load.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds))
    } catch {
      // Quota exceeded or storage unavailable; keep the in-memory list working.
    }
  }, [favoriteIds])

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