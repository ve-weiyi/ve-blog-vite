export interface Api {
  id?: number // 主键id
  name?: string // api名称
  path?: string // api路径
  method?: string // api请求方法
  parent_id?: number // 分组id
  traceable?: number // 是否追溯操作记录 0需要，1是
  status?: number // 状态 1开，2关
  created_at?: string // 创建时间
  updated_at?: string // 更新时间
}

export interface Article {
  id?: number
  user_id?: number // 作者
  category_id?: number // 文章分类
  article_cover?: string // 文章缩略图
  article_title?: string // 标题
  article_content?: string // 内容
  type?: number // 文章类型 1原创 2转载 3翻译
  original_url?: string // 原文链接
  is_top?: number // 是否置顶 0否 1是
  is_delete?: number // 是否删除  0否 1是
  status?: number // 状态值 1公开 2私密 3评论可见
  created_at?: string // 发表时间
  updated_at?: string // 更新时间
}

export interface ArticleTag {
  id?: number
  article_id?: number // 文章id
  tag_id?: number // 标签id
}

export interface CasbinRule {
  id?: number
  ptype?: string
  v0?: string
  v1?: string
  v2?: string
  v3?: string
  v4?: string
  v5?: string
}

export interface Category {
  id?: number
  category_name?: string // 分类名
  created_at?: string // 创建时间
  updated_at?: string // 更新时间
}

export interface ChatRecord {
  id?: number // 主键
  user_id?: number // 用户id
  nickname?: string // 昵称
  avatar?: string // 头像
  content?: string // 聊天内容
  ip_address?: string // ip地址
  ip_source?: string // ip来源
  type?: number // 类型
  created_at?: string // 创建时间
  updated_at?: string // 更新时间
}

export interface Comment {
  id?: number // 主键
  user_id?: number // 评论用户Id
  topic_id?: number // 评论主题id
  comment_content?: string // 评论内容
  reply_user_id?: number // 回复用户id
  parent_id?: number // 父评论id
  type?: number // 评论类型 1.文章 2.友链 3.说说
  is_delete?: number // 是否删除  0否 1是
  is_review?: number // 是否审核
  created_at?: string // 评论时间
  updated_at?: string // 更新时间
}

export interface FriendLink {
  id?: number
  link_name?: string // 链接名
  link_avatar?: string // 链接头像
  link_address?: string // 链接地址
  link_intro?: string // 链接介绍
  created_at?: string // 创建时间
  updated_at?: string // 更新时间
}

export interface Menu {
  id?: number // 主键
  name?: string // 菜单名
  path?: string // 菜单路径
  component?: string // 组件
  icon?: string // 菜单icon
  rank?: number // 排序
  parent_id?: number // 父id
  is_hidden?: number // 是否隐藏  0否1是
  created_at?: string // 创建时间
  updated_at?: string // 更新时间
}

export interface OperationLog {
  id?: number // 主键id
  opt_module?: string // 操作模块
  opt_type?: string // 操作类型
  opt_method?: string // 操作方法
  opt_desc?: string // 操作描述
  cost?: string // 耗时（ms）
  status?: number // 响应状态码
  request_url?: string // 操作url
  request_method?: string // 请求方式
  request_header?: string // 请求头
  request_param?: string // 请求参数
  response_data?: string // 返回数据
  user_id?: number // 用户id
  nickname?: string // 用户昵称
  ip_address?: string // 操作ip
  ip_source?: string // 操作地址
  created_at?: string // 创建时间
  updated_at?: string // 更新时间
}

export interface Page {
  id?: number // 页面id
  page_name?: string // 页面名
  page_label?: string // 页面标签
  page_cover?: string // 页面封面
  created_at?: string // 创建时间
  updated_at?: string // 更新时间
}

export interface Photo {
  id?: number // 主键
  album_id?: number // 相册id
  photo_name?: string // 照片名
  photo_desc?: string // 照片描述
  photo_src?: string // 照片地址
  is_delete?: number // 是否删除
  created_at?: string // 创建时间
  updated_at?: string // 更新时间
}

export interface PhotoAlbum {
  id?: number // 主键
  album_name?: string // 相册名
  album_desc?: string // 相册描述
  album_cover?: string // 相册封面
  is_delete?: number // 是否删除
  status?: number // 状态值 1公开 2私密
  created_at?: string // 创建时间
  updated_at?: string // 更新时间
}

export interface Remark {
  id?: number // 主键id
  nickname?: string // 昵称
  avatar?: string // 头像
  message_content?: string // 留言内容
  ip_address?: string // 用户ip
  ip_source?: string // 用户地址
  time?: number // 弹幕速度
  is_review?: number // 是否审核
  created_at?: string // 发布时间
  updated_at?: string // 修改时间
}

