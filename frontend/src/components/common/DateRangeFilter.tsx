import {
  Box,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  useColorModeValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  HStack,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'
import { FiCalendar } from 'react-icons/fi'

interface DateRangeFilterProps {
  onDateChange: (startDate: string, endDate: string) => void
  onQuickSelect: (range: string) => void
}

export default function DateRangeFilter({ onDateChange, onQuickSelect }: DateRangeFilterProps) {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const handleApply = () => {
    onDateChange(startDate, endDate)
  }

  const quickSelectRanges = [
    { label: 'Last 24 hours', value: '24h' },
    { label: 'Last 3 days', value: '3d' },
    { label: 'Last week', value: '1w' },
    { label: 'Last month', value: '1m' },
  ]

  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <Button
          leftIcon={<FiCalendar />}
          variant="outline"
          size="md"
        >
          Date Posted
        </Button>
      </PopoverTrigger>
      <PopoverContent
        p={4}
        w="300px"
        bg={useColorModeValue('white', 'gray.700')}
        borderColor={useColorModeValue('gray.200', 'gray.600')}
      >
        <PopoverBody>
          <Stack spacing={4}>
            <Box>
              <Text fontWeight="medium" mb={2}>Quick Select</Text>
              <HStack wrap="wrap" spacing={2}>
                {quickSelectRanges.map((range) => (
                  <Button
                    key={range.value}
                    size="sm"
                    variant="outline"
                    onClick={() => onQuickSelect(range.value)}
                  >
                    {range.label}
                  </Button>
                ))}
              </HStack>
            </Box>

            <Stack spacing={3}>
              <FormControl>
                <FormLabel>Start Date</FormLabel>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>End Date</FormLabel>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </FormControl>
            </Stack>

            <Button colorScheme="blue" onClick={handleApply}>
              Apply
            </Button>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
} 