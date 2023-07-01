/** 所有 api 接口的响应数据都应该准守该格式 */
interface IApiResponseData<T> {
  code: number
  data: T | object | any
  message: string
}

interface PageResult<T> {
  list: T[]
  page: number
  page_size: number
  total: number
}

interface Page {
  page?: number
  page_size?: number
  orders?: Order[]
  conditions?: Condition[]
}

interface Order {
  field: string
  rule: string
}

interface Condition {
  flag?: string
  field: string
  value: any
  rule: string
}
