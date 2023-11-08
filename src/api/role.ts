import http from "@/utils/request"
import { Role, BatchResult } from "./types"

/** 创建角色 */
export function createRoleApi(data: Role): Promise<IApiResponseData<Role>> {
  return http.request<IApiResponseData<Role>>({
    url: `/api/v1/role`,
    method: "post",
    data: data,
  })
}

/** 更新角色 */
export function updateRoleApi(data: Role): Promise<IApiResponseData<Role>> {
  return http.request<IApiResponseData<Role>>({
    url: `/api/v1/role`,
    method: "put",
    data: data,
  })
}

/** 删除角色 */
export function deleteRoleApi(id: number): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: `/api/v1/role/${id}`,
    method: "delete",
  })
}

/** 查询角色 */
export function findRoleApi(id: number): Promise<IApiResponseData<Role>> {
  return http.request<IApiResponseData<Role>>({
    url: `/api/v1/role/${id}`,
    method: "get",
  })
}

/** 批量删除角色 */
export function deleteRoleByIdsApi(data: number[]): Promise<IApiResponseData<BatchResult>> {
  return http.request<IApiResponseData<BatchResult>>({
    url: `/api/v1/role/batch_delete`,
    method: "delete",
    data: data,
  })
}

/** 分页获取角色列表 */
export function findRoleListApi(page: PageQuery): Promise<IApiResponseData<PageResult<Role>>> {
  return http.request<IApiResponseData<PageResult<Role>>>({
    url: `/api/v1/role/list`,
    method: "post",
    data: page,
  })
}

/** 获取角色列表 */
export function findRoleDetailsListApi(page: PageQuery): Promise<IApiResponseData<PageResult<Role>>> {
  return http.request<IApiResponseData<PageResult<Role>>>({
    url: `/api/v1/role/details_list`,
    method: "post",
    data: page,
  })
}

/** 更新角色菜单 */
export function updateRoleMenusApi(data: Role): Promise<IApiResponseData<Role>> {
  return http.request<IApiResponseData<Role>>({
    url: `/api/v1/role/update_menus`,
    method: "post",
    data: data,
  })
}

/** 更新角色资源 */
export function updateRoleResourcesApi(data: Role): Promise<IApiResponseData<Role>> {
  return http.request<IApiResponseData<Role>>({
    url: `/api/v1/role/update_resources`,
    method: "post",
    data: data,
  })
}
