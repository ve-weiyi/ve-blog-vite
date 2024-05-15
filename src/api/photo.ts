import http from "@/utils/request";
import type {
  BatchResp,
  IdReq,
  IdsReq,
  PageQuery,
  PageResp,
  Photo
} from "./types";

/** "创建照片" */
export function createPhotoApi(data?: Photo): Promise<IApiResponseData<Photo>> {
  return http.request<IApiResponseData<Photo>>({
    url: `/api/v1/photo/create_photo`,
    method: "post",
    data: data
  });
}

/** "更新照片" */
export function updatePhotoApi(data?: Photo): Promise<IApiResponseData<Photo>> {
  return http.request<IApiResponseData<Photo>>({
    url: `/api/v1/photo/update_photo`,
    method: "put",
    data: data
  });
}

/** "删除照片" */
export function deletePhotoApi(
  data?: IdReq
): Promise<IApiResponseData<BatchResp>> {
  return http.request<IApiResponseData<BatchResp>>({
    url: `/api/v1/photo/delete_photo`,
    method: "delete",
    data: data
  });
}

/** "批量删除照片" */
export function deletePhotoListApi(
  data?: IdsReq
): Promise<IApiResponseData<BatchResp>> {
  return http.request<IApiResponseData<BatchResp>>({
    url: `/api/v1/photo/delete_photo_list`,
    method: "delete",
    data: data
  });
}

/** "查询照片" */
export function findPhotoApi(data?: IdReq): Promise<IApiResponseData<Photo>> {
  return http.request<IApiResponseData<Photo>>({
    url: `/api/v1/photo/find_photo`,
    method: "post",
    data: data
  });
}

/** "分页获取照片列表" */
export function findPhotoListApi(
  data?: PageQuery
): Promise<IApiResponseData<PageResp>> {
  return http.request<IApiResponseData<PageResp>>({
    url: `/api/v1/photo/find_photo_list`,
    method: "post",
    data: data
  });
}
