<template>
  <div>
    <!-- banner -->
    <div class="banner" :style="cover">
      <h1 class="banner-title">标签</h1>
    </div>
    <!-- 标签列表 -->
    <v-card class="blog-container">
      <div class="tag-cloud-title">标签</div>
      <div class="tag-cloud-sub-title">数量:{{ count }}</div>
      <div class="tag-cloud">
        <router-link
          v-for="item of tagList"
          :key="item.id"
          :style="{ 'font-size': getRandomFontSize(), color: getRandomFontColor() }"
          :to="'/tags/' + item.tag_name"
        >
          {{ item.tag_name }}
        </router-link>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useWebStoreHook } from "@/store/modules/website"
import { getTagListApi } from "@/api/tag"
import { TagDTO } from "@/api/types"

// 获取存储的博客信息
const webStore = useWebStoreHook()
// 获取背景图片
const cover = ref(webStore.getCover("tag"))

const tagList = ref<TagDTO[]>([])
const count = ref(0)

function listTags() {
  getTagListApi({ page: 1, page_size: 100 }).then((res) => {
    tagList.value = res.data.list
    count.value = res.data.total
  })
}

function getRandomFontSize() {
  return `${Math.floor(Math.random() * 20) + 14}px`
}

function getRandomFontColor() {
  const r = Math.floor(Math.random() * 196) + 32
  const g = Math.floor(Math.random() * 196) + 32
  const b = Math.floor(Math.random() * 196) + 32
  return `rgb(${r},${g},${b})`
}

onMounted(() => {
  listTags()
})
</script>

<style scoped>
.tag-cloud-sub-title {
  font-size: 14px;
  text-align: center;
}
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
