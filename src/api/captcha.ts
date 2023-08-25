import http from "@/utils/request"
import { CaptchaEmail, Captcha, CaptchaResp, CaptchaVerify } from "./types"

/** 发送验证码 */
export function sendCaptchaEmailApi(data: CaptchaEmail): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: `/api/v1/captcha/email`,
    method: "post",
    data: data,
  })
}

/** 生成验证码 */
export function getCaptchaImageApi(data: Captcha): Promise<IApiResponseData<CaptchaResp>> {
  return http.request<IApiResponseData<CaptchaResp>>({
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
