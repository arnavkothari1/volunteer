import React from 'react'
import { render as rtlRender, RenderResult } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { ProfileProvider } from '@/context/ProfileContext'
import { ReactElement } from 'react'

// Custom render function that includes common providers
export function render(ui: ReactElement): RenderResult {
  return rtlRender(
    React.createElement(ChakraProvider, null,
      React.createElement(ProfileProvider, null, ui)
    )
  )
}

// Mock WebSocket utility
export const createMockWebSocket = () => ({
  emit: jest.fn(),
  on: jest.fn(),
  off: jest.fn(),
})

// Test data generators
export const generateTestFile = (name: string, type: string) => {
  return new File(['test content'], name, { type })
}

// Common test wait functions
export const waitForLoadingToFinish = async () => {
  // Add any common loading checks here
}

// Database test utilities
export const setupTestDatabase = async () => {
  // Add database setup logic here
  return Promise.resolve()
}

export const cleanupTestDatabase = async () => {
  // Add database cleanup logic here
  return Promise.resolve()
}

export * from '@testing-library/react' 