/**
 * API 服务层统一入口
 * 配置 Axios 实例和拦截器
 */

import axios from 'axios';
import type {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';

import type { ApiResponse } from '@/types';
import { getApiConfig } from '@/utils/env';

// 获取API配置
const apiConfig = getApiConfig();

// 创建 axios 实例
const api: AxiosInstance = axios.create({
  baseURL: apiConfig.baseURL,
  timeout: apiConfig.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 添加认证 token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: unknown) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    return response;
  },
  (error: unknown) => {
    // 处理错误响应
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { status: number } };
      if (axiosError.response?.status === 401) {
        // Token 过期，跳转到登录页
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
export { type InternalAxiosRequestConfig, type AxiosResponse };