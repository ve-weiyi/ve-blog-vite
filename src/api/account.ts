import http from "@/utils/request";
import type {
  EmptyResp,
  PageQuery,
  PageResp,
  UpdateUserRolesReq,
  UpdateUserStatusReq
} from "./types";

/** "查询用户列表" */
export function findUserListApi(
  data?: PageQuery
): Promise<IApiResponseData<PageResp>> {
  return http.request<IApiResponseData<PageResp>>({
    url: `/api/v1/user/find_user_list`,
    method: "post",
    data: data
  });
}

/** "查询在线用户列表" */
export function findOnlineUserListApi(
  data?: PageQuery
): Promise<IApiResponseData<PageResp>> {
  return http.request<IApiResponseData<PageResp>>({
    url: `/api/v1/user/find_online_user_list`,
    method: "post",
    data: data
  });
}

/** "获取用户分布地区" */
export function findUserAreasApi(
  data?: PageQuery
): Promise<IApiResponseData<PageResp>> {
  return http.request<IApiResponseData<PageResp>>({
    url: `/api/v1/user/find_user_areas`,
    method: "post",
    data: data
  });
}

/** "修改用户状态" */
export function updateUserStatusApi(
  data?: UpdateUserStatusReq
): Promise<IApiResponseData<EmptyResp>> {
  return http.request<IApiResponseData<EmptyResp>>({
    url: `/api/v1/user/update_user_status`,
    method: "post",
    data: data
  });
}

/** "修改用户角色" */
export function updateUserRolesApi(
  data?: UpdateUserRolesReq
): Promise<IApiResponseData<EmptyResp>> {
  return http.request<IApiResponseData<EmptyResp>>({
    url: `/api/v1/user/update_user_roles`,
    method: "post",
    data: data
  });
}
