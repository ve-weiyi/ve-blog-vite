import http from "@/utils/request";
import type {
  BatchResp,
  IdReq,
  IdsReq,
  OperationLog,
  PageQuery,
  PageResp
} from "./types";

/** "创建操作记录" */
export function createOperationLogApi(
  data?: OperationLog
): Promise<IApiResponseData<OperationLog>> {
  return http.request<IApiResponseData<OperationLog>>({
    url: `/api/v1/operation_log/create_operation_log`,
    method: "post",
    data: data
  });
}

/** "更新操作记录" */
export function updateOperationLogApi(
  data?: OperationLog
): Promise<IApiResponseData<OperationLog>> {
  return http.request<IApiResponseData<OperationLog>>({
    url: `/api/v1/operation_log/update_operation_log`,
    method: "put",
    data: data
  });
}

/** "删除操作记录" */
export function deleteOperationLogApi(
  data?: IdReq
): Promise<IApiResponseData<BatchResp>> {
  return http.request<IApiResponseData<BatchResp>>({
    url: `/api/v1/operation_log/delete_operation_log`,
    method: "delete",
    data: data
  });
}

/** "批量删除操作记录" */
export function deleteOperationLogListApi(
  data?: IdsReq
): Promise<IApiResponseData<BatchResp>> {
  return http.request<IApiResponseData<BatchResp>>({
    url: `/api/v1/operation_log/delete_operation_log_list`,
    method: "delete",
    data: data
  });
}

/** "查询操作记录" */
export function findOperationLogApi(
  data?: IdReq
): Promise<IApiResponseData<OperationLog>> {
  return http.request<IApiResponseData<OperationLog>>({
    url: `/api/v1/operation_log/find_operation_log`,
    method: "post",
    data: data
  });
}

/** "分页获取操作记录列表" */
export function findOperationLogListApi(
  data?: PageQuery
): Promise<IApiResponseData<PageResp>> {
  return http.request<IApiResponseData<PageResp>>({
    url: `/api/v1/operation_log/find_operation_log_list`,
    method: "post",
    data: data
  });
}
