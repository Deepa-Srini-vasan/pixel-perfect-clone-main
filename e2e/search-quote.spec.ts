import { test, expect } from "@playwright/test";

test.describe("Product Search and Quote Flow", () => {
  test("should search for product and open quote dialog", async ({ page }) => {
    // Navigate to home page
    await page.goto("/");

    // Wait for page to load
    await page.waitForLoadState("networkidle");

    // Find and click the search input
    const searchInput = page.getByTestId("header-search");
    await expect(searchInput).toBeVisible();
    await searchInput.fill("tap");

    // Press Enter to search
    await searchInput.press("Enter");

    // Wait for search results to load
    await page.waitForURL(/\/shop\?search=tap/);
    await page.waitForLoadState("networkidle");

    // Find the first product card
    const firstProductCard = page.getByTestId(/^product-card-/).first();
    await expect(firstProductCard).toBeVisible();

    // Click on the product card (view product button)
    const viewProductBtn = firstProductCard
      .locator('[data-testid="view-product-btn"]')
      .first();
    await viewProductBtn.click();

    // Wait for product details page to load
    await page.waitForURL(/\/product\//);
    await page.waitForLoadState("networkidle");

    // Check if product name is visible
    const productName = page.locator('h1').first();
    await expect(productName).toBeVisible();

    // Find and click the "Request Quote" button
    const requestQuoteBtn = page.getByTestId("request-quote-btn");
    await expect(requestQuoteBtn).toBeVisible();
    await requestQuoteBtn.click();

    // Verify quote dialog is open
    const dialogTitle = page.locator("text=Request a Quote");
    await expect(dialogTitle).toBeVisible();

    // Verify form fields are present
    const nameInput = page.locator('input[name="name"]');
    const emailInput = page.locator('input[name="email"]');
    const phoneInput = page.locator('input[name="phone"]');

    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(phoneInput).toBeVisible();
  });

  test("should submit quote form with valid data", async ({ page }) => {
    // Navigate to a product page directly
    await page.goto("/product/premium-tap");
    await page.waitForLoadState("networkidle");

    // Click the "Request Quote" button
    const requestQuoteBtn = page.getByTestId("request-quote-btn");
    await requestQuoteBtn.click();

    // Fill in the form
    await page.locator('input[name="name"]').fill("John Doe");
    await page.locator('input[name="email"]').fill("john@example.com");
    await page.locator('input[name="phone"]').fill("9876543210");
    await page.locator('input[name="subject"]').fill("Product Inquiry");
    await page.locator('textarea[name="message"]').fill(
      "I am interested in bulk orders of this product"
    );

    // Submit the form
    const submitBtn = page.locator('button[type="submit"]:has-text("Send Request")');
    await submitBtn.click();

    // Wait for success response
    await page.waitForTimeout(1000);

    // Check for success message or dialog closure
    const dialog = page.locator('[role="dialog"]');
    const isDialogClosed = await dialog.isVisible().then((v) => !v);

    // Either dialog should be closed or success message should be visible
    if (!isDialogClosed) {
      const successMessage = page.locator("text=Thank you");
      await expect(successMessage).toBeVisible({ timeout: 5000 });
    }
  });

  test("should validate required fields in quote form", async ({ page }) => {
    // Navigate to a product page
    await page.goto("/product/premium-tap");
    await page.waitForLoadState("networkidle");

    // Click the "Request Quote" button
    const requestQuoteBtn = page.getByTestId("request-quote-btn");
    await requestQuoteBtn.click();

    // Try to submit empty form
    const submitBtn = page.locator('button[type="submit"]:has-text("Send Request")');
    await submitBtn.click();

    // Check for validation errors
    const nameError = page.locator("text=Name is required");
    const emailError = page.locator("text=Valid email is required");

    await expect(nameError).toBeVisible({ timeout: 5000 });
    await expect(emailError).toBeVisible({ timeout: 5000 });
  });
});
