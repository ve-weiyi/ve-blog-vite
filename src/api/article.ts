import http from '@/utils/request'

/** 增 */
export function createArticleApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/admin/article/create',
    method: 'post',
    data,
  })
}

/** 改 */
export function updateArticleApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/admin/article/update',
    method: 'put',
    data,
  })
}

/** 删 删除单个*/
export function deleteArticleApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/admin/article/delete',
    method: 'delete',
    data,
  })
}

/** 删除 批量操作 */
export function deleteByIdsArticleApi(ids: number[]): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/admin/article/deleteByIds',
    method: 'delete',
    data: ids,
  })
}

/** 查 查询单个*/
export function getArticleApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/blog/article/find',
    method: 'post',
    data: data,
  })
}

/** 查 列表*/
export function getArticleListApi(page: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/blog/article/list',
    method: 'post',
    data: page,
  })
}

/** 查 列表*/
export function getArticleListByConditionApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/blog/article/condition',
    method: 'post',
    data: data,
  })
}

/** 查 列表*/
export function getArticleArchivesApi(page: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/blog/article/archives',
    method: 'get',
    params: page,
  })
}
