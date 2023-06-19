import { defineStore } from 'pinia'
import Qinglong from '@/assets/images/qinglong.jpg'
import Avatar from '@/assets/images/avatar.jpg'

export const useWebStore = defineStore({
  id: 'store',
  state: (): any => ({
    searchFlag: false,
    loginFlag: false,
    registerFlag: false,
    forgetFlag: false,
    emailFlag: false,
    drawer: false,
    loginUrl: '',
    userId: null,
    avatar: null,
    nickname: null,
    intro: null,
    webSite: null,
    loginType: null,
    email: null,
    articleLikeSet: [],
    commentLikeSet: [],
    talkLikeSet: [],
    defaultCover: 'https://veport.oss-cn-beijing.aliyuncs.com/background/zhuqu.jpg',
    blogInfo: {
      viewsCount: 999,
      websiteConfig: {
        alipayQRCode: 'https://veport.oss-cn-beijing.aliyuncs.com/config/17f234dc487c1bb5bbb732869be0eb53.jpg',
        gitee: 'https://gitee.com/wy791422171',
        github: 'https://github.com/ve-weiyi',
        isChatRoom: 1,
        isCommentReview: 0,
        isEmailNotice: 1,
        isMessageReview: 0,
        isMusicPlayer: 0,
        isReward: 1,
        qq: '791422171',
        socialLoginList: ['qq', 'weibo'],
        socialUrlList: ['qq', 'github', 'gitee'],
        touristAvatar: 'https://veport.oss-cn-beijing.aliyuncs.com/config/5bfb96809bee5ba80a36811f0bf1d1ea.gif',
        userAvatar: 'https://veport.oss-cn-beijing.aliyuncs.com/config/041a0d1c7fdfb5a610c307e7e44d4f39.jpg',
        websiteAuthor: '静闻弦语',
        websiteAvatar: Avatar,
        websiteCreateTime: '2022-01-19',
        websiteIntro: '你能做的,不止如此。',
        websiteName: '与梦',
        websiteNotice:
          '用户需要查看、发表文章、修改其他信息请登录后台管理系统。网站后台管理系统->https://ve77.cn/admin。     \n网站搭建问题请联系站长QQ791422171。',
        websiteRecordNo: '桂ICP备2022000185号-1',
        websocketUrl: 'wss://ve77.cn:8088/api/websocket',
        weiXinQRCode: 'https://veport.oss-cn-beijing.aliyuncs.com/config/6bed8a1130b170546341ece729e8819f.jpg',
      },
      pageList: [
        {
          pageLabel: 'home',
          pageCover: Qinglong,
        },
      ],
    },
  }),
  actions: {
    getCover(page: string) {
      const cover = this.blogInfo.pageList.find((item: any) => item.pageLabel === page)?.pageCover
      const pageCover = cover ? cover : this.defaultCover
      return `background: url(${pageCover}) center center / cover no-repeat`
    },
    login(user) {
      this.userId = user.userInfoId
      this.avatar = user.avatar
      this.nickname = user.nickname
      this.intro = user.intro
      this.webSite = user.webSite
      this.articleLikeSet = user.articleLikeSet ? user.articleLikeSet : []
      this.commentLikeSet = user.commentLikeSet ? user.commentLikeSet : []
      this.talkLikeSet = user.talkLikeSet ? user.talkLikeSet : []
      this.email = user.email
      this.loginType = user.loginType
    },
    logout() {
      this.userId = null
      this.avatar = null
      this.nickname = null
      this.intro = null
      this.webSite = null
      this.articleLikeSet = []
      this.commentLikeSet = []
      this.talkLikeSet = []
      this.email = null
      this.loginType = null
    },
    saveLoginUrl(url) {
      this.loginUrl = url
    },
    saveEmail(email) {
      this.email = email
    },
    updateUserInfo(user) {
      this.nickname = user.nickname
      this.intro = user.intro
      this.webSite = user.webSite
    },
    savePageInfo(pageList) {
      this.pageList = pageList
    },
    updateAvatar(avatar) {
      this.avatar = avatar
    },
    checkBlogInfo(blogInfo) {
      this.blogInfo = blogInfo
    },
    closeModel() {
      this.registerFlag = false
      this.loginFlag = false
      this.searchFlag = false
      this.emailFlag = false
    },
    articleLike(articleId) {
      var articleLikeSet = this.articleLikeSet
      if (articleLikeSet.indexOf(articleId) != -1) {
        articleLikeSet.splice(articleLikeSet.indexOf(articleId), 1)
      } else {
        articleLikeSet.push(articleId)
      }
    },
    commentLike(commentId) {
      var commentLikeSet = this.commentLikeSet
      if (commentLikeSet.indexOf(commentId) != -1) {
        commentLikeSet.splice(commentLikeSet.indexOf(commentId), 1)
      } else {
        commentLikeSet.push(commentId)
      }
    },
    talkLike(talkId) {
      var talkLikeSet = this.talkLikeSet
      if (talkLikeSet.indexOf(talkId) != -1) {
        talkLikeSet.splice(talkLikeSet.indexOf(talkId), 1)
      } else {
        talkLikeSet.push(talkId)
      }
    },
  },
})
