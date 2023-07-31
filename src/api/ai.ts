import http from "@/utils/request"

/** 增 */
export function aiChatApi(data: object): Promise<IApiResponseData<any>> {
	return http.request<IApiResponseData<any>>({
		url: "/api//v1/ai/chat",
		method: "post",
		data,
	})
}

/** 删 */
export function aiCosApi(data: object): Promise<IApiResponseData<any>> {
	return http.request<IApiResponseData<any>>({
		url: "/api//v1/ai/cos",
		method: "post",
		data,
	})
}
