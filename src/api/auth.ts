import http from "@/utils/request"

interface User {
	username: string
	password: string
	code: string
	login_type: string // 登录类型
}

interface UserEmail {
	username: string
}

interface ResetPasswordReq {
	username: string
	password: string
	code: string
}

interface OauthLoginReq {
	platform: string // 平台
	code: string // 授权码
	state: string // 状态
}

interface OauthLoginUrl {
	url: string // 授权地址
}

/** 登录 */
export function loginApi(data: User): Promise<IApiResponseData<any>> {
	return http.request<IApiResponseData<any>>({
		url: `/api/v1//login`,
		method: "post",
		data: data,
	})
}

/** 登出 */
export function logoutApi(): Promise<IApiResponseData<any>> {
	return http.request<IApiResponseData<any>>({
		url: `/api/v1//logout`,
		method: "get",
	})
}

/** 注销 */
export function logoffApi(): Promise<IApiResponseData<any>> {
	return http.request<IApiResponseData<any>>({
		url: `/api/v1//logoff`,
		method: "post",
	})
}

/** 注册 */
export function registerApi(data: User): Promise<IApiResponseData<any>> {
	return http.request<IApiResponseData<any>>({
		url: `/api/v1//register`,
		method: "post",
		data: data,
	})
}

/** 发送注册邮件 */
export function registerEmailApi(data: UserEmail): Promise<IApiResponseData<any>> {
	return http.request<IApiResponseData<any>>({
		url: `/api/v1//register/email`,
		method: "post",
		data: data,
	})
}

/** 发送忘记密码邮件 */
export function forgetPasswordEmailApi(data: UserEmail): Promise<IApiResponseData<any>> {
	return http.request<IApiResponseData<any>>({
		url: `/api/v1//forget/password`,
		method: "post",
		data: data,
	})
}

/** 重置密码 */
export function resetPasswordApi(data: ResetPasswordReq): Promise<IApiResponseData<any>> {
	return http.request<IApiResponseData<any>>({
		url: `/api/v1//forget/reset_password`,
		method: "post",
		data: data,
	})
}

/** 获取授权地址 */
export function oauthLoginApi(data: OauthLoginReq): Promise<IApiResponseData<OauthLoginUrl>> {
	return http.request<IApiResponseData<OauthLoginUrl>>({
		url: `/api/v1//oauth/login`,
		method: "post",
		data: data,
	})
}

/** 获取授权地址 */
export function getAuthorizeUrlApi(data: OauthLoginReq): Promise<IApiResponseData<OauthLoginUrl>> {
	return http.request<IApiResponseData<OauthLoginUrl>>({
		url: `/api/v1//oauth/url`,
		method: "post",
		data: data,
	})
}
