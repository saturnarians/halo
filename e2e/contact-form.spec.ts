import { test, expect } from "@playwright/test"

test.describe("Contact Form", () => {
  test("should submit contact form with valid data", async ({ page }) => {
    await page.goto("/")

    // Navigate to contact
    await page.getByRole("button", { name: /contact/i }).click()

    // Fill form
    await page.getByPlaceholder("John").fill("John")
    await page.getByPlaceholder("Doe").fill("Doe")
    await page.getByPlaceholder("john@example.com").fill("john@test.com")
    await page.getByPlaceholder("Your message here...").fill("This is a test message")

    // Submit
    await page.getByRole("button", { name: /send message/i }).click()

    // Verify success message
    await expect(page.getByText(/message sent successfully/i)).toBeVisible()
  })
})
