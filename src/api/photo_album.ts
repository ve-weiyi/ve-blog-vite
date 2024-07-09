import request from "@/utils/request"
import type { PageQuery, PageResp } from "./types"

/** "分页获取相册列表" */
export function findPhotoAlbumListApi(data?: PageQuery): Promise<IApiResponseData<PageResp>> {
  return request({
    url: '/api/v1/photo_album/find_photo_album_list',
    method: 'post',
    data: data,
  })
}
