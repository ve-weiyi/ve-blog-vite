import http from "@/utils/request";
import type { UploadFileReq, UploadFileResp } from "./types";

/** "上传文件" */
export function uploadFileApi(
  data?: UploadFileReq
): Promise<IApiResponseData<UploadFileResp>> {
  return http.request<IApiResponseData<UploadFileResp>>({
    url: `/api/v1/upload/upload_file`,
    method: "post",
    data: data
  });
}
