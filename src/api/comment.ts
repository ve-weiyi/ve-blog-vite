import http from "@/utils/request"

/** 增 */
export function createCommentApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/comment/create",
    method: "post",
    data,
  })
}

/** 改 */
export function updateCommentApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/comment/update",
    method: "put",
    data,
  })
}

/** 删 */
export function deleteCommentApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/comment/delete",
    method: "delete",
    data,
  })
}

/** 查 */
export function findCommentApi(data?: object): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/comment/find",
    method: "post",
    data: data,
  })
}

/** 删除 批量操作 */
export function deleteByIdsCommentApi(ids: number[]): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/comment/deleteByIds",
    method: "delete",
    data: ids,
  })
}

/** 查 列表*/
export function findCommentListApi(page?: Page): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/comment/list",
    method: "post",
    data: page,
  })
}

/** 查 列表*/
export function findCommentReplyListApi(id: number, page?: Page): Promise<IApiResponseData<any>> {
  console.log("id", id)
  console.log("page", page)
  return http.request<IApiResponseData<any>>({
    url: `/api/v1/comment/${id}/reply_list`,
    method: "post",
    data: page,
  })
}

export function likeCommentApi(id: number): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: `/api/v1/comment/${id}/like`,
    method: "post",
  })
}
