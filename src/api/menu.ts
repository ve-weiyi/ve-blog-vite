import http from "@/utils/request"
import { Menu, BatchResult, MenuDetails } from "./types"

/** 创建菜单 */
export function createMenuApi(data: Menu): Promise<IApiResponseData<Menu>> {
  return http.request<IApiResponseData<Menu>>({
    url: `/api/v1/menu`,
    method: "post",
    data: data,
  })
}

/** 更新菜单 */
export function updateMenuApi(data: Menu): Promise<IApiResponseData<Menu>> {
  return http.request<IApiResponseData<Menu>>({
    url: `/api/v1/menu`,
    method: "put",
    data: data,
  })
}

/** 删除菜单 */
export function deleteMenuApi(id: number): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: `/api/v1/menu/${id}`,
    method: "delete",
  })
}

/** 查询菜单 */
export function findMenuApi(id: number): Promise<IApiResponseData<Menu>> {
  return http.request<IApiResponseData<Menu>>({
    url: `/api/v1/menu/${id}`,
    method: "get",
  })
}

/** 批量删除菜单 */
export function deleteMenuByIdsApi(data: number[]): Promise<IApiResponseData<BatchResult>> {
  return http.request<IApiResponseData<BatchResult>>({
    url: `/api/v1/menu/batch_delete`,
    method: "delete",
    data: data,
  })
}

/** 分页获取菜单列表 */
export function findMenuListApi(page: PageQuery): Promise<IApiResponseData<PageResult<Menu>>> {
  return http.request<IApiResponseData<PageResult<Menu>>>({
    url: `/api/v1/menu/list`,
    method: "post",
    data: page,
  })
}

/** 获取菜单列表 */
export function findMenuDetailsListApi(page: PageQuery): Promise<IApiResponseData<PageResult<MenuDetails>>> {
  return http.request<IApiResponseData<PageResult<MenuDetails>>>({
    url: `/api/v1/menu/details_list`,
    method: "post",
    data: page,
  })
}
