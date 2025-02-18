import {
  Box,
  Button,
  Stack,
  Text,
  Heading,
  useColorModeValue,
  Badge,
  IconButton,
  HStack,
} from '@chakra-ui/react'
import { FiEdit2, FiPlus, FiTrash2 } from 'react-icons/fi'
import { Experience } from '@/types/profile'

interface ProfileExperienceProps {
  experience: Experience[]
}

export default function ProfileExperience({ experience }: ProfileExperienceProps) {
  const bgColor = useColorModeValue('white', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <Stack spacing={4}>
      <HStack justify="space-between">
        <Heading size="md">Experience</Heading>
        <Button leftIcon={<FiPlus />} colorScheme="blue">
          Add Experience
        </Button>
      </HStack>

      {experience.map((exp) => (
        <Box
          key={exp.id}
          p={6}
          bg={bgColor}
          borderRadius="lg"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <Stack spacing={4}>
            <HStack justify="space-between">
              <Box>
                <Heading size="md">{exp.position}</Heading>
                <Text fontSize="lg" color="gray.600">
                  {exp.company}
                </Text>
              </Box>
              <HStack>
                <IconButton
                  aria-label="Edit experience"
                  icon={<FiEdit2 />}
                  variant="ghost"
                  size="sm"
                />
                <IconButton
                  aria-label="Delete experience"
                  icon={<FiTrash2 />}
                  variant="ghost"
                  size="sm"
                  colorScheme="red"
                />
              </HStack>
            </HStack>

            <HStack>
              <Text color="gray.600">
                {formatDate(exp.startDate)} -{' '}
                {exp.current ? 'Present' : formatDate(exp.endDate!)}
              </Text>
              <Text color="gray.600">•</Text>
              <Text color="gray.600">{exp.location}</Text>
              {exp.current && <Badge colorScheme="green">Current</Badge>}
            </HStack>

            <Text whiteSpace="pre-wrap">{exp.description}</Text>
          </Stack>
        </Box>
      ))}
    </Stack>
  )
} 