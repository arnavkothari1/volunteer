import {
  Box,
  VStack,
  Heading,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

interface FormWrapperProps {
  title: string
  description?: string
  children: ReactNode
  error?: string
  success?: string
}

export default function FormWrapper({
  title,
  description,
  children,
  error,
  success,
}: FormWrapperProps) {
  // Call the hook unconditionally
  const descriptionColor = useColorModeValue('gray.600', 'gray.300');
  const boxBg = useColorModeValue('white', 'gray.700');

  return (
    <Box
      bg={boxBg}
      p={8}
      borderRadius="lg"
      boxShadow="lg"
      w="100%"
      maxW="container.md"
      mx="auto"
    >
      <VStack spacing={6} align="stretch">
        <Box>
          <Heading size="lg" mb={2}>
            {title}
          </Heading>
          {description && (
            <Text color={descriptionColor}>
              {description}
            </Text>
          )}
        </Box>

        {error && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            {error}
          </Alert>
        )}

        {success && (
          <Alert status="success" borderRadius="md">
            <AlertIcon />
            {success}
          </Alert>
        )}

        {children}
      </VStack>
    </Box>
  )
} 