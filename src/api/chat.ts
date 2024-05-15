import http from "@/utils/request";
import type { PageQuery, PageResp } from "./types";

/** "查询聊天记录" */
export function findChatRecordsApi(
  data?: PageQuery
): Promise<IApiResponseData<PageResp>> {
  return http.request<IApiResponseData<PageResp>>({
    url: `/api/v1/api/v1/chat/records`,
    method: "post",
    data: data
  });
}
