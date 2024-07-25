import request from "@/utils/request"
import type { PageResp, PageQuery } from "./types"

/** "查询聊天记录" */
export function getChatRecordsApi(data?: PageQuery): Promise<IApiResponse<PageResp>> {
  return request({
    url: "/api/v1/chat/records",
    method: "post",
    data: data,
  })
}
