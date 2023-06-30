import http from '@/utils/request'

/** 增 */
export function getAboutApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/admin/article/create',
    method: 'post',
    data,
  })
}
