import {
  Box,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Text,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Stack,
  HStack,
  Input,
  useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react'
import { FiDollarSign } from 'react-icons/fi'

interface SalaryRangeFilterProps {
  onSalaryChange: (min: number, max: number) => void
  maxSalary?: number
}

export default function SalaryRangeFilter({
  onSalaryChange,
  maxSalary = 200000,
}: SalaryRangeFilterProps) {
  const [range, setRange] = useState([0, maxSalary])

  const handleChange = (newRange: number[]) => {
    setRange(newRange)
  }

  const handleApply = () => {
    onSalaryChange(range[0], range[1])
  }

  const formatSalary = (value: number) => {
    return `$${value.toLocaleString()}`
  }

  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <Button
          leftIcon={<FiDollarSign />}
          variant="outline"
          size="md"
        >
          Salary Range
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
              <Text mb={2}>Salary Range</Text>
              <HStack spacing={4}>
                <Input
                  value={formatSalary(range[0])}
                  isReadOnly
                  size="sm"
                />
                <Text>to</Text>
                <Input
                  value={formatSalary(range[1])}
                  isReadOnly
                  size="sm"
                />
              </HStack>
            </Box>

            <Box pt={4}>
              <RangeSlider
                min={0}
                max={maxSalary}
                step={5000}
                value={range}
                onChange={handleChange}
              >
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
              </RangeSlider>
            </Box>

            <Button colorScheme="blue" onClick={handleApply}>
              Apply
            </Button>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
} 