import http from "@/utils/request";
import type {
  BatchResp,
  EmptyReq,
  EmptyResp,
  IdsReq,
  PageQuery,
  PageResp,
  UserApisResp,
  UserInfoReq,
  UserInfoResp,
  UserMenusResp,
  UserRolesResp
} from "./types";

/** "查询用户登录历史" */
export function findUserLoginHistoryListApi(
  data?: PageQuery
): Promise<IApiResponseData<PageResp>> {
  return http.request<IApiResponseData<PageResp>>({
    url: `/api/v1/user/login_history`,
    method: "post",
    data: data
  });
}

/** "批量删除登录历史" */
export function deleteUserLoginHistoryListApi(
  data?: IdsReq
): Promise<IApiResponseData<BatchResp>> {
  return http.request<IApiResponseData<BatchResp>>({
    url: `/api/v1/user/delete_login_history_list`,
    method: "delete",
    data: data
  });
}

/** "获取用户接口权限" */
export function getUserApisApi(
  data?: EmptyReq
): Promise<IApiResponseData<UserApisResp>> {
  return http.request<IApiResponseData<UserApisResp>>({
    url: `/api/v1/user/get_user_apis`,
    method: "get",
    data: data
  });
}

/** "获取用户菜单权限" */
export function getUserMenusApi(
  data?: EmptyReq
): Promise<IApiResponseData<UserMenusResp>> {
  return http.request<IApiResponseData<UserMenusResp>>({
    url: `/api/v1/user/get_user_menus`,
    method: "get",
    data: data
  });
}

/** "获取用户角色" */
export function getUserRoleApi(
  data?: EmptyReq
): Promise<IApiResponseData<UserRolesResp>> {
  return http.request<IApiResponseData<UserRolesResp>>({
    url: `/api/v1/user/get_user_roles`,
    method: "get",
    data: data
  });
}

/** "获取用户信息" */
export function getUserInfoApi(
  data?: EmptyReq
): Promise<IApiResponseData<UserInfoResp>> {
  return http.request<IApiResponseData<UserInfoResp>>({
    url: `/api/v1/user/get_user_info`,
    method: "get",
    data: data
  });
}

/** "修改用户信息" */
export function updateUserInfoApi(
  data?: UserInfoReq
): Promise<IApiResponseData<EmptyResp>> {
  return http.request<IApiResponseData<EmptyResp>>({
    url: `/api/v1/user/update_user_info`,
    method: "post",
    data: data
  });
}

/** "更换用户头像" */
export function updateUserAvatarApi(
  data?: EmptyReq
): Promise<IApiResponseData<EmptyResp>> {
  return http.request<IApiResponseData<EmptyResp>>({
    url: `/api/v1/user/update_user_avatar`,
    method: "post",
    data: data
  });
}
