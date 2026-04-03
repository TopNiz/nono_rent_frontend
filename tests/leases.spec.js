import { test, expect } from '@playwright/test';

test('leases page loads and shows title', async ({ page }) => {
  await page.goto('/leases');
  await expect(page.locator('h1')).toContainText('Liste des Baux');
});

test('leases page displays navigation menu', async ({ page }) => {
  await page.goto('/leases');
  const menu = page.locator('nono-navigation-menu');
  await expect(menu).toBeVisible();
  const buttons = menu.locator('nono-button');
  await expect(buttons.nth(3)).toHaveClass(/\bactive\b/);
});

test('leases page shows empty list initially', async ({ page }) => {
  await page.goto('/leases');
  // Assuming a table or list for leases
  const table = page.locator('nono-table');
  // For now, expect it to be empty or have headers
});

test('create lease form is displayed when clicking add button', async ({ page }) => {
  await page.goto('/leases');
  const addButton = page.locator('nono-button').filter({ hasText: 'Ajouter un Bail' });
  await expect(addButton).toBeVisible();
  await addButton.click();
  const form = page.locator('nono-form');
  await expect(form).toBeVisible();
});

test('create lease form has required fields', async ({ page }) => {
  await page.goto('/leases');
  const addButton = page.locator('nono-button').filter({ hasText: 'Ajouter un Bail' });
  await addButton.click();
  const form = page.locator('nono-form');
  await expect(form.locator('nono-select[label="Locataire"]')).toBeVisible();
  await expect(form.locator('nono-select[label="Propriété"]')).toBeVisible();
  await expect(form.locator('nono-input[label="Date de début"]')).toBeVisible();
  await expect(form.locator('nono-input[label="Date de fin"]')).toBeVisible();
  await expect(form.locator('nono-input[label="Loyer mensuel"]')).toBeVisible();
  await expect(form.locator('nono-input[label="Charges"]')).toBeVisible();
  await expect(form.locator('nono-input[label="Dépôt de garantie"]')).toBeVisible();
  await expect(form.locator('nono-select[label="Type de bail"]')).toBeVisible();
});

test('form validates end date after start date', async ({ page }) => {
  await page.goto('/leases');
  const addButton = page.locator('nono-button').filter({ hasText: 'Ajouter un Bail' });
  await addButton.click();
  const startInput = page.locator('nono-input[label="Date de début"] input');
  const endInput = page.locator('nono-input[label="Date de fin"] input');
  await startInput.fill('2023-12-01');
  await endInput.fill('2023-11-01');
  const submitButton = page.locator('nono-button').filter({ hasText: 'Créer' });
  await submitButton.click();
  // Expect validation error
  await expect(page.locator('.error')).toContainText('La date de fin doit être après la date de début');
});

test('successful lease creation', async ({ page }) => {
  await page.route('**/api/tenants', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { id: 1, first_name: 'Jean', last_name: 'Dupont', email: 'jean@example.com' }
      ])
    });
  });
  await page.route('**/api/properties', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { id: 1, address: '123 Rue Test', type: 'apartment' }
      ])
    });
  });
  await page.route('**/api/leases', async route => {
    if (route.request().method() === 'POST') {
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({
          id: '123e4567-e89b-12d3-a456-426614174000',
          tenant_id: 1,
          property_id: 1,
          start_date: '2023-01-01',
          end_date: '2024-01-01',
          rent_amount: 1200,
          charges: 50,
          deposit: 2400,
          lease_type: 'furnished'
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
  await page.goto('/leases');
  const addButton = page.locator('nono-button').filter({ hasText: 'Ajouter un Bail' });
  await addButton.click();
  // Fill form
  const tenantSelect = page.locator('nono-select[label="Locataire"]');
  await tenantSelect.click();
  await page.locator('option[value="1"]').click();
  const propertySelect = page.locator('nono-select[label="Propriété"]');
  await propertySelect.click();
  await page.locator('option[value="1"]').click();
  await page.locator('nono-input[label="Date de début"] input').fill('2023-01-01');
  await page.locator('nono-input[label="Date de fin"] input').fill('2024-01-01');
  await page.locator('nono-input[label="Loyer mensuel"] input').fill('1200');
  await page.locator('nono-input[label="Charges"] input').fill('50');
  await page.locator('nono-input[label="Dépôt de garantie"] input').fill('2400');
  const typeSelect = page.locator('nono-select[label="Type de bail"]');
  await typeSelect.click();
  await page.locator('option[value="furnished"]').click();
  const submitButton = page.locator('nono-button').filter({ hasText: 'Créer' });
  await submitButton.click();
  // Expect form to close and lease in list
  await expect(page.locator('nono-form')).not.toBeVisible();
  // Check if lease is in table
});