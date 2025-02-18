import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Avatar,
  Stack,
  IconButton,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react'
import { FiEdit2, FiGithub, FiLinkedin, FiGlobe } from 'react-icons/fi'
import { Profile } from '@/types/profile'

interface ProfileHeaderProps {
  profile: Profile;
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  const bgColor = useColorModeValue('white', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  return (
    <Box
      bg={bgColor}
      borderRadius="lg"
      boxShadow="md"
      p={6}
      borderWidth="1px"
      borderColor={borderColor}
    >
      <Flex direction={{ base: 'column', md: 'row' }} align="center" gap={6}>
        <Avatar
          size="2xl"
          name={`${profile.firstName} ${profile.lastName}`}
          src={profile.avatar}
        />
        
        <Stack flex="1" spacing={4}>
          <Flex justify="space-between" align="center">
            <Box>
              <Heading size="lg">
                {profile.firstName} {profile.lastName}
              </Heading>
              <Text color="gray.600" fontSize="lg">
                {profile.headline}
              </Text>
            </Box>
            
            <Button
              leftIcon={<FiEdit2 />}
              colorScheme="blue"
              variant="outline"
            >
              Edit Profile
            </Button>
          </Flex>

          <Text>{profile.bio}</Text>

          <HStack spacing={4}>
            <Text color="gray.600">
              <strong>Location:</strong> {profile.location}
            </Text>
            <Text color="gray.600">
              <strong>Email:</strong> {profile.email}
            </Text>
            {profile.phone && (
              <Text color="gray.600">
                <strong>Phone:</strong> {profile.phone}
              </Text>
            )}
          </HStack>

          <HStack spacing={2}>
            {profile.github && (
              <IconButton
                aria-label="GitHub"
                icon={<FiGithub />}
                as="a"
                href={profile.github}
                target="_blank"
                variant="ghost"
              />
            )}
            {profile.linkedin && (
              <IconButton
                aria-label="LinkedIn"
                icon={<FiLinkedin />}
                as="a"
                href={profile.linkedin}
                target="_blank"
                variant="ghost"
              />
            )}
            {profile.website && (
              <IconButton
                aria-label="Website"
                icon={<FiGlobe />}
                as="a"
                href={profile.website}
                target="_blank"
                variant="ghost"
              />
            )}
          </HStack>
        </Stack>
      </Flex>
    </Box>
  )
} 