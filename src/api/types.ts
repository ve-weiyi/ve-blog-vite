export interface PingReq {
}

export interface PingResp {
  env?: string;
  name?: string;
  version?: string;
  runtime?: string;
  description?: string;
  rpc_status?: Record<string, any>;
}

export interface UserArea {
  name?: string;
  value?: number;
}

export interface User {
  id?: number;
  username?: string;
  nickname?: string;
  avatar?: string;
  intro?: string;
  website?: string;
  email?: string;
  status?: number;
  register_type?: string;
  ip_address?: string;// ip host
  ip_source?: string;// ip 源
  created_at?: number;
  updated_at?: number;
  roles?: RoleLabel[];
}

export interface RoleLabel {
  role_name?: string;
  role_comment?: string;
}

export interface UpdateUserStatusReq {
  user_id?: number;
  status?: number;// 状态: -1删除 0正常 1禁用
}

export interface UpdateUserRolesReq {
  user_id?: number;
  role_ids?: number[];
}

export interface RestHeader {
  header_country?: string;
  header_language?: string;
  header_timezone?: string;
  header_app_name?: string;
  header_x_user_id?: string;
  header_x_auth_token?: string;
  header_terminal_id?: string;
}

export interface EmptyReq {
}

export interface IdReq {
  id?: number;
}

export interface IdsReq {
  ids?: number[];
}

export interface PageQuery extends PageLimit{
  sorts?: PageSort[];
  conditions?: PageCondition[];
}

export interface PageLimit {
  page?: number;
  page_size?: number;
}

export interface PageSort {
  field?: string;
  order?: string;
}

export interface PageCondition {
  field?: string;// 字段
  value?: string;// 值
  logic?: string;// and | or
  operator?: string;// = | >= | < | in | not in |....
}

export interface EmptyResp {
}

export interface BatchResp {
  success_count?: number;
}

export interface PageResp {
  page?: number;
  page_size?: number;
  total?: number;
  list?: any;
}

export interface Response {
  code?: number;
  message?: string;
  data?: any;
  trace_id?: string;
}

export interface LoginHistory {
  id?: number;
  login_type?: string;// 登录类型
  agent?: string;// 代理
  ip_address?: string;// ip host
  ip_source?: string;// ip 源
  login_time?: string;// 创建时间
}

export interface UserApi {
  id?: number;// 主键id
  name?: string;// api名称
  path?: string;// api路径
  method?: string;// api请求方法
  parent_id?: number;// 分组id
  traceable?: number;// 是否追溯操作记录 0需要，1是
  status?: number;// 状态 1开，2关
  created_at?: number;// 创建时间
  updated_at?: number;// 更新时间
  children?: UserApi[];
}

export interface UserMenu {
  id?: number;// 主键
  parent_id?: number;// 父id
  title?: string;// 菜单标题
  type?: number;// 菜单类型（0代表菜单、1代表iframe、2代表外链、3代表按钮）
  path?: string;// 路由地址
  name?: string;// 路由名字
  component?: string;// Layout组件
  redirect?: string;// 路由重定向
  meta?: UserMenuMeta;// meta配置
  children?: UserMenu[];
}

export interface UserMenuMeta {
  title?: string;// 菜单名称
  icon?: string;// 菜单图标
  show_link?: boolean;// 是否在菜单中显示
  rank?: number;// 菜单升序排序
  extra_icon?: string;// 菜单名称右侧的额外图标
  show_parent?: boolean;// 是否显示父级菜单
  roles?: string[];// 页面级别权限设置
  auths?: string[];// 按钮级别权限设置
  keep_alive?: boolean;// 路由组件缓存
  frame_src?: string;// 内嵌的iframe链接
  frame_loading?: boolean;// iframe页是否开启首次加载动画
  transition?: any;// 页面加载动画
  hidden_tag?: boolean;// 是否不添加信息到标签页
  dynamic_level?: number;// 动态路由可打开的最大数量
  active_path?: string;// 将某个菜单激活
}

