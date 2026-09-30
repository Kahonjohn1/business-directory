import { useEffect } from 'react'

/**
 * Custom hook that sets the browser tab title for the current page.
 * Passing a new title re-runs the effect, so pages that load their data
 * asynchronously (such as the business detail page) can update the title
 * once the real business name is known.
 */
export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title
  }, [title])
}
