import axios from 'axios'

// 创建axios实例
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    // 从localStorage获取token
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // 添加请求日志（仅在开发环境）
    if (import.meta.env.DEV) {
      console.log('API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        baseURL: config.baseURL,
        data: config.data
      })
    }
    
    return config
  },
  (error) => {
    console.error('Request interceptor error:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => {
    // 添加响应日志（仅在开发环境）
    if (import.meta.env.DEV) {
      console.log('API Response:', {
        status: response.status,
        url: response.config.url,
        data: response.data
      })
    }
    
    return response
  },
  (error) => {
    // 处理认证错误
    if (error.response?.status === 401) {
      // 清除过期的token
      localStorage.removeItem('auth_token')
      
      // 可以在这里触发登录页面跳转
      // router.push('/login')
      
      console.warn('Authentication failed, token cleared')
    }
    
    // 添加错误日志
    console.error('API Error:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      url: error.config?.url
    })
    
    return Promise.reject(error)
  }
)

export default apiClient

// 导出常用的HTTP方法
export const api = {
  get: <T = any>(url: string, config?: any) => 
    apiClient.get<T>(url, config).then(res => res.data),
  
  post: <T = any>(url: string, data?: any, config?: any) => 
    apiClient.post<T>(url, data, config).then(res => res.data),
  
  put: <T = any>(url: string, data?: any, config?: any) => 
    apiClient.put<T>(url, data, config).then(res => res.data),
  
  delete: <T = any>(url: string, config?: any) => 
    apiClient.delete<T>(url, config).then(res => res.data),
  
  patch: <T = any>(url: string, data?: any, config?: any) => 
    apiClient.patch<T>(url, data, config).then(res => res.data)
}