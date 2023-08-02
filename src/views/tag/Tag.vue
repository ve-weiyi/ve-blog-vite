<template>
  <div>
    <!-- banner -->
    <div class="banner" :style="cover">
      <h1 class="banner-title">标签</h1>
    </div>
    <!-- 标签列表 -->
    <v-card class="blog-container">
      <div class="tag-cloud-title">标签 - {{ count }}</div>
      <div class="tag-cloud">
        <router-link
          :style="{ 'font-size': getRandomFontSize() }"
          v-for="item of tagList"
          :key="item.id"
          :to="'/tags/' + item.id"
        >
          {{ item.tag_name }}
        </router-link>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useWebStore } from "@/stores"
import { findTagListApi, Tag } from "@/api/tag"

// 获取存储的博客信息
const webState = useWebStore()
// 获取背景图片
const cover = ref(webState.getCover("talk"))

const tagList = ref<Tag[]>([])
const count = ref(0)

onMounted(() => {
  listTags()
})

function listTags() {
  findTagListApi({ page: 1, page_size: 100 }).then((res) => {
    tagList.value = res.data.list
    count.value = res.data.total
  })
}

function getRandomFontSize() {
  return `${Math.floor(Math.random() * 10) + 18}px`
}
</script>

<style scoped>
.tag-cloud-title {
  line-height: 2;
  font-size: 36px;
  text-align: center;
}
@media (max-width: 759px) {
  .tag-cloud-title {
    font-size: 25px;
  }
}
.tag-cloud {
  text-align: center;
}
.tag-cloud a {
  color: #616161;
  display: inline-block;
  text-decoration: none;
  padding: 0 8px;
  line-height: 2;
  transition: all 0.3s;
}
.tag-cloud a:hover {
  color: #03a9f4 !important;
  transform: scale(1.1);
}
</style>
