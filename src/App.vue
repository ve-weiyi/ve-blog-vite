<template>
  <!-- 导航栏 -->
  <TopNavBar></TopNavBar>
  <!-- 内容 -->
  <v-content>
    <router-view :key="key" />
  </v-content>
  <!-- 页脚 -->
  <Footer></Footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { isMobile, watchResize } from '@bassist/utils'
import Footer from './components/layout/Footer.vue'
import TopNavBar from './components/layout/TopNavBar.vue'

const route = useRoute()
const key = computed(() => `${String(route.name || route.path)}-${new Date()}`)

watchResize(() => {
  document.body.className = `platform-${isMobile() ? 'mobile' : 'desktop'}`
})
</script>
