import http from "@/utils/request"
import { BatchResult, Tag, TagDetailsDTO } from "./types"

/** 创建文章标签 */
export function createTagApi(data: Tag): Promise<IApiResponseData<Tag>> {
  return http.request<IApiResponseData<Tag>>({
    url: `/api/v1/tag`,
    method: "post",
    data: data,
  })
}

/** 更新文章标签 */
export function updateTagApi(data: Tag): Promise<IApiResponseData<Tag>> {
  return http.request<IApiResponseData<Tag>>({
    url: `/api/v1/tag`,
    method: "put",
    data: data,
  })
}

/** 删除文章标签 */
export function deleteTagApi(id: number): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: `/api/v1/tag/${id}`,
    method: "delete",
  })
}

/** 查询文章标签 */
export function findTagApi(id: number): Promise<IApiResponseData<Tag>> {
  return http.request<IApiResponseData<Tag>>({
    url: `/api/v1/tag/${id}`,
    method: "get",
  })
}

/** 批量删除文章标签 */
export function deleteTagByIdsApi(data: number[]): Promise<IApiResponseData<BatchResult>> {
  return http.request<IApiResponseData<BatchResult>>({
    url: `/api/v1/tag/batch_delete`,
    method: "delete",
    data: data,
  })
}

/** 分页获取文章标签列表 */
export function findTagListApi(page: PageQuery): Promise<IApiResponseData<PageResult<Tag[]>>> {
  return http.request<IApiResponseData<PageResult<Tag[]>>>({
    url: `/api/v1/tag/list`,
    method: "post",
    data: page,
  })
}

/** 分页获取文章分类详情列表 */
export function findTagDetailsListApi(page: PageQuery): Promise<IApiResponseData<PageResult<TagDetailsDTO[]>>> {
  return http.request<IApiResponseData<PageResult<TagDetailsDTO[]>>>({
    url: `/api/v1/tag/details_list`,
    method: "post",
    data: page,
  })
}
