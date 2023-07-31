import http from "@/utils/request"

interface Photo {
	id: number // 主键
	album_id: number // 相册id
	photo_name: string // 照片名
	photo_desc: string // 照片描述
	photo_src: string // 照片地址
	is_delete: boolean // 是否删除
	created_at: string // 创建时间
	updated_at: string // 更新时间
}

/** 创建相片 */
export function createPhotoApi(data: Photo): Promise<IApiResponseData<Photo>> {
	return http.request<IApiResponseData<Photo>>({
		url: `/api/v1//photo`,
		method: "post",
		data: data,
	})
}

/** 更新相片 */
export function updatePhotoApi(data: Photo): Promise<IApiResponseData<Photo>> {
	return http.request<IApiResponseData<Photo>>({
		url: `/api/v1//photo`,
		method: "put",
		data: data,
	})
}

/** 删除相片 */
export function deletePhotoApi(id: string): Promise<IApiResponseData<any>> {
	return http.request<IApiResponseData<any>>({
		url: `/api/v1//photo/${id}`,
		method: "delete",
	})
}

/** 查询相片 */
export function findPhotoApi(id: string): Promise<IApiResponseData<Photo>> {
	return http.request<IApiResponseData<Photo>>({
		url: `/api/v1//photo/${id}`,
		method: "get",
	})
}

/** 批量删除相片 */
export function deletePhotoByIdsApi(data: number[]): Promise<IApiResponseData<any>> {
	return http.request<IApiResponseData<any>>({
		url: `/api/v1//photo/batch_delete`,
		method: "delete",
		data: data,
	})
}

/** 分页获取相片列表 */
export function findPhotoListApi(page: PageQuery): Promise<IApiResponseData<PageResult<PageResult<Photo>>>> {
	return http.request<IApiResponseData<PageResult<PageResult<Photo>>>>({
		url: `/api/v1//photo/list`,
		method: "post",
		data: page,
	})
}
