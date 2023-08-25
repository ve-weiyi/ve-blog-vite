import http from "@/utils/request"
import { Upload } from "./types"

/** 文件上传 */
export function uploadFileApi(label: string, file: File): Promise<IApiResponseData<Upload>> {
  return http.request<IApiResponseData<Upload>>({
    url: `/api/v1/upload/${label}`,
    method: "post",
  })
}
