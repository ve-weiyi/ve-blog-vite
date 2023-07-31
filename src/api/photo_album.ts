import http from "@/utils/request"

export interface PhotoAlbum {
  id: number // 主键
  album_name: string // 相册名
  album_desc: string // 相册描述
  album_cover: string // 相册封面
  is_delete: boolean // 是否删除
  status: boolean // 状态值 1公开 2私密
  created_at: string // 创建时间
  updated_at: string // 更新时间
}

/** 创建相册 */
export function createPhotoAlbumApi(data: PhotoAlbum): Promise<IApiResponseData<PhotoAlbum>> {
  return http.request<IApiResponseData<PhotoAlbum>>({
    url: `/api/v1/photo_album`,
    method: "post",
    data: data,
  })
}

/** 更新相册 */
export function updatePhotoAlbumApi(data: PhotoAlbum): Promise<IApiResponseData<PhotoAlbum>> {
  return http.request<IApiResponseData<PhotoAlbum>>({
    url: `/api/v1/photo_album`,
    method: "put",
    data: data,
  })
}

/** 删除相册 */
export function deletePhotoAlbumApi(id: number): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: `/api/v1/photo_album/${id}`,
    method: "delete",
  })
}

/** 查询相册 */
export function findPhotoAlbumApi(id: number): Promise<IApiResponseData<PhotoAlbum>> {
  return http.request<IApiResponseData<PhotoAlbum>>({
    url: `/api/v1/photo_album/${id}`,
    method: "get",
  })
}

/** 批量删除相册 */
export function deletePhotoAlbumByIdsApi(data: number[]): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: `/api/v1/photo_album/batch_delete`,
    method: "delete",
    data: data,
  })
}

/** 分页获取相册列表 */
export function findPhotoAlbumListApi(page: PageQuery): Promise<IApiResponseData<PageResult<PhotoAlbum>>> {
  return http.request<IApiResponseData<PageResult<PhotoAlbum>>>({
    url: `/api/v1/photo_album/list`,
    method: "post",
    data: page,
  })
}
