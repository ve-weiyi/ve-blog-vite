import http from "@/utils/request";
import type {
  BatchResp,
  EmptyResp,
  IdReq,
  IdsReq,
  PageQuery,
  PageResp,
  Role,
  RoleResourcesResp,
  UpdateRoleApisReq,
  UpdateRoleMenusReq
} from "./types";

/** "创建角色" */
export function createRoleApi(data?: Role): Promise<IApiResponseData<Role>> {
  return http.request<IApiResponseData<Role>>({
    url: `/api/v1/role/create_role`,
    method: "post",
    data: data
  });
}

/** "更新角色" */
export function updateRoleApi(data?: Role): Promise<IApiResponseData<Role>> {
  return http.request<IApiResponseData<Role>>({
    url: `/api/v1/role/update_role`,
    method: "put",
    data: data
  });
}

/** "删除角色" */
export function deleteRoleApi(
  data?: IdReq
): Promise<IApiResponseData<BatchResp>> {
  return http.request<IApiResponseData<BatchResp>>({
    url: `/api/v1/role/delete_role`,
    method: "delete",
    data: data
  });
}

/** "批量删除角色" */
export function deleteRoleListApi(
  data?: IdsReq
): Promise<IApiResponseData<BatchResp>> {
  return http.request<IApiResponseData<BatchResp>>({
    url: `/api/v1/role/delete_role_list`,
    method: "delete",
    data: data
  });
}

/** "查询角色" */
export function findRoleApi(data?: IdReq): Promise<IApiResponseData<Role>> {
  return http.request<IApiResponseData<Role>>({
    url: `/api/v1/role/find_role`,
    method: "post",
    data: data
  });
}

/** "分页获取角色列表" */
export function findRoleListApi(
  data?: PageQuery
): Promise<IApiResponseData<PageResp>> {
  return http.request<IApiResponseData<PageResp>>({
    url: `/api/v1/role/find_role_list`,
    method: "post",
    data: data
  });
}

/** "获取角色资源列表" */
export function findRoleResourcesApi(
  data?: IdReq
): Promise<IApiResponseData<RoleResourcesResp>> {
  return http.request<IApiResponseData<RoleResourcesResp>>({
    url: `/api/v1/role/find_role_resources`,
    method: "post",
    data: data
  });
}

/** "更新角色菜单权限" */
export function updateRoleMenusApi(
  data?: UpdateRoleMenusReq
): Promise<IApiResponseData<EmptyResp>> {
  return http.request<IApiResponseData<EmptyResp>>({
    url: `/api/v1/role/update_role_menus`,
    method: "post",
    data: data
  });
}

/** "更新角色接口权限" */
export function updateRoleApisApi(
  data?: UpdateRoleApisReq
): Promise<IApiResponseData<EmptyResp>> {
  return http.request<IApiResponseData<EmptyResp>>({
    url: `/api/v1/role/update_role_apis`,
    method: "post",
    data: data
  });
}
