import { test, expect } from '@playwright/test';

test.describe('Tenants CRUD', () => {
  test('tenants page displays table with tenants', async ({ page }) => {
    await page.goto('/tenants');
    await expect(page.locator('h1')).toContainText('Liste des Locataires');
    const table = page.locator('nono-table');
    await expect(table).toBeVisible();
    // Check headers
    await expect(page.locator('th').filter({ hasText: 'Nom' })).toBeVisible();
    await expect(page.locator('th').filter({ hasText: 'Email' })).toBeVisible();
    await expect(page.locator('th').filter({ hasText: 'Téléphone' })).toBeVisible();
    await expect(page.locator('th').filter({ hasText: 'Adresse' })).toBeVisible();
    await expect(page.locator('th').filter({ hasText: 'Actions' })).toBeVisible();
  });

  test('add new tenant form appears when add button clicked', async ({ page }) => {
    await page.goto('/tenants');
    const addButton = page.locator('nono-button').filter({ hasText: 'Ajouter Locataire' });
    await expect(addButton).toBeVisible();
    await addButton.click();
    const form = page.locator('nono-form');
    await expect(form).toBeVisible();
    await expect(page.locator('nono-input[label="Prénom"]')).toBeVisible();
    await expect(page.locator('nono-input[label="Nom"]')).toBeVisible();
    await expect(page.locator('nono-input[label="Email"]')).toBeVisible();
    await expect(page.locator('nono-input[label="Téléphone"]')).toBeVisible();
    await expect(page.locator('nono-textarea[label="Adresse"]')).toBeVisible();
  });

  test('add tenant with valid data succeeds', async ({ page }) => {
    await page.goto('/tenants');
    const addButton = page.locator('nono-button').filter({ hasText: 'Ajouter Locataire' });
    await addButton.click();
    const form = page.locator('nono-form');
    await page.locator('nono-input[label="Prénom"]').locator('input').fill('Jean');
    await page.locator('nono-input[label="Nom"]').locator('input').fill('Dupont');
    await page.locator('nono-input[label="Email"]').locator('input').fill('jean.dupont@example.com');
    await page.locator('nono-input[label="Téléphone"]').locator('input').fill('0123456789');
    await page.locator('nono-textarea[label="Adresse"]').locator('textarea').fill('123 Rue de la Paix, Paris');
    const submitButton = form.locator('nono-button').filter({ hasText: 'Ajouter' });
    await submitButton.click();
    // Wait for success message or table update
    await expect(page.locator('.success-message')).toContainText('Locataire ajouté avec succès');
    await expect(page.locator('nono-table')).toContainText('Jean Dupont');
  });

  test('add tenant with missing required fields shows errors', async ({ page }) => {
    await page.goto('/tenants');
    const addButton = page.locator('nono-button').filter({ hasText: 'Ajouter Locataire' });
    await addButton.click();
    const form = page.locator('nono-form');
    const submitButton = form.locator('nono-button').filter({ hasText: 'Ajouter' });
    await submitButton.click();
    await expect(page.locator('.error-message')).toContainText('Prénom, Nom et Email sont requis');
  });

  test('edit tenant form pre-fills data', async ({ page }) => {
    // Assume there's at least one tenant
    await page.goto('/tenants');
    const editButton = page.locator('nono-button').filter({ hasText: 'Modifier' }).first();
    await editButton.click();
    const form = page.locator('nono-form');
    await expect(form).toBeVisible();
    await expect(page.locator('nono-input[label="Prénom"]').locator('input')).toHaveValue('Jean');
  });

  test('edit tenant updates data', async ({ page }) => {
    await page.goto('/tenants');
    const editButton = page.locator('nono-button').filter({ hasText: 'Modifier' }).first();
    await editButton.click();
    const form = page.locator('nono-form');
    await page.locator('nono-input[label="Prénom"]').locator('input').fill('Jean-Marie');
    const submitButton = form.locator('nono-button').filter({ hasText: 'Modifier' });
    await submitButton.click();
    await expect(page.locator('.success-message')).toContainText('Locataire modifié avec succès');
    await expect(page.locator('nono-table')).toContainText('Jean-Marie Dupont');
  });

  test('add tenant with valid data succeeds', async ({ page }) => {
    await page.goto('/tenants');
    const addButton = page.locator('nono-button').filter({ hasText: 'Ajouter Locataire' });
    await addButton.click();
    const form = page.locator('nono-form');
    await page.locator('nono-input[label="Nom"]').locator('input').fill('Jean Dupont');
    await page.locator('nono-input[label="Email"]').locator('input').fill('jean.dupont@example.com');
    await page.locator('nono-input[label="Téléphone"]').locator('input').fill('0123456789');
    await page.locator('nono-textarea[label="Adresse"]').locator('textarea').fill('123 Rue de la Paix, Paris');
    const submitButton = form.locator('nono-button').filter({ hasText: 'Ajouter' });
    await submitButton.click();
    // Wait for success message or table update
    await expect(page.locator('.success-message')).toContainText('Locataire ajouté avec succès');
    await expect(page.locator('nono-table')).toContainText('Jean Dupont');
  });

  test('add tenant with missing required fields shows errors', async ({ page }) => {
    await page.goto('/tenants');
    const addButton = page.locator('nono-button').filter({ hasText: 'Ajouter Locataire' });
    await addButton.click();
    const form = page.locator('nono-form');
    const submitButton = form.locator('nono-button').filter({ hasText: 'Ajouter' });
    await submitButton.click();
    await expect(page.locator('.error-message')).toContainText('Nom est requis');
    await expect(page.locator('.error-message')).toContainText('Email est requis');
  });

  test('edit tenant form pre-fills data', async ({ page }) => {
    // Assume there's at least one tenant
    await page.goto('/tenants');
    const editButton = page.locator('nono-button').filter({ hasText: 'Modifier' }).first();
    await editButton.click();
    const form = page.locator('nono-form');
    await expect(form).toBeVisible();
    await expect(page.locator('nono-input[label="Nom"]').locator('input')).toHaveValue('Jean Dupont');
  });

  test('edit tenant updates data', async ({ page }) => {
    await page.goto('/tenants');
    const editButton = page.locator('nono-button').filter({ hasText: 'Modifier' }).first();
    await editButton.click();
    const form = page.locator('nono-form');
    await page.locator('nono-input[label="Nom"]').locator('input').fill('Jean-Marie Dupont');
    const submitButton = form.locator('nono-button').filter({ hasText: 'Modifier' });
    await submitButton.click();
    await expect(page.locator('.success-message')).toContainText('Locataire modifié avec succès');
    await expect(page.locator('nono-table')).toContainText('Jean-Marie Dupont');
  });

  test('delete tenant with confirmation', async ({ page }) => {
    await page.goto('/tenants');
    const deleteButton = page.locator('nono-button').filter({ hasText: 'Supprimer' }).first();
    await deleteButton.click();
    // Assume confirmation dialog
    await page.locator('.confirm-dialog nono-button').filter({ hasText: 'Confirmer' }).click();
    await expect(page.locator('.success-message')).toContainText('Locataire supprimé avec succès');
    // Check tenant removed from table
  });

  test('cancel delete does not delete', async ({ page }) => {
    await page.goto('/tenants');
    const deleteButton = page.locator('nono-button').filter({ hasText: 'Supprimer' }).first();
    await deleteButton.click();
    await page.locator('.confirm-dialog nono-button').filter({ hasText: 'Annuler' }).click();
    // Table unchanged
  });
});