import http from '@/utils/request'

/** 增 */
export function createCategoryApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/admin/category/create',
    method: 'post',
    data,
  })
}

/** 改 */
export function updateCategoryApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/admin/category/update',
    method: 'put',
    data,
  })
}

/** 删 删除单个*/
export function deleteCategoryApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/admin/category/delete',
    method: 'delete',
    data,
  })
}

/** 删除 批量操作 */
export function deleteByIdsCategoryApi(ids: number[]): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/admin/category/deleteByIds',
    method: 'delete',
    data: ids,
  })
}

/** 查 查询单个*/
export function getCategoryApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/blog/category/find',
    method: 'post',
    data: data,
  })
}

/** 查 列表*/
export function getCategoryListApi(page?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: '/api/v1/blog/category/list',
    method: 'get',
    params: page,
  })
}
