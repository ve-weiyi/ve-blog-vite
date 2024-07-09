import request from "@/utils/request"
import type { CommentQueryReq, PageResp, CommentNewReq, IdReq, EmptyResp } from "./types"

/** "查询评论列表" */
export function findCommentListApi(data?: CommentQueryReq): Promise<IApiResponseData<PageResp>> {
  return request({
    url: '/api/v1/comment/find_comment_list',
    method: 'post',
    data: data,
  })
}
/** "查询评论回复列表" */
export function findCommentReplyListApi(data?: CommentQueryReq): Promise<IApiResponseData<PageResp>> {
  return request({
    url: '/api/v1/comment/find_comment_reply_list',
    method: 'post',
    data: data,
  })
}
/** "创建评论" */
export function createCommentApi(data?: CommentNewReq): Promise<IApiResponseData<CommentNewReq>> {
  return request({
    url: '/api/v1/comment/create_comment',
    method: 'post',
    data: data,
  })
}
/** "点赞评论" */
export function likeCommentApi(data?: IdReq): Promise<IApiResponseData<EmptyResp>> {
  return request({
    url: '/api/v1/comment/like_comment',
    method: 'post',
    data: data,
  })
}
