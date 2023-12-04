<template>
  <v-footer fixed class="footer absolute">
    <div class="footer-wrap">
      <v-btn v-for="link in links" :key="link" color="white" variant="text" class="mx-2" rounded="xl">
        {{ link }}
      </v-btn>
      <div>
        ©{{ webStore.blogInfo.website_config.website_create_time }} -
        {{ new Date().getFullYear() }}
        <a class="copyright" href="https://veweiyi.cn/" target="_blank">
          {{ webStore.blogInfo.website_config.website_author }}
        </a>
        版权所有
      </div>
      <a href="https://beian.miit.gov.cn/" target="_blank">
        {{ webStore.blogInfo.website_config.website_record_no }}
      </a>
    </div>
  </v-footer>
</template>

<script setup lang="ts">
import { useWebStoreHook } from "@/stores/modules/website"

// 获取存储的博客信息
const webStore = useWebStoreHook()

function getCurrentYear() {
  return new Date().getFullYear()
}

const links = ["博客", "项目", "友链", "关于", "联系"]
</script>

<style scoped>
.copyright {
  color: white;
  font-weight: 700;
}

.footer {
  position: absolute;
  top: calc(100%);
  width: 100%;
  padding: 0; /* 或者根据需要设置自定义的 padding 值 */
}

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
