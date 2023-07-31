import http from "@/utils/request"

export interface Api {
  id: number // 主键id
  name: string // api名称
  path: string // api路径
  method: string // api请求方法
  group: string // api分组
  parent_id: number // 分组id
  traceable: number // 是否追溯操作记录 0需要，1是
  status: number // 状态 1开，2关
  created_at: string // 创建时间
  updated_at: string // 更新时间
}

export interface ChatRecord {
  id: number // 主键
  user_id: number // 用户id
  nickname: string // 昵称
  avatar: string // 头像
  content: string // 聊天内容
  ip_address: string // ip地址
  ip_source: string // ip来源
  type: number // 类型
  created_at: string // 创建时间
  updated_at: string // 更新时间
}

/** 查询聊天记录 */
export function webSocketApi(): Promise<any> {
  return http.request<any>({
    url: `/api/v1/ws`,
    method: "get",
  })
}

/** 关于我 */
export function getAboutMeApi(): Promise<IApiResponseData<Api>> {
  return http.request<IApiResponseData<Api>>({
    url: `/api/v1/about`,
    method: "get",
  })
}

/** 更新我的信息 */
export function updateAboutMeApi(): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: `/api/v1/about`,
    method: "post",
  })
}

/** 获取后台首页信息 */
export function getHomeInfoApi(): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: `/api/v1/home`,
    method: "post",
  })
}

/** 查询聊天记录 */
export function findChatRecordsApi(page: PageQuery): Promise<IApiResponseData<ChatRecord>> {
  return http.request<IApiResponseData<ChatRecord>>({
    url: `/api/v1/chat/records`,
    method: "post",
    data: page,
  })
}
