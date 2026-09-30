import { useState, useEffect, useCallback } from 'react'
import type { Business, AsyncStatus } from '../types/business'
import { businessService } from '../services/businessService'

/**
 * Custom hook to retrieve a single business by ID from the service layer.
 * Gracefully manages loading, success, not-found, and error states.
 */
export function useBusinessDetail(id: string | undefined) {
  const [business, setBusiness] = useState<Business | null>(null)
  const [status, setStatus] = useState<AsyncStatus>('loading')
  const [error, setError] = useState<string | null>(null)

  // Accepts an optional "is this still the current request" check. When the
  // check reports true, the response is discarded instead of being applied to
  // the screen, so a slow reply for a previous business can never overwrite
  // the business the user is actually looking at.
  const loadBusiness = useCallback(
    async (isOutdated: () => boolean = () => false) => {
      if (!id) {
        setStatus('error')
        setError('No business ID provided.')
        return
      }

      setStatus('loading')
      setError(null)

      try {
        const data = await businessService.getById(id)
        if (isOutdated()) return
        setBusiness(data)
        setStatus('success')
      } catch (err) {
        if (isOutdated()) return
        const message = err instanceof Error ? err.message : 'Failed to load business details.'
        setError(message)
        setStatus('error')
      }
    },
    [id]
  )

  useEffect(() => {
    let outdated = false

    loadBusiness(() => outdated)

    // Runs when the ID changes or the component unmounts, cancelling the
    // in-flight request so its result is never rendered.
    return () => {
      outdated = true
    }
  }, [loadBusiness])

  const retry = useCallback(() => {
    loadBusiness()
  }, [loadBusiness])

  return {
    business,
    status,
    error,
    isNotFound: status === 'success' && business === null,
    retry,
  }
}
