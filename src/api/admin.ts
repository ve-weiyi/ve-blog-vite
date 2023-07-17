import http from "@/utils/request"

/** 获取api列表 */
export function adminApisApi(page?: Page): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/admin/apis",
    method: "post",
    data: page,
  })
}

/** 获取菜单列表 */
export function adminMenusApi(page?: Page): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/admin/menus",
    method: "post",
    data: page,
  })
}

/** 获取评论列表 */
export function adminCommentsApi(page?: Page): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/admin/comments",
    method: "post",
    data: page,
  })
}

/** 更新角色资源 */
export function adminRoleUpdateResourcesApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/admin/role/update_resources",
    method: "post",
    data: data,
  })
}

/** 获取角色列表 */
export function updateUserRolesApi(page?: Page): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/admin/roles",
    method: "post",
    data: page,
  })
}

/** 修改用户角色 */
export function adminUpdateRolesApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/admin/update_roles",
    method: "post",
    data: data,
  })
}

/** 修改用户状态 */
export function updateUserStatusApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/admin/update_status",
    method: "post",
    data: data,
  })
}

/** 获取用户列表 */
export function findUserListApi(page?: Page): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/admin/users",
    method: "post",
    data: page,
  })
}

/** 获取用户地区 */
export function adminUserAreasApi(page?: Page): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/admin/user/areas",
    method: "post",
    data: page,
  })
}

/** 获取博客后台信息 */
export function adminHomeInfoApi(): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/admin/home",
    method: "get",
  })
}

export function deleteByIdsUserAccountApi(page?: Page): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/admin/user/areas",
    method: "post",
    data: page,
  })
}
