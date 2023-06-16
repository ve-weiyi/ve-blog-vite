import http from '@/utils/request'

/** 增 */
export function createLinkApi(data: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/admin/link/create',
    method: 'post',
    data,
  })
}

/** 改 */
export function updateLinkApi(data: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/admin/link/update',
    method: 'put',
    data,
  })
}

/** 删 删除单个*/
export function deleteLinkApi(data: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/admin/link/delete',
    method: 'delete',
    data,
  })
}

/** 删除 批量操作 */
export function deleteByIdsLinkApi(ids: number[]): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/admin/link/deleteByIds',
    method: 'delete',
    data: ids,
  })
}

/** 查 查询单个*/
export function getLinkApi(data: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/blog/link/find',
    method: 'post',
    data: data,
  })
}

/** 查 列表*/
export function getLinkListApi(page: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/blog/link/list',
    method: 'get',
    params: page,
  })
}
