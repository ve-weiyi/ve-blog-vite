import http from "@/utils/request"

interface Article {
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

/** 创建文章 */
export function createArticleApi(data: Article): Promise<IApiResponseData<Article>> {
	return http.request<IApiResponseData<Article>>({
		url: `/api/v1//article`,
		method: "post",
		data: data,
	})
}

/** 更新文章 */
export function updateArticleApi(data: Article): Promise<IApiResponseData<Article>> {
	return http.request<IApiResponseData<Article>>({
		url: `/api/v1//article`,
		method: "put",
		data: data,
	})
}

/** 删除文章 */
export function deleteArticleApi(id: string): Promise<IApiResponseData<any>> {
	return http.request<IApiResponseData<any>>({
		url: `/api/v1//article/${id}`,
		method: "delete",
	})
}

/** 查询文章 */
export function findArticleApi(id: string): Promise<IApiResponseData<Article>> {
	return http.request<IApiResponseData<Article>>({
		url: `/api/v1//article/${id}`,
		method: "get",
	})
}

/** 批量删除文章 */
export function deleteArticleByIdsApi(data: number[]): Promise<IApiResponseData<any>> {
	return http.request<IApiResponseData<any>>({
		url: `/api/v1//article/batch_delete`,
		method: "delete",
		data: data,
	})
}

/** 分页获取文章列表 */
export function findArticleListApi(page: PageQuery): Promise<IApiResponseData<PageResult<PageResult<Article>>>> {
	return http.request<IApiResponseData<PageResult<PageResult<Article>>>>({
		url: `/api/v1//article/list`,
		method: "post",
		data: page,
	})
}

/** 文章归档 */
export function getArticleArchivesApi(page: PageQuery): Promise<IApiResponseData<Article>> {
	return http.request<IApiResponseData<Article>>({
		url: `/api/v1//article/archives`,
		method: "get",
		data: page,
	})
}

/** 分页获取文章列表 */
export function getArticleListByConditionApi(
	page: PageQuery
): Promise<IApiResponseData<PageResult<PageResult<Article>>>> {
	return http.request<IApiResponseData<PageResult<PageResult<Article>>>>({
		url: `/api/v1//article/condition`,
		method: "post",
		data: page,
	})
}

/** 更新文章 */
export function likeArticleApi(data: Article): Promise<IApiResponseData<Article>> {
	return http.request<IApiResponseData<Article>>({
		url: `/api/v1//article/like`,
		method: "put",
		data: data,
	})
}
