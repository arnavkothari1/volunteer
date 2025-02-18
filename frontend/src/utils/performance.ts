import React, { useEffect, useCallback, useState } from 'react'
import { debounce, throttle } from 'lodash'
import { captureError } from './errorTracking'

// Performance monitoring and optimization utilities
interface CachedData {
  // Define the structure of the cached data
  // Replace 'any' with specific types as needed
  [key: string]: string | number | boolean | object; // Adjust this to be more specific if possible
}

export const performanceUtils = {
  // Measure component render time
  measureRenderTime: <P extends object>(Component: React.ComponentType<P>) => {
    return function PerformanceWrapper(props: P) {
      useEffect(() => {
        const start = performance.now()
        return () => {
          const end = performance.now()
          console.log(`Render time: ${end - start}ms`)
        }
      }, [])
      return React.createElement(Component, props);
    }
  },

  // Optimize image loading
  optimizeImage: (url: string, width: number, quality = 75) => {
    return `${url}?w=${width}&q=${quality}&auto=format`
  },

  // Cache management
  cacheManager: {
    set: (key: string, data: CachedData, ttl = 3600) => {
      const item = {
        data,
        timestamp: Date.now(),
        ttl: ttl * 1000,
      }
      localStorage.setItem(key, JSON.stringify(item))
    },

    get: (key: string) => {
      const item = localStorage.getItem(key)
      if (!item) return null

      const { data, timestamp, ttl } = JSON.parse(item)
      if (Date.now() - timestamp > ttl) {
        localStorage.removeItem(key)
        return null
      }
      return data
    },

    clear: () => {
      localStorage.clear()
    },
  },

  // Debounced search
  useDebounceSearch: <T>(searchFn: (...args: T[]) => Promise<unknown>, delay = 300) => {
    return useCallback(
      (...args: T[]) => debounce(searchFn, delay)(...args),
      [searchFn, delay]
    )
  },

  // Throttled scroll handler
  useThrottleScroll: <T>(handler: (...args: T[]) => Promise<unknown>, delay = 100) => {
    return useCallback(
      (...args: T[]) => throttle(handler, delay)(...args),
      [handler, delay]
    )
  },

  // Lazy loading hook
  useLazyLoad: (elementRef: React.RefObject<HTMLElement>) => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting)
        },
        { threshold: 0.1 }
      )

      const currentElement = elementRef.current; // Store the current ref value

      if (currentElement) {
        observer.observe(currentElement)
      }

      return () => {
        if (currentElement) { // Use the stored value in cleanup
          observer.unobserve(currentElement)
        }
      }
    }, [elementRef])

    return isVisible
  },
}

interface PerformanceMetrics {
  duration: number;
}

export const measurePerformance = async <T>(operation: () => Promise<T>): Promise<PerformanceMetrics> => {
  const start = performance.now();
  
  await operation();
  
  const duration = performance.now() - start;
  
  if (duration > 3000) {
    captureError(new Error(`Slow operation`), {
      duration,
      operation: operation.name
    });
  }

  return { duration };
};