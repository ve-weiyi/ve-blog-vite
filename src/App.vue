<template>
  <el-config-provider :locale="locale" :size="size">
    <!-- 导航栏 -->
    <TopNavBar></TopNavBar>
    <!-- 内容 -->
    <router-view />
    <!-- 页脚 -->
    <Footer></Footer>
  </el-config-provider>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import TopNavBar from './components/layout/TopNavBar.vue'
import Footer from './components/layout/Footer.vue'
import { ElConfigProvider } from 'element-plus'
import zh from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import { useAppStore } from '@/stores'

const appStore = useAppStore()
const locale = computed(() => (appStore.lang === 'zh' ? zh : en))
const size = computed(() => appStore.size)
</script>
