import http from "@/utils/request";
import type {
  BatchResp,
  Category,
  IdReq,
  IdsReq,
  PageQuery,
  PageResp
} from "./types";

/** "创建文章分类" */
export function createCategoryApi(
  data?: Category
): Promise<IApiResponseData<Category>> {
  return http.request<IApiResponseData<Category>>({
    url: `/api/v1/category/create_category`,
    method: "post",
    data: data
  });
}

/** "更新文章分类" */
export function updateCategoryApi(
  data?: Category
): Promise<IApiResponseData<Category>> {
  return http.request<IApiResponseData<Category>>({
    url: `/api/v1/category/update_category`,
    method: "put",
    data: data
  });
}

/** "删除文章分类" */
export function deleteCategoryApi(
  data?: IdReq
): Promise<IApiResponseData<BatchResp>> {
  return http.request<IApiResponseData<BatchResp>>({
    url: `/api/v1/category/delete_category`,
    method: "delete",
    data: data
  });
}

/** "批量删除文章分类" */
export function deleteCategoryListApi(
  data?: IdsReq
): Promise<IApiResponseData<BatchResp>> {
  return http.request<IApiResponseData<BatchResp>>({
    url: `/api/v1/category/delete_category_list`,
    method: "delete",
    data: data
  });
}

/** "查询文章分类" */
export function findCategoryApi(
  data?: IdReq
): Promise<IApiResponseData<Category>> {
  return http.request<IApiResponseData<Category>>({
    url: `/api/v1/category/find_category`,
    method: "post",
    data: data
  });
}

/** "分页获取文章分类列表" */
export function findCategoryListApi(
  data?: PageQuery
): Promise<IApiResponseData<PageResp>> {
  return http.request<IApiResponseData<PageResp>>({
    url: `/api/v1/category/find_category_list`,
    method: "post",
    data: data
  });
}
