import { test, expect } from "@playwright/test"

test.describe("Portfolio Filtering", () => {
  test("should filter portfolio items by category", async ({ page }) => {
    await page.goto("/")

    // Navigate to portfolio
    await page.getByRole("button", { name: /portfolio/i }).click()

    // Check all items are visible
    const allItems = await page.locator('[class*="md:grid-cols-2"]').count()
    expect(allItems).toBeGreaterThan(0)

    // Click web design filter
    await page.getByRole("button", { name: /web design/i }).click()

    // Verify filtered results
    await expect(page.locator("text=Web design")).toBeVisible()
  })
})
