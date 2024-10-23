<template>
  <div>
    <!-- banner -->
    <div class="banner" :style="cover">
      <h1 class="banner-title">归档</h1>
    </div>
    <!-- 归档列表 -->
    <v-card class="blog-container">
      <v-timeline side="end" align="start">
        <v-timeline-item dot-color="pink" size="large">
          目前共计{{ count }}篇文章，继续加油
        </v-timeline-item>
        <v-timeline-item v-for="item of archiveList" :key="item.id" dot-color="pink" size="small">
          <!-- 日期 -->
          <span class="time">{{ formatDate(item.created_at) }}</span>
          <!-- 文章标题 -->
          <router-link :to="'/articles/' + item.id" style="color: #666; text-decoration: none">
            {{ item.article_title }}
          </router-link>
        </v-timeline-item>
      </v-timeline>
      <!-- 分页按钮 -->
      <v-pagination
        v-model="current"
        color="#00C4B6"
        :length="Math.ceil(count / 10)"
        total-visible="7"
        rounded="0"
      />
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue"
import { useWebStoreHook } from "@/store/modules/website"
import { getArticleArchivesApi } from "@/api/article"
import { ArticlePreviewDTO } from "@/api/types"
import { formatDate } from "@/utils/formatDate.ts"

// 获取存储的博客信息
const webStore = useWebStoreHook()
// 获取背景图片
const cover = ref(webStore.getCover("archive"))

const current = ref(1)
const count = ref(0)
const archiveList = ref<ArticlePreviewDTO[]>([])

onMounted(() => {
  listArchives()
})

watch(current, (value) => {
  listArchives(value)
})

function listArchives(page = current.value) {
  getArticleArchivesApi({
    page: page,
  }).then((res) => {
    archiveList.value = res.data.list
    count.value = res.data.total
  })
}
</script>

<style scoped>
.time {
  font-size: 0.75rem;
  color: #555;
  margin-right: 1rem;
}
</style>
