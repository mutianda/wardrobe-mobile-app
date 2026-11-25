import { request } from '../utils/request'

export interface ClothParams {
  page: number
  size: number
  keyword:string
  category:string
}
export interface ClothItem {
  category: string
  color: string
  image_url: string
  name: string
  occasion: string
  summary: string
  suitable_temp: string
  source_image_url: string
  season: string
  thickness: string
  id:number
}
export interface ClothListBody {
  items: ClothItem[]
  total: number
}
export function getClothList(params: ClothParams) {
  return request<ClothListBody>({
    method: 'get',
    url: '/api/v1/clothes',
    params,
  })
}

export function getClothDetail(id: number) {
  return request<ClothItem>({
    method: 'get',
    url: `/api/v1/clothes/${id}`,
  })
}
