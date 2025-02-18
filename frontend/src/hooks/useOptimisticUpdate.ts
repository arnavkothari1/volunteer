import { useState, useCallback } from 'react'
import { useToast } from '@chakra-ui/react'

interface OptimisticUpdateOptions<T> {
  onUpdate: (data: T) => Promise<void>
  onError?: (error: unknown) => void
  successMessage?: string
  errorMessage?: string
}

export function useOptimisticUpdate<T>({
  onUpdate,
  onError,
  successMessage = 'Changes saved successfully',
  errorMessage = 'Failed to save changes',
}: OptimisticUpdateOptions<T>) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [previousData, setPreviousData] = useState<T | null>(null)
  const toast = useToast()

  const optimisticUpdate = useCallback(
    async (newData: T, currentData: T) => {
      setIsUpdating(true)
      setPreviousData(currentData)

      try {
        // Immediately update UI
        await onUpdate(newData)
        
        toast({
          title: 'Success',
          description: successMessage,
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      } catch (error) {
        // Revert to previous state
        if (previousData) {
          await onUpdate(previousData)
        }
        
        toast({
          title: 'Error',
          description: errorMessage,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })

        if (onError) {
          onError(error)
        }
      } finally {
        setIsUpdating(false)
        setPreviousData(null)
      }
    },
    [onUpdate, onError, successMessage, errorMessage, previousData, toast]
  )

  return {
    isUpdating,
    optimisticUpdate,
  }
} 