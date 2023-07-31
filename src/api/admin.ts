import http from "@/utils/request"

/** 更新我的信息 */
export function updateAboutMeApi(): Promise<IApiResponseData<any>> {
	return http.request<IApiResponseData<any>>({
		url: `/api/v1//admin/about`,
		method: "post",
	})
}

/** 获取用户地区 */
export function getHomeInfoApi(): Promise<IApiResponseData<any>> {
	return http.request<IApiResponseData<any>>({
		url: `/api/v1//admin/home`,
		method: "post",
	})
}
