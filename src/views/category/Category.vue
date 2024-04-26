<template>
  <div>
    <!-- banner -->
    <div class="banner" :style="cover">
      <h1 class="banner-title">分类</h1>
    </div>
    <!-- 分类列表 -->
    <v-card class="blog-container">
      <div class="category-title">分类 - {{ count }}</div>
      <ul class="category-list">
        <li v-for="item of categoryList" :key="item.id" class="category-list-item">
          <router-link :to="'/categories/' + item.category_name">
            {{ item.category_name }}
            <span class="category-count">({{ item.article_count }})</span>
          </router-link>
        </li>
      </ul>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useWebStoreHook } from "@/store/modules/website"
import { findCategoryListApi } from "@/api/category"
import { CategoryDetails } from "@/api/types"

// 获取存储的博客信息
const webStore = useWebStoreHook()
const cover = ref(webStore.getCover("talk"))

const categoryList = ref<CategoryDetails[]>([])
const count = ref(0)

onMounted(() => {
  listCategories()
})

function listCategories() {
  findCategoryListApi({ page: 1, page_size: 100 }).then((res) => {
    categoryList.value = res.data.list
    count.value = res.data.total
  })
}
</script>

<style scoped>
.category-title {
  text-align: center;
  font-size: 36px;
  line-height: 2;
}
@media (max-width: 759px) {
  .category-title {
    font-size: 28px;
  }
}
.category-list {
  margin: 0 1.8rem;
  list-style: none;
}
.category-list-item {
  padding: 8px 1.8rem 8px 0;
}
.category-list-item:before {
  display: inline-block;
  position: relative;
  left: -0.75rem;
  width: 12px;
  height: 12px;
  border: 0.2rem solid #49b1f5;
  border-radius: 50%;
  background: #fff;
  content: "";
  transition-duration: 0.3s;
}
.category-list-item:hover:before {
  border: 0.2rem solid #ff7242;
}
.category-list-item a:hover {
  transition: all 0.3s;
  color: #8e8cd8;
}
.category-list-item a:not(:hover) {
  transition: all 0.3s;
}
.category-count {
  margin-left: 0.5rem;
  font-size: 0.75rem;
  color: #858585;
}
</style>
