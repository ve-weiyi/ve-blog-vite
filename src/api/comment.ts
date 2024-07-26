import request from "@/utils/request"
import type { CommentQueryReq, PageResp, CommentNewReq, IdReq, EmptyResp } from "./types"

/** "查询评论列表" */
export function getCommentListApi(data?: CommentQueryReq): Promise<IApiResponse<PageResp>> {
  return request({
    url: "/api/v1/comment/get_comment_list",
    method: "post",
    data: data,
  })
}
/** "查询评论回复列表" */
export function getCommentReplyListApi(data?: CommentQueryReq): Promise<IApiResponse<PageResp>> {
  return request({
    url: "/api/v1/comment/get_comment_reply_list",
    method: "post",
    data: data,
  })
}
/** "创建评论" */
export function createCommentApi(data?: CommentNewReq): Promise<IApiResponse<CommentNewReq>> {
  return request({
    url: "/api/v1/comment/create_comment",
    method: "post",
    data: data,
  })
}
/** "点赞评论" */
export function likeCommentApi(data?: IdReq): Promise<IApiResponse<EmptyResp>> {
  return request({
    url: "/api/v1/comment/like_comment",
    method: "post",
    data: data,
  })
}
