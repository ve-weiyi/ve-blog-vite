import { defineStore } from 'pinia'

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
    blogInfo: {
      websiteConfig: {
        websiteCreateTime: '2022',
        websiteAuthor: '与梦',
        websiteRecordNo: '桂ICP备2022000185号-1',
      },
    },
  }),
  actions: {
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
