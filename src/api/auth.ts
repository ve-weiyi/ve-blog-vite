import http from "@/utils/request";
import type {
  EmptyReq,
  EmptyResp,
  LoginReq,
  LoginResp,
  OauthLoginReq,
  OauthLoginUrlResp,
  ResetPasswordReq,
  UserEmailReq
} from "./types";

/** "登录" */
export function loginApi(
  data?: LoginReq
): Promise<IApiResponseData<LoginResp>> {
  return http.request<IApiResponseData<LoginResp>>({
    url: `/api/v1/login`,
    method: "post",
    data: data
  });
}

/** "登出" */
export function logoutApi(
  data?: EmptyReq
): Promise<IApiResponseData<EmptyResp>> {
  return http.request<IApiResponseData<EmptyResp>>({
    url: `/api/v1/logout`,
    method: "post",
    data: data
  });
}

/** "注销" */
export function logoffApi(
  data?: EmptyReq
): Promise<IApiResponseData<EmptyResp>> {
  return http.request<IApiResponseData<EmptyResp>>({
    url: `/api/v1/logoff`,
    method: "post",
    data: data
  });
}

/** "注册" */
export function registerApi(
  data?: LoginReq
): Promise<IApiResponseData<EmptyResp>> {
  return http.request<IApiResponseData<EmptyResp>>({
    url: `/api/v1/register`,
    method: "post",
    data: data
  });
}

/** "发送注册账号邮件" */
export function sendRegisterEmailApi(
  data?: UserEmailReq
): Promise<IApiResponseData<EmptyResp>> {
  return http.request<IApiResponseData<EmptyResp>>({
    url: `/api/v1/send_register_email`,
    method: "post",
    data: data
  });
}

/** "发送忘记密码邮件" */
export function sendForgetEmailApi(
  data?: UserEmailReq
): Promise<IApiResponseData<EmptyResp>> {
  return http.request<IApiResponseData<EmptyResp>>({
    url: `/api/v1/send_forget_email`,
    method: "post",
    data: data
  });
}

/** "重置密码" */
export function resetPasswordApi(
  data?: ResetPasswordReq
): Promise<IApiResponseData<EmptyResp>> {
  return http.request<IApiResponseData<EmptyResp>>({
    url: `/api/v1/reset_password`,
    method: "post",
    data: data
  });
}

/** "第三方登录" */
export function oauthLoginApi(
  data?: OauthLoginReq
): Promise<IApiResponseData<LoginResp>> {
  return http.request<IApiResponseData<LoginResp>>({
    url: `/api/v1/oauth_login`,
    method: "post",
    data: data
  });
}

/** "第三方登录授权地址" */
export function oauthAuthorizeUrlApi(
  data?: OauthLoginReq
): Promise<IApiResponseData<OauthLoginUrlResp>> {
  return http.request<IApiResponseData<OauthLoginUrlResp>>({
    url: `/api/v1/oauth_authorize_url`,
    method: "post",
    data: data
  });
}
