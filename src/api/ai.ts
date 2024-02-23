import http from "@/utils/request"
import { ChatMessage, ChatResponse } from "./types"

/** 和Chatgpt聊天 */
export function chatAIApi(data: ChatMessage[]): Promise<IApiResponseData<ChatResponse>> {
  return http.request<IApiResponseData<ChatResponse>>({
    url: `/api/v1/ai/chat`,
    method: "post",
    data: data,
  })
}

/** Chatgpt扮演角色 */
export function chatCosApi(data: string): Promise<IApiResponseData<ChatResponse>> {
  return http.request<IApiResponseData<ChatResponse>>({
    url: `/api/v1/ai/cos`,
    method: "post",
    data: data,
  })
}
