/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_VERSION: string
  readonly VITE_APP_DESCRIPTION: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_API_TIMEOUT: string
  readonly VITE_ENABLE_DEVTOOLS: string
  readonly VITE_ENABLE_MOCK: string
  readonly VITE_LOG_LEVEL: string
  readonly VITE_ENABLE_CONSOLE_LOG: string
  readonly VITE_TEST_MODE?: string
  readonly VITE_ENABLE_E2E_TESTS?: string
  readonly VITE_ENABLE_UNIT_TESTS?: string
  readonly VITE_TEST_COVERAGE?: string
  readonly VITE_ENABLE_GZIP?: string
  readonly VITE_ENABLE_CDN?: string
  readonly VITE_TEST_DB_URL?: string
  readonly VITE_TEST_REDIS_URL?: string
  readonly VITE_TEST_PORT?: string
  readonly VITE_TEST_API_PORT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}