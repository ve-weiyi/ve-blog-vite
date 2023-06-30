import http from '@/utils/request'

export function getUserinfoApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/user/info',
    method: 'get',
    data,
  })
}
