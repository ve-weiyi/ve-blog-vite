import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "@/App.vue"
import router from "@/router"

// 导入公共样式
import "./styles/index.scss"
// 导入字体图标
import "./assets/iconfont/kit/iconfont.css"
import "./assets/iconfont/platform/iconfont.css"
// 导入字体图标
import "./assets/iconfont/iconfont.css"
// 动画样式
import "animate.css"
// markdown样式
import "./styles/markdown.scss"
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
import { store } from "@/stores"

const app = createApp(App)

const initApp = async () => {
  app.use(router)
  app.use(store)
  app.use(vuetify)

  app.use(ElementPlus)

  usePhotoPreview(app)
  await router.isReady()
  app.mount("#app")
}
initApp()
