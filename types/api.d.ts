/** 所有 api 接口的响应数据都应该准守该格式 */
interface IApiResponseData<T> {
  code: number
  data: T
  message: string
}

interface PageResult<T> {
  list: T[]
  page: number
  page_size: number
  total: number
}

interface PageQuery {
  page?: number
  page_size?: number
  sorts?: Sort[]
  conditions?: Condition[]
}

interface Sort {
  field: string
  order: string
}

interface Condition {
  flag?: string
  field: string
  value?: any
  rule?: "like" | "=" | ">" | "<" | string
}
