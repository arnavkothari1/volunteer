import { UseToastOptions } from '@chakra-ui/react'

export interface ApiError {
  message: string
  code?: string
  field?: string
}

export const handleFormError = (error: unknown): UseToastOptions => {
  if (error instanceof Error) {
    // Handle standard errors
    return {
      title: 'Error',
      description: error.message,
      status: 'error',
      duration: 5000,
      isClosable: true,
    }
  }

  if (typeof error === 'string') {
    // Handle string errors
    return {
      title: 'Error',
      description: error,
      status: 'error',
      duration: 5000,
      isClosable: true,
    }
  }

  // Handle unknown errors
  return {
    title: 'Error',
    description: 'An unexpected error occurred. Please try again.',
    status: 'error',
    duration: 5000,
    isClosable: true,
  }
}

interface ValidationErrorResponse {
  response?: {
    data?: {
      errors?: ApiError[];
    };
  };
}

export const parseValidationErrors = (error: ValidationErrorResponse): Record<string, string> => {
  if (error.response?.data?.errors) {
    return error.response.data.errors.reduce(
      (acc: Record<string, string>, curr: ApiError) => {
        if (curr.field) {
          acc[curr.field] = curr.message
        }
        return acc
      },
      {}
    )
  }
  return {}
} 