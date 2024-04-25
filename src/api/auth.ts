import http from "@/utils/request"
import type {
  EmptyReq,
  EmptyResp,
  LoginReq,
  LoginResp,
  OauthLoginReq,
  OauthLoginUrl,
  ResetPasswordReq,
  UserEmailReq,
} from "./types"

/** "登录" */
export function loginApi(data?: LoginReq): Promise<IApiResponseData<LoginResp>> {
  return http.request<IApiResponseData<LoginResp>>({
    url: `/api/v1/login`,
    method: "post",
    data: data,
  })
}

/** "登出" */
export function logoutApi(data?: EmptyReq): Promise<IApiResponseData<EmptyResp>> {
  return http.request<IApiResponseData<EmptyResp>>({
    url: `/api/v1/logout`,
    method: "post",
    data: data,
  })
}

/** "注销" */
export function logoffApi(data?: EmptyReq): Promise<IApiResponseData<EmptyResp>> {
  return http.request<IApiResponseData<EmptyResp>>({
    url: `/api/v1/logoff`,
    method: "post",
    data: data,
  })
}

/** "注册" */
export function registerApi(data?: LoginReq): Promise<IApiResponseData<EmptyResp>> {
  return http.request<IApiResponseData<EmptyResp>>({
    url: `/api/v1/register`,
    method: "post",
    data: data,
  })
}

/** "发送注册邮件" */
export function registerEmailApi(data?: UserEmailReq): Promise<IApiResponseData<EmptyResp>> {
  return http.request<IApiResponseData<EmptyResp>>({
    url: `/api/v1/register/email`,
    method: "post",
    data: data,
  })
}

/** "发送忘记密码邮件" */
export function forgetPasswordEmailApi(data?: UserEmailReq): Promise<IApiResponseData<EmptyResp>> {
  return http.request<IApiResponseData<EmptyResp>>({
    url: `/api/v1/forget/email`,
    method: "post",
    data: data,
  })
}

/** "重置密码" */
export function resetPasswordApi(data?: ResetPasswordReq): Promise<IApiResponseData<EmptyResp>> {
  return http.request<IApiResponseData<EmptyResp>>({
    url: `/api/v1/forget/reset_password`,
    method: "post",
    data: data,
  })
}

/** "第三方登录" */
export function oauthLoginApi(data?: OauthLoginReq): Promise<IApiResponseData<LoginResp>> {
  return http.request<IApiResponseData<LoginResp>>({
    url: `/api/v1/oauth/login`,
    method: "post",
    data: data,
  })
}

/** "获取授权地址" */
export function getOauthAuthorizeUrlApi(data?: OauthLoginReq): Promise<IApiResponseData<OauthLoginUrl>> {
  return http.request<IApiResponseData<OauthLoginUrl>>({
    url: `/api/v1/oauth/authorize_url`,
    method: "post",
    data: data,
  })
}
