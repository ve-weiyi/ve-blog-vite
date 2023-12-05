import http from "@/utils/request"
import { UploadRecord } from "./types"

/** 上传文件 */
export function uploadFileApi(label: string, file: File): Promise<IApiResponseData<UploadRecord>> {
  return http.request<IApiResponseData<UploadRecord>>({
    url: `/api/v1/upload/${label}`,
    method: "post",
  })
}

/** 上传语言 */
export function uploadVoiceApi(type: number, file: File, user_id: number, nickname: string, avatar: string, content: string, created_at: string, ip_address: string, ip_source: string): Promise<IApiResponseData<UploadRecord>> {
  return http.request<IApiResponseData<UploadRecord>>({
    url: `/api/v1/voice`,
    method: "post",
  })
}
