import http from "@/utils/request"
import { Category, BatchResult, CategoryDetailsDTO } from "./types"

/** 创建文章分类 */
export function createCategoryApi(data: Category): Promise<IApiResponseData<Category>> {
  return http.request<IApiResponseData<Category>>({
    url: `/api/v1/category`,
    method: "post",
    data: data,
  })
}

/** 更新文章分类 */
export function updateCategoryApi(data: Category): Promise<IApiResponseData<Category>> {
  return http.request<IApiResponseData<Category>>({
    url: `/api/v1/category`,
    method: "put",
    data: data,
  })
}

/** 删除文章分类 */
export function deleteCategoryApi(id: number): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: `/api/v1/category/${id}`,
    method: "delete",
  })
}

/** 查询文章分类 */
export function findCategoryApi(id: number): Promise<IApiResponseData<Category>> {
  return http.request<IApiResponseData<Category>>({
    url: `/api/v1/category/${id}`,
    method: "get",
  })
}

/** 批量删除文章分类 */
export function deleteCategoryByIdsApi(data: number[]): Promise<IApiResponseData<BatchResult>> {
  return http.request<IApiResponseData<BatchResult>>({
    url: `/api/v1/category/batch_delete`,
    method: "delete",
    data: data,
  })
}

/** 分页获取文章分类列表 */
export function findCategoryListApi(page: PageQuery): Promise<IApiResponseData<PageResult<Category>>> {
  return http.request<IApiResponseData<PageResult<Category>>>({
    url: `/api/v1/category/list`,
    method: "post",
    data: page,
  })
}

/** 分页获取文章分类详情列表 */
export function findCategoryDetailsListApi(page: PageQuery): Promise<IApiResponseData<PageResult<CategoryDetailsDTO>>> {
  return http.request<IApiResponseData<PageResult<CategoryDetailsDTO>>>({
    url: `/api/v1/category/list/details`,
    method: "post",
    data: page,
  })
}
