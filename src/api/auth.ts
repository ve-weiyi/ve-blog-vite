import http from "@/utils/request"

export function loginApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/login",
    method: "post",
    data,
  })
}

export function registerApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/register",
    method: "post",
    data,
  })
}

export function logoutApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/logout",
    method: "post",
    data,
  })
}

export function getOauthUrlApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/oauth/url",
    method: "post",
    data,
  })
}

export function oauthLoginApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/oauth/login",
    method: "post",
    data,
  })
}

export function registerEmailApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/register/email",
    method: "post",
    data,
  })
}
