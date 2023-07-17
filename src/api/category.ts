import http from "@/utils/request"

/** 增 */
export function createCategoryApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/category/create",
    method: "post",
    data,
  })
}

/** 改 */
export function updateCategoryApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/category/update",
    method: "put",
    data,
  })
}

/** 删 删除单个*/
export function deleteCategoryApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/category/delete",
    method: "delete",
    data,
  })
}

/** 删除 批量操作 */
export function deleteByIdsCategoryApi(ids: number[]): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/category/deleteByIds",
    method: "delete",
    data: ids,
  })
}

/** 查 */
export function findCategoryApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/category/find",
    method: "post",
    data: data,
  })
}

/** 查 列表*/
export function findCategoryListApi(page?: Page): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/category/list",
    method: "post",
    data: page,
  })
}
