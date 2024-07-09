import request from "@/utils/request"
import type { PageQuery, PageResp } from "./types"

/** "分页获取友链列表" */
export function findFriendLinkListApi(data?: PageQuery): Promise<IApiResponseData<PageResp>> {
  return request({
    url: '/api/v1/friend_link/find_friend_link_list',
    method: 'post',
    data: data,
  })
}