export interface UserRole {
  id?: number;// 主键id
  role_p_id?: number;// 父角色id
  role_domain?: string;// 角色域
  role_name?: string;// 角色名
  role_comment?: string;// 角色备注
  is_disable?: number;// 是否禁用  0否 1是
  is_default?: number;// 是否默认角色 0否 1是
  created_at?: number;// 创建时间
  updated_at?: number;// 更新时间
  menu_id_list?: number[];
  resource_id_list?: number[];
}

export interface UserApisResp {
  list?: UserApi[];
}

export interface UserMenusResp {
  list?: UserMenu[];
}

export interface UserRolesResp {
  list?: UserRole[];
}

export interface UserInfoReq {
  nickname?: string;// 昵称
  website?: string;// 网站
  intro?: string;// 简介
  avatar?: string;// 头像
}

export interface UserInfoResp {
  id?: number;// id
  user_id?: number;// 用户id
  email?: string;// 用户邮箱
  nickname?: string;// 用户昵称
  avatar?: string;// 用户头像
  phone?: string;// 用户手机号
  intro?: string;// 个人简介
  website?: string;// 个人网站
  created_at?: number;// 创建时间
  updated_at?: number;// 更新时间
}

export interface LoginReq {
  username?: string;
  password?: string;
  code?: string;
}

export interface LoginResp {
  token?: Token;
  user_info?: UserInfo;
}

export interface Token {
  user_id?: number;// 用户id
  token_type?: string;// token类型,Bearer
  access_token?: string;// 访问token,过期时间较短。2h
  expires_in?: number;// 访问token过期时间
  refresh_token?: string;// 刷新token,过期时间较长。30d
  refresh_expires_in?: number;// 刷新token过期时间
  scope?: string;// 作用域
}

export interface UserInfo {
  user_id?: number;// 用户id
  username?: string;// 用户名
  nickname?: string;// 昵称
  avatar?: string;// 头像
  intro?: string;// 个人简介
  website?: string;// 个人网站
  email?: string;// 邮箱
}

export interface UserEmailReq {
  username?: string;
}

export interface ResetPasswordReq {
  username?: string;
  password?: string;
  code?: string;
}

export interface OauthLoginReq {
  platform?: string;// 平台
  code?: string;// 授权码
  state?: string;// 状态
}

export interface OauthLoginUrlResp {
  url?: string;// 授权地址
}

export interface Api {
  id?: number;// 主键id
  name?: string;// api名称
  path?: string;// api路径
  method?: string;// api请求方法
  parent_id?: number;// 分组id
  traceable?: number;// 是否追溯操作记录 0需要，1是
  status?: number;// 状态 1开，2关
  created_at?: number;// 创建时间
  updated_at?: number;// 更新时间
}

export interface ApiDetails {
  id?: number;// 主键id
  name?: string;// api名称
  path?: string;// api路径
  method?: string;// api请求方法
  parent_id?: number;// 分组id
  traceable?: number;// 是否追溯操作记录 0需要，1是
  status?: number;// 状态 1开，2关
  created_at?: number;// 创建时间
  updated_at?: number;// 更新时间
  children?: ApiDetails[];
}

export interface MenuDetails {
  id?: number;// 主键
  parent_id?: number;// 父id
  title?: string;// 菜单标题
  type?: number;// 菜单类型（0代表菜单、1代表iframe、2代表外链、3代表按钮）
  path?: string;// 路由地址
  name?: string;// 路由名字
  component?: string;// Layout组件
  redirect?: string;// 路由重定向
  meta?: Meta;// meta配置
  children?: MenuDetails[];
  created_at?: number;// 创建时间
  updated_at?: number;// 更新时间
}

