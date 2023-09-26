import http from "@/utils/request"
import { PhotoAlbum, BatchResult } from "./types"

/** 创建相册 */
export function createPhotoAlbumApi(data: PhotoAlbum): Promise<IApiResponseData<PhotoAlbum>> {
  return http.request<IApiResponseData<PhotoAlbum>>({
    url: `/api/v1/photo_album`,
    method: "post",
    data: data,
  })
}

/** 更新相册 */
export function updatePhotoAlbumApi(data: PhotoAlbum): Promise<IApiResponseData<PhotoAlbum>> {
  return http.request<IApiResponseData<PhotoAlbum>>({
    url: `/api/v1/photo_album`,
    method: "put",
    data: data,
  })
}

/** 删除相册 */
export function deletePhotoAlbumApi(id: number): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: `/api/v1/photo_album/${id}`,
    method: "delete",
  })
}

/** 查询相册 */
export function findPhotoAlbumApi(id: number): Promise<IApiResponseData<PhotoAlbum>> {
  return http.request<IApiResponseData<PhotoAlbum>>({
    url: `/api/v1/photo_album/${id}`,
    method: "get",
  })
}

/** 批量删除相册 */
export function deletePhotoAlbumByIdsApi(data: number[]): Promise<IApiResponseData<BatchResult>> {
  return http.request<IApiResponseData<BatchResult>>({
    url: `/api/v1/photo_album/batch_delete`,
    method: "delete",
    data: data,
  })
}

/** 分页获取相册列表 */
export function findPhotoAlbumListApi(page: PageQuery): Promise<IApiResponseData<PageResult<PhotoAlbum>>> {
  return http.request<IApiResponseData<PageResult<PhotoAlbum>>>({
    url: `/api/v1/photo_album/list`,
    method: "post",
    data: page,
  })
}
