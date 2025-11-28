import { test, expect } from "@playwright/test"

test.describe("Navigation", () => {
  test("should navigate between pages", async ({ page }) => {
    await page.goto("/")

    // Check initial page is about
    await expect(page).toHaveTitle(/Portfolio/)

    // Navigate to resume
    await page.getByRole("button", { name: /resume/i }).click()
    await expect(page.getByText(/resume/i)).toBeVisible()

    // Navigate to portfolio
    await page.getByRole("button", { name: /portfolio/i }).click()
    await expect(page.getByText(/portfolio/i)).toBeVisible()
  })
})
