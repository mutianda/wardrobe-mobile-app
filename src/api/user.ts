import { request } from '../utils/request'

export interface LoginParams {
  username: string
  password: string
}
export interface LoginRes {
  access_token: string
  refresh_token: string
  token_type: string
}

export function loginApi(data: LoginParams) {
  return request<LoginRes>({
    method: 'post',
    url: '/api/v1/auth/login',
    data,
  })
}

export interface UserInfo {
  id: number
  username: string
  nickname: string
  city: string
  likeStyle: string
  dislikeStyle: string
  dislikeColor: string
  clothCount: number
  outfitCount: number
}
export function getMe() {
  return request<UserInfo>({
    method: 'get',
    url: '/api/v1/auth/me',
  })
}
