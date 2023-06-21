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
      <!--      <SideNavBar></SideNavBar>-->
      <!-- 页脚 -->
      <Footer></Footer>
      <!-- 返回顶部 -->
      <BackTop></BackTop>
      <!-- 搜索模态框 -->
      <SearchModel></SearchModel>
      <!--    &lt;!&ndash; 登录模态框 &ndash;&gt;-->
      <!--    <LoginModel></LoginModel>-->
      <!--    &lt;!&ndash; 注册模态框 &ndash;&gt;-->
      <!--    <RegisterModel></RegisterModel>-->
      <!--    &lt;!&ndash; 忘记密码模态框 &ndash;&gt;-->
      <!--    <ForgetModel></ForgetModel>-->
      <!--    &lt;!&ndash; 绑定邮箱模态框 &ndash;&gt;-->
      <!--    <EmailModel></EmailModel>-->
    </el-config-provider>
  </v-app>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import TopNavBar from './components/layout/TopNavBar.vue'
import Footer from './components/layout/Footer.vue'
import SideNavBar from './components/layout/SideNavBar.vue'
import BackTop from './components/BackTop.vue'
import SearchModel from './components/model/SearchModel.vue'
import { ElConfigProvider } from 'element-plus'
import zh from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import { useAppStore } from '@/stores'

const appStore = useAppStore()
const locale = computed(() => (appStore.lang === 'zh' ? zh : en))
const size = computed(() => appStore.size)
</script>
