import http from "@/utils/request"
import { BatchResult, OperationLog } from "./types"

/** 创建操作记录 */
export function createOperationLogApi(data: OperationLog): Promise<IApiResponseData<OperationLog>> {
  return http.request<IApiResponseData<OperationLog>>({
    url: `/api/v1/operation_log`,
    method: "post",
    data: data,
  })
}

/** 更新操作记录 */
export function updateOperationLogApi(data: OperationLog): Promise<IApiResponseData<OperationLog>> {
  return http.request<IApiResponseData<OperationLog>>({
    url: `/api/v1/operation_log`,
    method: "put",
    data: data,
  })
}

/** 删除操作记录 */
export function deleteOperationLogApi(id: number): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: `/api/v1/operation_log/${id}`,
    method: "delete",
  })
}

/** 查询操作记录 */
export function findOperationLogApi(id: number): Promise<IApiResponseData<OperationLog>> {
  return http.request<IApiResponseData<OperationLog>>({
    url: `/api/v1/operation_log/${id}`,
    method: "get",
  })
}

/** 批量删除操作记录 */
export function deleteOperationLogByIdsApi(data: number[]): Promise<IApiResponseData<BatchResult>> {
  return http.request<IApiResponseData<BatchResult>>({
    url: `/api/v1/operation_log/batch_delete`,
    method: "delete",
    data: data,
  })
}

/** 分页获取操作记录列表 */
export function findOperationLogListApi(page: PageQuery): Promise<IApiResponseData<PageResult<OperationLog[]>>> {
  return http.request<IApiResponseData<PageResult<OperationLog[]>>>({
    url: `/api/v1/operation_log/list`,
    method: "post",
    data: page,
  })
}
