import http from '@/utils/request'

/** 增 */
export function createPhotoApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/admin/photo/create',
    method: 'post',
    data,
  })
}

/** 改 */
export function updatePhotoApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/admin/photo/update',
    method: 'put',
    data,
  })
}

/** 删 删除单个*/
export function deletePhotoApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/admin/photo/delete',
    method: 'delete',
    data,
  })
}

/** 删除 批量操作 */
export function deleteByIdsPhotoApi(ids: number[]): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/admin/photo/deleteByIds',
    method: 'delete',
    data: ids,
  })
}

/** 查 查询单个*/
export function getPhotoApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/blog/photo/find',
    method: 'post',
    data: data,
  })
}

/** 查 列表*/
export function getPhotoListApi(page: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/blog/photo/list',
    method: 'get',
    params: page,
  })
}
