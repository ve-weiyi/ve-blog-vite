import http from "@/utils/request"

/** 增 */
export function createTagApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/tag/create",
    method: "post",
    data,
  })
}

/** 改 */
export function updateTagApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/tag/update",
    method: "put",
    data,
  })
}

/** 删 删除单个*/
export function deleteTagApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/tag/delete",
    method: "delete",
    data,
  })
}

/** 删除 批量操作 */
export function deleteByIdsTagApi(ids: number[]): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/tag/deleteByIds",
    method: "delete",
    data: ids,
  })
}

/** 查 */
export function findTagApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/tag/find",
    method: "post",
    data: data,
  })
}

/** 查 列表*/
export function findTagListApi(page?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/tag/list",
    method: "get",
    data: page,
  })
}