export interface Meta {
  title?: string;// 菜单名称
  icon?: string;// 菜单图标
  show_link?: boolean;// 是否在菜单中显示
  rank?: number;// 菜单升序排序
  extra_icon?: string;// 菜单名称右侧的额外图标
  show_parent?: boolean;// 是否显示父级菜单
  roles?: string[];// 页面级别权限设置
  auths?: string[];// 按钮级别权限设置
  keep_alive?: boolean;// 路由组件缓存
  frame_src?: string;// 内嵌的iframe链接
  frame_loading?: boolean;// iframe页是否开启首次加载动画
  transition?: Transition;// 页面加载动画
  hidden_tag?: boolean;// 是否不添加信息到标签页
  dynamic_level?: number;// 动态路由可打开的最大数量
  active_path?: string;// 将某个菜单激活
}

export interface Transition {
  name?: string;// 当前路由动画效果
  enter_transition?: string;// 进场动画
  leave_transition?: string;// 离场动画
}

export interface RouteConfigsTable {
  type?: number;// 菜单类型（0代表菜单、1代表iframe、2代表外链、3代表按钮）
  path?: string;// 路由地址
  name?: string;// 路由名字
  component?: string;// Layout组件
  redirect?: string;// 路由重定向
  meta?: Meta;// meta配置
  children?: RouteConfigsTable[];// 子路由配置项
}

export interface SyncMenuRequest {
  menus?: RouteConfigsTable[];
}

// 角色
export interface Role {
  id?: number;// 主键id
  role_pid?: number;// 父角色id
  role_domain?: string;// 角色域
  role_name?: string;// 角色名
  role_comment?: string;// 角色备注
  is_disable?: number;// 是否禁用  0否 1是
  is_default?: number;// 是否默认角色 0否 1是
  created_at?: number;// 创建时间
  updated_at?: number;// 更新时间
}

export interface RoleDetails {
  id?: number;// 主键id
  role_pid?: number;// 父角色id
  role_domain?: string;// 角色域
  role_name?: string;// 角色名
  role_comment?: string;// 角色备注
  is_disable?: number;// 是否禁用  0否 1是
  is_default?: number;// 是否默认角色 0否 1是
  created_at?: number;// 创建时间
  updated_at?: number;// 更新时间
  menu_id_list?: number[];
  api_id_list?: number[];
}

export interface RoleResourcesResp {
  role_id?: number;
  api_ids?: number[];
  menu_ids?: number[];
}

export interface UpdateRoleApisReq {
  role_id?: number;
  api_ids?: number[];
}

export interface UpdateRoleMenusReq {
  role_id?: number;
  menu_ids?: number[];
}

export interface BlogHomeInfo {
  article_count?: number;// 文章数量
  category_count?: number;// 分类数量
  tag_count?: number;// 标签数量
  views_count?: string;// 访问量
  website_config?: WebsiteConfig;// 网站配置
  page_list?: PageDTO[];// 页面列表
}

export interface WebsiteConfig {
  admin_url?: string;// 后台地址
  alipay_qr_code?: string;// 支付宝二维码
  gitee?: string;// Gitee
  github?: string;// Github
  is_chat_room?: number;// 是否开启聊天室
  is_comment_review?: number;// 是否开启评论审核
  is_email_notice?: number;// 是否开启邮件通知
  is_message_review?: number;// 是否开启留言审核
  is_music_player?: number;// 是否开启音乐播放器
  is_reward?: number;// 是否开启打赏
  qq?: string;// QQ
  social_login_list?: string[];// 社交登录列表
  social_url_list?: string[];// 社交地址列表
  tourist_avatar?: string;// 游客头像
  user_avatar?: string;// 用户头像
  website_author?: string;// 网站作者
  website_avatar?: string;// 网站头像
  website_create_time?: string;// 网站创建时间
  website_intro?: string;// 网站介绍
  website_name?: string;// 网站名称
  website_notice?: string;// 网站公告
  website_record_no?: string;// 网站备案号
  websocket_url?: string;// websocket地址
  weixin_qr_code?: string;// 微信二维码
}

export interface PageDTO {
  id?: number;// 页面ID
  page_name?: string;// 页面名称
  page_label?: string;// 页面标签
  page_cover?: string;// 页面封面
}

