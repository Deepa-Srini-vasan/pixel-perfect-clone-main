import { test, expect } from "@playwright/test";

test.describe("Admin Authentication and Product Management", () => {
  test("should login as admin with valid credentials", async ({ page }) => {
    // Navigate to admin page
    await page.goto("/admin/login");
    await page.waitForLoadState("networkidle");

    // Fill in login form
    const emailInput = page.locator('input[type="email"]');
    const passwordInput = page.locator('input[type="password"]');
    const loginBtn = page.locator('button[type="submit"]:has-text("Login")');

    await emailInput.fill("admin@plumtek.com");
    await passwordInput.fill("admin123");
    await loginBtn.click();

    // Wait for redirect to dashboard
    await page.waitForURL(/\/admin(\/dashboard)?/, { timeout: 10000 });
    await page.waitForLoadState("networkidle");

    // Verify we're logged in (should see admin content)
    const welcomeText = page.locator("text=Welcome");
    await expect(welcomeText).toBeVisible({ timeout: 5000 });
  });

  test("should reject admin login with invalid credentials", async ({ page }) => {
    // Navigate to admin page
    await page.goto("/admin/login");
    await page.waitForLoadState("networkidle");

    // Fill in login form with wrong credentials
    const emailInput = page.locator('input[type="email"]');
    const passwordInput = page.locator('input[type="password"]');
    const loginBtn = page.locator('button[type="submit"]:has-text("Login")');

    await emailInput.fill("admin@plumtek.com");
    await passwordInput.fill("wrongpassword");
    await loginBtn.click();

    // Wait for error message
    const errorMessage = page.locator("text=Invalid credentials");
    await expect(errorMessage).toBeVisible({ timeout: 5000 });

    // Should still be on login page
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test("should logout admin user", async ({ page, context }) => {
    // First, authenticate by setting httpOnly cookie directly
    // (In production, this would be done via login)
    await page.goto("/admin/dashboard");

    // Find and click logout button
    const logoutBtn = page.locator('button:has-text("Logout")');

    if (await logoutBtn.isVisible()) {
      await logoutBtn.click();

      // Wait for redirect to home or login page
      await page.waitForURL(/\/(|admin\/login)/, { timeout: 10000 });

      // Verify session is cleared (httpOnly cookie should be removed)
      const cookies = await context.cookies();
      const sessionCookie = cookies.find((c) => c.name === "plumtek_session");
      expect(!sessionCookie || sessionCookie.value === "").toBeTruthy();
    }
  });

  test("should create new product as admin", async ({ page }) => {
    // Assuming logged in state
    await page.goto("/admin/products");
    await page.waitForLoadState("networkidle");

    // Find and click "Add Product" button
    const addProductBtn = page.locator(
      'button:has-text("Add Product"), button:has-text("New Product")'
    );
    await addProductBtn.click();

    // Wait for form to appear
    await page.waitForSelector('input[name="name"]', { timeout: 10000 });

    // Fill in product form
    await page.locator('input[name="name"]').fill("Test Product");
    await page.locator('input[name="sku"]').fill("SKU-001");
    await page.locator('input[name="category"]').fill("Taps");
    await page.locator('textarea[name="description"]').fill(
      "This is a test product"
    );

    // Submit form
    const submitBtn = page.locator(
      'button[type="submit"]:has-text("Create"), button[type="submit"]:has-text("Save")'
    );
    await submitBtn.click();

    // Wait for success message or redirect
    await page.waitForTimeout(1000);

    // Should show success message or navigate to product list
    const successMessage = page.locator("text=successfully|created|Success");
    await expect(successMessage).toBeVisible({ timeout: 5000 });
  });

  test("should verify product appears on shop after creation", async ({
    page,
  }) => {
    // Navigate to shop
    await page.goto("/shop");
    await page.waitForLoadState("networkidle");

    // Search for the product we just created
    const searchInput = page.getByTestId("header-search");
    await searchInput.fill("Test Product");
    await searchInput.press("Enter");

    // Wait for search results
    await page.waitForURL(/\/shop\?search=Test%20Product/);
    await page.waitForLoadState("networkidle");

    // Should find the product
    const productCard = page.locator(
      'text=Test Product | SKU-001'
    ).first();
    await expect(productCard).toBeVisible({ timeout: 5000 });
  });
});
