import request from "@/utils/request"
import type { PageQuery, PageResp } from "./types"

/** "分页获取标签列表" */
export function getTagListApi(data?: PageQuery): Promise<IApiResponse<PageResp>> {
  return request({
    url: "/api/v1/tag/get_tag_list",
    method: "post",
    data: data,
  })
}
