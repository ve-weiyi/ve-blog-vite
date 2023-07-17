import http from "@/utils/request"

/** 获取用户菜单权限 */
export function getUserMenusApi(): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/user/menus",
    method: "get",
  })
}

/** 获取用户接口权限 */
export function getUserApisApi(): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/user/apis",
    method: "get",
  })
}

/** 获取用户信息 */
export function getUserInfoApi(): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/user/info",
    method: "get",
  })
}

/** 获取用户登录历史 */
export function loginHistoryApi(page?: Page): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: "/api/v1/user/login_history",
    method: "get",
    data: page,
  })
}

/** 更新用户头像 */
export function updateUserAvatarApi(file: File): Promise<IApiResponseData<any>> {
  const formData = new FormData()
  formData.append("file", file)

  return http.request<IApiResponseData<any>>({
    url: `/api/v1/user/avatar`,
    method: "post",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
}
