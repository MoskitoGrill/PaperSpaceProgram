import { expect, test, type Page, type TestInfo } from '@playwright/test';
async function lifecycle(page: Page, testInfo: TestInfo, url: string) {
  const errors: string[] = []; page.on('pageerror', e => errors.push(e.message));
  await page.goto(url);
  await expect(page.getByRole('button', { name: '2D', exact: true })).toBeDisabled();
  await expect(page.getByRole('button', { name: '2D/3D' })).toBeDisabled();
  await page.getByRole('button', { name: 'Vývojový tester' }).click();
  await expect(page.getByRole('listitem')).toHaveCount(4);
  await expect(page.locator('canvas')).toBeHidden();
  await page.getByRole('button', { name: 'Spustit', exact: true }).click();
  const initialCanvas = await page.locator('canvas').evaluate(c => (c as HTMLCanvasElement).toDataURL());
  await expect(page.getByRole('status')).toHaveText('Tick: 0 · Čas: 0 s');
  for (let i = 0; i < 3; i++) await page.getByRole('button', { name: 'Provést jeden krok' }).click();
  await expect(page.getByRole('status')).toHaveText('Tick: 3 · Čas: 0,05 s');
  expect(await page.locator('canvas').evaluate(c => (c as HTMLCanvasElement).toDataURL())).toBe(initialCanvas);
  await page.getByRole('button', { name: 'Reset scénáře' }).click();
  await expect(page.getByRole('status')).toHaveText('Tick: 0 · Čas: 0 s');
  expect(await page.locator('canvas').evaluate(c => (c as HTMLCanvasElement).toDataURL())).toBe(initialCanvas);
  await page.getByRole('button', { name: 'Provést jeden krok' }).click();
  await page.getByRole('button', { name: 'Zpět do menu' }).click();
  await page.getByRole('button', { name: 'Vývojový tester' }).click();
  await page.getByRole('button', { name: 'Spustit', exact: true }).click();
  await expect(page.getByRole('status')).toHaveText('Tick: 0 · Čas: 0 s');
  expect(await page.evaluate(() => localStorage.length)).toBe(0);
  expect(await page.evaluate(async () => (await indexedDB.databases()).length)).toBe(0);
  expect(errors).toEqual([]);
  await page.screenshot({ path: testInfo.outputPath('sys001.png'), fullPage: true });
}
test('menu and isolated SYS-001 lifecycle', async ({ page }, testInfo) => {
  await lifecycle(page, testInfo, '/');
});
test('Pages test build runs the full SYS-001 lifecycle on a subpath', async ({ page }, testInfo) => {
  const failures: string[] = [];
  page.on('response', r => { if (r.status() >= 400) failures.push(r.url()); });
  await lifecycle(page, testInfo, 'http://127.0.0.1:4173/testing/PaperSpaceProgram/');
  await page.getByRole('button', { name: 'Zpět do menu' }).click();
  await expect(page.getByText(/Veřejná testovací sestava/)).toBeVisible();
  expect(failures).toEqual([]);
});
test('production loads assets on a Pages subpath and exposes no tester', async ({ page }) => {
  const failures: string[] = [];
  page.on('pageerror', e => failures.push(e.message));
  page.on('response', r => { if (r.status() >= 400) failures.push(r.url()); });
  await page.goto('http://127.0.0.1:4173/PaperSpaceProgram/');
  await expect(page.getByRole('heading', { name: 'PaperSpaceProgram' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Vývojový tester' })).toHaveCount(0);
  await page.goto('http://127.0.0.1:4173/PaperSpaceProgram/?tester=1#SYS-001');
  await expect(page.getByRole('button', { name: 'Spustit', exact: true })).toHaveCount(0);
  expect(failures).toEqual([]);
});
