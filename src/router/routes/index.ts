import type { RouteRecordRaw } from "vue-router"

/**
 * 路由配置
 * @description 所有路由都在这里集中管理
 */
const routes: RouteRecordRaw[] = [
  /**
   * 首页
   */
  {
    path: "/",
    name: "home",
    component: () => import("@/views/home/home.vue"),
    meta: {
      title: "Home",
    },
  },
  /**
   * 子路由示例
   */
  {
    path: "/articles/:articleId",
    component: () => import("@/views/article/Article.vue"),
  },
  {
    path: "/archives",
    component: () => import("@/views/archive/Archive.vue"),
    meta: {
      title: "归档",
    },
  },
  {
    path: "/albums",
    component: () => import("@/views/album/Album.vue"),
    meta: {
      title: "相册",
    },
  },
  {
    path: "/talks",
    component: () => import("@/views/talk/Talk.vue"),
    meta: {
      title: "说说",
    },
  },
  {
    path: "/talks/:talkId",
    component: () => import("@/views/talk/TalkInfo.vue"),
    meta: {
      title: "说说",
    },
  },
  {
    path: "/albums/:albumId",
    component: () => import("@/views/album/Photo.vue"),
  },
  {
    path: "/tags",
    component: () => import("@/views/tag/Tag.vue"),
    meta: {
      title: "标签",
    },
  },
  {
    path: "/categories",
    component: () => import("@/views/category/Category.vue"),
    meta: {
      title: "分类",
    },
  },
  {
    path: "/categories/:categoryId",
    component: () => import("@/views/article/ArticleList.vue"),
  },
  {
    path: "/tags/:tagId",
    component: () => import("@/views/article/ArticleList.vue"),
  },
  {
    path: "/links",
    component: () => import("@/views/link/Link.vue"),
    meta: {
      title: "友链列表",
    },
  },
  {
    path: "/about",
    component: () => import("@/views/about/About.vue"),
    meta: {
      title: "关于我",
    },
  },
  {
    path: "/message",
    component: () => import("@/views/message/Message.vue"),
    meta: {
      title: "留言板",
    },
  },
  {
    path: "/user",
    component: () => import("@/views/user/User.vue"),
    meta: {
      title: "个人中心",
    },
  },
  {
    path: "/oauth/login/:platform",
    component: () => import("@/components/OauthLogin.vue"),
  },
  {
    path: "/ai/chatbot",
    component: () => import("@/views/chatgpt/ChatBotV1.vue"),
  },
]

export default routes
