<template>
  <v-app style="background-color: transparent">
    <el-config-provider :locale="locale" :size="size">
      <v-main>
        <!-- 内容 -->
        <router-view />
      </v-main>
      <!-- 导航栏 -->
      <TopNavBar></TopNavBar>
      <!-- 侧边导航栏 -->
      <SideNavBar></SideNavBar>
      <!-- 页脚 -->
      <Footer></Footer>
      <!-- 返回顶部 -->
      <BackTop></BackTop>
      <!-- 搜索模态框 -->
      <SearchModel></SearchModel>
      <!-- 登录模态框 -->
      <LoginModel></LoginModel>
      <!-- 注册模态框 -->
      <RegisterModel></RegisterModel>
      <!-- 忘记密码模态框 -->
      <ForgetModel></ForgetModel>
      <!-- 绑定邮箱模态框 -->
      <EmailModel></EmailModel>
      <!-- 音乐播放器 -->
      <Player v-if="webStore.blogInfo.websiteConfig.isMusicPlayer === 1 && !isMobile" />
      <!-- 聊天室 -->
      <ChatRoom v-if="webStore.blogInfo.websiteConfig.isChatRoom === 1"></ChatRoom>
    </el-config-provider>
  </v-app>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import TopNavBar from "./components/layout/TopNavBar.vue"
import Footer from "./components/layout/Footer.vue"
import SideNavBar from "./components/layout/SideNavBar.vue"
import BackTop from "./components/BackTop.vue"
import SearchModel from "./components/model/SearchModel.vue"
import LoginModel from "./components/model/LoginModel.vue"
import RegisterModel from "./components/model/RegisterModel.vue"
import ForgetModel from "./components/model/ForgetModel.vue"
import Player from "./components/zw-player/player.vue"
import ChatRoom from "./components/ChatRoom.vue"
import EmailModel from "./components/model/EmailModel.vue"
import { ElConfigProvider, ElMessage } from "element-plus"
import zh from "element-plus/es/locale/lang/zh-cn"
import en from "element-plus/es/locale/lang/en"
import { getUserInfoApi } from "@/api/user"
import cookies from "@/utils/cookies"
import { useWebStoreHook } from "@/stores/modules/website"
import { useAppStore } from "@/stores/modules/app.ts"

const appStore = useAppStore()
// 获取存储的博客信息
const webStore = useWebStoreHook()

const locale = computed(() => (appStore.lang === "zh" ? zh : en))
const size = computed(() => appStore.size)

const isMobile = computed(() => {
  const flag = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  )
  return flag
})

const getUserinfo = () => {
  getUserInfoApi()
    .then((res) => {
      console.log("getUserInfoApi", res)
      webStore.setUser(res.data)
    })
    .catch((err) => {
      cookies.clearAll()
    })
}

// 在组件挂载时启动定时器
onMounted(() => {
  // 页面刷新后自动获取用户信息
  const token = webStore.getToken()
  console.log("token", token)
  if (token != undefined) {
    getUserinfo()
  }
})
</script>
