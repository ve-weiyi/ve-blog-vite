import request from "@/utils/request"
import type { Album, PageQuery, PageResp, PhotoQuery, IdReq } from "./types"

/** "获取相册" */
export function getAlbumApi(data?: IdReq): Promise<IApiResponse<Album>> {
  return request({
    url: "/api/v1/album/get_album",
    method: "post",
    data: data,
  })
}
/** "获取相册列表" */
export function getAlbumListApi(data?: PageQuery): Promise<IApiResponse<PageResp>> {
  return request({
    url: "/api/v1/album/get_album_list",
    method: "post",
    data: data,
  })
}
/** "获取相册下的照片列表" */
export function getPhotoListApi(data?: PhotoQuery): Promise<IApiResponse<PageResp>> {
  return request({
    url: "/api/v1/album/get_photo_list",
    method: "post",
    data: data,
  })
}
