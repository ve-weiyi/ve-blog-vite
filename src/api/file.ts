import http from "@/utils/request"

export function uploadFileApi(label: string, file: File): Promise<IApiResponseData<any>> {
  const formData = new FormData()
  formData.append("file", file)

  return http.request<IApiResponseData<any>>({
    url: `/api/v1/upload/${label}`,
    method: "post",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
}
