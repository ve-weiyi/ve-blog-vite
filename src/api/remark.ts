import http from "@/utils/request";
import type {
  BatchResp,
  IdReq,
  IdsReq,
  PageQuery,
  PageResp,
  Remark
} from "./types";

/** "创建留言" */
export function createRemarkApi(
  data?: Remark
): Promise<IApiResponseData<Remark>> {
  return http.request<IApiResponseData<Remark>>({
    url: `/api/v1/remark/create_remark`,
    method: "post",
    data: data
  });
}

/** "更新留言" */
export function updateRemarkApi(
  data?: Remark
): Promise<IApiResponseData<Remark>> {
  return http.request<IApiResponseData<Remark>>({
    url: `/api/v1/remark/update_remark`,
    method: "put",
    data: data
  });
}

/** "删除留言" */
export function deleteRemarkApi(
  data?: IdReq
): Promise<IApiResponseData<BatchResp>> {
  return http.request<IApiResponseData<BatchResp>>({
    url: `/api/v1/remark/delete_remark`,
    method: "delete",
    data: data
  });
}

/** "批量删除留言" */
export function deleteRemarkListApi(
  data?: IdsReq
): Promise<IApiResponseData<BatchResp>> {
  return http.request<IApiResponseData<BatchResp>>({
    url: `/api/v1/remark/delete_remark_list`,
    method: "delete",
    data: data
  });
}

/** "查询留言" */
export function findRemarkApi(data?: IdReq): Promise<IApiResponseData<Remark>> {
  return http.request<IApiResponseData<Remark>>({
    url: `/api/v1/remark/find_remark`,
    method: "post",
    data: data
  });
}

/** "分页获取留言列表" */
export function findRemarkListApi(
  data?: PageQuery
): Promise<IApiResponseData<PageResp>> {
  return http.request<IApiResponseData<PageResp>>({
    url: `/api/v1/remark/find_remark_list`,
    method: "post",
    data: data
  });
}
