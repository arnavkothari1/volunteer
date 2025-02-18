import React, { createContext, useContext, useState } from 'react'
import { useColorMode } from '@chakra-ui/react'

interface AccessibilityContextType {
  fontSize: number
  increaseFontSize: () => void
  decreaseFontSize: () => void
  highContrast: boolean
  toggleHighContrast: () => void
  reduceMotion: boolean
  toggleReduceMotion: () => void
  screenReaderAnnounce: (message: string) => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(
  undefined
)

export function AccessibilityProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [fontSize, setFontSize] = useState(16)
  const [highContrast, setHighContrast] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const { colorMode, toggleColorMode } = useColorMode()

  const increaseFontSize = () => {
    setFontSize((prev) => Math.min(prev + 2, 24))
  }

  const decreaseFontSize = () => {
    setFontSize((prev) => Math.max(prev - 2, 12))
  }

  const toggleHighContrast = () => {
    setHighContrast((prev) => !prev)
    if (colorMode === 'light') {
      toggleColorMode()
    }
  }

  const toggleReduceMotion = () => {
    setReduceMotion((prev) => !prev)
    document.documentElement.style.setProperty(
      '--reduce-motion',
      reduceMotion ? 'no-preference' : 'reduce'
    )
  }

  const screenReaderAnnounce = (message: string) => {
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', 'polite')
    announcement.setAttribute('aria-atomic', 'true')
    announcement.setAttribute('class', 'sr-only')
    announcement.textContent = message
    document.body.appendChild(announcement)
    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  }

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        increaseFontSize,
        decreaseFontSize,
        highContrast,
        toggleHighContrast,
        reduceMotion,
        toggleReduceMotion,
        screenReaderAnnounce,
      }}
    >
      <div
        style={{
          fontSize: `${fontSize}px`,
          filter: highContrast ? 'contrast(1.5)' : 'none',
        }}
      >
        {children}
      </div>
    </AccessibilityContext.Provider>
  )
}

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext)
  if (context === undefined) {
    throw new Error(
      'useAccessibility must be used within an AccessibilityProvider'
    )
  }
  return context
} 