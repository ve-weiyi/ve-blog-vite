import http from '@/utils/request'

/** 增 */
export function createPageApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/admin/page/create',
    method: 'post',
    data,
  })
}

/** 改 */
export function updatePageApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/admin/page/update',
    method: 'put',
    data,
  })
}

/** 删 删除单个*/
export function deletePageApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/admin/page/delete',
    method: 'delete',
    data,
  })
}

/** 删除 批量操作 */
export function deleteByIdsPageApi(ids: number[]): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/admin/page/deleteByIds',
    method: 'delete',
    data: ids,
  })
}

/** 查 查询单个*/
export function getPageApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/blog/page/find',
    method: 'post',
    data: data,
  })
}

/** 查 列表*/
export function getPageListApi(page?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/blog/page/list',
    method: 'get',
    params: page,
  })
}
