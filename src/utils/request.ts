/**
 * @Description: axios封装
 * @Author: 灰是小灰灰的灰
 * @Email: 454539387@qq.com
 * @Date: 2021-07-06 11:49:40
 * @LastEditors: 灰是小灰灰的灰
 * @LastEditTime: 2021-07-06 11:49:40
 */
'use strict'
import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import cookies from '@/utils/cookies'

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
    return ''
  }

  // https://www.gxlsystem.com/APPkaifa-293852.html AxiosRequestConfig 详解
  getConfig() {
    const config = {
      baseURL: this.baseUrl,
      timeout: this.timeout,
      withCredentials: this.withCredentials,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    }
    return config
  }

  private getParams(payload: any) {
    const { method, data } = payload
    // if (["post", "put", "patch", "delete"].indexOf(method) >= 0) {
    //   payload.data = data
    // } else {
    //   payload.params = data
    //   delete payload.data
    // }

    // //post、put 参数拼接是body
    // if (method === "post" || method === "put") {
    //   payload.data = data
    //   delete payload.params
    // }
    // //get、delete 参数拼接在url上
    // if (method === "get" || method === "delete") {
    //   payload.params = data
    //   delete payload.data
    // }
    return payload
  }

  private checkStatus(status: number) {
    let errMessage = ''
    switch (status) {
      case 400:
        errMessage = '错误请求'
        break
      case 401:
        errMessage = '未授权，请重新登录'
        break
      case 403:
        errMessage = '拒绝访问'
        break
      case 404:
        errMessage = '请求错误,未找到该资源'
        break
      case 405:
        errMessage = '请求方法未允许'
        break
      case 408:
        errMessage = '请求超时'
        break
      case 500:
        errMessage = '服务器端出错'
        break
      case 501:
        errMessage = '网络未实现'
        break
      case 502:
        errMessage = '网络错误'
        break
      case 503:
        errMessage = '服务不可用'
        break
      case 504:
        errMessage = '网络超时'
        break
      case 505:
        errMessage = 'http版本不支持该请求'
        break
      default:
        errMessage = '连接错误'
    }
    return errMessage
  }

  private setHeader(config: AxiosRequestConfig) {
    const token = cookies.get('token')
    if (token) {
      config.headers!.Authorization = token
    }
  }

  // 拦截处理
  private newService() {
    // 创建一个 Axios 实例
    const instance = axios.create()
    // 请求拦截
    instance.interceptors.request.use(
      (config) => {
        // console.log('request-->', config)

        this.setHeader(config)
        if (!navigator.onLine) {
          ElMessage({
            message: '请检查您的网络是否正常',
            type: 'error',
            duration: 3 * 1000,
          })
          return Promise.reject(new Error('请检查您的网络是否正常'))
        }

        return config
      },
      (error) => {
        return Promise.reject(new Error(error))
      },
    )

    // 响应拦截
    instance.interceptors.response.use(
      (res: AxiosResponse) => {
        const result = res.data
        const type = Object.prototype.toString.call(result)
        // 如果是文件流 直接返回
        if (type === '[object Blob]' || type === '[object ArrayBuffer]') {
          return result
        }

        const { code, message } = result
        switch (code) {
          case 200:
            return result
          default:
            ElMessage({
              message: message || 'Error',
              type: 'error',
              duration: 3 * 1000,
            })
            return Promise.reject(new Error(message || 'Error'))
        }
      },
      (error) => {
        if (error && error.response) {
          error.message = this.checkStatus(error.response.status)
        }
        const isTimeout = error.message.includes('timeout')
        ElMessage({
          message: isTimeout ? '网络请求超时' : error.message || '连接到服务器失败',
          type: 'error',
          duration: 2 * 1000,
        })
        return Promise.reject(new Error(error.message))
      },
    )
    return instance
  }

  /** 创建请求方法 */

  request<T>(config: AxiosRequestConfig): Promise<T> {
    const baseOpt = this.getConfig()
    const params = Object.assign({}, baseOpt, config)
    return this.service(params)
  }
}

const http = new HttpRequest()
export default http
