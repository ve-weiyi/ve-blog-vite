import http from "@/utils/request"
import { UploadRecord } from "./types"

/** 文件上传 */
export function uploadFileApi(label: string, file: File): Promise<IApiResponseData<UploadRecord>> {
  return http.request<IApiResponseData<UploadRecord>>({
    url: `/api/v1/upload/${label}`,
    method: "post",
  })
}
