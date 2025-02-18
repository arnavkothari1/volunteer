import { keyframes } from '@emotion/react'

export const slideRight = keyframes`
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
`

export const slideLeft = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
`

export const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

export const authStyles = {
  container: {
    position: 'relative',
    overflow: 'hidden',
    minHeight: '600px',
  },
  panel: {
    position: 'absolute',
    transition: 'all 0.6s ease-in-out',
  },
  overlay: {
    position: 'absolute',
    transition: 'transform 0.6s ease-in-out',
  },
} 