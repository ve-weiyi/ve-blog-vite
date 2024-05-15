import http from "@/utils/request";

/** 查询聊天记录 */
export function webSocketApi(): Promise<any> {
  return http.request<any>({
    url: `/api/v1/ws`,
    method: "get"
  });
}
