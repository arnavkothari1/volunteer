import { useEffect } from 'react'

export const useFormPersist = <T>(key: string, values: T, setValues: (values: T) => void) => {
  // Load form data from localStorage on mount
  useEffect(() => {
    const savedValues = localStorage.getItem(key)
    if (savedValues) {
      try {
        const parsedValues: T = JSON.parse(savedValues)
        setValues(parsedValues)
      } catch (error) {
        console.error('Error parsing saved form data:', error)
      }
    }
  }, [key, setValues])

  // Save form data to localStorage on change
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(values))
  }, [key, values])

  // Clear form data from localStorage
  const clearPersistedForm = () => {
    localStorage.removeItem(key)
  }

  return { clearPersistedForm }
}