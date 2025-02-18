import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'

interface ErrorAlertProps {
  error: Error | string
  onRetry?: () => void
}

export function ErrorAlert({ error, onRetry }: ErrorAlertProps) {
  return (
    <Alert
      status="error"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      borderRadius="lg"
      p={6}
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        Something went wrong
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        {error instanceof Error ? error.message : error}
      </AlertDescription>
      {onRetry && (
        <Button onClick={onRetry} colorScheme="red" size="sm" mt={4}>
          Try Again
        </Button>
      )}
    </Alert>
  )
}

export function useErrorHandler() {
  const [error, setError] = useState<Error | null>(null)
  const toast = useToast()

  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      setError(error)
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } else if (typeof error === 'string') {
      setError(new Error(error))
      toast({
        title: 'Error',
        description: error,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return {
    error,
    setError,
    handleError,
  }
} 