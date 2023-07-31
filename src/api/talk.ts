import http from "@/utils/request"

interface Talk {
	id: number // 说说id
	user_id: number // 用户id
	content: string // 说说内容
	images: string // 图片
	is_top: number // 是否置顶
	status: number // 状态 1.公开 2.私密
	created_at: string // 创建时间
	updated_at: string // 更新时间
}

/** 创建说说 */
export function createTalkApi(data: Talk): Promise<IApiResponseData<Talk>> {
	return http.request<IApiResponseData<Talk>>({
		url: `/api/v1//talk`,
		method: "post",
		data: data,
	})
}

/** 更新说说 */
export function updateTalkApi(data: Talk): Promise<IApiResponseData<Talk>> {
	return http.request<IApiResponseData<Talk>>({
		url: `/api/v1//talk`,
		method: "put",
		data: data,
	})
}

/** 删除说说 */
export function deleteTalkApi(id: string): Promise<IApiResponseData<any>> {
	return http.request<IApiResponseData<any>>({
		url: `/api/v1//talk/${id}`,
		method: "delete",
	})
}

/** 查询说说 */
export function findTalkApi(id: string): Promise<IApiResponseData<Talk>> {
	return http.request<IApiResponseData<Talk>>({
		url: `/api/v1//talk/${id}`,
		method: "get",
	})
}

/** 批量删除说说 */
export function deleteTalkByIdsApi(data: number[]): Promise<IApiResponseData<any>> {
	return http.request<IApiResponseData<any>>({
		url: `/api/v1//talk/batch_delete`,
		method: "delete",
		data: data,
	})
}

/** 分页获取说说列表 */
export function findTalkListApi(page: PageQuery): Promise<IApiResponseData<PageResult<PageResult<Talk>>>> {
	return http.request<IApiResponseData<PageResult<PageResult<Talk>>>>({
		url: `/api/v1//talk/list`,
		method: "post",
		data: page,
	})
}
