import {
  Box,
  Button,
  Stack,
  Text,
  Heading,
  useColorModeValue,
  Tag,
  Wrap,
  WrapItem,
  HStack,
  IconButton,
} from '@chakra-ui/react'
import { FiPlus, FiX } from 'react-icons/fi'
import { Skill } from '@/types/profile'

interface ProfileSkillsProps {
  skills: Skill[]
}

export default function ProfileSkills({ skills }: ProfileSkillsProps) {
  const bgColor = useColorModeValue('white', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  const getColorScheme = (level: Skill['level']) => {
    switch (level) {
      case 'beginner':
        return 'green'
      case 'intermediate':
        return 'blue'
      case 'advanced':
        return 'purple'
      case 'expert':
        return 'red'
      default:
        return 'gray'
    }
  }

  return (
    <Stack spacing={4}>
      <HStack justify="space-between">
        <Heading size="md">Skills</Heading>
        <Button leftIcon={<FiPlus />} colorScheme="blue">
          Add Skill
        </Button>
      </HStack>

      <Box
        p={6}
        bg={bgColor}
        borderRadius="lg"
        borderWidth="1px"
        borderColor={borderColor}
      >
        <Wrap spacing={3}>
          {skills.map((skill) => (
            <WrapItem key={skill.id}>
              <Tag
                size="lg"
                colorScheme={getColorScheme(skill.level)}
                borderRadius="full"
                variant="subtle"
              >
                <HStack spacing={2}>
                  <Text>{skill.name}</Text>
                  <IconButton
                    aria-label="Remove skill"
                    icon={<FiX />}
                    size="xs"
                    variant="ghost"
                    colorScheme={getColorScheme(skill.level)}
                  />
                </HStack>
              </Tag>
            </WrapItem>
          ))}
        </Wrap>
      </Box>
    </Stack>
  )
} 