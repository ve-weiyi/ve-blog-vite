import http from "@/utils/request"

interface Page {
	id: number // 页面id
	page_name: string // 页面名
	page_label: string // 页面标签
	page_cover: string // 页面封面
	created_at: string // 创建时间
	updated_at: string // 更新时间
}

/** 创建页面 */
export function createPageApi(data: Page): Promise<IApiResponseData<Page>> {
	return http.request<IApiResponseData<Page>>({
		url: `/api/v1//page`,
		method: "post",
		data: data,
	})
}

/** 更新页面 */
export function updatePageApi(data: Page): Promise<IApiResponseData<Page>> {
	return http.request<IApiResponseData<Page>>({
		url: `/api/v1//page`,
		method: "put",
		data: data,
	})
}

/** 删除页面 */
export function deletePageApi(id: string): Promise<IApiResponseData<any>> {
	return http.request<IApiResponseData<any>>({
		url: `/api/v1//page/${id}`,
		method: "delete",
	})
}

/** 查询页面 */
export function findPageApi(id: string): Promise<IApiResponseData<Page>> {
	return http.request<IApiResponseData<Page>>({
		url: `/api/v1//page/${id}`,
		method: "get",
	})
}

/** 批量删除页面 */
export function deletePageByIdsApi(data: number[]): Promise<IApiResponseData<any>> {
	return http.request<IApiResponseData<any>>({
		url: `/api/v1//page/batch_delete`,
		method: "delete",
		data: data,
	})
}

/** 分页获取页面列表 */
export function findPageListApi(page: PageQuery): Promise<IApiResponseData<PageResult<PageResult<Page>>>> {
	return http.request<IApiResponseData<PageResult<PageResult<Page>>>>({
		url: `/api/v1//page/list`,
		method: "post",
		data: page,
	})
}
