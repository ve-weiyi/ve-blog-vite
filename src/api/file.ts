import http from "@/utils/request"
import { UploadRecord } from "@/api/types.ts"

export function uploadFileApi(label: string, formData: FormData): Promise<IApiResponseData<any>> {

  return http.request<IApiResponseData<any>>({
    url: `/api/v1/upload/${label}`,
    method: "post",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
}

/** 上传语言 */
export function uploadVoiceApi(label: string, formData: FormData): Promise<IApiResponseData<UploadRecord>> {
  return http.request<IApiResponseData<UploadRecord>>({
    url: `/api/v1/voice`,
    method: "post",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
}
