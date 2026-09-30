import { type Business, type BusinessCategory, BUSINESS_CATEGORIES } from '../types/business'
import { mockBusinesses } from '../data/mockBusinesses'

/**
 * Helper utility to simulate asynchronous network latency.
 * Mimics real-world REST API response times (e.g. 400ms).
 */
const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Configuration options for testing and debugging network states.
 */
interface ServiceConfig {
  simulateLatency: boolean
  latencyMs: number
  simulateError: boolean
}

const config: ServiceConfig = {
  simulateLatency: true,
  latencyMs: 400,
  simulateError: false,
}

/**
 * Business Service Layer
 * 
 * Provides an asynchronous API boundary decoupling UI components
 * from the underlying data source. When transitioning to a production
 * REST or GraphQL API, ONLY this service module needs updating—
 * UI components and custom hooks remain untouched.
 */
export const businessService = {
  /**
   * Adjust service behavior for debugging (e.g. simulating network failure)
   */
  configure(options: Partial<ServiceConfig>) {
    Object.assign(config, options)
  },

  /**
   * Retrieves all businesses.
   * Simulates network latency and potential network failure.
   */
  async getAll(): Promise<Business[]> {
    if (config.simulateLatency) {
      await delay(config.latencyMs)
    }

    if (config.simulateError) {
      throw new Error("We couldn't load the directory. Please check your connection and try again.")
    }

    // Return a fresh clone to prevent accidental mutation of the mock data
    return [...mockBusinesses]
  },

  /**
   * Retrieves a single business by its unique ID.
   * Returns `null` if the business does not exist.
   */
  async getById(id: string): Promise<Business | null> {
    if (config.simulateLatency) {
      await delay(Math.max(200, config.latencyMs - 100))
    }

    if (config.simulateError) {
      throw new Error("We couldn't load the business details.")
    }

    const found = mockBusinesses.find((b) => b.id === id)
    return found ? { ...found } : null
  },

  /**
   * Retrieves all available business categories.
   */
  async getCategories(): Promise<readonly BusinessCategory[]> {
    return BUSINESS_CATEGORIES
  },
}
