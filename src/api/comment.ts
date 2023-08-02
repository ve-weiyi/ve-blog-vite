import http from "@/utils/request"

export interface Comment {
  id: number // 主键
  user_id: number // 评论用户Id
  topic_id: number // 评论主题id
  comment_content: string // 评论内容
  reply_user_id: number // 回复用户id
  parent_id: number // 父评论id
  type: number // 评论类型 1.文章 2.友链 3.说说
  is_delete: number // 是否删除  0否 1是
  is_review: boolean // 是否审核
  created_at: string // 评论时间
  updated_at: string // 更新时间
}

/** 创建评论 */
export function createCommentApi(data: Comment): Promise<IApiResponseData<Comment>> {
  return http.request<IApiResponseData<Comment>>({
    url: `/api/v1/comment`,
    method: "post",
    data: data,
  })
}

/** 更新评论 */
export function updateCommentApi(data: Comment): Promise<IApiResponseData<Comment>> {
  return http.request<IApiResponseData<Comment>>({
    url: `/api/v1/comment`,
    method: "put",
    data: data,
  })
}

/** 删除评论 */
export function deleteCommentApi(id: number): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: `/api/v1/comment/${id}`,
    method: "delete",
  })
}

/** 查询评论 */
export function findCommentApi(id: number): Promise<IApiResponseData<Comment>> {
  return http.request<IApiResponseData<Comment>>({
    url: `/api/v1/comment/${id}`,
    method: "get",
  })
}

/** 批量删除评论 */
export function deleteCommentByIdsApi(data: number[]): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: `/api/v1/comment/batch_delete`,
    method: "delete",
    data: data,
  })
}

/** 分页获取评论列表 */
export function findCommentListApi(page: PageQuery): Promise<IApiResponseData<PageResult<Comment>>> {
  return http.request<IApiResponseData<PageResult<Comment>>>({
    url: `/api/v1/comment/list`,
    method: "post",
    data: page,
  })
}

/** 分页获取评论列表 */
export function findCommentDetailListApi(page: PageQuery): Promise<IApiResponseData<PageResult<Comment>>> {
  return http.request<IApiResponseData<PageResult<Comment>>>({
    url: `/api/v1/comment/list/details`,
    method: "post",
    data: page,
  })
}

/** 获取用户评论列表 */
export function findCommentBackListApi(page: PageQuery): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: `/api/v1/comment/list/back`,
    method: "post",
    data: page,
  })
}

/** 查询评论回复列表 */
export function findCommentReplyListApi(id: number, page: PageQuery): Promise<IApiResponseData<Comment>> {
  return http.request<IApiResponseData<Comment>>({
    url: `/api/v1/comment/${id}/reply_list`,
    method: "post",
    data: page,
  })
}

/** 点赞评论 */
export function likeCommentApi(id: number): Promise<IApiResponseData<Comment>> {
  return http.request<IApiResponseData<Comment>>({
    url: `/api/v1/comment/${id}/like`,
    method: "post",
  })
}
