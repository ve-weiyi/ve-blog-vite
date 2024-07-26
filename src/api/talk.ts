import request from "@/utils/request"
import type { IdReq, Talk, PageQuery, PageResp, EmptyResp } from "./types"

/** "查询说说" */
export function getTalkApi(data?: IdReq): Promise<IApiResponse<Talk>> {
  return request({
    url: "/api/v1/talk/get_talk",
    method: "post",
    data: data,
  })
}
/** "分页获取说说列表" */
export function getTalkListApi(data?: PageQuery): Promise<IApiResponse<PageResp>> {
  return request({
    url: "/api/v1/talk/get_talk_list",
    method: "post",
    data: data,
  })
}
/** "点赞说说" */
export function likeTalkApi(data?: IdReq): Promise<IApiResponse<EmptyResp>> {
  return request({
    url: "/api/v1/talk/like_talk",
    method: "put",
    data: data,
  })
}
