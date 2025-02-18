import {
  Button,
  Stack,
  Text,
  Divider,
  HStack,
  Icon,
  useToast,
} from '@chakra-ui/react'
import { FaGoogle, FaGithub, FaLinkedin } from 'react-icons/fa'

export default function SocialLogin() {
  const toast = useToast()

  const handleSocialLogin = (provider: string) => {
    // TODO: Implement social login logic
    toast({
      title: `${provider} login coming soon`,
      status: 'info',
      duration: 2000,
    })
  }

  return (
    <Stack spacing={4} w="100%">
      <HStack spacing={2} alignItems="center">
        <Divider />
        <Text fontSize="sm" whiteSpace="nowrap" color="gray.500">
          or continue with
        </Text>
        <Divider />
      </HStack>

      <Stack spacing={2}>
        <Button
          variant="outline"
          leftIcon={<Icon as={FaGoogle} />}
          onClick={() => handleSocialLogin('Google')}
          w="100%"
        >
          Continue with Google
        </Button>

        <Button
          variant="outline"
          leftIcon={<Icon as={FaGithub} />}
          onClick={() => handleSocialLogin('GitHub')}
          w="100%"
        >
          Continue with GitHub
        </Button>

        <Button
          variant="outline"
          leftIcon={<Icon as={FaLinkedin} />}
          onClick={() => handleSocialLogin('LinkedIn')}
          w="100%"
        >
          Continue with LinkedIn
        </Button>
      </Stack>
    </Stack>
  )
}
