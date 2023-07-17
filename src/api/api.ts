import http from "@/utils/request"

/** 增 */
export function createResourceApi(data: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api//v1/admin/api/create",
    method: "post",
    data,
  })
}

/** 删 */
export function deleteResourceApi(data: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api//v1/admin/api/delete",
    method: "delete",
    data,
  })
}

/** 改 */
export function updateResourceApi(data: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api//v1/admin/api/update",
    method: "put",
    data,
  })
}

/** 查 查询单个*/
export function getResourceApi(data: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api//v1/admin/api/find",
    method: "get",
    data,
  })
}

/** 删除 批量操作 */
export function deleteByIdsResourceApi(ids: number[]): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api//v1/admin/api/deleteByIds",
    method: "delete",
    data: ids,
  })
}

/** 查 列表*/
export function getResourceListApi(page: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api//v1/admin/api/list",
    method: "get",
    params: page,
  })
}

/** 查 列表*/
export function getResourceTreeApi(): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api//v1/admin/apis",
    method: "post",
    data: {},
  })
}
