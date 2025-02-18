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
import { Education } from '@/types/profile'

interface ProfileEducationProps {
  education: Education[]
}

export default function ProfileEducation({ education }: ProfileEducationProps) {
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
        <Heading size="md">Education</Heading>
        <Button leftIcon={<FiPlus />} colorScheme="blue">
          Add Education
        </Button>
      </HStack>

      {education.map((edu) => (
        <Box
          key={edu.id}
          p={6}
          bg={bgColor}
          borderRadius="lg"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <Stack spacing={4}>
            <HStack justify="space-between">
              <Box>
                <Heading size="md">{edu.school}</Heading>
                <Text fontSize="lg" color="gray.600">
                  {edu.degree} in {edu.field}
                </Text>
              </Box>
              <HStack>
                <IconButton
                  aria-label="Edit education"
                  icon={<FiEdit2 />}
                  variant="ghost"
                  size="sm"
                />
                <IconButton
                  aria-label="Delete education"
                  icon={<FiTrash2 />}
                  variant="ghost"
                  size="sm"
                  colorScheme="red"
                />
              </HStack>
            </HStack>

            <HStack>
              <Text color="gray.600">
                {formatDate(edu.startDate)} -{' '}
                {edu.current ? 'Present' : formatDate(edu.endDate!)}
              </Text>
              {edu.current && <Badge colorScheme="green">Current</Badge>}
            </HStack>

            {edu.description && (
              <Text whiteSpace="pre-wrap">{edu.description}</Text>
            )}
          </Stack>
        </Box>
      ))}
    </Stack>
  )
} 