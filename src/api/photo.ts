import http from "@/utils/request"
import { Photo } from "./types"

/** 创建相片 */
export function createPhotoApi(data: Photo): Promise<IApiResponseData<Photo>> {
  return http.request<IApiResponseData<Photo>>({
    url: `/api/v1/photo`,
    method: "post",
    data: data,
  })
}

/** 更新相片 */
export function updatePhotoApi(data: Photo): Promise<IApiResponseData<Photo>> {
  return http.request<IApiResponseData<Photo>>({
    url: `/api/v1/photo`,
    method: "put",
    data: data,
  })
}

/** 删除相片 */
export function deletePhotoApi(id: number): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: `/api/v1/photo/${id}`,
    method: "delete",
  })
}

/** 查询相片 */
export function findPhotoApi(id: number): Promise<IApiResponseData<Photo>> {
  return http.request<IApiResponseData<Photo>>({
    url: `/api/v1/photo/${id}`,
    method: "get",
  })
}

/** 批量删除相片 */
export function deletePhotoByIdsApi(data: number[]): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: `/api/v1/photo/batch_delete`,
    method: "delete",
    data: data,
  })
}

/** 分页获取相片列表 */
export function findPhotoListApi(page: PageQuery): Promise<IApiResponseData<PageResult<Photo>>> {
  return http.request<IApiResponseData<PageResult<Photo>>>({
    url: `/api/v1/photo/list`,
    method: "post",
    data: page,
  })
}
