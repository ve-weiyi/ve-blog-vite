import http from "@/utils/request"

/** 增 */
export function createMenuApi(data: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/menu/create",
    method: "post",
    data,
  })
}

/** 删 删除单个*/
export function deleteMenuApi(data: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/menu/delete",
    method: "delete",
    data,
  })
}

/** 改 */
export function updateMenuApi(data: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/menu/update",
    method: "put",
    data,
  })
}

/** 查 查询单个*/
export function getMenuApi(data: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/menu/find",
    method: "get",
    data,
  })
}

/** 删除 批量操作 */
export function deleteByIdsMenuApi(ids: number[]): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/menu/deleteByIds",
    method: "delete",
    data: ids,
  })
}

/** 查 列表*/
export function getMenuListApi(page: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/menu/list",
    method: "get",
    params: page,
  })
}

/** 查 列表*/
export function getMenuTreeApi(): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/admin/menus",
    method: "post",
    data: {},
  })
}
