import http from "@/utils/request"

export interface CaptchaEmail {
  email: string // 目标邮箱
  service: string // 服务
  check: boolean // 是否检查邮箱是否存在
}

export interface Captcha {
  captcha_type: string
  height: number // Height png height in pixel.
  width: number // Width Captcha png width in pixel.
  length: number // DefaultLen Default number of digits in captcha solution.
}

export interface CaptchaVerify {
  id: string
  code: string
}

/** 发送验证码 */
export function sendCaptchaEmailApi(data: CaptchaEmail): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: `/api/v1/captcha/email`,
    method: "post",
    data: data,
  })
}

/** 生成验证码 */
export function getCaptchaImageApi(data: Captcha): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: `/api/v1/captcha/image`,
    method: "post",
    data: data,
  })
}

/** 检验验证码 */
export function verifyCaptchaApi(data: CaptchaVerify): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: `/api/v1/captcha/verify`,
    method: "post",
    data: data,
  })
}
