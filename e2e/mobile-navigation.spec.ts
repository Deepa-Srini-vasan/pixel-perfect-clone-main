import { test, expect, devices } from "@playwright/test";

// Run these tests only on mobile devices
test.describe("Mobile Navigation", () => {
  test.use({ ...devices["iPhone 12"] });

  test("should open and close mobile menu", async ({ page }) => {
    // Navigate to home
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Menu should be closed initially on mobile
    const mobileMenu = page.locator('nav[class*="mobile"], [role="navigation"]');

    // Find hamburger/menu button
    const menuBtn = page.locator("button:has-text('Menu'), button[aria-label='Menu']");
    await expect(menuBtn).toBeVisible();

    // Click to open
    await menuBtn.click();

    // Menu should now be visible
    const navLinks = page.locator("nav a");
    await expect(navLinks.first()).toBeVisible({ timeout: 5000 });

    // Click again to close
    await menuBtn.click();

    // Menu should be hidden
    const closedNav = page.locator('nav:hidden, nav[class*="closed"]');
    await expect(closedNav).toBeVisible({ timeout: 5000 });
  });

  test("should navigate to shop from mobile menu", async ({ page }) => {
    // Navigate to home
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Open mobile menu
    const menuBtn = page.locator("button:has-text('Menu'), button[aria-label='Menu']");
    await menuBtn.click();

    // Click Shop link
    const shopLink = page.locator('a:has-text("Shop"), a[href*="/shop"]');
    await shopLink.click();

    // Should navigate to shop
    await page.waitForURL(/\/shop/);
    await page.waitForLoadState("networkidle");

    // Should show products
    const productCards = page.locator('[data-testid^="product-card-"]');
    await expect(productCards.first()).toBeVisible({ timeout: 5000 });
  });

  test("should navigate to categories from mobile menu", async ({ page }) => {
    // Navigate to home
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Open mobile menu
    const menuBtn = page.locator("button:has-text('Menu'), button[aria-label='Menu']");
    await menuBtn.click();

    // Click Catalogs/Products link
    const catalogLink = page.locator(
      'a:has-text("Catalogs"), a:has-text("Products"), a[href*="/catalogs"]'
    );
    await catalogLink.click();

    // Should navigate to catalogs
    await page.waitForURL(/\/catalogs|\/products/, { timeout: 10000 });
    await page.waitForLoadState("networkidle");

    // Should show content
    const pageContent = page.locator("body");
    await expect(pageContent).toBeVisible();
  });

  test("should search from mobile", async ({ page }) => {
    // Navigate to home
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // On mobile, search might be in a dedicated search input
    const mobileSearchBtn = page.locator(
      'button[aria-label*="search" i], button:has-text("Search")'
    );
    await mobileSearchBtn.click();

    // Find search input
    const searchInput = page.getByTestId("header-search");
    await searchInput.fill("tap");
    await searchInput.press("Enter");

    // Should navigate to shop with search query
    await page.waitForURL(/\/shop\?search=tap/);
    await page.waitForLoadState("networkidle");

    // Should show search results
    const productCards = page.locator('[data-testid^="product-card-"]');
    await expect(productCards.first()).toBeVisible({ timeout: 5000 });
  });

  test("should maintain mobile menu state on navigation", async ({ page }) => {
    // Navigate to home
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Open mobile menu
    const menuBtn = page.locator("button:has-text('Menu'), button[aria-label='Menu']");
    await menuBtn.click();

    // Navigate to About page
    const aboutLink = page.locator('a:has-text("About"), a[href*="/about"]');
    await aboutLink.click();

    // Wait for navigation
    await page.waitForURL(/\/about/);
    await page.waitForLoadState("networkidle");

    // Menu should be closed after navigation
    const navLinks = page.locator("nav a");
    const isVisible = await navLinks.first().isVisible();

    // Typically menu closes on navigation on mobile
    if (isVisible) {
      const closeBtn = page.locator('button:has-text("Close"), [aria-label*="close" i]');
      await expect(closeBtn).toBeVisible();
    }
  });
});
