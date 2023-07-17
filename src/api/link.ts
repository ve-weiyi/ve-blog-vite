import http from "@/utils/request"

/** 增 */
export function createLinkApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/friendLink/create",
    method: "post",
    data,
  })
}

/** 改 */
export function updateLinkApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/friendLink/update",
    method: "put",
    data,
  })
}

/** 删 删除单个*/
export function deleteLinkApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/friendLink/delete",
    method: "delete",
    data,
  })
}

/** 删除 批量操作 */
export function deleteByIdsLinkApi(ids: number[]): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/friendLink/deleteByIds",
    method: "delete",
    data: ids,
  })
}

/** 查 */
export function findLinkApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/friendLink/find",
    method: "post",
    data: data,
  })
}

/** 查 列表*/
export function findLinkListApi(page?: Page): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/friendLink/list",
    method: "post",
    data: page,
  })
}
