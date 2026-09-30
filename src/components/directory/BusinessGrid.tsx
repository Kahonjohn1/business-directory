import type { Business } from '../../types/business'
import { BusinessCard } from './BusinessCard'

interface BusinessGridProps {
  businesses: Business[]
}

/**
 * BusinessGrid component.
 * Renders a responsive 3-column desktop to 1-column mobile grid
 * using semantic HTML list markup for accessibility.
 */
export function BusinessGrid({ businesses }: BusinessGridProps) {
  return (
    <ul
      role="list"
      aria-label="Businesses directory"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {businesses.map((business) => (
        <li key={business.id} className="h-full">
          <BusinessCard business={business} />
        </li>
      ))}
    </ul>
  )
}