export interface AdminHomeInfo {
  views_count?: number;// 访问量
  message_count?: number;// 留言量
  user_count?: number;// 用户量
  article_count?: number;// 文章量
  category_list?: CategoryDTO[];// 分类列表
  tag_list?: TagDTO[];// 标签列表
  article_view_rank_list?: ArticleViewRankDTO[];// 文章浏览量排行
  article_statistics_list?: ArticleStatisticsDTO[];// 每日文章生产量
  unique_view_list?: UniqueViewDTO[];// 每日用户访问量
}

export interface CategoryDTO {
  id?: number;
  category_name?: string;// 分类名
}

export interface TagDTO {
  id?: number;// 标签ID
  tag_name?: string;// 标签名
}

export interface ArticleViewRankDTO {
  id?: number;// 文章ID
  article_title?: string;// 文章标题
  count?: number;// 数量
}

export interface ArticleStatisticsDTO {
  day?: string;// 日期
  count?: number;// 数量
}

export interface UniqueViewDTO {
  day?: string;// 日期
  count?: number;// 数量
}

export interface AboutMe {
  content?: string;
}

//    Article {
//        Id int64 `json:"id,optional"`                           // id
//        UserId int64 `json:"user_id,optional"`                  // 作者
//        CategoryId int64 `json:"category_id,optional"`          // 文章分类
//        ArticleCover string `json:"article_cover,optional"`     // 文章缩略图
//        ArticleTitle string `json:"article_title,optional"`     // 标题
//        ArticleContent string `json:"article_content,optional"` // 内容
//        Type int64 `json:"type,optional"`                       // 文章类型 1原创 2转载 3翻译
//        OriginalUrl string `json:"original_url,optional"`       // 原文链接
//        IsTop int64 `json:"is_top,optional"`                    // 是否置顶 0否 1是
//        IsDelete int64 `json:"is_delete,optional"`              // 是否删除  0否 1是
//        Status int64 `json:"status,optional"`                   // 状态值 1公开 2私密 3评论可见
//        CreatedAt int64 `json:"created_at,optional"`            // 发表时间
//        UpdatedAt int64 `json:"updated_at,optional"`            // 更新时间
//    }
// 新建文章
export interface ArticleNewReq {
  id?: number;// id
  user_id?: number;// 作者
  category_id?: number;// 文章分类
  article_cover?: string;// 文章缩略图
  article_title?: string;// 标题
  article_content?: string;// 内容
  type?: number;// 文章类型 1原创 2转载 3翻译
  original_url?: string;// 原文链接
  is_top?: number;// 是否置顶 0否 1是
  is_delete?: number;// 是否删除  0否 1是
  status?: number;// 状态值 1公开 2私密 3评论可见
  created_at?: number;// 发表时间
  updated_at?: number;// 更新时间
  category_name?: string;// 文章分类名
  tag_name_list?: string[];// 文章标签列表
}

// 后台文章
export interface ArticleBackDTO {
  id?: number;// 文章ID
  article_cover?: string;// 文章缩略图
  article_title?: string;// 标题
  article_content?: string;// 内容
  type?: number;// 文章类型
  original_url?: string;// 原文链接
  is_top?: number;// 是否置顶
  status?: number;// 状态值 1 公开 2 私密 3 评论可见
  created_at?: number;// 发表时间
  updated_at?: number;// 更新时间
  category_name?: string;// 文章分类名
  tag_name_list?: string[];// 文章标签列表
  like_count?: number;// 点赞量
  views_count?: number;// 浏览量
}

// 首页文章
export interface ArticleHomeDTO {
  id?: number;// 文章ID
  article_cover?: string;// 文章缩略图
  article_title?: string;// 标题
  article_content?: string;// 内容
  type?: number;// 文章类型
  original_url?: string;// 原文链接
  is_top?: number;// 是否置顶
  status?: number;// 状态值 1 公开 2 私密 3 评论可见
  created_at?: number;// 发表时间
  updated_at?: number;// 更新时间
  category_name?: string;// 文章分类名
  tag_name_list?: string[];// 文章标签列表
  like_count?: number;// 点赞量
  views_count?: number;// 浏览量
}

