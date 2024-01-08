const dotenv = require('dotenv');

let ENV_FILE_NAME = '';
switch (process.env.NODE_ENV) {
  case 'production':
    ENV_FILE_NAME = '.env.production';
    break;
  case 'staging':
    ENV_FILE_NAME = '.env.staging';
    break;
  case 'test':
    ENV_FILE_NAME = '.env.test';
    break;
  case 'development':
  default:
    ENV_FILE_NAME = '.env';
    break;
}

try {
  dotenv.config({path: process.cwd() + '/' + ENV_FILE_NAME});
} catch (e) {
}

// CORS when consuming Medusa from admin
const ADMIN_CORS =
  process.env.ADMIN_CORS || 'http://localhost:7000,http://localhost:7001';

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || 'http://localhost:8000';

const DATABASE_URL =
  process.env.DATABASE_URL || 'postgres://localhost/medusa-starter-default';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  {
    resolve: `@medusajs/file-local`,
    options: {
      upload_dir: 'uploads',
    },
  },
];

const modules = {
  inventoryService: {
    resolve: "@medusajs/inventory",
  },
  stockLocationService: {
    resolve: "@medusajs/stock-location",
  },
  eventBus: process.env.NODE_ENV !== 'development' ? {
    resolve: "@medusajs/event-bus-redis",
    options: {
      redisUrl: REDIS_URL
    }
  } : undefined,
  cacheService: process.env.NODE_ENV !== 'development' ? {
    resolve: "@medusajs/cache-redis",
    options: {
      redisUrl: REDIS_URL
    }
  } : undefined,
};

/** @type {import('@medusajs/medusa').ConfigModule['projectConfig']} */
const projectConfig = {
  jwtSecret: process.env.JWT_SECRET,
  cookieSecret: process.env.COOKIE_SECRET,
  store_cors: STORE_CORS,
  database_url: DATABASE_URL,
  admin_cors: ADMIN_CORS,
  redis_url: process.env.NODE_ENV !== 'development' ? REDIS_URL : undefined,
  database_extra: process.env.NODE_ENV !== 'development' ? {ssl: {rejectUnauthorized: false}} : {},
};

/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
  projectConfig,
  plugins,
  modules,
  featureFlags: {
    product_categories: true,
  },
};
