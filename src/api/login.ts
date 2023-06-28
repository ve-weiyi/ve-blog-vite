import http from '@/utils/request'

export function loginApi(data: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/login',
    method: 'post',
    data,
  })
}

export function registerApi(data: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/register',
    method: 'post',
    data,
  })
}

export function logoutApi(data: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/logout',
    method: 'post',
    data,
  })
}

export function getAuthorizeUrlApi(data: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/authorize_url',
    method: 'post',
    data,
  })
}