// 文章预览
export interface ArticlePreviewDTO {
  id?: number;// 文章ID
  article_cover?: string;// 文章缩略图
  article_title?: string;// 标题
  created_at?: number;// 创建时间
}

// 文章推荐详情
export interface ArticleRecommendResp extends ArticleHomeDTO{
  last_article?: ArticlePreviewDTO;// 上一篇文章
  next_article?: ArticlePreviewDTO;// 下一篇文章
  recommend_article_list?: ArticlePreviewDTO[];// 推荐文章列表
  newest_article_list?: ArticlePreviewDTO[];// 最新文章列表
}

export interface ArticleClassifyReq {
  classify_name?: string;// 分类名
}

export interface ArticleClassifyResp {
  article_list?: ArticlePreviewDTO[];// 文章列表
  condition_name?: string;// 条件名
}

export interface ArticlePreDeleteReq {
  id?: number;// 文章ID
  is_delete?: number;// 是否删除
}

export interface ArticleTopReq {
  id?: number;// 文章ID
  is_top?: number;// 是否置顶
}

export interface Category {
  id?: number;// id
  category_name?: string;// 分类名
  created_at?: number;// 创建时间
  updated_at?: number;// 更新时间
}

export interface CategoryDetails {
  id?: number;
  category_name?: string;// 分类名
  article_count?: number;
  created_at?: number;// 创建时间
  updated_at?: number;// 更新时间
}

export interface Tag {
  id?: number;// id
  tag_name?: string;// 标签名
  created_at?: number;// 创建时间
  updated_at?: number;// 更新时间
}

export interface TagDetails {
  id?: number;// 标签ID
  tag_name?: string;// 标签名
  article_count?: number;// 文章数量
  created_at?: number;// 创建时间
  updated_at?: number;// 更新时间
}

export interface FriendLink {
  id?: number;// id
  link_name?: string;// 链接名
  link_avatar?: string;// 链接头像
  link_address?: string;// 链接地址
  link_intro?: string;// 链接介绍
  created_at?: number;// 创建时间
  updated_at?: number;// 更新时间
}

export interface Remark {
  id?: number;// 主键id
  nickname?: string;// 昵称
  avatar?: string;// 头像
  message_content?: string;// 留言内容
  ip_address?: string;// 用户ip
  ip_source?: string;// 用户地址
  time?: number;// 弹幕速度
  is_review?: number;// 是否审核
  created_at?: number;// 发布时间
  updated_at?: number;// 更新时间
}

export interface OperationLog {
  id?: number;// 主键id
  user_id?: number;// 用户id
  nickname?: string;// 用户昵称
  ip_address?: string;// 操作ip
  ip_source?: string;// 操作地址
  opt_module?: string;// 操作模块
  opt_desc?: string;// 操作描述
  request_u_r_l?: string;// 请求地址
  request_method?: string;// 请求方式
  request_header?: string;// 请求头参数
  request_data?: string;// 请求参数
  response_data?: string;// 返回数据
  response_status?: number;// 响应状态码
  cost?: string;// 耗时（ms）
  created_at?: number;// 创建时间
  updated_at?: number;// 更新时间
}

export interface Page {
  id?: number;// 页面id
  page_name?: string;// 页面名
  page_label?: string;// 页面标签
  page_cover?: string;// 页面封面
  created_at?: number;// 创建时间
  updated_at?: number;// 更新时间
}

export interface Photo {
  id?: number;// 主键
  album_id?: number;// 相册id
  photo_name?: string;// 照片名
  photo_desc?: string;// 照片描述
  photo_src?: string;// 照片地址
  is_delete?: number;// 是否删除
  created_at?: number;// 创建时间
  updated_at?: number;// 更新时间
}

export interface PhotoAlbum {
  id?: number;// 主键
  album_name?: string;// 相册名
  album_desc?: string;// 相册描述
  album_cover?: string;// 相册封面
  is_delete?: number;// 是否删除
  status?: number;// 状态值 1公开 2私密
  created_at?: number;// 创建时间
  updated_at?: number;// 更新时间
  photo_count?: number;// 照片数量
}

