import request from "@/utils/request"
import type { PageQuery, PageResp } from "./types"

/** "分页获取文章分类列表" */
export function findCategoryListApi(data?: PageQuery): Promise<IApiResponseData<PageResp>> {
  return request({
    url: '/api/v1/category/find_category_list',
    method: 'post',
    data: data,
  })
}
