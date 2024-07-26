import request from "@/utils/request"

/** 发送验证码 */
export function sendCaptchaEmailApi(
  data: any,
): Promise<IApiResponse<any>> {
  return request({
    url: `/api/v1/captcha/email`,
    method: "post",
    data: data,
  })
}

/** 生成验证码 */
export function getCaptchaImageApi(
  data: any,
): Promise<IApiResponse<any>> {
  return request({
    url: `/api/v1/captcha/image`,
    method: "post",
    data: data,
  })
}

/** 检验验证码 */
export function verifyCaptchaApi(
  data: any,
): Promise<IApiResponse<any>> {
  return request({
    url: `/api/v1/captcha/verify`,
    method: "post",
    data: data,
  })
}