export interface TalkDetails {
  id?: number;// 说说ID
  user_id?: number;// 用户ID
  nickname?: string;// 用户昵称
  avatar?: string;// 用户头像
  content?: string;// 评论内容
  img_list?: string[];// 图片URL列表
  is_top?: number;// 是否置顶
  status?: number;// 状态 1.公开 2.私密
  like_count?: number;// 点赞量
  comment_count?: number;// 评论量
  created_at?: number;// 创建时间
  updated_at?: number;// 更新时间
}

// 创建评论
export interface CommentNewReq {
  topic_id?: number;// 主题id
  parent_id?: number;// 父评论id
  session_id?: number;// 会话id
  reply_user_id?: number;// 回复用户id
  comment_content?: string;// 评论内容
  type?: number;// 评论类型 1.文章 2.友链 3.说说
}

// 后台评论
export interface CommentBackDTO {
  id?: number;
  type?: number;
  topic_title?: string;
  user_avatar?: string;
  user_nickname?: string;
  comment_content?: string;
  is_review?: number;
  created_at?: number;
}

export interface CommentUserInfo {
  id?: number;
  nickname?: string;
  avatar?: string;
  website?: string;
}

// 评论回复
export interface CommentReply {
  id?: number;// 评论id
  topic_id?: number;// 主题id
  parent_id?: number;// 父评论id
  session_id?: number;// 会话id
  user_id?: number;// 用户id
  nickname?: string;// 用户昵称
  avatar?: string;// 用户头像
  website?: string;// 用户网站
  reply_user_id?: number;// 被回复用户id
  reply_nickname?: string;// 被回复用户昵称
  reply_avatar?: string;// 被回复用户头像
  reply_website?: string;// 被回复用户网站
  comment_content?: string;// 评论内容
  type?: number;// 评论类型 1.文章 2.友链 3.说说
  created_at?: number;// 评论时间
  like_count?: number;// 点赞数
}

// 评论
export interface CommentDTO {
  id?: number;// 评论id
  topic_id?: number;// 主题id
  parent_id?: number;// 父评论id
  session_id?: number;// 会话id
  user_id?: number;// 用户id
  nickname?: string;// 用户昵称
  avatar?: string;// 用户头像
  website?: string;// 用户网站
  reply_user_id?: number;// 被回复用户id
  reply_nickname?: string;// 被回复用户昵称
  reply_avatar?: string;// 被回复用户头像
  reply_website?: string;// 被回复用户网站
  comment_content?: string;// 评论内容
  type?: number;// 评论类型 1.文章 2.友链 3.说说
  created_at?: number;// 评论时间
  like_count?: number;// 点赞数
  reply_count?: number;// 回复量
  comment_reply_list?: CommentReply[];// 评论回复列表
}

export interface CommentQueryReq {
  page?: number;// 页码
  page_size?: number;// 每页数量
  topic_id?: number;// 主题id
  parent_id?: number;// 父评论id
  type?: number;// 评论类型 1.文章 2.友链 3.说说
  order_by?: string;// 排序字段 create_at|like_count
}

export interface ChatRecord {
  id?: number;// 主键
  user_id?: number;// 用户id
  nickname?: string;// 昵称
  avatar?: string;// 头像
  content?: string;// 聊天内容
  ip_address?: string;// ip地址
  ip_source?: string;// ip来源
  type?: number;// 类型
  created_at?: number;// 创建时间
  updated_at?: number;// 更新时间
}

export interface UploadFileReq {
  label?: string;
  file?: any;// 文件
  file_size?: number;// 文件大小
  file_md5?: string;// 文件md5值
}

export interface UploadFileResp {
  id?: number;// id
  user_id?: number;// 用户id
  label?: string;// 标签
  file_name?: string;// 文件名称
  file_size?: number;// 文件大小
  file_md5?: string;// 文件md5值
  file_url?: string;// 上传路径
  created_at?: number;// 创建时间
  updated_at?: number;// 更新时间
}

