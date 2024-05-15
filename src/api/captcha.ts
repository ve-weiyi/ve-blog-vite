import http from "@/utils/request";
import type {
  CaptchaDTO,
  CaptchaEmailReq,
  CaptchaReq,
  CaptchaVerifyReq
} from "./types";

/** 发送验证码 */
export function sendCaptchaEmailApi(
  data: CaptchaEmailReq
): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: `/api/v1/captcha/email`,
    method: "post",
    data: data
  });
}

/** 生成验证码 */
export function getCaptchaImageApi(
  data: CaptchaReq
): Promise<IApiResponseData<CaptchaDTO>> {
  return http.request<IApiResponseData<CaptchaDTO>>({
    url: `/api/v1/captcha/image`,
    method: "post",
    data: data
  });
}

/** 检验验证码 */
export function verifyCaptchaApi(
  data: CaptchaVerifyReq
): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: `/api/v1/captcha/verify`,
    method: "post",
    data: data
  });
}
