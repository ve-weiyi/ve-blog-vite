import http from "@/utils/request"
import { BatchResult, FriendLink } from "./types"

/** 创建友链 */
export function createFriendLinkApi(data: FriendLink): Promise<IApiResponseData<FriendLink>> {
  return http.request<IApiResponseData<FriendLink>>({
    url: `/api/v1/friend_link`,
    method: "post",
    data: data,
  })
}

/** 更新友链 */
export function updateFriendLinkApi(data: FriendLink): Promise<IApiResponseData<FriendLink>> {
  return http.request<IApiResponseData<FriendLink>>({
    url: `/api/v1/friend_link`,
    method: "put",
    data: data,
  })
}

/** 删除友链 */
export function deleteFriendLinkApi(id: number): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: `/api/v1/friend_link/${id}`,
    method: "delete",
  })
}

/** 查询友链 */
export function findFriendLinkApi(id: number): Promise<IApiResponseData<FriendLink>> {
  return http.request<IApiResponseData<FriendLink>>({
    url: `/api/v1/friend_link/${id}`,
    method: "get",
  })
}

/** 批量删除友链 */
export function deleteFriendLinkByIdsApi(data: number[]): Promise<IApiResponseData<BatchResult>> {
  return http.request<IApiResponseData<BatchResult>>({
    url: `/api/v1/friend_link/batch_delete`,
    method: "delete",
    data: data,
  })
}

/** 分页获取友链列表 */
export function findFriendLinkListApi(page: PageQuery): Promise<IApiResponseData<PageResult<FriendLink[]>>> {
  return http.request<IApiResponseData<PageResult<FriendLink[]>>>({
    url: `/api/v1/friend_link/list`,
    method: "post",
    data: page,
  })
}
