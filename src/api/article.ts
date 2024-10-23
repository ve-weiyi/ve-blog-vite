import request from "@/utils/request"
import type { PageQuery, PageResp, ArticleClassifyReq, ArticleClassifyResp, IdReq, ArticleRecommendResp, EmptyResp } from "./types"

/** "文章归档(时间轴)" */
export function getArticleArchivesApi(data?: PageQuery): Promise<IApiResponse<PageResp>> {
  return request({
    url: "/api/v1/article/get_article_archives",
    method: "post",
    data: data,
  })
}
/** "通过分类获取文章列表" */
export function getArticleClassifyCategoryApi(data?: ArticleClassifyReq): Promise<IApiResponse<ArticleClassifyResp>> {
  return request({
    url: "/api/v1/article/get_article_classify_category",
    method: "post",
    data: data,
  })
}
/** "通过标签获取文章列表" */
export function getArticleClassifyTagApi(data?: ArticleClassifyReq): Promise<IApiResponse<ArticleClassifyResp>> {
  return request({
    url: "/api/v1/article/get_article_classify_tag",
    method: "post",
    data: data,
  })
}
/** "获取首页文章列表" */
export function getArticleListApi(data?: PageQuery): Promise<IApiResponse<PageResp>> {
  return request({
    url: "/api/v1/article/get_article_list",
    method: "post",
    data: data,
  })
}
/** "文章相关推荐" */
export function getArticleRecommendApi(data?: IdReq): Promise<IApiResponse<ArticleRecommendResp>> {
  return request({
    url: "/api/v1/article/get_article_recommend",
    method: "post",
    data: data,
  })
}
/** "点赞文章" */
export function likeArticleApi(data?: IdReq): Promise<IApiResponse<EmptyResp>> {
  return request({
    url: "/api/v1/article/like_article",
    method: "post",
    data: data,
  })
}
