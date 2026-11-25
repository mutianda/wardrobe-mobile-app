import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig,InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import type {  ApiResponse } from '../types/api'
import { Toast } from 'antd-mobile'
import { useUserStore } from '../store/userStore'
console.log(import.meta.env,'import.meta.env.BASE_URL')
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://5i00.com/api',
  timeout: 12000,
})

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useUserStore.getState().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  err => {
    Promise.reject(err)
  }
)

service.interceptors.response.use(
    (res: AxiosResponse<ApiResponse>) => {
    const data = res.data
    if (data.code != 200) {
      Toast.show(data.message || '请求失败')
      if (data.code === 401) {
        const logout = useUserStore.getState().logout
        logout()
        // 跳登录
        location.replace('/login')
      }
      return Promise.reject(data)
    }
    return res
  },
  err => {
    if (err.response?.status === 401) {
        const url = err.config?.url
        // 判断：登录接口的401，只提示，不跳转、不清token
        if (url?.includes('auth/login')) {
          Toast.show('账号或密码错误')
        } else {
          // 其他接口401 = token失效
          Toast.show('登录已失效，请重新登录')
          const logout = useUserStore.getState().logout
          logout()
          location.replace('/login')
        }
      } else {
        Toast.show('网络异常，请稍后重试')
      }
      return Promise.reject(err)
  }
)
export function request<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return service(config).then(r => r.data)
  }