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

  const loadBusiness = useCallback(async () => {
    if (!id) {
      setStatus('error')
      setError('No business ID provided.')
      return
    }

    setStatus('loading')
    setError(null)

    try {
      const data = await businessService.getById(id)
      setBusiness(data)
      setStatus('success')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load business details.'
      setError(message)
      setStatus('error')
    }
  }, [id])

  useEffect(() => {
    loadBusiness()
  }, [loadBusiness])

  return {
    business,
    status,
    error,
    isNotFound: status === 'success' && business === null,
    retry: loadBusiness,
  }
}
