import http from "@/utils/request";
import type {
  ArticleClassifyReq,
  ArticleClassifyResp,
  ArticleHomeDTO,
  ArticleNewReq,
  ArticlePreDeleteReq,
  ArticleRecommendResp,
  ArticleTopReq,
  EmptyResp,
  IdReq,
  PageQuery,
  PageResp
} from "./types";

/** "保存文章" */
export function saveArticleApi(
  data?: ArticleNewReq
): Promise<IApiResponseData<EmptyResp>> {
  return http.request<IApiResponseData<EmptyResp>>({
    url: `/api/v1/admin/article/save_article`,
    method: "post",
    data: data
  });
}

/** "置顶文章" */
export function topArticleApi(
  data?: ArticleTopReq
): Promise<IApiResponseData<EmptyResp>> {
  return http.request<IApiResponseData<EmptyResp>>({
    url: `/api/v1/admin/article/top_article`,
    method: "post",
    data: data
  });
}

/** "删除文章-物理删除" */
export function deleteArticleApi(
  data?: IdReq
): Promise<IApiResponseData<EmptyResp>> {
  return http.request<IApiResponseData<EmptyResp>>({
    url: `/api/v1/admin/article/delete_article`,
    method: "post",
    data: data
  });
}

/** "删除文章-逻辑删除" */
export function preDeleteArticleApi(
  data?: ArticlePreDeleteReq
): Promise<IApiResponseData<EmptyResp>> {
  return http.request<IApiResponseData<EmptyResp>>({
    url: `/api/v1/admin/article/pre_delete_article`,
    method: "post",
    data: data
  });
}

/** "查询文章" */
export function findArticleApi(
  data?: IdReq
): Promise<IApiResponseData<ArticleHomeDTO>> {
  return http.request<IApiResponseData<ArticleHomeDTO>>({
    url: `/api/v1/admin/article/find_article`,
    method: "post",
    data: data
  });
}

/** "分页获取文章列表" */
export function findArticleListApi(
  data?: PageQuery
): Promise<IApiResponseData<PageResp>> {
  return http.request<IApiResponseData<PageResp>>({
    url: `/api/v1/admin/article/find_article_list`,
    method: "post",
    data: data
  });
}

/** "文章归档(时间轴)" */
export function findArticleArchivesApi(
  data?: PageQuery
): Promise<IApiResponseData<PageResp>> {
  return http.request<IApiResponseData<PageResp>>({
    url: `/api/v1/article/article_archives`,
    method: "post",
    data: data
  });
}

/** "通过标签或者id获取文章列表" */
export function findArticleClassifyCategoryApi(
  data?: ArticleClassifyReq
): Promise<IApiResponseData<ArticleClassifyResp>> {
  return http.request<IApiResponseData<ArticleClassifyResp>>({
    url: `/api/v1/article/article_classify_category`,
    method: "post",
    data: data
  });
}

/** "通过标签或者id获取文章列表" */
export function findArticleClassifyTagApi(
  data?: ArticleClassifyReq
): Promise<IApiResponseData<ArticleClassifyResp>> {
  return http.request<IApiResponseData<ArticleClassifyResp>>({
    url: `/api/v1/article/article_classify_tag`,
    method: "post",
    data: data
  });
}

/** "文章相关推荐" */
export function findArticleRecommendApi(
  data?: IdReq
): Promise<IApiResponseData<ArticleRecommendResp>> {
  return http.request<IApiResponseData<ArticleRecommendResp>>({
    url: `/api/v1/article/find_article_recommend`,
    method: "post",
    data: data
  });
}

/** "分页获取文章列表" */
export function findArticleHomeListApi(
  data?: PageQuery
): Promise<IApiResponseData<PageResp>> {
  return http.request<IApiResponseData<PageResp>>({
    url: `/api/v1/article/find_article_home_list`,
    method: "post",
    data: data
  });
}

/** "点赞文章" */
export function likeArticleApi(
  data?: IdReq
): Promise<IApiResponseData<EmptyResp>> {
  return http.request<IApiResponseData<EmptyResp>>({
    url: `/api/v1/article/like_article`,
    method: "post",
    data: data
  });
}
