import request from "@/utils/request"
import type { EmptyReq, UserInfoResp, UserInfoReq, EmptyResp } from "./types"

/** "获取用户信息" */
export function getUserInfoApi(data?: EmptyReq): Promise<IApiResponse<UserInfoResp>> {
  return request({
    url: "/api/v1/user/get_user_info",
    method: "get",
    data: data,
  })
}
/** "修改用户信息" */
export function updateUserInfoApi(data?: UserInfoReq): Promise<IApiResponse<EmptyResp>> {
  return request({
    url: "/api/v1/user/update_user_info",
    method: "post",
    data: data,
  })
}