export interface Role {
  id?: number // 主键id
  role_pid?: number // 父角色id
  role_domain?: string // 角色域
  role_name?: string // 角色名
  role_comment?: string // 角色备注
  is_disable?: number // 是否禁用  0否 1是
  is_default?: number // 是否默认角色 0否 1是
  created_at?: string // 创建时间
  updated_at?: string // 更新时间
}

export interface RoleApi {
  id?: number // 主键id
  role_id?: number // 角色id
  api_id?: number // 接口id
}

export interface RoleMenu {
  id?: number // 主键id
  role_id?: number // 角色id
  menu_id?: number // 菜单id
}

export interface Tag {
  id?: number
  tag_name?: string // 标签名
  created_at?: string // 创建时间
  updated_at?: string // 更新时间
}

export interface Talk {
  id?: number // 说说id
  user_id?: number // 用户id
  content?: string // 说说内容
  images?: string // 图片
  is_top?: number // 是否置顶
  status?: number // 状态 1.公开 2.私密
  created_at?: string // 创建时间
  updated_at?: string // 更新时间
}

export interface UniqueView {
  id?: number
  views_count?: number // 访问量
  created_at?: string // 创建时间
  updated_at?: string // 更新时间
}

export interface UploadRecord {
  id?: number // id
  user_id?: number // 用户id
  label?: string // 标签
  file_name?: string // 文件名称
  file_size?: number // 文件大小
  file_md5?: string // 文件md5值
  file_url?: string // 上传路径
  created_at?: string // 创建时间
  updated_at?: string // 更新时间
}

export interface UserAccount {
  id?: number // id
  username?: string // 用户名
  password?: string // 密码
  status?: number // 状态: -1删除 0正常 1禁用
  register_type?: string // 注册方式
  ip_address?: string // 注册ip
  ip_source?: string // 注册ip 源
  created_at?: string // 创建时间
  updated_at?: string // 更新时间
}

export interface UserInformation {
  id?: number // id
  user_id?: number // 用户id
  email?: string // 用户邮箱
  nickname?: string // 用户昵称
  avatar?: string // 用户头像
  phone?: string // 用户手机号
  intro?: string // 个人简介
  web_site?: string // 个人网站
  created_at?: string // 创建时间
  updated_at?: string // 更新时间
}

export interface UserLoginHistory {
  id?: number // id
  user_id?: number // 用户id
  login_type?: string // 登录类型
  agent?: string // 代理
  ip_address?: string // ip host
  ip_source?: string // ip 源
  created_at?: string // 创建时间
  updated_at?: string // 更新时间
}

export interface UserOauth {
  id?: number // id
  user_id?: number // 用户id
  open_id?: string // 开发平台id，标识唯一用户
  platform?: string // 平台:手机号、邮箱、微信、飞书
  created_at?: string // 创建时间
  updated_at?: string // 更新时间
}

export interface UserRole {
  id?: number // 主键id
  user_id?: number // 用户id
  role_id?: number // 角色id
}

export interface WebsiteConfig {
  id?: number
  key?: string // 关键词
  config?: string // 配置信息
  created_at?: string // 创建时间
  updated_at?: string // 更新时间
}

export interface ArticleCondition {
  tag_id?: number // 文章标签ID
  category_id?: number // 文章分类ID
}

export interface ArticleTopReq {
  id?: number // 文章ID
  is_top?: number // 是否置顶
}

export interface ArticleDeleteReq {
  id?: number // 文章ID
  is_delete?: number // 是否删除
}

export interface ArticleDetailsReq {
  id?: number // 文章ID
  article_cover?: string // 文章缩略图
  article_title?: string // 标题
  article_content?: string // 内容
  like_count?: number // 点赞量
  views_count?: number // 浏览量
  type?: number // 文章类型
  original_url?: string // 原文链接
  is_top?: number // 是否置顶
  status?: number // 状态值 1 公开 2 私密 3 评论可见
  created_at?: string // 发表时间
  updated_at?: string // 更新时间
  category_name?: string // 文章分类名
  tag_name_list?: string[] // 文章标签列表
}

export interface Captcha {
  captcha_type?: string
  height?: number // Height png height in pixel.
  width?: number // Width Captcha png width in pixel.
  length?: number // DefaultLen Default number of digits in captcha solution.
}

export interface CaptchaVerify {
  id?: string
  code?: string
}

export interface CaptchaEmail {
  email?: string // 目标邮箱
  service?: string // 服务
  check?: boolean // 是否检查邮箱是否存在
}

export interface User {
  username?: string
  password?: string
  code?: string
}

export interface UserEmail {
  username?: string
}

export interface ResetPasswordReq {
  username?: string
  password?: string
  code?: string
}

export interface ChangePasswordReq {
  id?: number // 从 JWT 中提取 user id，避免越权
  password?: string // 旧密码
  new_password?: string // 新密码
}

