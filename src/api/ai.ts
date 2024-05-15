import http from "@/utils/request";
import type { ChatHistory, ChatMessage, ChatResponse } from "./types";

/** 和Chatgpt聊天 */
export function chatAIApi(
  data: ChatMessage[]
): Promise<IApiResponseData<ChatResponse>> {
  return http.request<IApiResponseData<ChatResponse>>({
    url: `/api/v1/ai/chat`,
    method: "post",
    data: data
  });
}

/** Chatgpt扮演角色 */
export function chatCosApi(
  data: string
): Promise<IApiResponseData<ChatResponse>> {
  return http.request<IApiResponseData<ChatResponse>>({
    url: `/api/v1/ai/cos`,
    method: "post",
    data: data
  });
}

/** 和Chatgpt聊天 */
export function chatStreamApi(
  data: ChatMessage
): Promise<IApiResponseData<ChatResponse>> {
  return http.request<IApiResponseData<ChatResponse>>({
    url: `/api/v1/ai/chat/stream`,
    method: "post",
    data: data
  });
}

/** 和Chatgpt聊天 */
export function chatAssistantApi(
  data: ChatMessage
): Promise<IApiResponseData<ChatResponse>> {
  return http.request<IApiResponseData<ChatResponse>>({
    url: `/api/v1/ai/assistant`,
    method: "post",
    data: data
  });
}

/** 和Chatgpt聊天 */
export function chatAssistantHistoryApi(
  data: ChatHistory
): Promise<IApiResponseData<ChatMessage[]>> {
  return http.request<IApiResponseData<ChatMessage[]>>({
    url: `/api/v1/ai/assistant/history`,
    method: "post",
    data: data
  });
}
