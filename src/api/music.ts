import request from "@/utils/request"

/** "点赞文章" */
export function likeArticleApi(server?: string,type?: string,id?: number,): Promise<IApiResponse<any>> {
  return request({
    url: `https://api.i-meto.com/meting/api?server=${server}&type=${type}&id=${id}&r=${Math.random()}`,
    method: "get",
  })
}
