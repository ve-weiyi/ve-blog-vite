import http from "@/utils/request";
import type {
  AboutMe,
  AdminHomeInfo,
  BlogHomeInfo,
  EmptyReq,
  EmptyResp,
  WebsiteConfig
} from "./types";

/** "获取博客前台首页信息" */
export function getBlogHomeInfoApi(
  data?: EmptyReq
): Promise<IApiResponseData<BlogHomeInfo>> {
  return http.request<IApiResponseData<BlogHomeInfo>>({
    url: `/api/v1/blog`,
    method: "get",
    data: data
  });
}

/** "获取后台首页信息" */
export function getAdminHomeInfoApi(
  data?: EmptyReq
): Promise<IApiResponseData<AdminHomeInfo>> {
  return http.request<IApiResponseData<AdminHomeInfo>>({
    url: `/api/v1/admin`,
    method: "get",
    data: data
  });
}

/** "获取关于我的信息" */
export function getAboutMeApi(
  data?: EmptyReq
): Promise<IApiResponseData<AboutMe>> {
  return http.request<IApiResponseData<AboutMe>>({
    url: `/api/v1/blog/about_me`,
    method: "get",
    data: data
  });
}

/** "更新关于我的信息" */
export function updateAboutMeApi(
  data?: AboutMe
): Promise<IApiResponseData<EmptyResp>> {
  return http.request<IApiResponseData<EmptyResp>>({
    url: `/api/v1/admin/about_me`,
    method: "put",
    data: data
  });
}

/** "获取网站配置" */
export function getWebsiteConfigApi(
  data?: EmptyReq
): Promise<IApiResponseData<WebsiteConfig>> {
  return http.request<IApiResponseData<WebsiteConfig>>({
    url: `/api/v1/blog/get_website_config`,
    method: "get",
    data: data
  });
}

/** "更新网站配置" */
export function updateWebsiteConfigApi(
  data?: WebsiteConfig
): Promise<IApiResponseData<EmptyResp>> {
  return http.request<IApiResponseData<EmptyResp>>({
    url: `/api/v1/admin/update_website_config`,
    method: "put",
    data: data
  });
}

/** "获取服务器信息" */
export function getSystemStateApi(
  data?: EmptyReq
): Promise<IApiResponseData<EmptyResp>> {
  return http.request<IApiResponseData<EmptyResp>>({
    url: `/api/v1/admin/system_state`,
    method: "get",
    data: data
  });
}
