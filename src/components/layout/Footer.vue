<template>
  <v-footer app padless absolute v-if="!isMessage">
    <div class="footer-wrap">
      <div>
        ©{{ websiteConfig.websiteCreateTime }} - {{ new Date().getFullYear() }} By
        {{ websiteConfig.websiteAuthor }}
      </div>
      <a href="https://beian.miit.gov.cn/" target="_blank">
        {{ websiteConfig.websiteRecordNo }}
      </a>
    </div>
  </v-footer>
</template>

<script setup lang="ts">
import { useWebStore } from '@/stores/modules/website'

// 获取存储的博客信息
const blogInfo = useWebStore().blogInfo

// 网站信息
const websiteConfig = blogInfo.websiteConfig

function getCurrentYear() {
  return new Date().getFullYear()
}
</script>

<style scoped>
.footer-wrap {
  width: 100%;
  line-height: 2;
  position: relative;
  padding: 20px 20px;
  color: #eee;
  font-size: 14px;
  text-align: center;
  background: linear-gradient(-45deg, #ee7752, #ce3e75, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: Gradient 10s ease infinite;
}

.footer-wrap a {
  color: #eee !important;
}

@keyframes Gradient {
  0% {
    background-position: 0 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}
</style>
