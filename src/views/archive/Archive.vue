<template>
  <div>
    <!-- banner -->
    <div class="banner" :style="cover">
      <h1 class="banner-title">归档</h1>
    </div>
    <!-- 归档列表 -->
    <v-card class="blog-container">
      <v-timeline side="end" align="start">
        <v-timeline-item dot-color="pink" size="large"> 目前共计{{ count }}篇文章，继续加油 </v-timeline-item>
        <v-timeline-item dot-color="pink" size="small" v-for="item of archiveList" :key="item.id">
          <!-- 日期 -->
          <span class="time">{{ item.createdAt }}</span>
          <!-- 文章标题 -->
          <router-link :to="'/articles/' + item.id" style="color: #666; text-decoration: none">
            {{ item.articleTitle }}
          </router-link>
        </v-timeline-item>
      </v-timeline>
      <!-- 分页按钮 -->
      <v-pagination color="#00C4B6" v-model="current" :length="Math.ceil(count / 10)" total-visible="7" />
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useWebStore } from '@/stores'
import { getArticleArchivesApi } from '@/api/article'

// 获取存储的博客信息
const webState = ref(useWebStore())
// 获取背景图片
const cover = ref(webState.value.getCover('talk'))

const current = ref(1)
const count = ref(0)
const archiveList = ref([])

onMounted(() => {
  listArchives()
})

watch(current, (value) => {
  listArchives(value)
})

function listArchives(page = current.value) {
  getArticleArchivesApi().then((res) => {
    archiveList.value = res.data.list
    count.value = res.data.total
  })
}

const formatDate = (date) => {
  // 格式化日期的逻辑
}
</script>

<style scoped>
.time {
  font-size: 0.75rem;
  color: #555;
  margin-right: 1rem;
}
</style>
