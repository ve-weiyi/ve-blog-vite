import type { Result } from "@/model";
import request from "@/utils/request";
import type { Album, PhotoInfo } from "./types";

/**
 * 查看相册列表
 * @returns 相册列表
 */
export function getAlbumList(): Promise<Result<Album[]>> {
  return request({
    url: "/album/list",
    method: "get",
  });
}

/**
 * 查看照片列表
 * @param albumId 相册id
 * @returns 照片列表
 */
export function getPhotoList(albumId: number): Promise<Result<PhotoInfo>> {
  return request({
    url: "/photo/list",
    method: "get",
    params: {
      albumId,
    },
  });
}
