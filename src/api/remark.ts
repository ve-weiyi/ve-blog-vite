import http from "@/utils/request"
import { BatchResult, Remark } from "./types"

/** 创建留言 */
export function createRemarkApi(data: Remark): Promise<IApiResponseData<Remark>> {
  return http.request<IApiResponseData<Remark>>({
    url: `/api/v1/remark`,
    method: "post",
    data: data,
  })
}

/** 更新留言 */
export function updateRemarkApi(data: Remark): Promise<IApiResponseData<Remark>> {
  return http.request<IApiResponseData<Remark>>({
    url: `/api/v1/remark`,
    method: "put",
    data: data,
  })
}

/** 删除留言 */
export function deleteRemarkApi(id: number): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: `/api/v1/remark/${id}`,
    method: "delete",
  })
}

/** 查询留言 */
export function findRemarkApi(id: number): Promise<IApiResponseData<Remark>> {
  return http.request<IApiResponseData<Remark>>({
    url: `/api/v1/remark/${id}`,
    method: "get",
  })
}

/** 批量删除留言 */
export function deleteRemarkByIdsApi(data: number[]): Promise<IApiResponseData<BatchResult>> {
  return http.request<IApiResponseData<BatchResult>>({
    url: `/api/v1/remark/batch_delete`,
    method: "delete",
    data: data,
  })
}

/** 分页获取留言列表 */
export function findRemarkListApi(page: PageQuery): Promise<IApiResponseData<PageResult<Remark[]>>> {
  return http.request<IApiResponseData<PageResult<Remark[]>>>({
    url: `/api/v1/remark/list`,
    method: "post",
    data: page,
  })
}
