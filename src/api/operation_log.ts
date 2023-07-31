import http from "@/utils/request"

interface OperationLog {
	id: number // 主键id
	opt_module: string // 操作模块
	opt_type: string // 操作类型
	opt_method: string // 操作方法
	opt_desc: string // 操作描述
	cost: string // 耗时（ms）
	status: number // 响应状态码
	request_url: string // 操作url
	request_method: string // 请求方式
	request_header: string // 请求头
	request_param: string // 请求参数
	response_data: string // 返回数据
	user_id: number // 用户id
	nickname: string // 用户昵称
	ip_address: string // 操作ip
	ip_source: string // 操作地址
	created_at: string // 创建时间
	updated_at: string // 更新时间
}

/** 创建操作记录 */
export function createOperationLogApi(data: OperationLog): Promise<IApiResponseData<OperationLog>> {
	return http.request<IApiResponseData<OperationLog>>({
		url: `/api/v1//operation_log`,
		method: "post",
		data: data,
	})
}

/** 更新操作记录 */
export function updateOperationLogApi(data: OperationLog): Promise<IApiResponseData<OperationLog>> {
	return http.request<IApiResponseData<OperationLog>>({
		url: `/api/v1//operation_log`,
		method: "put",
		data: data,
	})
}

/** 删除操作记录 */
export function deleteOperationLogApi(id: string): Promise<IApiResponseData<any>> {
	return http.request<IApiResponseData<any>>({
		url: `/api/v1//operation_log/${id}`,
		method: "delete",
	})
}

/** 查询操作记录 */
export function findOperationLogApi(id: string): Promise<IApiResponseData<OperationLog>> {
	return http.request<IApiResponseData<OperationLog>>({
		url: `/api/v1//operation_log/${id}`,
		method: "get",
	})
}

/** 批量删除操作记录 */
export function deleteOperationLogByIdsApi(data: number[]): Promise<IApiResponseData<any>> {
	return http.request<IApiResponseData<any>>({
		url: `/api/v1//operation_log/batch_delete`,
		method: "delete",
		data: data,
	})
}

/** 分页获取操作记录列表 */
export function findOperationLogListApi(
	page: PageQuery
): Promise<IApiResponseData<PageResult<PageResult<OperationLog>>>> {
	return http.request<IApiResponseData<PageResult<PageResult<OperationLog>>>>({
		url: `/api/v1//operation_log/list`,
		method: "post",
		data: page,
	})
}
