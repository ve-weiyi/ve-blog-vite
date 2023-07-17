<template>
  <div class="oauth-background">
    <div id="preloader_1">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { oauthLoginApi } from "@/api/login"
import { useWebStore } from "@/stores"

// 获取存储的博客信息
const store = useWebStore()
// 获取路由参数
const route = useRoute()
const platform = route.params.platform // 假设路由参数名为 "id"

// 路由
const router = useRouter()
function OauthLogin() {
  // 获取token
  oauthLoginApi({
    platform: platform,
    code: route.query.code as string,
    state: route.query.state as string,
  }).then((res) => {
    console.log(res)
    store.setUser(res.data.userInfo)
    store.setToken(res.data.token)
    router.push({ path: "/" })
  })
}

// 生命周期钩子
onMounted(() => {
  console.log(platform)
  OauthLogin()
})
</script>

<style scoped>
.oauth-background {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 1000;
}

#preloader_1 {
  position: relative;
  top: 45vh;
  left: 45vw;
}

#preloader_1 span {
  display: block;
  bottom: 0px;
  width: 9px;
  height: 5px;
  background: #9b59b6;
  position: absolute;
  animation: preloader_1 1.5s infinite ease-in-out;
}

#preloader_1 span:nth-child(2) {
  left: 11px;
  animation-delay: 0.2s;
}

#preloader_1 span:nth-child(3) {
  left: 22px;
  animation-delay: 0.4s;
}

#preloader_1 span:nth-child(4) {
  left: 33px;
  animation-delay: 0.6s;
}

#preloader_1 span:nth-child(5) {
  left: 44px;
  animation-delay: 0.8s;
}

@keyframes preloader_1 {
  0% {
    height: 5px;
    transform: translateY(0px);
    background: #9b59b6;
  }
  25% {
    height: 30px;
    transform: translateY(15px);
    background: #3498db;
  }
  50% {
    height: 5px;
    transform: translateY(0px);
    background: #9b59b6;
  }
  100% {
    height: 5px;
    transform: translateY(0px);
    background: #9b59b6;
  }
}
</style>
