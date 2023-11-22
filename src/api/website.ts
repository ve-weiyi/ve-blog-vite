import http from "@/utils/request"
import { ChatRecord, WebsiteConfigReq, BlogHomeInfo, AdminHomeInfo } from "./types"

/** 查询聊天记录 */
export function webSocketApi(): Promise<any> {
  return http.request<any>({
    url: `/api/v1/ws`,
    method: "get",
  })
}

/** 查询聊天记录 */
export function findChatRecordsApi(page: PageQuery): Promise<IApiResponseData<PageResult<ChatRecord>>> {
  return http.request<IApiResponseData<PageResult<ChatRecord>>>({
    url: `/api/v1/chat/records`,
    method: "post",
    data: page,
  })
}

/** 关于我 */
export function getAboutMeApi(): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: `/api/v1/about/me`,
    method: "get",
  })
}

/** 更新我的信息 */
export function updateAboutMeApi(data: string): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: `/api/v1/admin/about/me`,
    method: "post",
    data: data,
  })
}

/** 获取网站配置 */
export function getWebsiteConfigApi(): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: `/api/v1/website/config`,
    method: "get",
  })
}

/** 获取配置 */
export function getConfigApi(data: WebsiteConfigReq): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: `/api/v1/admin/config`,
    method: "post",
    data: data,
  })
}

/** 更新配置 */
export function updateConfigApi(data: WebsiteConfigReq): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: `/api/v1/admin/config`,
    method: "put",
    data: data,
  })
}

/** 获取博客前台首页信息 */
export function getBlogHomeInfoApi(): Promise<IApiResponseData<BlogHomeInfo>> {
  return http.request<IApiResponseData<BlogHomeInfo>>({
    url: `/api/v1/`,
    method: "get",
  })
}

/** 获取后台首页信息 */
export function getAdminHomeInfoApi(): Promise<IApiResponseData<AdminHomeInfo>> {
  return http.request<IApiResponseData<AdminHomeInfo>>({
    url: `/api/v1/admin`,
    method: "get",
  })
}

/** 获取服务器信息 */
export function getSystemStateApi(): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: `/api/v1/admin/system/state`,
    method: "get",
  })
}
