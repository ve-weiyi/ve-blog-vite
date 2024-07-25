import request from "@/utils/request"
import type { PageResp, PageQuery } from "./types"

/** "分页获取页面列表" */
export function findPageListApi(data?: PageQuery): Promise<IApiResponse<PageResp>> {
  return request({
    url: "/api/v1/page/find_page_list",
    method: "post",
    data: data,
  })
}
