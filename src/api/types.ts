
export interface AboutMe {
  content?: string; 
}

export interface AdminHomeInfo {
  views_count?: number; // 访问量
  message_count?: number; // 留言量
  user_count?: number; // 用户量
  article_count?: number; // 文章量
  category_list?: CategoryDTO[]; // 分类列表
  tag_list?: TagDTO[]; // 标签列表
  article_view_rank_list?: ArticleViewRankDTO[]; // 文章浏览量排行
  article_statistics_list?: ArticleStatisticsDTO[]; // 每日文章生产量
  unique_view_list?: UniqueViewDTO[]; // 每日用户访问量
}

export interface Album {
  id?: number; // 主键
  album_name?: string; // 相册名
  album_desc?: string; // 相册描述
  album_cover?: string; // 相册封面
}

export interface ArticleClassifyReq {
  page?: number; // 页码
  page_size?: number; // 每页数量
  classify_name?: string; // 分类名
}

export interface ArticleClassifyResp {
  article_list?: ArticlePreviewDTO[]; // 文章列表
  condition_name?: string; // 条件名
}

export interface ArticleHomeDTO {
  id?: number; // 文章ID
  article_cover?: string; // 文章缩略图
  article_title?: string; // 标题
  article_content?: string; // 内容
  type?: number; // 文章类型
  original_url?: string; // 原文链接
  is_top?: number; // 是否置顶
  status?: number; // 状态值 1 公开 2 私密 3 评论可见
  created_at?: number; // 发表时间
  updated_at?: number; // 更新时间
  category_name?: string; // 文章分类名
  tag_name_list?: string[]; // 文章标签列表
  like_count?: number; // 点赞量
  views_count?: number; // 浏览量
}

export interface ArticlePreDeleteReq {
  id?: number; // 文章ID
  is_delete?: number; // 是否删除
}

export interface ArticlePreviewDTO {
  id?: number; // 文章ID
  article_cover?: string; // 文章缩略图
  article_title?: string; // 标题
  created_at?: number; // 创建时间
}

export interface ArticleRecommendResp extends ArticleHomeDTO {
  last_article?: ArticlePreviewDTO; // 上一篇文章
  next_article?: ArticlePreviewDTO; // 下一篇文章
  recommend_article_list?: ArticlePreviewDTO[]; // 推荐文章列表
  newest_article_list?: ArticlePreviewDTO[]; // 最新文章列表
}

export interface ArticleStatisticsDTO {
  day?: string; // 日期
  count?: number; // 数量
}

export interface ArticleTopReq {
  id?: number; // 文章ID
  is_top?: number; // 是否置顶
}

export interface ArticleViewRankDTO {
  id?: number; // 文章ID
  article_title?: string; // 文章标题
  count?: number; // 数量
}

export interface BatchResp {
  success_count?: number; 
}

export interface BlogHomeInfo {
  article_count?: number; // 文章数量
  category_count?: number; // 分类数量
  tag_count?: number; // 标签数量
  views_count?: string; // 访问量
  website_config?: WebsiteConfig; // 网站配置
  page_list?: PageDTO[]; // 页面列表
}

export interface CategoryDTO {
  id?: number; 
  category_name?: string; // 分类名
}

export interface CategoryDetails {
  id?: number; 
  category_name?: string; // 分类名
  article_count?: number; 
  created_at?: number; // 创建时间
  updated_at?: number; // 更新时间
}

export interface ChatRecord {
  id?: number; // 主键
  user_id?: number; // 用户id
  nickname?: string; // 昵称
  avatar?: string; // 头像
  content?: string; // 聊天内容
  ip_address?: string; // ip地址
  ip_source?: string; // ip来源
  type?: number; // 类型
  created_at?: number; // 创建时间
  updated_at?: number; // 更新时间
}

export interface ChatSocketMsg {
  type?: number; // 消息类型 1: 文本消息 2: 图片消息 3: 文件消息 4: 语音消息 5: 视频消息
  content?: string; // 消息内容
}

export interface CommentBackDTO {
  id?: number; 
  type?: number; 
  topic_title?: string; 
  nickname?: string; // 用户昵称
  avatar?: string; // 用户头像
  comment_content?: string; 
  is_review?: number; 
  created_at?: number; 
}

