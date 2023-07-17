import http from "@/utils/request"

/** 增 */
export function createRoleApi(data: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/role/create",
    method: "post",
    data,
  })
}

/** 删 删除单个*/
export function deleteRoleApi(data: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/role/delete",
    method: "delete",
    data,
  })
}

/** 改 */
export function updateRoleApi(data: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/role/update",
    method: "put",
    data,
  })
}

/** 查 查询单个*/
export function getRoleApi(data: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/role/find",
    method: "get",
    data,
  })
}

/** 删除 批量操作 */
export function deleteByIdsRoleApi(ids: number[]): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/role/deleteByIds",
    method: "delete",
    data: ids,
  })
}

/** 查 列表*/
export function getRoleListApi(page: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/role/list",
    method: "post",
    params: page,
  })
}

/** 查 列表*/
export function getRoleTreeApi(): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/admin/roles",
    method: "post",
    data: {},
  })
}

/** 改 */
export function updateRoleMenusApi(data: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/admin/role/update_menus",
    method: "post",
    data,
  })
}

/** 改 */
export function updateRoleResourcesApi(data: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/admin/role/update_resources",
    method: "post",
    data,
  })
}
