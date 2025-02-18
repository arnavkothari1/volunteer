import { Box, Container, Flex } from '@chakra-ui/react'

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <Flex as="main" minH="100vh" bg="gray.50">
      <Container maxW="md" py={12}>
        <Box bg="white" p={8} rounded="lg" shadow="base">
          {children}
        </Box>
      </Container>
    </Flex>
  )
}

export default AuthLayout
