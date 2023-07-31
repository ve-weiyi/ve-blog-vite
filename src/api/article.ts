import http from "@/utils/request"

export interface Article {
  id: number
  user_id: number // 作者
  category_id: number // 文章分类
  article_cover: string // 文章缩略图
  article_title: string // 标题
  article_content: string // 内容
  type: number // 文章类型 1原创 2转载 3翻译
  original_url: string // 原文链接
  is_top: boolean // 是否置顶 0否 1是
  is_delete: boolean // 是否删除  0否 1是
  status: number // 状态值 1公开 2私密 3评论可见
  created_at: string // 发表时间
  updated_at: string // 更新时间
}

export interface TagDTO {
  id: number // 标签ID
  tag_name: string // 标签名
}

export interface ArticlePaginationDTO {
  id: number // 文章ID
  article_cover: string // 文章缩略图
  article_title: string // 标题
}

export interface ArticleRecommendDTO {
  id: number // 文章ID
  article_cover: string // 文章缩略图
  article_title: string // 标题
  created_at: string // 创建时间
}

export interface ArticleDetails {
  id: number // 文章ID
  article_cover: string // 文章缩略图
  article_title: string // 标题
  article_content: string // 内容
  like_count: number // 点赞量
  views_count: number // 浏览量
  type: number // 文章类型
  original_url: string // 原文链接
  created_at: string // 发表时间
  updated_at: string // 更新时间
  category_id: number // 文章分类ID
  category_name: string // 文章分类名
  article_tag_list: TagDTO[] // 文章标签列表
  last_article: ArticlePaginationDTO // 上一篇文章
  next_article: ArticlePaginationDTO // 下一篇文章
  recommend_article_list: ArticleRecommendDTO[] // 推荐文章列表
  newest_article_list: ArticleRecommendDTO[] // 最新文章列表
}

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
export function deleteArticleByIdsApi(data: number[]): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
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
export function getArticleArchivesApi(page: PageQuery): Promise<IApiResponseData<Article>> {
  return http.request<IApiResponseData<Article>>({
    url: `/api/v1/article/archives`,
    method: "get",
    data: page,
  })
}

/** 分页获取文章列表 */
export function getArticleListByConditionApi(page: PageQuery): Promise<IApiResponseData<PageResult<Article>>> {
  return http.request<IApiResponseData<PageResult<Article>>>({
    url: `/api/v1/article/list/condition`,
    method: "post",
    data: page,
  })
}
