<template>
  <!-- 搜索框 -->
  <v-dialog v-model="webStore.searchFlag" max-width="600" :fullscreen="isMobile">
    <v-card class="search-wrapper" style="border-radius: 4px">
      <div class="mb-3">
        <span class="search-title">本地搜索</span>
        <!-- 关闭按钮 -->
        <v-icon class="float-right" @click="webStore.searchFlag = false"> mdi-close </v-icon>
      </div>
      <!-- 输入框 -->
      <div class="search-input-wrapper">
        <v-icon>mdi-magnify</v-icon>
        <input v-model="keywords" placeholder="输入文章标题或内容..." />
      </div>
      <!-- 搜索结果 -->
      <div class="search-result-wrapper">
        <hr class="divider" />
        <ul>
          <li class="search-result" v-for="item of articleList" :key="item.id">
            <!-- 文章标题 -->
            <a @click="goTo(item.id)" v-html="item.article_title" />
            <!-- 文章内容 -->
            <p class="search-result-content text-justify" v-html="item.article_content" />
          </li>
        </ul>
        <!-- 搜索结果不存在提示 -->
        <div v-show="flag && articleList.length === 0" style="font-size: 0.875rem">
          找不到您查询的内容：{{ keywords }}
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, reactive, ref, toRef, watch, watchEffect } from "vue"
import { useWebStoreHook } from "@/store/modules/website"
import { findArticleListApi } from "@/api/article"
import { useRouter } from "vue-router"
const router = useRouter()

// 获取存储的博客信息
const webStore = useWebStoreHook()

const isMobile = computed(() => {
  const clientWidth = document.documentElement.clientWidth
  if (clientWidth > 960) {
    return false
  }
  console.log("isMobile")
  return true
})

const keywords = ref("")
const articleList = ref([])
const flag = ref(true)

const goTo = (id) => {
  // 在此处添加跳转到文章详情页的逻辑
  webStore.searchFlag = false
  router.push({ path: "/articles/" + id })
  //   .then(() => {
  //   router.go(0) // 强制刷新当前页面
  // })
}

// const isMobile = () => {
//   const clientWidth = document.documentElement.clientWidth
//   if (clientWidth > 960) {
//     return false
//   }
//     console.log('isMobile')
//   return true
// }
watch(
  keywords, // 监听属性变化
  (newValue, oldValue) => {
    flag.value = newValue.trim() != ""
    if (flag.value) {
      // 搜索条件
      const conditions = [
        {
          field: "article_title",
          value: newValue,
          rule: "like",
          flag: "",
        },
        {
          field: "article_content",
          value: newValue,
          rule: "like",
          flag: "or",
        },
      ]
      findArticleListApi({
        page: 1,
        page_size: 10,
        sorts: [{ field: "created_at", order: "desc" }],
        conditions: conditions,
      }).then((res) => {
        console.log(res)
        articleList.value = res.data.list
      })
    }
  },
  { immediate: true } // 立即监听属性
)
</script>

<style scoped>
.search-wrapper {
  padding: 1.25rem;
  height: 100%;
  background: #fff !important;
}
.search-title {
  color: #49b1f5;
  font-size: 1.25rem;
  line-height: 1;
}
.search-input-wrapper {
  display: flex;
  padding: 5px;
  height: 35px;
  width: 100%;
  border: 2px solid #8e8cd8;
  border-radius: 2rem;
}
.search-input-wrapper input {
  width: 100%;
  margin-left: 5px;
  outline: none;
}
@media (min-width: 960px) {
  .search-result-wrapper {
    padding-right: 5px;
    height: 450px;
    overflow: auto;
  }
}
@media (max-width: 959px) {
  .search-result-wrapper {
    height: calc(100vh - 110px);
    overflow: auto;
  }
}
.search-result a {
  color: #555;
  font-weight: bold;
  border-bottom: 1px solid #999;
  text-decoration: none;
}
.search-result-content {
  color: #555;
  cursor: pointer;
  border-bottom: 1px dashed #ccc;
  padding: 5px 0;
  line-height: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.divider {
  margin: 20px 0;
  border: 2px dashed #d2ebfd;
}
</style>
