/**
 * 认证相关 API
 */

import api from '../index';

import type { ApiResponse } from '@/types';
import type { LoginRequest, LoginResponse, UserInfo } from '@/types/api/auth';

export const authApi = {
  // 用户登录
  login: async (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  // 获取用户信息
  getUserInfo: async (): Promise<ApiResponse<UserInfo>> => {
    const response = await api.get('/auth/user');
    return response.data;
  },

  // 用户登出
  logout: async (): Promise<ApiResponse> => {
    const response = await api.post('/auth/logout');
    return response.data;
  },
};