import http from "@/utils/request"

export interface UserInformation {
  id: number // id
  user_id: number // 用户id
  email: string // 用户邮箱
  nickname: string // 用户昵称
  avatar: string // 用户头像
  phone: string // 用户手机号
  intro: string // 个人简介
  web_site: string // 个人网站
  created_at: string // 创建时间
  updated_at: string // 更新时间
}

export interface Upload {
  id: number // id
  user_id: number // 用户id
  label: string // 标签
  file_name: string // 文件名称
  file_size: number // 文件大小
  file_md5: string // 文件md5值
  file_url: string // 上传路径
  created_at: string // 创建时间
  updated_at: string // 更新时间
}

export interface UserAccount {
  id: number // id
  username: string // 用户名
  password: string // 密码
  status: number // 状态: 0删除 1正常 2禁用
  register_type: string // 注册方式
  ip_address: string // 注册ip
  ip_source: string // 注册ip 源
  created_at: string // 创建时间
  updated_at: string // 更新时间
}

export interface UpdateUserRoles {
  user_id: number
  role_ids: number[]
}

/** 获取用户菜单权限 */
export function getUserMenusApi(): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: `/api/v1/user/menus`,
    method: "get",
  })
}

/** 获取用户接口权限 */
export function getUserApisApi(): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: `/api/v1/user/apis`,
    method: "get",
  })
}

/** 获取用户登录历史 */
export function getLoginHistoryApi(page: PageQuery): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: `/api/v1/user/login_history`,
    method: "get",
    data: page,
  })
}

/** 获取用户信息 */
export function getUserInfoApi(): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: `/api/v1/user/info`,
    method: "get",
  })
}

/** 修改用户信息 */
export function updateUserInfoApi(data: UserInformation): Promise<IApiResponseData<Upload>> {
  return http.request<IApiResponseData<Upload>>({
    url: `/api/v1/user/info`,
    method: "post",
    data: data,
  })
}

/** 更换用户头像 */
export function updateUserAvatarApi(data: Upload): Promise<IApiResponseData<Upload>> {
  return http.request<IApiResponseData<Upload>>({
    url: `/api/v1/user/avatar`,
    method: "post",
    data: data,
  })
}

/** 获取用户列表 */
export function getUserListApi(page: PageQuery): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: `/api/v1/users`,
    method: "post",
    data: page,
  })
}

/** 获取用户地区 */
export function getUserAreasApi(page: PageQuery): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: `/api/v1/user/areas`,
    method: "post",
    data: page,
  })
}

/** 修改用户状态 */
export function updateUserStatusApi(data: UserAccount): Promise<IApiResponseData<any>> {
  return http.request<IApiResponseData<any>>({
    url: `/api/v1/user/update_status`,
    method: "post",
    data: data,
  })
}

/** 修改用户角色 */
export function updateUserRolesApi(data: UpdateUserRoles): Promise<IApiResponseData<Role>> {
  return http.request<IApiResponseData<Role>>({
    url: `/api/v1/user/update_roles`,
    method: "post",
    data: data,
  })
}
