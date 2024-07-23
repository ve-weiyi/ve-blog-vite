import { getUserInfo, logout } from "@/api/login";
import type { UserInfo } from "@/api/user/types";
import { removeToken } from "@/utils/token";

/**
 * 用户
 */
interface UserState {
  /**
   * 用户id
   */
  id?: number;
  /**
   * 头像
   */
  avatar: string;
  /**
   * 昵称
   */
  nickname: string;
  /**
   * 用户名
   */
  username: string;
  /**
   * 邮箱
   */
  email: string;
  /**
   * 个人网站
   */
  webSite: string;
  /**
   * 个人简介
   */
  intro: string;
  /**
   * 登录方式
   */
  loginType?: number;
  /**
   * 第三方登录之前的path
   */
  path: string;
  /**
   * 文章点赞集合
   */
  articleLikeSet: number[];
  /**
   * 评论点赞集合
   */
  commentLikeSet: number[];
  /**
   * 说说点赞集合
   */
  talkLikeSet: number[];
}

export const useUserStore = defineStore("useUserStore", {
  state: (): UserState => ({
    id: undefined,
    avatar: "",
    nickname: "",
    email: "",
    username: "",
    webSite: "",
    intro: "",
    loginType: undefined,
    path: "",
    articleLikeSet: [],
    commentLikeSet: [],
    talkLikeSet: [],
  }),
  actions: {
    GetUserInfo() {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then((res) => {
            if (data.flag) {
              this.id = res.data.id;
              this.avatar = res.data.avatar;
              this.nickname = res.data.nickname;
              this.email = res.data.email;
              this.username = res.data.username;
              this.webSite = res.data.webSite;
              this.intro = res.data.intro;
              this.loginType = res.data.loginType;
              this.articleLikeSet = res.data.articleLikeSet;
              this.commentLikeSet = res.data.commentLikeSet;
              this.talkLikeSet = res.data.talkLikeSet;
            }
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    LogOut() {
      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
            this.$reset();
            removeToken();
            resolve(null);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    forceLogOut() {
      this.$reset();
      removeToken();
    },
    savePath(path: string) {
      this.path = path;
    },
    articleLike(articleId: number) {
      let index = this.articleLikeSet.indexOf(articleId);
      if (index != -1) {
        this.articleLikeSet.splice(index, 1);
      } else {
        this.articleLikeSet.push(articleId);
      }
    },
    commentLike(commentId: number) {
      let index = this.commentLikeSet.indexOf(commentId);
      if (index != -1) {
        this.commentLikeSet.splice(index, 1);
      } else {
        this.commentLikeSet.push(commentId);
      }
    },
    talkLike(talkId: number) {
      let index = this.talkLikeSet.indexOf(talkId);
      if (index != -1) {
        this.talkLikeSet.splice(index, 1);
      } else {
        this.talkLikeSet.push(talkId);
      }
    },
    updateUserInfo(user: UserInfo) {
      this.nickname = user.nickname;
      this.webSite = user.webSite;
      this.intro = user.intro;
    },
  },
  getters: {},
  persist: {
    key: "user",
    storage: sessionStorage,
  },
});
