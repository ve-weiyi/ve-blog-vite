import request from "@/utils/request"
import type { EmptyReq, UserInfoResp, EmptyResp, UserInfoReq } from "./types"

/** "获取用户信息" */
export function getUserInfoApi(data?: EmptyReq): Promise<IApiResponseData<UserInfoResp>> {
  return request({
    url: '/api/v1/user/get_user_info',
    method: 'get',
    data: data,
  })
}
/** "更换用户头像" */
export function updateUserAvatarApi(data?: EmptyReq): Promise<IApiResponseData<EmptyResp>> {
  return request({
    url: '/api/v1/user/update_user_avatar',
    method: 'post',
    data: data,
  })
}
/** "修改用户信息" */
export function updateUserInfoApi(data?: UserInfoReq): Promise<IApiResponseData<EmptyResp>> {
  return request({
    url: '/api/v1/user/update_user_info',
    method: 'post',
    data: data,
  })
}
