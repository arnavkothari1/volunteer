import {
  Box,
  Button,
  Stack,
  Text,
  Heading,
  useColorModeValue,
  SimpleGrid,
  IconButton,
  HStack,
  Link,
  Tag,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { FiEdit2, FiPlus, FiTrash2, FiExternalLink } from 'react-icons/fi'
import { Project } from '@/types/profile'

interface ProfileProjectsProps {
  projects: Project[]
}

export default function ProfileProjects({ projects }: ProfileProjectsProps) {
  const bgColor = useColorModeValue('white', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  return (
    <Stack spacing={4}>
      <HStack justify="space-between">
        <Heading size="md">Projects</Heading>
        <Button leftIcon={<FiPlus />} colorScheme="blue">
          Add Project
        </Button>
      </HStack>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        {projects.map((project) => (
          <Box
            key={project.id}
            p={6}
            bg={bgColor}
            borderRadius="lg"
            borderWidth="1px"
            borderColor={borderColor}
          >
            <Stack spacing={4}>
              <HStack justify="space-between">
                <Heading size="md">{project.title}</Heading>
                <HStack>
                  {project.url && (
                    <IconButton
                      aria-label="Visit project"
                      icon={<FiExternalLink />}
                      as={Link}
                      href={project.url}
                      target="_blank"
                      variant="ghost"
                      size="sm"
                    />
                  )}
                  <IconButton
                    aria-label="Edit project"
                    icon={<FiEdit2 />}
                    variant="ghost"
                    size="sm"
                  />
                  <IconButton
                    aria-label="Delete project"
                    icon={<FiTrash2 />}
                    variant="ghost"
                    size="sm"
                    colorScheme="red"
                  />
                </HStack>
              </HStack>

              <Text>{project.description}</Text>

              <Wrap spacing={2}>
                {project.technologies.map((tech, index) => (
                  <WrapItem key={index}>
                    <Tag colorScheme="blue" variant="subtle">
                      {tech}
                    </Tag>
                  </WrapItem>
                ))}
              </Wrap>
            </Stack>
          </Box>
        ))}
      </SimpleGrid>
    </Stack>
  )
} 