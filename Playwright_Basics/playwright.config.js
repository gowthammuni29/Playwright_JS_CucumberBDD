import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
    features: 'features/**/*.feature',
    steps: ['steps/**/*.js', 'support/fixtures.js'],
});

export default defineConfig({
    testDir,
    reporter: 'html',
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    timeout: 60000,
    globalSetup: './global-setup.js',
    use: {
        baseURL: 'https://demoblaze.com/',
        headless: false,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        storageState: 'auth.json',
    },
});
