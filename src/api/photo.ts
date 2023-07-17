import http from "@/utils/request"

/** 增 */
export function createPhotoApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/photo/create",
    method: "post",
    data,
  })
}

/** 改 */
export function updatePhotoApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/photo/update",
    method: "put",
    data,
  })
}

/** 删 删除单个*/
export function deletePhotoApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/photo/delete",
    method: "delete",
    data,
  })
}

/** 删除 批量操作 */
export function deleteByIdsPhotoApi(ids: number[]): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/photo/deleteByIds",
    method: "delete",
    data: ids,
  })
}

/** 查 */
export function findPhotoApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/photo/find",
    method: "post",
    data: data,
  })
}

/** 查 列表*/
export function findPhotoListApi(page?: Page): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/photo/list",
    method: "post",
    data: page,
  })
}
