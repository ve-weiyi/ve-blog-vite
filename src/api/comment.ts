import http from "@/utils/request";
import type {
  BatchResp,
  CommentBackDTO,
  CommentNewReq,
  CommentQueryReq,
  EmptyResp,
  IdReq,
  IdsReq,
  PageQuery,
  PageResp
} from "./types";

/** "创建评论" */
export function createCommentApi(
  data?: CommentNewReq
): Promise<IApiResponseData<CommentNewReq>> {
  return http.request<IApiResponseData<CommentNewReq>>({
    url: `/api/v1/comment/create_comment`,
    method: "post",
    data: data
  });
}

/** "更新评论" */
export function updateCommentApi(
  data?: CommentNewReq
): Promise<IApiResponseData<CommentNewReq>> {
  return http.request<IApiResponseData<CommentNewReq>>({
    url: `/api/v1/comment/update_comment`,
    method: "put",
    data: data
  });
}

/** "删除评论" */
export function deleteCommentApi(
  data?: IdReq
): Promise<IApiResponseData<EmptyResp>> {
  return http.request<IApiResponseData<EmptyResp>>({
    url: `/api/v1/comment/delete_comment`,
    method: "delete",
    data: data
  });
}

/** "批量删除评论" */
export function deleteCommentListApi(
  data?: IdsReq
): Promise<IApiResponseData<BatchResp>> {
  return http.request<IApiResponseData<BatchResp>>({
    url: `/api/v1/comment/delete_comment_list`,
    method: "delete",
    data: data
  });
}

/** "查询评论" */
export function findCommentApi(
  data?: IdReq
): Promise<IApiResponseData<CommentBackDTO>> {
  return http.request<IApiResponseData<CommentBackDTO>>({
    url: `/api/v1/comment/find_comment`,
    method: "post",
    data: data
  });
}

/** "查询评论列表" */
export function findCommentListApi(
  data?: CommentQueryReq
): Promise<IApiResponseData<PageResp>> {
  return http.request<IApiResponseData<PageResp>>({
    url: `/api/v1/comment/find_comment_list`,
    method: "post",
    data: data
  });
}

/** "查询评论回复列表" */
export function findCommentReplyListApi(
  data?: CommentQueryReq
): Promise<IApiResponseData<PageResp>> {
  return http.request<IApiResponseData<PageResp>>({
    url: `/api/v1/comment/find_comment_reply_list`,
    method: "post",
    data: data
  });
}

/** "查询评论列表(后台)" */
export function findCommentBackListApi(
  data?: PageQuery
): Promise<IApiResponseData<PageResp>> {
  return http.request<IApiResponseData<PageResp>>({
    url: `/api/v1/comment/find_comment_back_list`,
    method: "post",
    data: data
  });
}

/** "点赞评论" */
export function likeCommentApi(
  data?: IdReq
): Promise<IApiResponseData<EmptyResp>> {
  return http.request<IApiResponseData<EmptyResp>>({
    url: `/api/v1/comment/like_comment`,
    method: "post",
    data: data
  });
}
