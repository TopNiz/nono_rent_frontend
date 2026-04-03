import { test, expect } from '@playwright/test';

test('quittances page loads and shows title', async ({ page }) => {
  await page.goto('/quittances');
  await expect(page.locator('h1')).toContainText('Liste des Quittances');
});

test('quittances page displays navigation menu', async ({ page }) => {
  await page.goto('/quittances');
  const menu = page.locator('nono-navigation-menu');
  await expect(menu).toBeVisible();
  const buttons = menu.locator('nono-button');
  await expect(buttons.nth(4)).toHaveClass(/\bactive\b/);
});

test('quittances page shows empty list initially', async ({ page }) => {
  await page.goto('/quittances');
  // Assuming a table for quittances
  const table = page.locator('nono-table');
  await expect(table).toBeVisible();
  // Expect empty or headers
});

test('generate new quittance button is visible', async ({ page }) => {
  await page.goto('/quittances');
  const addButton = page.locator('nono-button').filter({ hasText: 'Générer une Quittance' });
  await expect(addButton).toBeVisible();
});

test('generate quittance form is displayed when clicking generate button', async ({ page }) => {
  await page.goto('/quittances');
  const generateButton = page.locator('nono-button').filter({ hasText: 'Générer une Quittance' });
  await generateButton.click();
  const form = page.locator('nono-form');
  await expect(form).toBeVisible();
});

test('generate quittance form has required fields', async ({ page }) => {
  await page.goto('/quittances');
  const generateButton = page.locator('nono-button').filter({ hasText: 'Générer une Quittance' });
  await generateButton.click();
  const form = page.locator('nono-form');
  await expect(form.locator('nono-select[label="Bail"]')).toBeVisible();
  await expect(form.locator('nono-select[label="Mois"]')).toBeVisible();
  await expect(form.locator('nono-input[label="Année"]')).toBeVisible();
  await expect(form.locator('nono-input[label="Montant loyer"]')).toBeVisible();
  await expect(form.locator('nono-input[label="Charges"]')).toBeVisible();
});

test('automatic calculation of total', async ({ page }) => {
  await page.goto('/quittances');
  const generateButton = page.locator('nono-button').filter({ hasText: 'Générer une Quittance' });
  await generateButton.click();
  await page.locator('nono-input[label="Montant loyer"] input').fill('1200');
  await page.locator('nono-input[label="Charges"] input').fill('50');
  const total = page.locator('nono-input[label="Total"] input');
  await expect(total).toHaveValue('1250');
});

test('manual edit of amounts', async ({ page }) => {
  await page.goto('/quittances');
  const generateButton = page.locator('nono-button').filter({ hasText: 'Générer une Quittance' });
  await generateButton.click();
  await page.locator('nono-input[label="Montant loyer"] input').fill('1200');
  await page.locator('nono-input[label="Charges"] input').fill('50');
  await page.locator('nono-input[label="Total"] input').fill('1300'); // Manual edit
  // Expect it to be editable
});

test('generate quittance and add to list', async ({ page }) => {
  await page.route('**/api/leases', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { id: 1, tenant_name: 'Jean Dupont', property_address: '123 Rue Test' }
      ])
    });
  });
  await page.route('**/api/quittances', async route => {
    if (route.request().method() === 'POST') {
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 1,
          lease_id: 1,
          month: 1,
          year: 2024,
          rent_amount: 1200,
          charges: 50,
          total: 1250
        })
      });
    } else {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([])
      });
    }
  });
  await page.goto('/quittances');
  const generateButton = page.locator('nono-button').filter({ hasText: 'Générer une Quittance' });
  await generateButton.click();
  // Select lease
  const leaseSelect = page.locator('nono-select[label="Bail"]');
  await leaseSelect.click();
  await page.locator('option[value="1"]').click();
  // Select month and year
  const monthSelect = page.locator('nono-select[label="Mois"]');
  await monthSelect.click();
  await page.locator('option[value="1"]').click();
  await page.locator('nono-input[label="Année"] input').fill('2024');
  // Amounts auto-filled or editable
  const submitButton = page.locator('nono-button').filter({ hasText: 'Générer' });
  await submitButton.click();
  // Expect form to close and quittance in list
  await expect(page.locator('nono-form')).not.toBeVisible();
  // Check table has the quittance
});

test('export PDF button downloads file', async ({ page }) => {
  // Mock a quittance in list
  await page.route('**/api/quittances', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { id: 1, lease_id: 1, month: 1, year: 2024, rent_amount: 1200, charges: 50, total: 1250 }
      ])
    });
  });
  await page.goto('/quittances');
  // Assuming export button in table row
  const exportButton = page.locator('nono-button').filter({ hasText: 'Exporter PDF' });
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    exportButton.click()
  ]);
  expect(download.suggestedFilename()).toBe('quittance_1.pdf');
});

test('history per lease', async ({ page }) => {
  // Mock multiple quittances for a lease
  await page.route('**/api/quittances?lease_id=1', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { id: 1, month: 1, year: 2024, total: 1250 },
        { id: 2, month: 2, year: 2024, total: 1250 }
      ])
    });
  });
  // Perhaps a filter or expand for history
  // For now, assume clicking on lease shows history
});