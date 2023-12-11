import http from "@/utils/request"
import { Api, ApiDetailsDTO, BatchResult } from "./types"

/** 创建接口 */
export function createApiApi(data: Api): Promise<IApiResponseData<Api>> {
  return http.request<IApiResponseData<Api>>({
    url: `/api/v1/api`,
    method: "post",
    data: data,
  })
}

/** 更新接口 */
export function updateApiApi(data: Api): Promise<IApiResponseData<Api>> {
  return http.request<IApiResponseData<Api>>({
    url: `/api/v1/api`,
    method: "put",
    data: data,
  })
}

/** 删除接口 */
export function deleteApiApi(id: number): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: `/api/v1/api/${id}`,
    method: "delete",
  })
}

/** 查询接口 */
export function findApiApi(id: number): Promise<IApiResponseData<Api>> {
  return http.request<IApiResponseData<Api>>({
    url: `/api/v1/api/${id}`,
    method: "get",
  })
}

/** 批量删除接口 */
export function deleteApiByIdsApi(data: number[]): Promise<IApiResponseData<BatchResult>> {
  return http.request<IApiResponseData<BatchResult>>({
    url: `/api/v1/api/batch_delete`,
    method: "delete",
    data: data,
  })
}

/** 分页获取接口列表 */
export function findApiListApi(page: PageQuery): Promise<IApiResponseData<PageResult<Api[]>>> {
  return http.request<IApiResponseData<PageResult<Api[]>>>({
    url: `/api/v1/api/list`,
    method: "post",
    data: page,
  })
}

/** 获取api列表 */
export function findApiDetailsListApi(page: PageQuery): Promise<IApiResponseData<PageResult<ApiDetailsDTO[]>>> {
  return http.request<IApiResponseData<PageResult<ApiDetailsDTO[]>>>({
    url: `/api/v1/api/details_list`,
    method: "post",
    data: page,
  })
}

/** 同步api列表 */
export function syncApiListApi(): Promise<IApiResponseData<BatchResult>> {
  return http.request<IApiResponseData<BatchResult>>({
    url: `/api/v1/api/sync`,
    method: "post",
  })
}
