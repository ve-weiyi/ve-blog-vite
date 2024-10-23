<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    width="250"
    disable-resize-watcher
    right
    overlay-opacity="0.8"
  >
    <!-- 博主介绍 -->
    <div class="blogger-info">
      <v-avatar size="110" style="margin-bottom: 0.5rem">
        <img :src="blogInfo.website_config.website_avatar" />
      </v-avatar>
    </div>
    <!-- 博客信息 -->
    <div class="blog-info-wrapper">
      <div class="blog-info-data">
        <router-link to="/archives">
          <div style="font-size: 0.875rem">文章</div>
          <div style="font-size: 1.125rem">
            {{ blogInfo.article_count }}
          </div>
        </router-link>
      </div>
      <div class="blog-info-data">
        <router-link to="/categories">
          <div style="font-size: 0.875rem">分类</div>
          <div style="font-size: 1.125rem">
            {{ blogInfo.category_count }}
          </div>
        </router-link>
      </div>
      <div class="blog-info-data">
        <router-link to="/tags">
          <div style="font-size: 0.875rem">标签</div>
          <div style="font-size: 1.125rem">
            {{ blogInfo.tag_count }}
          </div>
        </router-link>
      </div>
    </div>
    <hr />
    <!-- 页面导航 -->
    <div class="menu-container">
      <div class="menus-item">
        <router-link to="/"><i class="iconfont iconzhuye" /> 首页</router-link>
      </div>
      <div class="menus-item">
        <router-link to="/archives"><i class="iconfont iconguidang" /> 归档</router-link>
      </div>
      <div class="menus-item">
        <router-link to="/albums"><i class="iconfont iconxiangce1" /> 相册</router-link>
      </div>
      <div class="menus-item">
        <router-link to="/talks"><i class="iconfont iconpinglun" /> 说说</router-link>
      </div>
      <div class="menus-item">
        <router-link to="/categories"><i class="iconfont iconfenlei" /> 分类</router-link>
      </div>
      <div class="menus-item">
        <router-link to="/tags"><i class="iconfont iconbiaoqian" /> 标签</router-link>
      </div>
      <div class="menus-item">
        <router-link to="/links"><i class="iconfont iconlianjie" /> 友链</router-link>
      </div>
      <div class="menus-item">
        <router-link to="/about"><i class="iconfont iconzhifeiji" /> 关于</router-link>
      </div>
      <div class="menus-item">
        <router-link to="/remark"><i class="iconfont iconpinglunzu" /> 留言</router-link>
      </div>
      <div v-if="!avatar" class="menus-item">
        <a @click="openLogin"><i class="iconfont icondenglu" /> 登录 </a>
      </div>
      <div v-else>
        <div class="menus-item">
          <router-link to="/user"><i class="iconfont icongerenzhongxin" /> 个人中心</router-link>
        </div>
        <div class="menus-item">
          <a :href="webStore.blogInfo.website_config.admin_url" target="_blank">
            <i class="iconfont icon-sketch" />
            管理平台
          </a>
        </div>
        <div class="menus-item">
          <a @click="logout"><i class="iconfont icontuichu" /> 退出</a>
        </div>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useRouter } from "vue-router"
import { useWebStoreHook } from "@/store/modules/website"
import { logoutApi } from "@/api/auth.ts"
import { ElMessage } from "element-plus"

// 获取存储的博客信息
const webStore = useWebStoreHook()
const blogInfo = webStore.blogInfo
const router = useRouter()

const avatar = computed<string>(() => {
  return webStore.userInfo.avatar
})

const drawer = computed<boolean>({
  get() {
    return webStore.drawer
  },
  set(value) {
    webStore.drawer = value
  },
})

const isLogin = computed<boolean>(() => {
  return webStore.userInfo.id
})

const openLogin = () => {
  webStore.loginFlag = true
}

const logout = () => {
  if (router.currentRoute.value.path === "/user") {
    router.go(-1)
  }
  logoutApi().then((res) => {
    ElMessage.success("注销成功")
    webStore.logout()
  })
}
</script>

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
