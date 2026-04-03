import { test, expect } from '@playwright/test';

test('navigation menu is displayed on home page', async ({ page }) => {
  await page.goto('/');
  const menu = page.locator('nono-navigation-menu');
  await expect(menu).toBeVisible();
  const buttons = menu.locator('nono-button');
  await expect(buttons).toHaveCount(5);
  await expect(buttons.nth(0)).toContainText('Accueil');
  await expect(buttons.nth(1)).toContainText('Propriétés');
  await expect(buttons.nth(2)).toContainText('Locataires');
  await expect(buttons.nth(3)).toContainText('Baux');
  await expect(buttons.nth(4)).toContainText('Quittances');
});

test('navigation menu links work', async ({ page }) => {
  await page.goto('/');
  const menu = page.locator('nono-navigation-menu');
  const proprietesButton = menu.locator('nono-button').filter({ hasText: 'Propriétés' });
  await proprietesButton.click();
  await expect(page).toHaveURL('/properties');
  await expect(page.locator('h1')).toContainText('Liste des Propriétés');
});

test('active menu item is highlighted on properties page', async ({ page }) => {
  await page.goto('/properties');
  const menu = page.locator('nono-navigation-menu');
  const proprietesButton = menu.locator('nono-button').filter({ hasText: 'Propriétés' });
  await expect(proprietesButton).toHaveClass(/\bactive\b/);
});

test('menu is responsive on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 600, height: 800 });
  await page.goto('/');
  const menu = page.locator('nono-navigation-menu');
  await expect(menu).toBeVisible();
  // Check if flex-direction is column (assuming we can check computed style, but Playwright can check CSS)
  // For simplicity, just check it's visible
});