import http from "@/utils/request"

/** 增 */
export function createArticleApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/article/create",
    method: "post",
    data,
  })
}

/** 改 */
export function updateArticleApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/article/update",
    method: "put",
    data,
  })
}

/** 删 */
export function deleteArticleApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/article/delete",
    method: "delete",
    data,
  })
}

/** 查 */
export function findArticleApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/article/find",
    method: "post",
    data: data,
  })
}

/** 删除 批量 */
export function deleteByIdsArticleApi(ids: number[]): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/article/deleteByIds",
    method: "delete",
    data: ids,
  })
}

/** 查询 列表*/
export function findArticleListApi(page?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/article/list",
    method: "post",
    data: page,
  })
}

/** 查 列表*/
export function getArticleListByConditionApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/article/condition",
    method: "post",
    data: data,
  })
}

/** 查 列表*/
export function getArticleArchivesApi(page?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/article/archives",
    method: "get",
    data: page,
  })
}
