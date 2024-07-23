import { Result } from "@/model";
import request from "@/utils/request";
import { Promise } from "axios";
import { Friend } from "./types";

/**
 * 查看友链列表
 * @returns 文章分类
 */
export function getFriendList(): Promise<Result<Friend[]>> {
  return request({
    url: "/friend/list",
    method: "get",
  });
}
