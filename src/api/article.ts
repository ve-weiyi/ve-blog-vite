import http from "@/utils/request"
import { Article, BatchResult, ArticleDetails, ArticleCondition, ArticleConditionDTO } from "./types"

/** 创建文章 */
export function createArticleApi(data: Article): Promise<IApiResponseData<Article>> {
  return http.request<IApiResponseData<Article>>({
    url: `/api/v1/article`,
    method: "post",
    data: data,
  })
}

/** 更新文章 */
export function updateArticleApi(data: Article): Promise<IApiResponseData<Article>> {
  return http.request<IApiResponseData<Article>>({
    url: `/api/v1/article`,
    method: "put",
    data: data,
  })
}

/** 删除文章 */
export function deleteArticleApi(id: number): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: `/api/v1/article/${id}`,
    method: "delete",
  })
}

/** 查询文章 */
export function findArticleApi(id: number): Promise<IApiResponseData<Article>> {
  return http.request<IApiResponseData<Article>>({
    url: `/api/v1/article/${id}`,
    method: "get",
  })
}

/** 批量删除文章 */
export function deleteArticleByIdsApi(data: number[]): Promise<IApiResponseData<BatchResult>> {
  return http.request<IApiResponseData<BatchResult>>({
    url: `/api/v1/article/batch_delete`,
    method: "delete",
    data: data,
  })
}

/** 分页获取文章列表 */
export function findArticleListApi(page: PageQuery): Promise<IApiResponseData<PageResult<Article>>> {
  return http.request<IApiResponseData<PageResult<Article>>>({
    url: `/api/v1/article/list`,
    method: "post",
    data: page,
  })
}

/** 文章详情 */
export function getArticleDetailsApi(id: number): Promise<IApiResponseData<ArticleDetails>> {
  return http.request<IApiResponseData<ArticleDetails>>({
    url: `/api/v1/article/${id}/details`,
    method: "get",
  })
}

/** 点赞文章 */
export function likeArticleApi(id: number): Promise<IApiResponseData<Article>> {
  return http.request<IApiResponseData<Article>>({
    url: `/api/v1/article/${id}/like`,
    method: "put",
  })
}

/** 文章归档 */
export function findArticleArchivesApi(page: PageQuery): Promise<IApiResponseData<PageResult<Article>>> {
  return http.request<IApiResponseData<PageResult<Article>>>({
    url: `/api/v1/article/archives`,
    method: "post",
    data: page,
  })
}

/** 分页获取文章详情列表 */
export function findArticleDetailsListApi(page: PageQuery): Promise<IApiResponseData<PageResult<Article>>> {
  return http.request<IApiResponseData<PageResult<Article>>>({
    url: `/api/v1/article/list/details`,
    method: "post",
    data: page,
  })
}

/** 通过标签或者id获取文章列表 */
export function findArticleListByConditionApi(page: ArticleCondition): Promise<IApiResponseData<ArticleConditionDTO>> {
  return http.request<IApiResponseData<ArticleConditionDTO>>({
    url: `/api/v1/article/list/condition`,
    method: "post",
    data: page,
  })
}
