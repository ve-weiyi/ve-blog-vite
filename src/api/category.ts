import request from "@/utils/request"
import type { PageQuery, PageResp } from "./types"

/** "分页获取文章分类列表" */
export function getCategoryListApi(data?: PageQuery): Promise<IApiResponse<PageResp>> {
  return request({
    url: "/api/v1/category/get_category_list",
    method: "post",
    data: data,
  })
}
