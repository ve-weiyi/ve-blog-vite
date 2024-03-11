import { defineStore } from "pinia"
// @ts-ignore
import Qinglong from "@/assets/images/qinglong.jpg"
// @ts-ignore
import Avatar from "@/assets/images/avatar.jpg"
import cookies from "@/utils/cookies"
import store from "@/store"
import { BlogHomeInfo, Login, LoginHistory, Token, UserInfo } from "@/api/types.ts"

export const useWebStore = defineStore({
  id: "store",
  state: () => ({
    searchFlag: false,
    loginFlag: false,
    registerFlag: false,
    forgetFlag: false,
    emailFlag: false,
    drawer: false,
    defaultCover: "https://veport.oss-cn-beijing.aliyuncs.com/background/zhuqu.jpg",
    userInfo: {
      id: null,
      username: "",
      nickname: "",
      avatar: "",
      intro: "",
      website: "",
      email: "",
      article_like_set: [],
      comment_like_set: [],
      talk_like_set: [],
      roles: [],
    },
    loginHistory: {
      login_type: "email",
      agent: "PostmanRuntime/7.35.0",
      ip_address: "127.0.0.1",
      ip_source: "localhost",
      login_time: "2023-11-19 03:17:53.846649 +0800 CST m=+14.125751626",
    },
    blogInfo: {
      article_count: 999,
      category_count: 999,
      tag_count: 999,
      views_count: 999,
      website_config: {
        admin_url: "http://localhost:7777/admin/",
        alipay_qr_code: "https://veport.oss-cn-beijing.aliyuncs.com/config/17f234dc487c1bb5bbb732869be0eb53.jpg",
        gitee: "https://gitee.com/wy791422171",
        github: "https://github.com/ve-weiyi",
        is_chat_room: 1,
        is_comment_review: 0,
        is_email_notice: 1,
        is_message_review: 0,
        is_music_player: 0,
        is_reward: 1,
        qq: "791422171",
        social_login_list: ["qq", "weibo", "feishu", "wechat"],
        social_url_list: ["qq", "github", "gitee"],
        tourist_avatar: "https://veport.oss-cn-beijing.aliyuncs.com/config/5bfb96809bee5ba80a36811f0bf1d1ea.gif",
        user_avatar: "https://veport.oss-cn-beijing.aliyuncs.com/config/041a0d1c7fdfb5a610c307e7e44d4f39.jpg",
        website_author: "静闻弦语",
        website_avatar: Avatar,
        website_create_time: "2022-01-19",
        website_intro: "你能做的,不止如此。",
        website_name: "与梦",
        website_notice:
          "用户需要查看、发表文章、修改其他信息请登录后台管理系统。网站后台管理系统->https://ve77.cn/admin。     \n网站搭建问题请联系站长QQ791422171。",
        website_record_no: "桂ICP备2022000185号-1",
        websocket_url: "ws://127.0.0.1:9999/api/v1/ws",
        weixin_qr_code: "https://veport.oss-cn-beijing.aliyuncs.com/config/6bed8a1130b170546341ece729e8819f.jpg",
      },
      page_list: [
        {
          page_label: "home",
          page_cover: Qinglong,
        },
      ],
    },
    replyInfo: {},
  }),
  actions: {
    getCover(page: string) {
      const cover = this.blogInfo.page_list.find((item: any) => item.page_label === page)?.page_cover
      const pageCover = cover ? cover : this.defaultCover
      return `background: url(${pageCover}) center center / cover no-repeat`
    },
    setBlogInfo(blogInfo: BlogHomeInfo) {
      this.blogInfo = blogInfo
      // console.log("website_record_no", this.blogInfo.website_config.website_record_no)
    },
    setUser(user: UserInfo) {
      this.userInfo = user
    },
    setLoginHistory(loginHistory: LoginHistory) {
      this.loginHistory = loginHistory
    },
    login(login: Login) {
      cookies.setItem("token", login.token)
      cookies.setItem("user_info", login.user_info)
      console.log("token", cookies.getItem<Token>("token"))
      console.log("user_info", cookies.getItem<UserInfo>("user_info"))
    },
    logout() {
      cookies.clear()
      this.userInfo = {
        id: null,
        username: "",
        nickname: "",
        avatar: "",
        intro: "",
        website: "",
        email: "",
        article_like_set: [],
        comment_like_set: [],
        talk_like_set: [],
        roles: [],
      }
      this.loginHistory = {}
    },
    isLogin() {
      const tk = this.getToken()
      console.log("tk", tk)
      return tk != undefined
    },
    getToken(): Token {
      return cookies.getItem("token")
    },
    closeModel() {
      this.registerFlag = false
      this.loginFlag = false
      this.searchFlag = false
      this.emailFlag = false
    },
    articleLike(articleId: number) {
      const articleLikeSet = this.userInfo.article_like_set
      if (articleLikeSet.indexOf(articleId) != -1) {
        articleLikeSet.splice(articleLikeSet.indexOf(articleId), 1)
      } else {
        articleLikeSet.push(articleId)
      }
    },
    commentLike(commentId: number) {
      const commentLikeSet = this.userInfo.comment_like_set
      if (commentLikeSet.indexOf(commentId) != -1) {
        commentLikeSet.splice(commentLikeSet.indexOf(commentId), 1)
      } else {
        commentLikeSet.push(commentId)
      }
    },
    talkLike(talkId: number) {
      const talkLikeSet = this.userInfo.talk_like_set
      if (talkLikeSet.indexOf(talkId) != -1) {
        talkLikeSet.splice(talkLikeSet.indexOf(talkId), 1)
      } else {
        talkLikeSet.push(talkId)
      }
    },
    isArticleLike(articleId: number) {
      return this.userInfo.article_like_set.indexOf(articleId) != -1
    },
    isCommentLike(commentId: number) {
      return this.userInfo.comment_like_set.indexOf(commentId) != -1
    },
    isTalkLike(talkId: number) {
      return this.userInfo.talk_like_set.indexOf(talkId) != -1
    },
  },
})

export function useWebStoreHook() {
  return useWebStore(store)
}
