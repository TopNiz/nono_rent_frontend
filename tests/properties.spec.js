import { test, expect } from '@playwright/test';

test('properties page displays table with data', async ({ page }) => {
  await page.goto('/properties');
  await expect(page.locator('h1')).toContainText('Liste des Propriétés');
  const table = page.locator('nono-table');
  await expect(table).toBeVisible();
  // Check if table has headers
  await expect(page.locator('th').first()).toContainText('Adresse');
});