export interface CommentDTO {
  id?: number; // 评论id
  topic_id?: number; // 主题id
  parent_id?: number; // 父评论id
  session_id?: number; // 会话id
  user_id?: number; // 用户id
  nickname?: string; // 用户昵称
  avatar?: string; // 用户头像
  website?: string; // 用户网站
  reply_user_id?: number; // 被回复用户id
  reply_nickname?: string; // 被回复用户昵称
  reply_avatar?: string; // 被回复用户头像
  reply_website?: string; // 被回复用户网站
  comment_content?: string; // 评论内容
  type?: number; // 评论类型 1.文章 2.友链 3.说说
  created_at?: number; // 评论时间
  like_count?: number; // 点赞数
  reply_count?: number; // 回复量
  comment_reply_list?: CommentReply[]; // 评论回复列表
}

export interface CommentNewReq {
  topic_id?: number; // 主题id
  parent_id?: number; // 父评论id
  session_id?: number; // 会话id
  reply_user_id?: number; // 回复用户id
  comment_content?: string; // 评论内容
  type?: number; // 评论类型 1.文章 2.友链 3.说说
}

export interface CommentQueryReq {
  page?: number; // 页码
  page_size?: number; // 每页数量
  topic_id?: number; // 主题id
  parent_id?: number; // 父评论id
  type?: number; // 评论类型 1.文章 2.友链 3.说说
  order_by?: string; // 排序字段 create_at|like_count
}

export interface CommentReply {
  id?: number; // 评论id
  topic_id?: number; // 主题id
  parent_id?: number; // 父评论id
  session_id?: number; // 会话id
  user_id?: number; // 用户id
  nickname?: string; // 用户昵称
  avatar?: string; // 用户头像
  website?: string; // 用户网站
  reply_user_id?: number; // 被回复用户id
  reply_nickname?: string; // 被回复用户昵称
  reply_avatar?: string; // 被回复用户头像
  reply_website?: string; // 被回复用户网站
  comment_content?: string; // 评论内容
  type?: number; // 评论类型 1.文章 2.友链 3.说说
  created_at?: number; // 评论时间
  like_count?: number; // 点赞数
}

export interface CommentUserInfo {
  id?: number; 
  nickname?: string; 
  avatar?: string; 
  website?: string; 
}

export interface EmptyReq {
}

export interface EmptyResp {
}

export interface FriendLink {
  id?: number; // id
  link_name?: string; // 链接名
  link_avatar?: string; // 链接头像
  link_address?: string; // 链接地址
  link_intro?: string; // 链接介绍
  created_at?: number; // 创建时间
  updated_at?: number; // 更新时间
}

export interface IdReq {
  id?: number; 
}

export interface IdsReq {
  ids?: number[]; 
}

export interface LoginReq {
  username?: string; 
  password?: string; 
  code?: string; 
}

export interface LoginResp {
  token?: Token; 
}

export interface OauthLoginReq {
  platform?: string; // 平台
  code?: string; // 授权码
  state?: string; // 状态
}

export interface OauthLoginUrlResp {
  url?: string; // 授权地址
}

export interface PageCondition {
  field?: string; // 字段
  value?: string; // 值
  logic?: string; // and | or
  operator?: string; // = | >= | < | in | not in |....
}

export interface PageDTO {
  id?: number; // 页面ID
  page_name?: string; // 页面名称
  page_label?: string; // 页面标签
  page_cover?: string; // 页面封面
}

export interface PageLimit {
  page?: number; 
  page_size?: number; 
}

export interface PageQuery {
  page?: number; 
  page_size?: number; 
  sorts?: PageSort[]; 
  conditions?: PageCondition[]; 
}

export interface PageResp {
  page?: number; 
  page_size?: number; 
  total?: number; 
  list?: any; 
}

export interface PageSort {
  field?: string; 
  order?: string; // asc | desc
}

export interface Photo {
  id?: number; // 主键
  photo_url?: string; // 照片地址
}

export interface PhotoQuery {
  album_id?: number; // 相册ID
}

export interface PingReq {
}

