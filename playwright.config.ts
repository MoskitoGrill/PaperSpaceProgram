import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests/e2e', fullyParallel: true,
  use: { baseURL: 'http://127.0.0.1:5173' },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  ],
  webServer: [
    { command: 'node node_modules/vite/bin/vite.js --host 127.0.0.1 --port 5173 --strictPort', url: 'http://127.0.0.1:5173', reuseExistingServer: false },
    { command: 'node tests/serve-production.mjs', url: 'http://127.0.0.1:4173/PaperSpaceProgram/', reuseExistingServer: false },
  ],
});
