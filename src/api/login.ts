import http from "@/utils/request"

export function loginApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/user/login",
    method: "post",
    data,
  })
}

export function registerApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/user/register",
    method: "post",
    data,
  })
}

export function logoutApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/user/logout",
    method: "post",
    data,
  })
}

export function getOauthUrlApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/user/oauth/url",
    method: "post",
    data,
  })
}

export function oauthLoginApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/user/oauth/login",
    method: "post",
    data,
  })
}

export function forgetPasswordApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/user/password/forget",
    method: "post",
    data,
  })
}

export function resetPasswordApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/user/password/reset",
    method: "post",
    data,
  })
}

export function registerEmailApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/user/register/email",
    method: "post",
    data,
  })
}
