import request from "@/utils/request"
import type { PageQuery, PageResp } from "./types"

/** "分页获取标签列表" */
export function findTagListApi(data?: PageQuery): Promise<IApiResponseData<PageResp>> {
  return request({
    url: '/api/v1/tag/find_tag_list',
    method: 'post',
    data: data,
  })
}
