import http from "@/utils/request"

/** 增 */
export function createPageApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/page/create",
    method: "post",
    data,
  })
}

/** 改 */
export function updatePageApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/page/update",
    method: "put",
    data,
  })
}

/** 删 删除单个*/
export function deletePageApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/page/delete",
    method: "delete",
    data,
  })
}

/** 删除 批量操作 */
export function deleteByIdsPageApi(ids: number[]): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/page/deleteByIds",
    method: "delete",
    data: ids,
  })
}

/** 查 */
export function findPageApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/page/find",
    method: "post",
    data: data,
  })
}

/** 查 列表*/
export function findPageListApi(page?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/page/list",
    method: "get",
    data: page,
  })
}
