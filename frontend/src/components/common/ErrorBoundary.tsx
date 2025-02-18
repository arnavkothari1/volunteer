import React from 'react'
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  Container,
} from '@chakra-ui/react'
import { FiAlertTriangle } from 'react-icons/fi'

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Container maxW="container.md" py={20}>
          <VStack spacing={6} align="center">
            <Box fontSize="6xl" color="red.500">
              <FiAlertTriangle />
            </Box>
            <Heading size="xl">Something went wrong</Heading>
            <Text color="gray.600" textAlign="center">
              We apologize for the inconvenience. Please try refreshing the page or contact support if the problem persists.
            </Text>
            <Button colorScheme="blue" onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
          </VStack>
        </Container>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary 