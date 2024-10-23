import request from "@/utils/request"
import type { ResetPasswordReq, UserEmailReq, LoginReq, LoginResp, OauthLoginReq, EmptyReq, EmptyResp, OauthLoginUrlResp } from "./types"

/** "登录" */
export function loginApi(data?: LoginReq): Promise<IApiResponse<LoginResp>> {
  return request({
    url: "/api/v1/login",
    method: "post",
    data: data,
  })
}
/** "第三方登录" */
export function oauthLoginApi(data?: OauthLoginReq): Promise<IApiResponse<LoginResp>> {
  return request({
    url: "/api/v1/oauth_login",
    method: "post",
    data: data,
  })
}
/** "注销" */
export function logoffApi(data?: EmptyReq): Promise<IApiResponse<EmptyResp>> {
  return request({
    url: "/api/v1/logoff",
    method: "post",
    data: data,
  })
}
/** "登出" */
export function logoutApi(data?: EmptyReq): Promise<IApiResponse<EmptyResp>> {
  return request({
    url: "/api/v1/logout",
    method: "post",
    data: data,
  })
}
/** "第三方登录授权地址" */
export function oauthAuthorizeUrlApi(data?: OauthLoginReq): Promise<IApiResponse<OauthLoginUrlResp>> {
  return request({
    url: "/api/v1/oauth_authorize_url",
    method: "post",
    data: data,
  })
}
/** "注册" */
export function registerApi(data?: LoginReq): Promise<IApiResponse<EmptyResp>> {
  return request({
    url: "/api/v1/register",
    method: "post",
    data: data,
  })
}
/** "重置密码" */
export function resetPasswordApi(data?: ResetPasswordReq): Promise<IApiResponse<EmptyResp>> {
  return request({
    url: "/api/v1/reset_password",
    method: "post",
    data: data,
  })
}
/** "发送忘记密码邮件" */
export function sendForgetEmailApi(data?: UserEmailReq): Promise<IApiResponse<EmptyResp>> {
  return request({
    url: "/api/v1/send_forget_email",
    method: "post",
    data: data,
  })
}
/** "发送注册账号邮件" */
export function sendRegisterEmailApi(data?: UserEmailReq): Promise<IApiResponse<EmptyResp>> {
  return request({
    url: "/api/v1/send_register_email",
    method: "post",
    data: data,
  })
}
