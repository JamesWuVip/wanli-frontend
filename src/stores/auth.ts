import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authApi } from '@/api/submission'

export interface User {
  id: string
  username: string
  name: string
  role: string
}

export const useAuthStore = defineStore('auth', () => {
  // 状态
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const loading = ref(false)
  const error = ref('')

  // 计算属性
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const isStudent = computed(() => user.value?.role === 'ROLE_STUDENT')
  const isTeacher = computed(() => 
    user.value?.role === 'ROLE_ADMIN' || 
    user.value?.role === 'ROLE_HQ_TEACHER' || 
    user.value?.role === 'ROLE_FRANCHISE_TEACHER'
  )

  // 初始化认证状态
  const initAuth = () => {
    const savedToken = localStorage.getItem('auth_token')
    const savedUser = localStorage.getItem('auth_user')
    
    if (savedToken && savedUser && savedToken !== 'undefined' && savedUser !== 'undefined') {
      try {
        token.value = savedToken
        user.value = JSON.parse(savedUser)
      } catch (err) {
        console.error('解析用户信息失败:', err)
        clearAuth()
      }
    } else {
      // 清除无效的localStorage数据
      clearAuth()
    }
  }

  // 登录
  const login = async (username: string, password: string) => {
    try {
      loading.value = true
      error.value = ''
      
      const response = await authApi.login(username, password)
      
      // 后端返回格式: { data: { accessToken, userId, username, email, roles, ... }, success, message }
      const { data } = response
      
      // 构造用户对象
      const userInfo = {
        id: data.userId.toString(),
        username: data.username,
        name: data.username, // 使用username作为显示名称
        role: data.roles[0] // 取第一个角色
      }
      
      // 保存认证信息
      token.value = data.accessToken
      user.value = userInfo
      
      // 持久化到localStorage
      localStorage.setItem('auth_token', data.accessToken)
      localStorage.setItem('auth_user', JSON.stringify(userInfo))
      
      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : '登录失败'
      throw err
    } finally {
      loading.value = false
    }
  }

  // 登出
  const logout = async () => {
    try {
      loading.value = true
      
      // 调用后端登出API
      await authApi.logout()
    } catch (err) {
      console.error('登出请求失败:', err)
      // 即使后端请求失败，也要清除本地状态
    } finally {
      clearAuth()
      loading.value = false
    }
  }

  // 清除认证状态
  const clearAuth = () => {
    user.value = null
    token.value = null
    error.value = ''
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
  }

  // 检查认证状态
  const checkAuth = async (): Promise<boolean> => {
    if (!token.value) {
      return false
    }
    
    try {
      // 调用后端验证token有效性
      const response = await authApi.getCurrentUser()
      
      if (response && response.data) {
        // 更新用户信息
        const userInfo = {
          id: response.data.userId?.toString() || user.value?.id || '',
          username: response.data.username || user.value?.username || '',
          name: response.data.username || user.value?.name || '',
          role: response.data.roles?.[0] || user.value?.role || ''
        }
        
        user.value = userInfo
        localStorage.setItem('auth_user', JSON.stringify(userInfo))
        
        return true
      } else {
        clearAuth()
        return false
      }
    } catch (err) {
      console.error('检查认证状态失败:', err)
      clearAuth()
      return false
    }
  }

  // 刷新token
  const refreshToken = async (): Promise<boolean> => {
    try {
      // 这里可以实现token刷新逻辑
      // const response = await authApi.refreshToken()
      // 暂时返回false，表示不支持token刷新
      return false
    } catch (err) {
      console.error('刷新token失败:', err)
      clearAuth()
      return false
    }
  }

  return {
    // 状态
    user,
    token,
    loading,
    error,
    
    // 计算属性
    isAuthenticated,
    isStudent,
    isTeacher,
    
    // 方法
    initAuth,
    login,
    logout,
    clearAuth,
    checkAuth,
    refreshToken
  }
})