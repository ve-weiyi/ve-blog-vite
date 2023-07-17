import http from "@/utils/request"

/** 增 */
export function createRemarkApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/remark/create",
    method: "post",
    data,
  })
}

/** 改 */
export function updateRemarkApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/remark/update",
    method: "put",
    data,
  })
}

/** 删 */
export function deleteRemarkApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/remark/delete",
    method: "delete",
    data,
  })
}

/** 删除 批量 */
export function deleteByIdsRemarkApi(ids: number[]): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/remark/deleteByIds",
    method: "delete",
    data: ids,
  })
}

/** 查 */
export function findRemarkApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/remark/find",
    method: "post",
    data: data,
  })
}

/** 查 列表*/
export function findRemarkListApi(page?: Page): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/remark/list",
    method: "post",
    data: page,
  })
}
