import { createApp } from "vue"
import App from "@/App.vue"
import store from "@/store"
import router from "@/router"

// 导入公共样式
import "@/styles/index.scss"
// 一定要在main.ts中导入tailwind.css，防止vite每次hmr都会请求src/style/index.scss整体css文件导致热更新慢的问题
import "@/styles/tailwind.css"
// 导入字体图标
import "./assets/iconfont/kit/iconfont.css"
import "./assets/iconfont/platform/iconfont.css"
// 导入字体图标
import "./assets/iconfont/iconfont.css"
// 动画样式
import "animate.css"
// markdown样式
import "@/styles/markdown.scss"
// 全局样式
// import '@/styles/var.less'
// import '@/styles/mixin.less'
// import '@/styles/global.less'
// vuetify 响应时ui https://github.com/vuetifyjs/vuetify
import { vuetify } from "@/plugins/vuetify"
// 使用element-ui
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import { usePhotoPreview } from "@/plugins/imagePreview"
import { useI18n } from "@/plugins/i18n.ts"
import { MotionPlugin } from "@vueuse/motion"

const app = createApp(App)

const initApp = async () => {
  app.use(router)
  app.use(store)
  app.use(vuetify)
  app.use(useI18n)
  app.use(ElementPlus)
  app.use(MotionPlugin)

  usePhotoPreview(app)
  await router.isReady()
  app.mount("#app")
}
initApp()
