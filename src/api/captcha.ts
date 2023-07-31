import http from "@/utils/request"

interface CaptchaEmail {
	email: string // 目标邮箱
	service: string // 服务
	check: boolean // 是否检查邮箱是否存在
}

/** 发送验证码 */
export function sendCaptchaEmailApi(data: CaptchaEmail): Promise<IApiResponseData<any>> {
	return http.request<IApiResponseData<any>>({
		url: `/api/v1//captcha/email`,
		method: "post",
		data: data,
	})
}

/** 生成验证码 */
export function getCaptchaImageApi(): Promise<IApiResponseData<any>> {
	return http.request<IApiResponseData<any>>({
		url: `/api/v1//captcha/image`,
		method: "post",
	})
}

/** 检验验证码 */
export function verifyCaptchaApi(): Promise<IApiResponseData<any>> {
	return http.request<IApiResponseData<any>>({
		url: `/api/v1//captcha/verify`,
		method: "post",
	})
}
