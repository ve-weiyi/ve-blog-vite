import http from "@/utils/request"
import {} from "./types"

/** 和Chatgpt聊天 */
export function chatAIApi(data: ChatMessage[]): Promise<IApiResponseData> {
  return http.request<IApiResponseData>({
    url: `/api/v1/ai/chat`,
    method: "post",
    data: data,
  })
}

/** Chatgpt扮演角色 */
export function chatCosApi(data: string): Promise<IApiResponseData> {
  return http.request<IApiResponseData>({
    url: `/api/v1/ai/cos`,
    method: "post",
    data: data,
  })
}
