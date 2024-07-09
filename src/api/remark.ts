import request from "@/utils/request"
import type { PageQuery, PageResp, Remark } from "./types"

/** "分页获取留言列表" */
export function findRemarkListApi(data?: PageQuery): Promise<IApiResponseData<PageResp>> {
  return request({
    url: '/api/v1/remark/find_remark_list',
    method: 'post',
    data: data,
  })
}
/** "创建留言" */
export function createRemarkApi(data?: Remark): Promise<IApiResponseData<Remark>> {
  return request({
    url: '/api/v1/remark/create_remark',
    method: 'post',
    data: data,
  })
}
