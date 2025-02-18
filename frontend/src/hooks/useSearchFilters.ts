import { useState, useCallback } from 'react'
import { SearchFilters, FilterState } from '@/types/filters'
import { useRouter } from 'next/router'

export function useSearchFilters(initialFilters?: SearchFilters) {
  const router = useRouter()
  const [filters, setFilters] = useState<SearchFilters>(initialFilters || {})

  const updateFilters = useCallback((newFilters: Partial<SearchFilters>) => {
    setFilters(prev => {
      const updated = { ...prev, ...newFilters }
      
      // Update URL query params
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          ...updated,
          filters: updated.filters ? JSON.stringify(updated.filters) : undefined,
        },
      }, undefined, { shallow: true })

      return updated
    })
  }, [router])

  const handleSearch = useCallback((query: string) => {
    updateFilters({ query, page: 1 })
  }, [updateFilters])

  const handleFilterChange = useCallback((filterState: FilterState) => {
    updateFilters({ filters: filterState, page: 1 })
  }, [updateFilters])

  const handleSortChange = useCallback((sort: string) => {
    updateFilters({ sort, page: 1 })
  }, [updateFilters])

  const handlePageChange = useCallback((page: number) => {
    updateFilters({ page })
  }, [updateFilters])

  return {
    filters,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    handlePageChange,
  }
}
