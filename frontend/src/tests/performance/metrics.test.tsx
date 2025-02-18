import React from 'react'
import { performance } from 'perf_hooks'
import { render } from '@testing-library/react'
import { measurePerformance } from '../../utils/performance'
import { searchFunction } from '@/utils/searchUtils'
import MyComponent from '@/components/MyComponent'
import * as Sentry from '@sentry/react'

jest.mock('@sentry/react')

describe('Performance Tests', () => {
  test('component render times', async () => {
    const startTime = performance.now()
    
    render(<MyComponent />) // Ensure MyComponent is correctly imported and used
    
    const endTime = performance.now()
    const renderTime = endTime - startTime

    expect(renderTime).toBeLessThan(100) // 100ms threshold
  })

  test('data fetching performance', async () => {
    const { duration } = await measurePerformance(async () => {
      await fetch('/api/data')
    })

    expect(duration).toBeLessThan(300) // 300ms threshold
  })

  test('search performance', async () => {
    const results = await measurePerformance(async () => {
      return await searchFunction('test query')
    })

    expect(results.duration).toBeLessThan(200) // 200ms threshold
  })

  it('measures function execution time', async () => {
    const metrics = await measurePerformance(async () => {
      // Simulate some work
      for (let i = 0; i < 1000000; i++) {
        Math.random();
      }
    });
    
    expect(metrics.duration).toBeDefined();
  });

  it('reports slow operations', async () => {
    jest.useFakeTimers();
    
    const slowOperation = async () => {
      await new Promise(resolve => setTimeout(resolve, 4000));
    };
    
    const promise = measurePerformance(slowOperation);
    jest.advanceTimersByTime(4000);
    const metrics = await promise;
    
    expect(metrics.duration).toBeGreaterThan(3000);
    expect(Sentry.captureException).toHaveBeenCalled();
    
    jest.useRealTimers();
  });

  it('measures async operation performance', async () => {
    const metrics = await measurePerformance(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });
    
    expect(metrics.duration).toBeDefined();
    expect(metrics.duration).toBeLessThan(200);
  });
}) 