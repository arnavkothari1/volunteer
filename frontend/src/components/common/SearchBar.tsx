import {
  InputGroup,
  InputLeftElement,
  Input,
  Box,
  VStack,
  Text,
  useColorModeValue,
  Spinner,
} from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'
import { useState, useEffect, useRef, useCallback } from 'react'
import debounce from 'lodash/debounce'

interface SearchResult {
  id: string
  title: string
  type: string
}

interface SearchBarProps {
  onSearch: (query: string) => Promise<SearchResult[]>
  placeholder?: string
  onResultSelect?: (result: SearchResult) => void
}

export default function SearchBar({ 
  onSearch, 
  placeholder = "Search...",
  onResultSelect 
}: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // Call useColorModeValue at the top level
  const bgColor = useColorModeValue('white', 'gray.700');

  const debouncedSearch = useCallback(
    (searchQuery: string) => {
      const delayedSearch = debounce(async () => {
        if (searchQuery.trim()) {
          setIsLoading(true);
          try {
            const searchResults = await onSearch(searchQuery);
            setResults(searchResults);
            setIsOpen(true);
          } catch (error) {
            console.error('Search error:', error);
          } finally {
            setIsLoading(false);
          }
        } else {
          setResults([]);
          setIsOpen(false);
        }
      }, 300);
      
      delayedSearch();
      return () => delayedSearch.cancel();
    },
    [onSearch]
  );

  useEffect(() => {
    debouncedSearch(query)
  }, [query, debouncedSearch]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <Box position="relative" ref={searchRef}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          {isLoading ? <Spinner size="sm" /> : <FiSearch />}
        </InputLeftElement>
        <Input
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setIsOpen(true)}
        />
      </InputGroup>

      {isOpen && results.length > 0 && (
        <VStack
          position="absolute"
          top="100%"
          left="0"
          right="0"
          mt="2"
          bg={bgColor}
          boxShadow="lg"
          borderRadius="md"
          maxH="300px"
          overflowY="auto"
          zIndex={10}
          spacing={0}
        >
          {results.map((result) => (
            <Box
              key={result.id}
              p="3"
              w="100%"
              cursor="pointer"
              _hover={{ bg: bgColor }}
              onClick={() => {
                onResultSelect?.(result)
                setIsOpen(false)
                setQuery('')
              }}
            >
              <Text fontWeight="medium">{result.title}</Text>
              <Text fontSize="sm" color="gray.500">
                {result.type}
              </Text>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  )
}
