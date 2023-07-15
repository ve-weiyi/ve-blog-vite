import http from "@/utils/request"

/** 增 */
export function createOperationApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/operationLog/create",
    method: "post",
    data,
  })
}

/** 改 */
export function updateOperationApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/operationLog/update",
    method: "put",
    data,
  })
}

/** 删 删除单个*/
export function deleteOperationApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/operationLog/delete",
    method: "delete",
    data,
  })
}

/** 删除 批量操作 */
export function deleteByIdsOperationApi(ids: number[]): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/operationLog/deleteByIds",
    method: "delete",
    data: ids,
  })
}

/** 查 */
export function findOperationApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/operationLog/find",
    method: "post",
    data: data,
  })
}

/** 查 列表*/
export function findOperationListApi(page?: Page): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/operationLog/list",
    method: "post",
    data: page,
  })
}
