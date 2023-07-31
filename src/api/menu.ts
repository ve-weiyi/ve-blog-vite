import http from "@/utils/request"

interface Menu {
	id: number // 主键
	name: string // 菜单名
	path: string // 菜单路径
	component: string // 组件
	icon: string // 菜单icon
	rank: number // 排序
	parent_id: number // 父id
	is_hidden: boolean // 是否隐藏  0否1是
	created_at: string // 创建时间
	updated_at: string // 更新时间
}

/** 创建菜单 */
export function createMenuApi(data: Menu): Promise<IApiResponseData<Menu>> {
	return http.request<IApiResponseData<Menu>>({
		url: `/api/v1//menu`,
		method: "post",
		data: data,
	})
}

/** 更新菜单 */
export function updateMenuApi(data: Menu): Promise<IApiResponseData<Menu>> {
	return http.request<IApiResponseData<Menu>>({
		url: `/api/v1//menu`,
		method: "put",
		data: data,
	})
}

/** 删除菜单 */
export function deleteMenuApi(id: string): Promise<IApiResponseData<any>> {
	return http.request<IApiResponseData<any>>({
		url: `/api/v1//menu/${id}`,
		method: "delete",
	})
}

/** 查询菜单 */
export function findMenuApi(id: string): Promise<IApiResponseData<Menu>> {
	return http.request<IApiResponseData<Menu>>({
		url: `/api/v1//menu/${id}`,
		method: "get",
	})
}

/** 批量删除菜单 */
export function deleteMenuByIdsApi(data: number[]): Promise<IApiResponseData<any>> {
	return http.request<IApiResponseData<any>>({
		url: `/api/v1//menu/batch_delete`,
		method: "delete",
		data: data,
	})
}

/** 分页获取菜单列表 */
export function findMenuListApi(page: PageQuery): Promise<IApiResponseData<PageResult<PageResult<Menu>>>> {
	return http.request<IApiResponseData<PageResult<PageResult<Menu>>>>({
		url: `/api/v1//menu/list`,
		method: "post",
		data: page,
	})
}

/** 获取菜单列表 */
export function getMenusApi(page: PageQuery): Promise<IApiResponseData<Menu>> {
	return http.request<IApiResponseData<Menu>>({
		url: `/api/v1//admin/menus`,
		method: "post",
		data: page,
	})
}
