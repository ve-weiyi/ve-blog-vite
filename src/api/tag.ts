import http from "@/utils/request"

interface Tag {
	id: number
	tag_name: string // 标签名
	created_at: string // 创建时间
	updated_at: string // 更新时间
}

/** 创建文章标签 */
export function createTagApi(data: Tag): Promise<IApiResponseData<Tag>> {
	return http.request<IApiResponseData<Tag>>({
		url: `/api/v1//tag`,
		method: "post",
		data: data,
	})
}

/** 更新文章标签 */
export function updateTagApi(data: Tag): Promise<IApiResponseData<Tag>> {
	return http.request<IApiResponseData<Tag>>({
		url: `/api/v1//tag`,
		method: "put",
		data: data,
	})
}

/** 删除文章标签 */
export function deleteTagApi(id: string): Promise<IApiResponseData<any>> {
	return http.request<IApiResponseData<any>>({
		url: `/api/v1//tag/${id}`,
		method: "delete",
	})
}

/** 查询文章标签 */
export function findTagApi(id: string): Promise<IApiResponseData<Tag>> {
	return http.request<IApiResponseData<Tag>>({
		url: `/api/v1//tag/${id}`,
		method: "get",
	})
}

/** 批量删除文章标签 */
export function deleteTagByIdsApi(data: number[]): Promise<IApiResponseData<any>> {
	return http.request<IApiResponseData<any>>({
		url: `/api/v1//tag/batch_delete`,
		method: "delete",
		data: data,
	})
}

/** 分页获取文章标签列表 */
export function findTagListApi(page: PageQuery): Promise<IApiResponseData<PageResult<PageResult<Tag>>>> {
	return http.request<IApiResponseData<PageResult<PageResult<Tag>>>>({
		url: `/api/v1//tag/list`,
		method: "post",
		data: page,
	})
}