export interface PingResp {
  env?: string; 
  name?: string; 
  version?: string; 
  runtime?: string; 
  description?: string; 
  rpc_status?: string[]; 
}

export interface Remark {
  id?: number; // 主键id
  nickname?: string; // 昵称
  avatar?: string; // 头像
  message_content?: string; // 留言内容
  ip_address?: string; // 用户ip
  ip_source?: string; // 用户地址
  time?: number; // 弹幕速度
  is_review?: number; // 是否审核
  created_at?: number; // 发布时间
  updated_at?: number; // 更新时间
}

export interface ResetPasswordReq {
  username?: string; 
  password?: string; 
  code?: string; 
}

export interface Response {
  code?: number; 
  message?: string; 
  data?: any; 
  trace_id?: string; 
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

export interface TagDTO {
  id?: number; // 标签ID
  tag_name?: string; // 标签名
}

export interface TagDetails {
  id?: number; // 标签ID
  tag_name?: string; // 标签名
  article_count?: number; // 文章数量
  created_at?: number; // 创建时间
  updated_at?: number; // 更新时间
}

export interface Talk {
  id?: number; // 说说ID
  user_id?: number; // 用户ID
  nickname?: string; // 用户昵称
  avatar?: string; // 用户头像
  content?: string; // 评论内容
  img_list?: string[]; // 图片URL列表
  is_top?: number; // 是否置顶
  status?: number; // 状态 1.公开 2.私密
  like_count?: number; // 点赞量
  comment_count?: number; // 评论量
  created_at?: number; // 创建时间
  updated_at?: number; // 更新时间
}

export interface Token {
  user_id?: number; // 用户id
  token_type?: string; // token类型,Bearer
  access_token?: string; // 访问token,过期时间较短。2h
  expires_in?: number; // 访问token过期时间
  refresh_token?: string; // 刷新token,过期时间较长。30d
  refresh_expires_in?: number; // 刷新token过期时间
  scope?: string; // 作用域
}

export interface UniqueViewDTO {
  day?: string; // 日期
  count?: number; // 数量
}

export interface UploadFileReq {
  label?: string; 
  file?: any; // 文件
  file_size?: number; // 文件大小
  file_md5?: string; // 文件md5值
}

export interface UploadFileResp {
  id?: number; // id
  user_id?: number; // 用户id
  label?: string; // 标签
  file_name?: string; // 文件名称
  file_size?: number; // 文件大小
  file_md5?: string; // 文件md5值
  file_url?: string; // 上传路径
  created_at?: number; // 创建时间
  updated_at?: number; // 更新时间
}

export interface UserEmailReq {
  username?: string; 
}

export interface UserInfoExt {
  email?: string; // 用户邮箱
  phone?: string; // 用户手机号
  intro?: string; // 简介
  website?: string; // 网站
}

export interface UserInfoReq extends UserInfoExt {
  nickname?: string; // 昵称
  avatar?: string; // 头像
}

export interface UserInfoResp extends UserInfoExt {
  user_id?: number; // 用户id
  username?: string; // 用户名
  nickname?: string; // 用户昵称
  avatar?: string; // 用户头像
}

export interface WebsiteConfig {
  admin_url?: string; // 后台地址
  alipay_qr_code?: string; // 支付宝二维码
  gitee?: string; // Gitee
  github?: string; // Github
  is_chat_room?: number; // 是否开启聊天室
  is_comment_review?: number; // 是否开启评论审核
  is_email_notice?: number; // 是否开启邮件通知
  is_message_review?: number; // 是否开启留言审核
  is_music_player?: number; // 是否开启音乐播放器
  is_reward?: number; // 是否开启打赏
  qq?: string; // QQ
  social_login_list?: string[]; // 社交登录列表
  social_url_list?: string[]; // 社交地址列表
  tourist_avatar?: string; // 游客头像
  user_avatar?: string; // 用户头像
  website_author?: string; // 网站作者
  website_avatar?: string; // 网站头像
  website_create_time?: string; // 网站创建时间
  website_intro?: string; // 网站介绍
  website_name?: string; // 网站名称
  website_notice?: string; // 网站公告
  website_record_no?: string; // 网站备案号
  websocket_url?: string; // websocket地址
  weixin_qr_code?: string; // 微信二维码
}
