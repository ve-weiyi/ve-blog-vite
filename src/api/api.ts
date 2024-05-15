import http from "@/utils/request";
import type {
  Api,
  BatchResp,
  EmptyReq,
  IdReq,
  IdsReq,
  PageQuery,
  PageResp
} from "./types";

/** "创建api路由" */
export function createApiApi(data?: Api): Promise<IApiResponseData<Api>> {
  return http.request<IApiResponseData<Api>>({
    url: `/api/v1/api/create_api`,
    method: "post",
    data: data
  });
}

/** "更新api路由" */
export function updateApiApi(data?: Api): Promise<IApiResponseData<Api>> {
  return http.request<IApiResponseData<Api>>({
    url: `/api/v1/api/update_api`,
    method: "put",
    data: data
  });
}

/** "删除api路由" */
export function deleteApiApi(
  data?: IdReq
): Promise<IApiResponseData<BatchResp>> {
  return http.request<IApiResponseData<BatchResp>>({
    url: `/api/v1/api/delete_api`,
    method: "delete",
    data: data
  });
}

/** "查询api路由" */
export function findApiApi(data?: IdReq): Promise<IApiResponseData<Api>> {
  return http.request<IApiResponseData<Api>>({
    url: `/api/v1/api/find_api`,
    method: "post",
    data: data
  });
}

/** "批量删除api路由" */
export function deleteApiListApi(
  data?: IdsReq
): Promise<IApiResponseData<BatchResp>> {
  return http.request<IApiResponseData<BatchResp>>({
    url: `/api/v1/api/delete_api_list`,
    method: "delete",
    data: data
  });
}

/** "分页获取api路由列表" */
export function findApiListApi(
  data?: PageQuery
): Promise<IApiResponseData<PageResp>> {
  return http.request<IApiResponseData<PageResp>>({
    url: `/api/v1/api/find_api_list`,
    method: "post",
    data: data
  });
}

/** "同步api列表" */
export function syncApiListApi(
  data?: EmptyReq
): Promise<IApiResponseData<BatchResp>> {
  return http.request<IApiResponseData<BatchResp>>({
    url: `/api/v1/api/sync_api_list`,
    method: "post",
    data: data
  });
}

/** "清空接口列表" */
export function cleanApiListApi(
  data?: EmptyReq
): Promise<IApiResponseData<BatchResp>> {
  return http.request<IApiResponseData<BatchResp>>({
    url: `/api/v1/api/clean_api_list`,
    method: "post",
    data: data
  });
}
