import http from "@/utils/request";
import type { UploadFileReq, UploadFileResp } from "@/api/types.ts";

export function uploadFileApi(
  data?: UploadFileReq
): Promise<IApiResponseData<UploadFileResp>> {
  const formData = new FormData();
  formData.append("label", data.label);
  formData.append("file", data.file);
  formData.append("file_size", data.file_size.toString());
  formData.append("file_md5", data.file_md5);

  return http.request<IApiResponseData<any>>({
    url: `/api/v1/upload/upload_file`,
    method: "post",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
}

/** 上传语言 */
export function uploadVoiceApi(label: string, formData: FormData): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: `/api/v1/voice`,
    method: "post",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
}
