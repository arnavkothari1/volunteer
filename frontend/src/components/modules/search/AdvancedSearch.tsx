import {
  Box,
  Stack,
  Input,
  Button,
  Select,
  Checkbox,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  FormControl,
  FormLabel,
  Grid,
  Text,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
  WrapItem,
  useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react'

interface SearchFilters {
  query: string
  type: string[]
  location: string
  experience: [number, number]
  skills: string[]
  remote: boolean
  salary: [number, number]
  datePosted: string
}

export default function AdvancedSearch() {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    type: [],
    location: '',
    experience: [0, 10] as [number, number],
    skills: [],
    remote: false,
    salary: [0, 200] as [number, number],
    datePosted: 'any',
  })
  const [skillInput, setSkillInput] = useState('')
  const bgColor = useColorModeValue('white', 'gray.700')

  const handleSearch = () => {
    // Implement search logic
    console.log('Search filters:', filters)
  }

  const handleAddSkill = (skill: string) => {
    if (skill && !filters.skills.includes(skill)) {
      setFilters({
        ...filters,
        skills: [...filters.skills, skill],
      })
      setSkillInput('')
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setFilters({
      ...filters,
      skills: filters.skills.filter((s) => s !== skill),
    })
  }

  const handleExperienceChange = (value: [number, number]) => {
    setFilters({ ...filters, experience: value as [number, number] })
  }

  const handleSalaryChange = (value: [number, number]) => {
    setFilters({ ...filters, salary: value as [number, number] })
  }

  return (
    <Box bg={bgColor} p={6} borderRadius="lg" shadow="sm">
      <Stack spacing={6}>
        <FormControl>
          <FormLabel>Search Query</FormLabel>
          <Input
            placeholder="Search jobs, companies, or keywords..."
            value={filters.query}
            onChange={(e) =>
              setFilters({ ...filters, query: e.target.value })
            }
          />
        </FormControl>

        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
          <FormControl>
            <FormLabel>Job Type</FormLabel>
            <Select
              multiple
              value={filters.type}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  type: Array.from(
                    e.target.selectedOptions,
                    (option) => option.value
                  ),
                })
              }
            >
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Location</FormLabel>
            <Input
              placeholder="City, State, or Remote"
              value={filters.location}
              onChange={(e) =>
                setFilters({ ...filters, location: e.target.value })
              }
            />
          </FormControl>
        </Grid>

        <FormControl>
          <FormLabel>Experience Level (years)</FormLabel>
          <RangeSlider
            value={filters.experience}
            onChange={(value) => handleExperienceChange(value as [number, number])}
            min={0}
            max={10}
            step={1}
          >
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
          <Text fontSize="sm" color="gray.500" mt={2}>
            {filters.experience[0]} - {filters.experience[1]} years
          </Text>
        </FormControl>

        <FormControl>
          <FormLabel>Skills</FormLabel>
          <Input
            placeholder="Add a skill..."
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddSkill(skillInput)
              }
            }}
          />
          <Wrap spacing={2} mt={2}>
            {filters.skills.map((skill) => (
              <WrapItem key={skill}>
                <Tag size="md" borderRadius="full" variant="solid">
                  <TagLabel>{skill}</TagLabel>
                  <TagCloseButton
                    onClick={() => handleRemoveSkill(skill)}
                  />
                </Tag>
              </WrapItem>
            ))}
          </Wrap>
        </FormControl>

        <FormControl>
          <Checkbox
            isChecked={filters.remote}
            onChange={(e) =>
              setFilters({ ...filters, remote: e.target.checked })
            }
          >
            Remote Only
          </Checkbox>
        </FormControl>

        <FormControl>
          <FormLabel>Salary Range (K)</FormLabel>
          <RangeSlider
            value={filters.salary}
            onChange={(value) => handleSalaryChange(value as [number, number])}
            min={0}
            max={200}
            step={10}
          >
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
          <Text fontSize="sm" color="gray.500" mt={2}>
            ${filters.salary[0]}K - ${filters.salary[1]}K
          </Text>
        </FormControl>

        <FormControl>
          <FormLabel>Date Posted</FormLabel>
          <Select
            value={filters.datePosted}
            onChange={(e) =>
              setFilters({ ...filters, datePosted: e.target.value })
            }
          >
            <option value="any">Any time</option>
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
          </Select>
        </FormControl>

        <Button colorScheme="blue" onClick={handleSearch}>
          Search
        </Button>
      </Stack>
    </Box>
  )
} 