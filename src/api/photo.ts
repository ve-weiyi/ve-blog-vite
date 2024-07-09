import request from "@/utils/request"
import type { PageQuery, PageResp } from "./types"

/** "分页获取照片列表" */
export function findPhotoListApi(data?: PageQuery): Promise<IApiResponseData<PageResp>> {
  return request({
    url: '/api/v1/photo/find_photo_list',
    method: 'post',
    data: data,
  })
}
