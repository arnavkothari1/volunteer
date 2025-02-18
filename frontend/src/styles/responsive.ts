import { createBreakpoints } from '@chakra-ui/theme-tools'

// Breakpoint configuration
export const breakpoints = createBreakpoints({
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
})

// Responsive styles utility
export const responsive = {
  // Container widths
  container: {
    sm: '100%',
    md: '720px',
    lg: '960px',
    xl: '1140px',
    '2xl': '1320px',
  },

  // Grid columns
  gridColumns: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 12,
    '2xl': 12,
  },

  // Font sizes
  fontSize: {
    sm: {
      h1: '24px',
      h2: '20px',
      h3: '18px',
      body: '14px',
    },
    md: {
      h1: '32px',
      h2: '24px',
      h3: '20px',
      body: '16px',
    },
    lg: {
      h1: '40px',
      h2: '32px',
      h3: '24px',
      body: '16px',
    },
  },

  // Spacing
  spacing: {
    sm: {
      container: '16px',
      section: '32px',
      element: '8px',
    },
    md: {
      container: '24px',
      section: '48px',
      element: '16px',
    },
    lg: {
      container: '32px',
      section: '64px',
      element: '24px',
    },
  },

  // Layout helpers
  layout: {
    hideOnMobile: {
      display: { base: 'none', md: 'block' },
    },
    showOnMobile: {
      display: { base: 'block', md: 'none' },
    },
    stackOnMobile: {
      flexDirection: { base: 'column', md: 'row' },
    },
    gridOnMobile: {
      display: 'grid',
      gridTemplateColumns: {
        base: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
        lg: 'repeat(4, 1fr)',
      },
    },
  },

  // Media queries for custom use
  mediaQueries: {
    mobile: '@media (max-width: 767px)',
    tablet: '@media (min-width: 768px) and (max-width: 959px)',
    desktop: '@media (min-width: 960px)',
  },
}

// Viewport hooks and utilities
export const viewport = {
  isInViewport: (element: HTMLElement) => {
    const rect = element.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  },

  getViewportSize: () => {
    return {
      width: window.innerWidth || document.documentElement.clientWidth,
      height: window.innerHeight || document.documentElement.clientHeight,
    }
  },
} 