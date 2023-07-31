import http from "@/utils/request"

export interface Role {
  id: number // 主键id
  role_pid: number // 父角色id
  role_domain: string // 角色域
  role_name: string // 角色名
  role_comment: string // 角色备注
  is_disable: boolean // 是否禁用  0否 1是
  is_default: boolean // 是否默认角色 0否 1是
  created_at: string // 创建时间
  updated_at: string // 更新时间
}

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
export function deleteRoleByIdsApi(data: number[]): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
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
export function getRolesApi(page: PageQuery): Promise<IApiResponseData<Role>> {
  return http.request<IApiResponseData<Role>>({
    url: `/api/v1/roles`,
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
