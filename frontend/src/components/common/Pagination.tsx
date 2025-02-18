import {
  Button,
  HStack,
  Text,
  Select,
} from '@chakra-ui/react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface PaginationProps {
  currentPage: number
  totalPages: number
  pageSize: number
  totalItems: number
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
}

export default function Pagination({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  const pageSizeOptions = [10, 20, 50, 100]

  return (
    <HStack spacing={4} justify="space-between" w="100%" py={4}>
      <HStack spacing={2}>
        <Text fontSize="sm">Show</Text>
        <Select
          size="sm"
          w="auto"
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </Select>
        <Text fontSize="sm">per page</Text>
      </HStack>

      <HStack spacing={2}>
        <Button
          size="sm"
          leftIcon={<FiChevronLeft />}
          onClick={() => onPageChange(currentPage - 1)}
          isDisabled={currentPage === 1}
        >
          Previous
        </Button>

        <Text fontSize="sm">
          Page {currentPage} of {totalPages}
        </Text>

        <Button
          size="sm"
          rightIcon={<FiChevronRight />}
          onClick={() => onPageChange(currentPage + 1)}
          isDisabled={currentPage === totalPages}
        >
          Next
        </Button>
      </HStack>

      <Text fontSize="sm">
        Showing {Math.min((currentPage - 1) * pageSize + 1, totalItems)} to{' '}
        {Math.min(currentPage * pageSize, totalItems)} of {totalItems} results
      </Text>
    </HStack>
  )
} 