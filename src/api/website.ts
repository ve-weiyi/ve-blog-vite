import request from "@/utils/request"
import type { EmptyReq, BlogHomeInfo, AboutMe } from "./types"

/** "获取博客前台首页信息" */
export function getBlogHomeInfoApi(data?: EmptyReq): Promise<IApiResponse<BlogHomeInfo>> {
  return request({
    url: "/api/v1/blog",
    method: "get",
    data: data,
  })
}
/** "获取关于我的信息" */
export function getAboutMeApi(data?: EmptyReq): Promise<IApiResponse<AboutMe>> {
  return request({
    url: "/api/v1/blog/about_me",
    method: "get",
    data: data,
  })
}
