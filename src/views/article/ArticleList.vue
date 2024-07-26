<template>
  <div>
    <!-- 标签或分类名 -->
    <div class="banner" :style="cover">
      <h1 class="banner-title animated fadeInDown">{{ title }} - {{ name }}</h1>
    </div>
    <div class="article-list-wrapper">
      <v-row>
        <v-col v-for="item of articleList" :key="item.id" md="4" cols="12">
          <!-- 文章 -->
          <v-card class="animated zoomIn article-item-card">
            <div class="article-item-cover">
              <router-link :to="'/articles/' + item.id">
                <!-- 缩略图 -->
                <v-img
                  cover
                  class="on-hover"
                  width="100%"
                  height="100%"
                  :src="item.article_cover"
                />
              </router-link>
            </div>
            <div class="article-item-info">
              <!-- 文章标题 -->
              <div>
                <router-link :to="'/articles/' + item.id">
                  {{ item.article_title }}
                </router-link>
              </div>
              <div style="margin-top: 0.375rem">
                <!-- 发表时间 -->
                <v-icon size="20">mdi-clock-outline</v-icon>
                {{ formatDate(item.created_at) }}

                <!-- 文章分类 -->
                <router-link :to="'/categories/' + item.category_name" class="float-right">
                  <v-icon>mdi-bookmark</v-icon>
                  {{ item.category_name }}
                </router-link>
              </div>
            </div>
            <!-- 分割线 -->
            <v-divider></v-divider>
            <!-- 文章标签 -->
            <div class="tag-wrapper">
              <router-link
                v-for="tag of item.tag_name_list"
                :key="tag"
                :to="'/tags/' + tag"
                class="tag-btn"
              >
                {{ tag }}
              </router-link>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <!-- 无限加载 -->
      <!--      <infinite-loading @infinite="infiniteHandler">-->
      <!--        <div slot="no-results" />-->
      <!--        <div slot="no-more" />-->
      <!--      </infinite-loading>-->
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useWebStoreHook } from "@/store/modules/website"
import { getArticleClassifyCategoryApi, getArticleClassifyTagApi } from "@/api/article"
import { useRoute } from "vue-router"
import { formatDate } from "@/utils/formatDate.ts"
import { ArticleHomeDTO } from "@/api/types"

// 获取存储的博客信息
const webStore = useWebStoreHook()
const cover = ref(webStore.getCover("talk"))

// 获取路由参数
const route = useRoute()
const tagId = route.params.tagId as string
const categoryId = route.params.categoryId as string

const articleList = ref<ArticleHomeDTO[]>([])
const name = ref("")
const title = ref("")

onMounted(() => {
  const path = route.path
  if (path.includes("/categories")) {
    title.value = "分类"
    getArticleClassifyCategoryApi({
      classify_name: categoryId,
    }).then((res) => {
      if (res.data.condition_name) {
        name.value = res.data.condition_name
        document.title = `${title.value} - ${name.value}`
      }

      articleList.value = res.data.article_list
    })
  } else {
    title.value = "标签"
    getArticleClassifyTagApi({
      classify_name: tagId,
    }).then((res) => {
      if (res.data.condition_name) {
        name.value = res.data.condition_name
        document.title = `${title.value} - ${name.value}`
      }

      articleList.value = res.data.article_list
    })
  }
})
</script>

<style scoped>
@media (min-width: 760px) {
  .article-list-wrapper {
    max-width: 1106px;
    margin: 370px auto 1rem auto;
  }

  .article-item-card:hover {
    transition: all 0.3s;
    box-shadow: 0 4px 12px 12px rgba(7, 17, 27, 0.15);
  }

  .article-item-card:not(:hover) {
    transition: all 0.3s;
  }

  .article-item-card:hover .on-hover {
    transition: all 0.6s;
    transform: scale(1.1);
  }

  .article-item-card:not(:hover) .on-hover {
    transition: all 0.6s;
  }

  .article-item-info {
    line-height: 1.7;
    padding: 15px 15px 12px 18px;
    font-size: 15px;
  }
}

@media (max-width: 759px) {
  .article-list-wrapper {
    margin-top: 230px;
    padding: 0 12px;
  }

  .article-item-info {
    line-height: 1.7;
    padding: 15px 15px 12px 18px;
  }
}

.article-item-card {
  border-radius: 8px !important;
  box-shadow: 0 4px 8px 6px rgba(7, 17, 27, 0.06);
}

.article-item-card a {
  transition: all 0.3s;
}

.article-item-cover {
  height: 220px;
  overflow: hidden;
}

.article-item-card a:hover {
  color: #8e8cd8;
}

.tag-wrapper {
  padding: 10px 15px 10px 18px;
}

.tag-wrapper a {
  color: #fff !important;
}

.tag-btn {
  display: inline-block;
  font-size: 0.725rem;
  line-height: 22px;
  height: 22px;
  border-radius: 10px;
  padding: 0 12px !important;
  background: linear-gradient(to right, #bf4643 0%, #6c9d8f 100%);
  opacity: 0.6;
  margin-right: 0.5rem;
}
</style>
