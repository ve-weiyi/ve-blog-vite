import http from "@/utils/request"

interface Remark {
	id: number // 主键id
	nickname: string // 昵称
	avatar: string // 头像
	message_content: string // 留言内容
	ip_address: string // 用户ip
	ip_source: string // 用户地址
	time: number // 弹幕速度
	is_review: boolean // 是否审核
	created_at: string // 发布时间
	updated_at: string // 修改时间
}

/** 创建留言 */
export function createRemarkApi(data: Remark): Promise<IApiResponseData<Remark>> {
	return http.request<IApiResponseData<Remark>>({
		url: `/api/v1//remark`,
		method: "post",
		data: data,
	})
}

/** 更新留言 */
export function updateRemarkApi(data: Remark): Promise<IApiResponseData<Remark>> {
	return http.request<IApiResponseData<Remark>>({
		url: `/api/v1//remark`,
		method: "put",
		data: data,
	})
}

/** 删除留言 */
export function deleteRemarkApi(id: string): Promise<IApiResponseData<any>> {
	return http.request<IApiResponseData<any>>({
		url: `/api/v1//remark/${id}`,
		method: "delete",
	})
}

/** 查询留言 */
export function findRemarkApi(id: string): Promise<IApiResponseData<Remark>> {
	return http.request<IApiResponseData<Remark>>({
		url: `/api/v1//remark/${id}`,
		method: "get",
	})
}

/** 批量删除留言 */
export function deleteRemarkByIdsApi(data: number[]): Promise<IApiResponseData<any>> {
	return http.request<IApiResponseData<any>>({
		url: `/api/v1//remark/batch_delete`,
		method: "delete",
		data: data,
	})
}

/** 分页获取留言列表 */
export function findRemarkListApi(page: PageQuery): Promise<IApiResponseData<PageResult<PageResult<Remark>>>> {
	return http.request<IApiResponseData<PageResult<PageResult<Remark>>>>({
		url: `/api/v1//remark/list`,
		method: "post",
		data: page,
	})
}
