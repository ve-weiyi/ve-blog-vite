import http from '@/utils/request'

/** 增 */
export function createPhotoAlbumApi(data: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/admin/photoAlbum/create',
    method: 'post',
    data,
  })
}

/** 改 */
export function updatePhotoAlbumApi(data: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/admin/photoAlbum/update',
    method: 'put',
    data,
  })
}

/** 删 删除单个*/
export function deletePhotoAlbumApi(data: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/admin/photoAlbum/delete',
    method: 'delete',
    data,
  })
}

/** 删除 批量操作 */
export function deleteByIdsPhotoAlbumApi(ids: number[]): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/admin/photoAlbum/deleteByIds',
    method: 'delete',
    data: ids,
  })
}

/** 查 查询单个*/
export function getPhotoAlbumApi(data: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/blog/photoAlbum/find',
    method: 'post',
    data: data,
  })
}

/** 查 列表*/
export function getPhotoAlbumListApi(page: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/blog/photoAlbum/list',
    method: 'get',
    params: page,
  })
}
