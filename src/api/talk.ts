import http from "@/utils/request"

/** 增 */
export function createTalkApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/talk/create",
    method: "post",
    data,
  })
}

/** 改 */
export function updateTalkApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/talk/update",
    method: "put",
    data,
  })
}

/** 删 删除单个*/
export function deleteTalkApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/talk/delete",
    method: "delete",
    data,
  })
}

/** 查 */
export function findTalkApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/talk/find",
    method: "post",
    data: data,
  })
}

/** 删除 批量操作 */
export function deleteByIdsTalkApi(ids: number[]): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/talk/deleteByIds",
    method: "delete",
    data: ids,
  })
}

/** 查 列表*/
export function findTalkListApi(page?: Page): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/talk/list",
    method: "post",
    data: page,
  })
}