export interface OauthLoginReq {
  platform?: string // 平台
  code?: string // 授权码
  state?: string // 状态
}

export interface UpdateUserRoles {
  user_id?: number
  role_ids?: number[]
}

export interface UpdateRoleMenus {
  role_id?: number
  menu_ids?: number[]
}

export interface UpdateRoleResources {
  role_id?: number
  resource_ids?: number[]
}

export interface WebsiteConfigRequest {
  key?: string
  value?: string
}

export interface ArticleHome extends ArticleDTO {
  article_category?: CategoryDTO // 文章分类
  article_tag_list?: TagDTO[] // 文章标签列表
}

export interface ArticleBack extends ArticleDTO {
  category_name?: string // 文章分类名
  tag_name_list?: string[] // 文章标签列表
}

export interface ArticleDTO {
  id?: number // 文章ID
  article_cover?: string // 文章缩略图
  article_title?: string // 标题
  article_content?: string // 内容
  like_count?: number // 点赞量
  views_count?: number // 浏览量
  type?: number // 文章类型
  original_url?: string // 原文链接
  is_top?: number // 是否置顶
  is_delete?: number // 是否删除
  status?: number // 状态值 1 公开 2 私密 3 评论可见
  created_at?: string // 发表时间
  updated_at?: string // 更新时间
}

export interface ArticleConditionDTO {
  article_dto_list?: ArticleHome[] // 文章列表
  condition_name?: string // 条件名
}

export interface ArticlePageDetails extends ArticleHome {
  last_article?: ArticlePreviewDTO // 上一篇文章
  next_article?: ArticlePreviewDTO // 下一篇文章
  recommend_article_list?: ArticlePreviewDTO[] // 推荐文章列表
  newest_article_list?: ArticlePreviewDTO[] // 最新文章列表
}

export interface TagDTO {
  id?: number // 标签ID
  tag_name?: string // 标签名
}

export interface CategoryDTO {
  id?: number
  category_name?: string // 分类名
}

export interface ArticlePreviewDTO {
  id?: number // 文章ID
  article_cover?: string // 文章缩略图
  article_title?: string // 标题
  created_at?: string // 创建时间
}

export interface BlogHomeInfo {
  article_count?: number // 文章数量
  category_count?: number // 分类数量
  tag_count?: number // 标签数量
  views_count?: string // 访问量
  website_config?: WebsiteConfigDTO // 网站配置
  page_list?: PageDTO[] // 页面列表
}

export interface WebsiteConfigDTO {
  admin_url?: string // 后台地址
  alipay_qr_code?: string // 支付宝二维码
  gitee?: string // Gitee
  github?: string // Github
  is_chat_room?: number // 是否开启聊天室
  is_comment_review?: number // 是否开启评论审核
  is_email_notice?: number // 是否开启邮件通知
  is_message_review?: number // 是否开启留言审核
  is_music_player?: number // 是否开启音乐播放器
  is_reward?: number // 是否开启打赏
  qq?: string // QQ
  social_login_list?: string[] // 社交登录列表
  social_url_list?: string[] // 社交地址列表
  tourist_avatar?: string // 游客头像
  user_avatar?: string // 用户头像
  website_author?: string // 网站作者
  website_avatar?: any // 网站头像
  website_create_time?: string // 网站创建时间
  website_intro?: string // 网站介绍
  website_name?: string // 网站名称
  website_notice?: string // 网站公告
  website_record_no?: string // 网站备案号
  websocket_url?: string // websocket地址
  weixin_qr_code?: string // 微信二维码
}

export interface PageDTO {
  id?: number // 页面ID
  page_name?: string // 页面名称
  page_label?: string // 页面标签
  page_cover?: string // 页面封面
}

export interface AdminHomeInfo {
  views_count?: number // 访问量
  message_count?: number // 留言量
  user_count?: number // 用户量
  article_count?: number // 文章量
  category_dto_list?: CategoryDTO[] // 分类统计
  tag_dto_list?: TagDTO[] // 标签列表
  article_statistics_list?: ArticleStatisticsDTO[] // 文章统计列表
  unique_view_dto_list?: UniqueViewDTO[] // 一周用户量集合
  article_rank_dto_list?: ArticleRankDTO[] // 文章浏览量排行
}

export interface ArticleStatisticsDTO {
  day?: string // 日期
  count?: number // 数量
}

export interface UniqueViewDTO {
  day?: string // 日期
  count?: number // 数量
}

export interface ArticleRankDTO {
  id?: number // 文章ID
  article_title?: string // 文章标题
  count?: number // 数量
}

export interface CaptchaResp {
  id?: string
  encode_data?: string // 验证码内容，base64编码
  length?: number
}

