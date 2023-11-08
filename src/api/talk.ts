import http from "@/utils/request"
import { Talk, BatchResult, TalkDetails } from "./types"

/** 创建说说 */
export function createTalkApi(data: Talk): Promise<IApiResponseData<Talk>> {
  return http.request<IApiResponseData<Talk>>({
    url: `/api/v1/talk`,
    method: "post",
    data: data,
  })
}

/** 更新说说 */
export function updateTalkApi(data: Talk): Promise<IApiResponseData<Talk>> {
  return http.request<IApiResponseData<Talk>>({
    url: `/api/v1/talk`,
    method: "put",
    data: data,
  })
}

/** 删除说说 */
export function deleteTalkApi(id: number): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: `/api/v1/talk/${id}`,
    method: "delete",
  })
}

/** 查询说说 */
export function findTalkApi(id: number): Promise<IApiResponseData<Talk>> {
  return http.request<IApiResponseData<Talk>>({
    url: `/api/v1/talk/${id}`,
    method: "get",
  })
}

/** 批量删除说说 */
export function deleteTalkByIdsApi(data: number[]): Promise<IApiResponseData<BatchResult>> {
  return http.request<IApiResponseData<BatchResult>>({
    url: `/api/v1/talk/batch_delete`,
    method: "delete",
    data: data,
  })
}

/** 分页获取说说列表 */
export function findTalkListApi(page: PageQuery): Promise<IApiResponseData<PageResult<Talk>>> {
  return http.request<IApiResponseData<PageResult<Talk>>>({
    url: `/api/v1/talk/list`,
    method: "post",
    data: page,
  })
}

/** 分页获取说说详情列表 */
export function findTalkDetailsListApi(page: PageQuery): Promise<IApiResponseData<PageResult<TalkDetails>>> {
  return http.request<IApiResponseData<PageResult<TalkDetails>>>({
    url: `/api/v1/talk/details_list`,
    method: "post",
    data: page,
  })
}

/** 分页获取说说详情列表 */
export function findTalkDetailApi(id: number): Promise<IApiResponseData<TalkDetails>> {
  return http.request<IApiResponseData<TalkDetails>>({
    url: `/api/v1/talk/${id}/details`,
    method: "get",
  })
}
