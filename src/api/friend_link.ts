import http from "@/utils/request"

interface FriendLink {
	id: number
	link_name: string // 链接名
	link_avatar: string // 链接头像
	link_address: string // 链接地址
	link_intro: string // 链接介绍
	created_at: string // 创建时间
	updated_at: string // 更新时间
}

/** 创建友链 */
export function createFriendLinkApi(data: FriendLink): Promise<IApiResponseData<FriendLink>> {
	return http.request<IApiResponseData<FriendLink>>({
		url: `/api/v1//friend_link`,
		method: "post",
		data: data,
	})
}

/** 更新友链 */
export function updateFriendLinkApi(data: FriendLink): Promise<IApiResponseData<FriendLink>> {
	return http.request<IApiResponseData<FriendLink>>({
		url: `/api/v1//friend_link`,
		method: "put",
		data: data,
	})
}

/** 删除友链 */
export function deleteFriendLinkApi(id: string): Promise<IApiResponseData<any>> {
	return http.request<IApiResponseData<any>>({
		url: `/api/v1//friend_link/${id}`,
		method: "delete",
	})
}

/** 查询友链 */
export function findFriendLinkApi(id: string): Promise<IApiResponseData<FriendLink>> {
	return http.request<IApiResponseData<FriendLink>>({
		url: `/api/v1//friend_link/${id}`,
		method: "get",
	})
}

/** 批量删除友链 */
export function deleteFriendLinkByIdsApi(data: number[]): Promise<IApiResponseData<any>> {
	return http.request<IApiResponseData<any>>({
		url: `/api/v1//friend_link/batch_delete`,
		method: "delete",
		data: data,
	})
}

/** 分页获取友链列表 */
export function findFriendLinkListApi(page: PageQuery): Promise<IApiResponseData<PageResult<PageResult<FriendLink>>>> {
	return http.request<IApiResponseData<PageResult<PageResult<FriendLink>>>>({
		url: `/api/v1//friend_link/list`,
		method: "post",
		data: page,
	})
}