export interface CategoryDetailsDTO {
  id?: number
  category_name?: string // 分类名
  article_count?: number
  created_at?: string // 创建时间
  updated_at?: string // 更新时间
}

export interface TagDetailsDTO {
  id?: number // 标签ID
  tag_name?: string // 标签名
  article_count?: number // 文章数量
  created_at?: string // 创建时间
  updated_at?: string // 更新时间
}

export interface CommentDTO {
  id?: number // 评论id
  user_id?: number // 用户id
  nickname?: string // 用户昵称
  avatar?: string // 用户头像
  web_site?: string // 个人网站
  comment_content?: string // 评论内容
  like_count?: number // 点赞数
  created_at?: string // 评论时间
  reply_count?: number // 回复量
  reply_dto_list?: ReplyDTO[] // 回复列表
}

export interface ReplyDTO {
  id?: number // 评论id
  parent_id?: number // 父评论id
  user_id?: number // 用户id
  nickname?: string // 用户昵称
  avatar?: string // 用户头像
  web_site?: string // 个人网站
  reply_user_id?: number // 被回复用户id
  reply_nickname?: string // 被回复用户昵称
  reply_web_site?: string // 被回复个人网站
  comment_content?: string // 评论内容
  like_count?: number // 点赞数
  created_at?: string // 评论时间
}

export interface CommentBackDTO {
  id?: number
  avatar?: string
  nickname?: string
  reply_nickname?: string
  article_title?: string
  comment_content?: string
  type?: number
  is_review?: number
  created_at?: string
}

export interface Login extends Token {
  ip_address?: string
  ip_source?: string
  user_info?: UserInfo
  login_info?: LoginHistory
}

export interface Token {
  token_type?: string // token类型,Bearer
  access_token?: string // 访问token,过期时间较短。2h
  expires_in?: number // 访问token过期时间
  refresh_token?: string // 刷新token,过期时间较长。30d
  refresh_expires_in?: number // 刷新token过期时间
  uid?: number // 用户id
}

export interface UserInfo {
  id?: number
  username?: string
  nickname?: string
  avatar?: string
  intro?: string
  website?: string
  email?: string
  article_like_set?: string[] // 文章点赞集合
  comment_like_set?: string[] // 评论点赞集合
  talk_like_set?: string[] // 说说点赞集合
  roles?: RoleDTO[]
}

export interface LoginHistory {
  id?: number
  login_type?: string // 登录类型
  agent?: string // 代理
  ip_address?: string // ip host
  ip_source?: string // ip 源
  login_time?: string // 创建时间
}

export interface OauthLoginUrl {
  url?: string // 授权地址
}

export interface UserMenu {
  id?: number
  name?: string
  path?: string
  component?: string
  icon?: string
  rank?: number
  is_hidden?: boolean
  children?: UserMenu[]
}

export interface PhotoAlbumDetails extends PhotoAlbum {
  photo_count?: number
}

export interface BatchResult {
  total_count?: number // 总数量
  success_count?: number // 成功数量
  fail_count?: number // 失败数量
}

export interface ApiDetails extends Api {
  children?: ApiDetails[]
}

export interface MenuDetails extends Menu {
  children?: MenuDetails[]
}

export interface RoleInfo extends Role {
  menu_id_list?: number[]
  resource_id_list?: number[]
}

export interface RoleDTO {
  role_name?: string
  role_comment?: string
}

export interface TalkDetails {
  id?: number
  user_id?: number // 用户ID
  nickname?: string // 用户昵称
  avatar?: string // 用户头像
  content?: string // 评论内容
  img_list?: string[] // 图片URL列表
  is_top?: number // 是否置顶
  status?: number // 状态
  like_count?: number // 点赞量
  comment_count?: number // 评论量
  created_at?: string // 创建时间
  updated_at?: string // 更新时间
}

export interface UserArea {
  name?: string
  value?: number
}

export interface ChatRequest {
  model?: string // 模型名称
  messages?: ChatMessage[] // 对话消息列表
}

export interface ChatMessage {
  role?: string // 角色：system 或 user ，assistant ChatGPT 生成的响应
  content?: string // 消息内容
}

export interface ChatResponse {
  id?: string // 对话 ID
  object?: string // 对象类型
  created?: number // 创建时间戳
  model?: string // 模型名称
  choices?: ChatChoice[] // 生成的回复列表
  usage?: ChatUsage // API 调用的使用情况
}

export interface ChatChoice {
  index?: number // 回复的索引
  message?: ChatMessage // 回复的消息
  finish_reason?: string // 回复的完成原因
}

export interface ChatUsage {
  prompt_tokens?: number // 提示 tokens 数量
  completion_tokens?: number // 生成回复的 tokens 数量
  total_tokens?: number // 总 tokens 数量
}

export interface ChatRole {
  act?: string
  prompt?: string
}

