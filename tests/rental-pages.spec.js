import { test, expect } from '@playwright/test';

test('tenants page displays tenant table data', async ({ page }) => {
  await page.goto('/tenants');

  await expect(page.locator('nono-navigation-menu')).toBeVisible();
  await expect(page.locator('h1')).toContainText('Liste des locataires');
  await expect(page.locator('nono-table')).toBeVisible();
  await expect(page.locator('nono-table th').first()).toContainText('Nom');
  await expect(page.locator('nono-table td').first()).toContainText('Jean Dupont');
  await expect(page.getByText('Page en cours de développement.')).toHaveCount(0);
});

test('leases page displays an empty state', async ({ page }) => {
  await page.goto('/leases');

  await expect(page.locator('nono-navigation-menu')).toBeVisible();
  await expect(page.locator('h1')).toContainText('Liste des baux');
  await expect(page.locator('nono-empty-state')).toBeVisible();
  await expect(page.locator('nono-empty-state')).toHaveAttribute('title', 'Aucun bail');
  await expect(page.getByText('Page en cours de développement.')).toHaveCount(0);
});

test('quittances page displays an empty state', async ({ page }) => {
  await page.goto('/quittances');

  await expect(page.locator('nono-navigation-menu')).toBeVisible();
  await expect(page.locator('h1')).toContainText('Liste des quittances');
  await expect(page.locator('nono-empty-state')).toBeVisible();
  await expect(page.locator('nono-empty-state')).toHaveAttribute('title', 'Aucune quittance');
  await expect(page.getByText('Page en cours de développement.')).toHaveCount(0);
});
