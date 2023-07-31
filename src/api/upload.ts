import http from "@/utils/request"

interface Upload {
	id: number // id
	user_id: number // 用户id
	label: string // 标签
	file_name: string // 文件名称
	file_size: number // 文件大小
	file_md5: string // 文件md5值
	file_url: string // 上传路径
	created_at: string // 创建时间
	updated_at: string // 更新时间
}

/** 文件上传 */
export function uploadFileApi(label: string): Promise<IApiResponseData<Upload>> {
	return http.request<IApiResponseData<Upload>>({
		url: `/api/v1//upload/:label`,
		method: "post",
	})
}
