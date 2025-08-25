/**
 * 全局类型定义
 */

// 通用 API 响应格式
export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
  success: boolean;
}

// 分页参数
export interface PaginationParams {
  page: number;
  pageSize: number;
}

// 分页响应数据
export interface PaginationResponse<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}

// 环境变量类型定义
interface ImportMetaEnv {
  readonly NODE_ENV: 'development' | 'production' | 'test';
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_APP_DESCRIPTION: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_API_TIMEOUT: string;
  readonly VITE_ENABLE_DEVTOOLS: string;
  readonly VITE_ENABLE_MOCK: string;
  readonly VITE_LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error';
  readonly VITE_ENABLE_CONSOLE_LOG: string;
  readonly VITE_ENABLE_GZIP?: string;
  readonly VITE_ENABLE_CDN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}