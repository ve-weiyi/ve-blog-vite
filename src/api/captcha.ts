import http from "@/utils/request"

export function sendCaptchaEmailApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/captcha/email",
    method: "post",
    data,
  })
}

export function getCaptchaImageApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/captcha/image",
    method: "post",
    data,
  })
}

export function verifyCaptchaApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/captcha/verify",
    method: "post",
    data,
  })
}
