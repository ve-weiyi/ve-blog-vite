import { Result } from "@/model";
import request from "@/utils/request";
import { Promise } from "axios";
import { Carousel } from "./types";

/**
 * 获取轮播图列表
 * @returns 轮播图列表
 */
export function getCarouselList(): Promise<Result<Carousel[]>> {
  return request({
    url: "/carousel/list",
    method: "get",
  });
}
