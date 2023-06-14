import http from '@/utils/request'

export function getArticleList(page: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    method: 'get',
    url: '/api/v1/blog/article/list',
    params: page,
  })
}
