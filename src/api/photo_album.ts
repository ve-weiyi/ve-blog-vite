import http from "@/utils/request";
import type {
  BatchResp,
  IdReq,
  IdsReq,
  PageQuery,
  PageResp,
  PhotoAlbum
} from "./types";

/** "创建相册" */
export function createPhotoAlbumApi(
  data?: PhotoAlbum
): Promise<IApiResponseData<PhotoAlbum>> {
  return http.request<IApiResponseData<PhotoAlbum>>({
    url: `/api/v1/photo_album/create_photo_album`,
    method: "post",
    data: data
  });
}

/** "更新相册" */
export function updatePhotoAlbumApi(
  data?: PhotoAlbum
): Promise<IApiResponseData<PhotoAlbum>> {
  return http.request<IApiResponseData<PhotoAlbum>>({
    url: `/api/v1/photo_album/update_photo_album`,
    method: "put",
    data: data
  });
}

/** "删除相册" */
export function deletePhotoAlbumApi(
  data?: IdReq
): Promise<IApiResponseData<BatchResp>> {
  return http.request<IApiResponseData<BatchResp>>({
    url: `/api/v1/photo_album/delete_photo_album`,
    method: "delete",
    data: data
  });
}

/** "批量删除相册" */
export function deletePhotoAlbumListApi(
  data?: IdsReq
): Promise<IApiResponseData<BatchResp>> {
  return http.request<IApiResponseData<BatchResp>>({
    url: `/api/v1/photo_album/delete_photo_album_list`,
    method: "delete",
    data: data
  });
}

/** "查询相册" */
export function findPhotoAlbumApi(
  data?: IdReq
): Promise<IApiResponseData<PhotoAlbum>> {
  return http.request<IApiResponseData<PhotoAlbum>>({
    url: `/api/v1/photo_album/find_photo_album`,
    method: "post",
    data: data
  });
}

/** "分页获取相册列表" */
export function findPhotoAlbumListApi(
  data?: PageQuery
): Promise<IApiResponseData<PageResp>> {
  return http.request<IApiResponseData<PageResp>>({
    url: `/api/v1/photo_album/find_photo_album_list`,
    method: "post",
    data: data
  });
}
