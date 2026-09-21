/**
 * Global App & Environment Configuration
 * Centralized settings for networking, storage, feature flags, and metadata.
 */

export type AppEnvironment = 'development' | 'staging' | 'production';

export const Env = {
  CURRENT: (__DEV__ ? 'development' : 'production') as AppEnvironment,
  IS_DEV: __DEV__,
  IS_PROD: !__DEV__,
};

export const AppConfig = {
  APP_NAME: 'UniversalBaseApp',
  APP_DISPLAY_NAME: 'React Native Base',
  VERSION: '1.0.0',
  BUILD_NUMBER: 1,

  // Network & API Endpoints
  API: {
    BASE_URL: __DEV__ ? 'https://api.dev.example.com/v1' : 'https://api.example.com/v1',
    TIMEOUT_MS: 15000,
    RETRY_COUNT: 3,
  },

  // Database & Cache Settings
  DATABASE: {
    NAME: 'universal_app.db',
    VERSION: 1,
  },

  // Pagination defaults
  PAGINATION: {
    DEFAULT_PAGE: 1,
    PAGE_SIZE: 20,
  },

  // Animation Timings (in ms)
  ANIMATION: {
    FAST: 200,
    NORMAL: 300,
    SLOW: 500,
  },

  // Feature Flags (Easy to toggle for testing/grading)
  FEATURES: {
    ENABLE_OFFLINE_SQLITE: true,
    ENABLE_AI_ENDPOINTS: true,
    ENABLE_ANALYTICS: !__DEV__,
    SHOW_DEBUG_MENU: __DEV__,
  },
};