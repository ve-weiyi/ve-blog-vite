import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from '@/router'

// 导入公共样式
import './styles/index.scss'
// 导入字体图标
import './assets/iconfont/iconfont.css'
// 导入公共样式
import '@/styles/common.scss'

// 全局样式
import '@/styles/var.less'
import '@/styles/mixin.less'
import '@/styles/global.less'

createApp(App)
  .use(createPinia()) // 启用 Pinia
  .use(router)
  .mount('#app')
