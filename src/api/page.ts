import http from "@/utils/request";
import type {
  BatchResp,
  IdReq,
  IdsReq,
  Page,
  PageQuery,
  PageResp
} from "./types";

/** "创建页面" */
export function createPageApi(data?: Page): Promise<IApiResponseData<Page>> {
  return http.request<IApiResponseData<Page>>({
    url: `/api/v1/page/create_page`,
    method: "post",
    data: data
  });
}

/** "更新页面" */
export function updatePageApi(data?: Page): Promise<IApiResponseData<Page>> {
  return http.request<IApiResponseData<Page>>({
    url: `/api/v1/page/update_page`,
    method: "put",
    data: data
  });
}

/** "删除页面" */
export function deletePageApi(
  data?: IdReq
): Promise<IApiResponseData<BatchResp>> {
  return http.request<IApiResponseData<BatchResp>>({
    url: `/api/v1/page/delete_page`,
    method: "delete",
    data: data
  });
}

/** "批量删除页面" */
export function deletePageListApi(
  data?: IdsReq
): Promise<IApiResponseData<BatchResp>> {
  return http.request<IApiResponseData<BatchResp>>({
    url: `/api/v1/page/delete_page_list`,
    method: "delete",
    data: data
  });
}

/** "查询页面" */
export function findPageApi(data?: IdReq): Promise<IApiResponseData<Page>> {
  return http.request<IApiResponseData<Page>>({
    url: `/api/v1/page/find_page`,
    method: "post",
    data: data
  });
}

/** "分页获取页面列表" */
export function findPageListApi(
  data?: PageQuery
): Promise<IApiResponseData<PageResp>> {
  return http.request<IApiResponseData<PageResp>>({
    url: `/api/v1/page/find_page_list`,
    method: "post",
    data: data
  });
}
