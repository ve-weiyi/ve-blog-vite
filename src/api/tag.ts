import http from "@/utils/request";
import type {
  BatchResp,
  IdReq,
  IdsReq,
  PageQuery,
  PageResp,
  Tag
} from "./types";

/** "创建标签" */
export function createTagApi(data?: Tag): Promise<IApiResponseData<Tag>> {
  return http.request<IApiResponseData<Tag>>({
    url: `/api/v1/tag/create_tag`,
    method: "post",
    data: data
  });
}

/** "更新标签" */
export function updateTagApi(data?: Tag): Promise<IApiResponseData<Tag>> {
  return http.request<IApiResponseData<Tag>>({
    url: `/api/v1/tag/update_tag`,
    method: "put",
    data: data
  });
}

/** "删除标签" */
export function deleteTagApi(
  data?: IdReq
): Promise<IApiResponseData<BatchResp>> {
  return http.request<IApiResponseData<BatchResp>>({
    url: `/api/v1/tag/delete_tag`,
    method: "delete",
    data: data
  });
}

/** "批量删除标签" */
export function deleteTagListApi(
  data?: IdsReq
): Promise<IApiResponseData<BatchResp>> {
  return http.request<IApiResponseData<BatchResp>>({
    url: `/api/v1/tag/delete_tag_list`,
    method: "delete",
    data: data
  });
}

/** "查询标签" */
export function findTagApi(data?: IdReq): Promise<IApiResponseData<Tag>> {
  return http.request<IApiResponseData<Tag>>({
    url: `/api/v1/tag/find_tag`,
    method: "post",
    data: data
  });
}

/** "分页获取标签列表" */
export function findTagListApi(
  data?: PageQuery
): Promise<IApiResponseData<PageResp>> {
  return http.request<IApiResponseData<PageResp>>({
    url: `/api/v1/tag/find_tag_list`,
    method: "post",
    data: data
  });
}
