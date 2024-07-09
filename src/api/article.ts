import request from "@/utils/request"
import type { IdReq, ArticleRecommendResp, EmptyResp, PageQuery, PageResp, ArticleClassifyReq, ArticleClassifyResp } from "./types"

/** "文章归档(时间轴)" */
export function findArticleArchivesApi(data?: PageQuery): Promise<IApiResponseData<PageResp>> {
  return request({
    url: '/api/v1/article/article_archives',
    method: 'post',
    data: data,
  })
}
/** "通过分类获取文章列表" */
export function findArticleClassifyCategoryApi(data?: ArticleClassifyReq): Promise<IApiResponseData<ArticleClassifyResp>> {
  return request({
    url: '/api/v1/article/article_classify_category',
    method: 'post',
    data: data,
  })
}
/** "通过标签获取文章列表" */
export function findArticleClassifyTagApi(data?: ArticleClassifyReq): Promise<IApiResponseData<ArticleClassifyResp>> {
  return request({
    url: '/api/v1/article/article_classify_tag',
    method: 'post',
    data: data,
  })
}
/** "获取首页文章列表" */
export function findArticleHomeListApi(data?: PageQuery): Promise<IApiResponseData<PageResp>> {
  return request({
    url: '/api/v1/article/find_article_home_list',
    method: 'post',
    data: data,
  })
}
/** "文章相关推荐" */
export function findArticleRecommendApi(data?: IdReq): Promise<IApiResponseData<ArticleRecommendResp>> {
  return request({
    url: '/api/v1/article/find_article_recommend',
    method: 'post',
    data: data,
  })
}
/** "点赞文章" */
export function likeArticleApi(data?: IdReq): Promise<IApiResponseData<EmptyResp>> {
  return request({
    url: '/api/v1/article/like_article',
    method: 'post',
    data: data,
  })
}
