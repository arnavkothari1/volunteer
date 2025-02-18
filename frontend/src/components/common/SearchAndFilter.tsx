import { VStack } from '@chakra-ui/react'
import SearchBar from './SearchBar'
import FilterBar from './FilterBar'
import { FilterGroup, FilterOption } from '@/types/filters'
import { SearchResult } from '@/types/forms'

interface SearchAndFilterProps {
  onSearch: (query: string) => Promise<SearchResult[]>
  filters: FilterGroup[]
  onFilterChange: (filters: Record<string, string[]>) => void
  sortOptions?: FilterOption[]
  onSortChange?: (value: string) => void
  searchPlaceholder?: string
}

export default function SearchAndFilter({
  onSearch,
  filters,
  onFilterChange,
  sortOptions,
  onSortChange,
  searchPlaceholder,
}: SearchAndFilterProps) {
  return (
    <VStack spacing={4} align="stretch" w="100%">
      <SearchBar
        onSearch={onSearch}
        placeholder={searchPlaceholder}
      />
      <FilterBar
        filters={filters}
        onFilterChange={onFilterChange}
        sortOptions={sortOptions}
        onSortChange={onSortChange}
      />
    </VStack>
  )
}
