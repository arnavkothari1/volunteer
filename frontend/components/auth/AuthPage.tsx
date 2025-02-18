'use client'

import {
  Box,
  Button,
  Input,
  Text,
  Flex,
  IconButton,
  Stack,
  Heading,
} from '@chakra-ui/react'
import { FaFacebook, FaGoogle, FaLinkedin } from 'react-icons/fa'
import { useState } from 'react'

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(true)
  const purpleColor = '#9333EA'
  const pinkColor = '#EC4899'

  return (
    <Flex 
      minH="100vh" 
      align="center" 
      justify="center" 
      bgGradient="linear(to-br, purple.500, pink.500)"
      p={4}
    >
      <Box
        maxW="900px"
        w="full"
        h="500px"
        position="relative"
        overflow="hidden"
        borderRadius="2xl"
        bg="white"
      >
        {/* Active Form Container */}
        <Box
          position="absolute"
          w="50%"
          h="full"
          left={isSignUp ? "0" : "50%"}
          transition="left 0.6s ease-in-out"
          bg="white"
          p={12}
          zIndex={2}
        >
          <Stack spacing={6}>
            <Heading fontSize="2xl" textAlign="left">
              {isSignUp ? 'Create Account' : 'Sign in'}
            </Heading>
            
            <Stack spacing={4}>
              <Input
                placeholder="Email"
                size="lg"
                bg="gray.50"
                border="none"
                _focus={{ bg: 'gray.100' }}
              />
              <Input
                placeholder="Password"
                type="password"
                size="lg"
                bg="gray.50"
                border="none"
                _focus={{ bg: 'gray.100' }}
              />
              {isSignUp && (
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  size="lg"
                  bg="gray.50"
                  border="none"
                  _focus={{ bg: 'gray.100' }}
                />
              )}
            </Stack>

            <Button
              bg={isSignUp ? pinkColor : purpleColor}
              color="white"
              size="lg"
              _hover={{ bg: isSignUp ? 'pink.600' : 'purple.600' }}
            >
              {isSignUp ? 'Sign up' : 'Sign in'}
            </Button>

            <Stack align="center" spacing={4}>
              <Text color="gray.500">
                or sign {isSignUp ? 'up' : 'in'} with
              </Text>
              <Stack direction="row" spacing={4}>
                <IconButton
                  aria-label="Facebook"
                  icon={<FaFacebook />}
                  rounded="full"
                  variant="ghost"
                />
                <IconButton
                  aria-label="Google"
                  icon={<FaGoogle />}
                  rounded="full"
                  variant="ghost"
                />
                <IconButton
                  aria-label="LinkedIn"
                  icon={<FaLinkedin />}
                  rounded="full"
                  variant="ghost"
                />
              </Stack>
            </Stack>
          </Stack>
        </Box>

        {/* Overlay Container */}
        <Box
          position="absolute"
          w="50%"
          h="full"
          left={isSignUp ? "50%" : "0"}
          transition="left 0.6s ease-in-out"
          bg="blackAlpha.400"
          backdropFilter="blur(8px)"
          zIndex={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Stack spacing={6} color="white" textAlign="center" p={8}>
            <Heading fontSize="3xl">
              {isSignUp ? 'Have an account?' : 'Need an account?'}
            </Heading>
            <Button
              variant="outline"
              borderColor="white"
              color="white"
              size="lg"
              _hover={{ bg: 'whiteAlpha.200' }}
              onClick={() => setIsSignUp(!isSignUp)}
              w="150px"
              mx="auto"
            >
              {isSignUp ? 'Log in' : 'Sign up'}
            </Button>
          </Stack>
        </Box>
      </Box>
    </Flex>
  )
} 