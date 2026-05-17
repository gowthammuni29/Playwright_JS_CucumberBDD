import { qlab01Config } from './environments/qlab01.js';
import { qlab02Config } from './environments/qlab02.js';
import { stagingConfig } from './environments/staging.js';

const ENV = process.env.ENV || 'qlab01';

const envMap = {
    qlab01: qlab01Config,
    qlab02: qlab02Config,
    staging: stagingConfig,
};

if (!envMap[ENV]) {
    throw new Error(`Unknown ENV "${ENV}". Valid options: ${Object.keys(envMap).join(', ')}`);
}

export const envConfig = envMap[ENV];