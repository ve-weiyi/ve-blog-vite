import request from "@/utils/request"
import type { PageResp, EmptyResp, IdReq, TalkDetails, PageQuery } from "./types"

/** "查询说说" */
export function findTalkApi(data?: IdReq): Promise<IApiResponseData<TalkDetails>> {
  return request({
    url: '/api/v1/talk/find_talk',
    method: 'post',
    data: data,
  })
}
/** "分页获取说说列表" */
export function findTalkListApi(data?: PageQuery): Promise<IApiResponseData<PageResp>> {
  return request({
    url: '/api/v1/talk/find_talk_list',
    method: 'post',
    data: data,
  })
}
/** "点赞说说" */
export function likeTalkApi(data?: IdReq): Promise<IApiResponseData<EmptyResp>> {
  return request({
    url: '/api/v1/talk/like_talk',
    method: 'put',
    data: data,
  })
}
