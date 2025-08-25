import { config } from '@vue/test-utils'
import { vi } from 'vitest'

// Mock global objects
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = vi.fn()
  disconnect = vi.fn()
  unobserve = vi.fn()
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
})

Object.defineProperty(global, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
})

// Global test configuration
config.global.stubs = {
  // Stub out router-link and router-view
  'router-link': true,
  'router-view': true,
}

// Mock environment variables for tests
vi.mock('import.meta', () => ({
  env: {
    VITE_API_BASE_URL: 'http://localhost:8081/api',
    VITE_APP_TITLE: '万里学院前端系统 - 测试环境',
    VITE_TEST_MODE: 'true',
  },
}))