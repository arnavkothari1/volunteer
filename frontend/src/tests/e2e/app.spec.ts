import { test, expect } from '@playwright/test'

test.describe('End-to-End Tests', () => {
  test('complete user journey', async ({ page }) => {
    // Login
    await page.goto('/')
    await page.fill('[data-testid="email-input"]', 'test@example.com')
    await page.fill('[data-testid="password-input"]', 'password123')
    await page.click('[data-testid="login-button"]')

    // Create profile
    await page.click('[data-testid="edit-profile"]')
    await page.fill('[data-testid="first-name"]', 'John')
    await page.fill('[data-testid="last-name"]', 'Doe')
    await page.click('[data-testid="save-profile"]')

    // Apply for job
    await page.click('[data-testid="search-jobs"]')
    await page.fill('[data-testid="search-input"]', 'Software Engineer')
    await page.click('[data-testid="search-button"]')
    await page.click('[data-testid="apply-button"]')

    // Check application status
    await page.click('[data-testid="applications"]')
    await expect(page.locator('[data-testid="application-status"]')).toHaveText('Applied')
  })

  test('responsive design', async ({ page }) => {
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible()

    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 })
    await expect(page.locator('[data-testid="desktop-menu"]')).toBeVisible()
  })
}) 