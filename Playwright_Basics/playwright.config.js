import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import { envConfig } from './config/envConfig.js';

const testDir = defineBddConfig({
    features: 'features/**/*.feature',
    steps: ['steps/**/*.js', 'support/fixtures.js'],
});

export default defineConfig({
    reporter: 'html',
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    timeout: 60000,
    use: {
        baseURL: envConfig.baseURL,
        headless: false,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },
    projects: [
        // ── Setup projects: run first, create browser-specific auth files ──
        {
            name: 'chromium-setup',
            testDir: './setup',
            testMatch: /auth\.setup\.js/,
            use: { browserName: 'chromium' },
        },
        {
            name: 'firefox-setup',
            testDir: './setup',
            testMatch: /auth\.setup\.js/,
            use: { browserName: 'firefox' },
        },
        {
            name: 'webkit-setup',
            testDir: './setup',
            testMatch: /auth\.setup\.js/,
            use: { browserName: 'webkit' },
        },

        // ── API project: no browser needed, no auth setup dependency ──
        {
            name: 'api',
            testDir,
            grep: /@api/,
            use: {
                baseURL: envConfig.apiBaseURL,
                extraHTTPHeaders: { 'Content-Type': 'application/json' },
            },
        },

        // ── Test projects: depend on setup, each uses its own auth file ──
        {
            name: 'chromium',
            testDir,
            grepInvert: /@api/,
            use: { browserName: 'chromium', storageState: 'auth.chromium.json' },
            dependencies: ['chromium-setup'],
        },
        {
            name: 'firefox',
            testDir,
            grepInvert: /@api/,
            use: { browserName: 'firefox', storageState: 'auth.firefox.json' },
            dependencies: ['firefox-setup'],
        },
        {
            name: 'webkit',
            testDir,
            grepInvert: /@api/,
            use: { browserName: 'webkit', storageState: 'auth.webkit.json' },
            dependencies: ['webkit-setup'],
        },
    ],
});