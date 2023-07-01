import http from '@/utils/request'

/** 增 */
export function createCommentApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/comment/create',
    method: 'post',
    data,
  })
}

/** 改 */
export function updateCommentApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/comment/update',
    method: 'put',
    data,
  })
}

/** 删 */
export function deleteCommentApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/comment/delete',
    method: 'delete',
    data,
  })
}

/** 查 */
export function queryCommentApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/comment/query',
    method: 'post',
    data: data,
  })
}

/** 删除 批量操作 */
export function deleteByIdsCommentApi(ids: number[]): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/comment/deleteByIds',
    method: 'delete',
    data: ids,
  })
}

/** 查 列表*/
export function findCommentListApi(page?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/comment/list',
    method: 'post',
    data: page,
  })
}
