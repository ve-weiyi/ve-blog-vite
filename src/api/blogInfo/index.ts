import { Result } from "@/model";
import request from "@/utils/request";
import { Promise } from "axios";
import { BlogInfo } from "./types";

/**
 * 获取博客信息
 * @returns 博客信息
 */
export function getBlogInfo(): Promise<Result<BlogInfo>> {
  return request({
    url: "/",
    method: "get",
  });
}

/**
 * 上传访客信息
 */
export function report(): Promise<Result<null>> {
  return request({
    url: "/report",
    method: "post",
  });
}
