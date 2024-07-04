/**
 * @Description: axios封装
 * @Author: 灰是小灰灰的灰
 * @Email: 454539387@qq.com
 * @Date: 2021-07-06 11:49:40
 * @LastEditors: 灰是小灰灰的灰
 * @LastEditTime: 2021-07-06 11:49:40
 */
import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios"
import { ElMessage } from "element-plus"
import { useWebStoreHook } from "@/store/modules/website"

import MD5 from "crypto-js/md5"

function signWithSalt(message: string, salt: string): string {
  const saltedMessage = salt + message
  return MD5(saltedMessage).toString()
}

function getTimestampInSeconds(): number {
  return Math.floor(Date.now() / 1000)
}

const HeaderAuthorization = "Authorization"
const HeaderUid = "Uid"
const HeaderToken = "Token"
const HeaderTerminal = "Terminal"
const HeaderTimestamp = "Timestamp"

class HttpRequest {
  private baseUrl: string
  private withCredentials: boolean
  private timeout: number
  // Axios 实例
  private service: AxiosInstance

  // #baseUrl
  constructor() {
    this.baseUrl = this.getBaseUrl()
    this.withCredentials = false // 跨域携带cookie
    this.timeout = 60 * 1000 // 超时配置
    this.service = this.newService()
  }

  getBaseUrl(): string {
    return ""
  }

  // https://www.gxlsystem.com/APPkaifa-293852.html AxiosRequestConfig 详解
  getConfig() {
    const config = {
      baseURL: this.baseUrl,
      timeout: this.timeout,
      withCredentials: this.withCredentials,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    }
    this.setHeader(config)
    return config
  }

  private setHeader(config: AxiosRequestConfig) {
    let dv = "device_id"
    let ts = getTimestampInSeconds().toString()
    const tk = useWebStoreHook().getToken()
    if (tk) {
      config.headers = Object.assign({}, config.headers, {
        [HeaderAuthorization]: tk?.access_token,
        [HeaderUid]: tk?.user_id,
        [HeaderToken]: signWithSalt(dv, ts),
        [HeaderTerminal]: dv,
        [HeaderTimestamp]: ts,
      })
    } else {
      // 未登录时的加密方式
      config.headers = Object.assign({}, config.headers, {
        [HeaderToken]: signWithSalt(dv, ts),
        [HeaderTerminal]: dv,
        [HeaderTimestamp]: ts,
      })
    }
  }

  private checkStatus(status: number) {
    let errMessage = ""
    switch (status) {
      case 400:
        errMessage = "错误请求"
        break
      case 401:
        errMessage = "未授权，请重新登录"
        break
      case 403:
        errMessage = "拒绝访问"
        break
      case 404:
        errMessage = "请求错误,未找到该资源"
        break
      case 405:
        errMessage = "请求方法未允许"
        break
      case 408:
        errMessage = "请求超时"
        break
      case 500:
        errMessage = "服务器端出错"
        break
      case 501:
        errMessage = "网络未实现"
        break
      case 502:
        errMessage = "网络错误"
        break
      case 503:
        errMessage = "服务不可用"
        break
      case 504:
        errMessage = "网络超时"
        break
      case 505:
        errMessage = "http版本不支持该请求"
        break
      default:
        errMessage = "连接错误"
    }
    return errMessage
  }

  // 拦截处理
  private newService() {
    // 创建一个 Axios 实例
    const instance = axios.create()
    // 请求拦截
    instance.interceptors.request.use(
      (config) => {
        if (!navigator.onLine) {
          ElMessage({
            message: "请检查您的网络是否正常",
            type: "error",
            duration: 3 * 1000,
          })
          return Promise.reject(new Error("请检查您的网络是否正常"))
        }

        return config
      },
      (error) => {
        return Promise.reject(new Error(error))
      }
    )

    // 响应拦截
    instance.interceptors.response.use(
      (res: AxiosResponse) => {
        const result = res.data
        const type = Object.prototype.toString.call(result)
        // 如果是文件流 直接返回
        if (type === "[object Blob]" || type === "[object ArrayBuffer]") {
          return result
        }
        const { code, message } = result
        switch (code) {
          case 200:
            return result
          // 未授权
          case 401:
            console.log("401")
            ElMessage({
              message: message || "Error",
              type: "error",
              duration: 3 * 1000,
            })
            useWebStoreHook().logout()
            return Promise.reject(new Error(message || "Error"))
          default:
            ElMessage({
              message: message || "Error",
              type: "error",
              duration: 3 * 1000,
            })
            return Promise.reject(new Error(message || "Error"))
        }
      },
      (error) => {
        if (error && error.response) {
          error.message = this.checkStatus(error.response.status)
        }
        const isTimeout = error.message.includes("timeout")
        ElMessage({
          message: isTimeout ? "网络请求超时" : error.message || "连接到服务器失败",
          type: "error",
          duration: 2 * 1000,
        })
        return Promise.reject(new Error(error.message))
      }
    )
    return instance
  }

  /** 创建请求方法 */

  request<T>(config: AxiosRequestConfig): Promise<T> {
    const baseConfig = this.getConfig()
    const params = Object.assign({}, baseConfig, config)
    return this.service(params)
  }
}

const http = new HttpRequest()
export default http
