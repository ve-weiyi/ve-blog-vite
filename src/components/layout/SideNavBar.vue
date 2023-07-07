<template>
  <v-navigation-drawer app v-model="drawer" width="250" disable-resize-watcher right overlay-opacity="0.8">
    <!-- 博主介绍 -->
    <div class="blogger-info">
      <v-avatar size="110" style="margin-bottom: 0.5rem">
        <img :src="blogInfo.websiteConfig.websiteAvatar" />
      </v-avatar>
    </div>
    <!-- 博客信息 -->
    <div class="blog-info-wrapper">
      <div class="blog-info-data">
        <router-link to="/archives">
          <div style="font-size: 0.875rem">文章</div>
          <div style="font-size: 1.125rem">
            {{ blogInfo.articleCount }}
          </div>
        </router-link>
      </div>
      <div class="blog-info-data">
        <router-link to="/categories">
          <div style="font-size: 0.875rem">分类</div>
          <div style="font-size: 1.125rem">
            {{ blogInfo.categoryCount }}
          </div>
        </router-link>
      </div>
      <div class="blog-info-data">
        <router-link to="/tags">
          <div style="font-size: 0.875rem">标签</div>
          <div style="font-size: 1.125rem">
            {{ blogInfo.tagCount }}
          </div>
        </router-link>
      </div>
    </div>
    <hr />
    <!-- 页面导航 -->
    <div class="menu-container">
      <div class="menus-item">
        <router-link to="/"> <i class="iconfont iconzhuye" /> 首页 </router-link>
      </div>
      <div class="menus-item">
        <router-link to="/archives"> <i class="iconfont iconguidang" /> 归档 </router-link>
      </div>
      <div class="menus-item">
        <router-link to="/albums"> <i class="iconfont iconxiangce1" /> 相册 </router-link>
      </div>
      <div class="menus-item">
        <router-link to="/talks"> <i class="iconfont iconpinglun" /> 说说 </router-link>
      </div>
      <div class="menus-item">
        <router-link to="/categories"> <i class="iconfont iconfenlei" /> 分类 </router-link>
      </div>
      <div class="menus-item">
        <router-link to="/tags"> <i class="iconfont iconbiaoqian" /> 标签 </router-link>
      </div>
      <div class="menus-item">
        <router-link to="/links"> <i class="iconfont iconlianjie" /> 友链 </router-link>
      </div>
      <div class="menus-item">
        <router-link to="/about"> <i class="iconfont iconzhifeiji" /> 关于 </router-link>
      </div>
      <div class="menus-item">
        <router-link to="/message"> <i class="iconfont iconpinglunzu" /> 留言 </router-link>
      </div>
      <div class="menus-item" v-if="!avatar">
        <a @click="openLogin"><i class="iconfont icondenglu" /> 登录 </a>
      </div>
      <div v-else>
        <div class="menus-item">
          <router-link to="/user"> <i class="iconfont icongerenzhongxin" /> 个人中心 </router-link>
        </div>
        <div class="menus-item">
          <a @click="logout"><i class="iconfont icontuichu" /> 退出</a>
        </div>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<style scoped>
.blogger-info {
  padding: 26px 30px 0;
  text-align: center;
}
.blog-info-wrapper {
  display: flex;
  align-items: center;
  padding: 12px 10px 0;
}
.blog-info-data {
  flex: 1;
  line-height: 2;
  text-align: center;
}
hr {
  border: 2px dashed #d2ebfd;
  margin: 20px 0;
}
.menu-container {
  padding: 0 10px 40px;
  animation: 0.8s ease 0s 1 normal none running sidebarItem;
}
.menus-item a {
  padding: 6px 30px;
  display: block;
  line-height: 2;
}
.menus-item i {
  margin-right: 2rem;
}
@keyframes sidebarItem {
  0% {
    transform: translateX(200px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>

<script setup lang="ts">
import { ref, computed } from "vue"
import { useRouter } from "vue-router"
import { useWebStore } from "@/stores"
import axios from "axios"

// 获取存储的博客信息
const store = useWebStore()
const blogInfo = useWebStore().blogInfo
const router = useRouter()

const avatar = computed<string>(() => {
  return store.userInfo.avatar
})

const drawer = computed<boolean>({
  get() {
    return store.drawer
  },
  set(value) {
    store.drawer = value
  },
})

const isLogin = computed<boolean>(() => {
  return store.userId
})

const openLogin = () => {
  store.loginFlag = true
}

const logout = () => {
  if (router.currentRoute.value.path === "/user") {
    router.go(-1)
  }
  axios.get("/api/logout").then(({ data }) => {
    if (data.flag) {
      store.commit("logout")
      toast({ type: "success", message: "注销成功" })
    } else {
      toast({ type: "error", message: data.message })
    }
  })
}
</script>
