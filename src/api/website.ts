import http from "@/utils/request"

/** 关于 */
export function getAboutApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/about",
    method: "get",
    data,
  })
}

/** 聊天记录 */
export function findChatRecordsApi(page?: Page): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/chat/records",
    method: "post",
    data: page,
  })
}
