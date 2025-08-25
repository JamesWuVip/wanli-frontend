/**
 * 认证相关类型定义
 */

// 登录请求参数
export interface LoginRequest {
  email: string;
  password: string;
}

// 登录响应数据
export interface LoginResponse {
  token: string;
  user: UserInfo;
}

// 用户信息
export interface UserInfo {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'teacher' | 'student';
  createdAt: string;
  updatedAt: string;
}