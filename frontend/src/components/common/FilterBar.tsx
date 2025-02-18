import {
  HStack,
  Select,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  Box,
  Badge,
} from '@chakra-ui/react'
import { FiFilter, FiX } from 'react-icons/fi'
import { useState } from 'react'
import { FilterOption, FilterGroup } from '@/types/filters'

interface FilterBarProps {
  filters: FilterGroup[]
  onFilterChange: (filters: Record<string, string[]>) => void
  sortOptions?: FilterOption[]
  onSortChange?: (value: string) => void
}

export default function FilterBar({
  filters,
  onFilterChange,
  sortOptions,
  onSortChange,
}: FilterBarProps) {
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({})
  const [sort, setSort] = useState('')

  const handleFilterChange = (groupId: string, values: string[]) => {
    const newFilters = {
      ...activeFilters,
      [groupId]: values,
    }
    setActiveFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleSortChange = (value: string) => {
    setSort(value)
    onSortChange?.(value)
  }

  const clearFilters = () => {
    setActiveFilters({})
    onFilterChange({})
  }

  const activeFilterCount = Object.values(activeFilters).flat().length

  return (
    <Box>
      <HStack spacing={4} mb={4}>
        <Menu closeOnSelect={false}>
          <MenuButton
            as={Button}
            leftIcon={<FiFilter />}
            variant="outline"
            colorScheme={activeFilterCount > 0 ? 'blue' : 'gray'}
          >
            Filters
            {activeFilterCount > 0 && (
              <Badge ml={2} colorScheme="blue" borderRadius="full">
                {activeFilterCount}
              </Badge>
            )}
          </MenuButton>
          <MenuList>
            {filters.map((group) => (
              <MenuOptionGroup
                key={group.id}
                title={group.label}
                type="checkbox"
                value={activeFilters[group.id] || []}
                onChange={(values) => handleFilterChange(group.id, values as string[])}
              >
                {group.options.map((option) => (
                  <MenuItemOption key={option.value} value={option.value}>
                    {option.label}
                  </MenuItemOption>
                ))}
              </MenuOptionGroup>
            ))}
          </MenuList>
        </Menu>

        {sortOptions && (
          <Select
            placeholder="Sort by"
            value={sort}
            onChange={(e) => handleSortChange(e.target.value)}
            maxW="200px"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        )}

        {activeFilterCount > 0 && (
          <Button
            leftIcon={<FiX />}
            variant="ghost"
            size="sm"
            onClick={clearFilters}
          >
            Clear all
          </Button>
        )}
      </HStack>

      {activeFilterCount > 0 && (
        <HStack spacing={2} flexWrap="wrap">
          {Object.entries(activeFilters).map(([groupId, values]) => (
            values.map((value) => {
              const group = filters.find(f => f.id === groupId)
              const option = group?.options.find(o => o.value === value)
              return option && group && (
                <Badge
                  key={`${groupId}-${value}`}
                  colorScheme="blue"
                  variant="subtle"
                  px={2}
                  py={1}
                >
                  {`${group.label}: ${option.label}`}
                </Badge>
              )
            })
          ))}
        </HStack>
      )}
    </Box>
  )
}
