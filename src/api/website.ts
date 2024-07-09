import request from "@/utils/request"
import type { BlogHomeInfo, AboutMe, WebsiteConfig, EmptyReq } from "./types"

/** "获取博客前台首页信息" */
export function getBlogHomeInfoApi(data?: EmptyReq): Promise<IApiResponseData<BlogHomeInfo>> {
  return request({
    url: '/api/v1/blog',
    method: 'get',
    data: data,
  })
}
/** "获取关于我的信息" */
export function getAboutMeApi(data?: EmptyReq): Promise<IApiResponseData<AboutMe>> {
  return request({
    url: '/api/v1/blog/about_me',
    method: 'get',
    data: data,
  })
}
/** "获取网站配置" */
export function getWebsiteConfigApi(data?: EmptyReq): Promise<IApiResponseData<WebsiteConfig>> {
  return request({
    url: '/api/v1/blog/get_website_config',
    method: 'get',
    data: data,
  })
}
