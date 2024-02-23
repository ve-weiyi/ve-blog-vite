import http from "@/utils/request"
import {
  Article,
  ArticleBack,
  ArticleConditionDTO,
  ArticleConditionReq,
  ArticleDeleteReq,
  ArticleDetailsDTOReq,
  ArticleHome,
  ArticlePageDetailsDTO,
  ArticlePreviewDTO,
  ArticleTopReq,
} from "./types"

/** 保存文章 */
export function saveArticleApi(data: ArticleDetailsDTOReq): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: `/api/v1/admin/article`,
    method: "post",
    data: data,
  })
}

/** 删除文章 */
export function deleteArticleApi(id: number): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: `/api/v1/admin/article/${id}`,
    method: "delete",
  })
}

/** 查询文章 */
export function findArticleApi(id: number): Promise<IApiResponseData<ArticleBack>> {
  return http.request<IApiResponseData<ArticleBack>>({
    url: `/api/v1/admin/article/${id}`,
    method: "get",
  })
}

/** 分页获取文章列表 */
export function findArticleListApi(page: PageQuery): Promise<IApiResponseData<PageResult<ArticleBack[]>>> {
  return http.request<IApiResponseData<PageResult<ArticleBack[]>>>({
    url: `/api/v1/admin/article/list`,
    method: "post",
    data: page,
  })
}

/** 删除文章-逻辑删除 */
export function updateArticleDeleteApi(data: ArticleDeleteReq): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: `/api/v1/admin/article/delete`,
    method: "put",
    data: data,
  })
}

/** 更新文章 */
export function updateArticleTopApi(data: ArticleTopReq): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: `/api/v1/admin/article/top`,
    method: "put",
    data: data,
  })
}

/** 文章归档(时间轴) */
export function findArticleArchivesApi(page: PageQuery): Promise<IApiResponseData<PageResult<ArticlePreviewDTO[]>>> {
  return http.request<IApiResponseData<PageResult<ArticlePreviewDTO[]>>>({
    url: `/api/v1/article/archives`,
    method: "post",
    data: page,
  })
}

/** 通过标签或者id获取文章列表 */
export function findArticleSeriesApi(page: ArticleConditionReq): Promise<IApiResponseData<ArticleConditionDTO>> {
  return http.request<IApiResponseData<ArticleConditionDTO>>({
    url: `/api/v1/article/series`,
    method: "post",
    data: page,
  })
}

/** 文章相关推荐 */
export function findArticleDetailsApi(id: number): Promise<IApiResponseData<ArticlePageDetailsDTO>> {
  return http.request<IApiResponseData<ArticlePageDetailsDTO>>({
    url: `/api/v1/article/${id}/details`,
    method: "get",
  })
}

/** 分页获取文章列表 */
export function findArticleHomeListApi(page: PageQuery): Promise<IApiResponseData<PageResult<ArticleHome[]>>> {
  return http.request<IApiResponseData<PageResult<ArticleHome[]>>>({
    url: `/api/v1/article/list`,
    method: "post",
    data: page,
  })
}

/** 点赞文章 */
export function likeArticleApi(id: number): Promise<IApiResponseData<Article>> {
  return http.request<IApiResponseData<Article>>({
    url: `/api/v1/article/${id}/like`,
    method: "put",
  })
}
