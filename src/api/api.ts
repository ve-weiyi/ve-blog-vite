import http from "@/utils/request"

export interface Api {
  id: number // 主键id
  name: string // api名称
  path: string // api路径
  method: string // api请求方法
  group: string // api分组
  parent_id: number // 分组id
  traceable: number // 是否追溯操作记录 0需要，1是
  status: number // 状态 1开，2关
  created_at: string // 创建时间
  updated_at: string // 更新时间
}

/** 创建接口 */
export function createApiApi(data: Api): Promise<IApiResponseData<Api>> {
  return http.request<IApiResponseData<Api>>({
    url: `/api/v1/api`,
    method: "post",
    data: data,
  })
}

/** 更新接口 */
export function updateApiApi(data: Api): Promise<IApiResponseData<Api>> {
  return http.request<IApiResponseData<Api>>({
    url: `/api/v1/api`,
    method: "put",
    data: data,
  })
}

/** 删除接口 */
export function deleteApiApi(id: number): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: `/api/v1/api/${id}`,
    method: "delete",
  })
}

/** 查询接口 */
export function findApiApi(id: number): Promise<IApiResponseData<Api>> {
  return http.request<IApiResponseData<Api>>({
    url: `/api/v1/api/${id}`,
    method: "get",
  })
}

/** 批量删除接口 */
export function deleteApiByIdsApi(data: number[]): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: `/api/v1/api/batch_delete`,
    method: "delete",
    data: data,
  })
}

/** 分页获取接口列表 */
export function findApiListApi(page: PageQuery): Promise<IApiResponseData<PageResult<Api>>> {
  return http.request<IApiResponseData<PageResult<Api>>>({
    url: `/api/v1/api/list`,
    method: "post",
    data: page,
  })
}

/** 获取api列表 */
export function getApisApi(page: PageQuery): Promise<IApiResponseData<Api>> {
  return http.request<IApiResponseData<Api>>({
    url: `/api/v1/apis`,
    method: "post",
    data: page,
  })
}
