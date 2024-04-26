<template>
  <div>
    <!-- banner -->
    <div class="banner" :style="cover">
      <h1 class="banner-title">说说</h1>
    </div>
    <!-- 说说内容 -->
    <v-card class="blog-container">
      <div v-for="item of talkList" :key="item.id" class="talk-item">
        <router-link :to="'/talks/' + item.id">
          <!-- 用户信息 -->
          <div class="user-info-wrapper">
            <v-avatar class="user-avatar" size="36">
              <img height="36" :src="item.avatar" />
            </v-avatar>
            <div class="user-detail-wrapper">
              <div class="user-nickname">
                {{ item.nickname }}
                <v-icon class="user-sign" size="20" color="#ffa51e"> mdi-check-decagram</v-icon>
              </div>
              <!-- 发表时间 -->
              <div class="time">
                {{ formatDate(item.created_at) }}
                <span v-if="item.is_top == 1" class="top">
                  <i class="iconfont iconzhiding" /> 置顶
                </span>
              </div>
              <!-- 说说信息 -->
              <div class="talk-content" v-html="item.content" />
              <!-- 图片列表 -->
              <v-row v-if="item.img_list" class="talk-images">
                <v-col v-for="(img, index) of item.img_list" :key="index" :md="4" :cols="6">
                  <v-img
                    class="images-items"
                    :src="img"
                    aspect-ratio="1"
                    max-height="200"
                    @click.prevent="previewImg(img)"
                  />
                </v-col>
              </v-row>
              <!-- 说说操作 -->
              <div class="talk-operation">
                <div class="talk-operation-item">
                  <v-icon
                    size="16"
                    :color="isLike(item.id)"
                    class="like-btn"
                    @click.prevent="like(item)"
                  >
                    mdi-thumb-up
                  </v-icon>
                  <div class="operation-count">
                    {{ item.like_count == null ? 0 : item.like_count }}
                  </div>
                </div>
                <div class="talk-operation-item">
                  <v-icon size="16" color="#999">mdi-chat</v-icon>
                  <div class="operation-count">
                    {{ item.comment_count == null ? 0 : item.comment_count }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
      <div v-if="talkList && count > talkList.length" class="load-wrapper" @click="listTalks">
        <v-btn outlined> 加载更多...</v-btn>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useRouter } from "vue-router"
import { useWebStoreHook } from "@/store/modules/website"
import { formatDate } from "@/utils/format.ts"
import { findTalkListApi, likeTalkApi } from "@/api/talk"
import { TalkDetails } from "@/api/types"

// 获取存储的博客信息
const webStore = useWebStoreHook()
const cover = ref(webStore.getCover("talk"))

const current = ref(1)
const size = ref(10)
const talkList = ref<TalkDetails[]>([])
const count = ref(0)
const previewList = ref([])

const router = useRouter()

const listTalks = () => {
  findTalkListApi({}).then((res) => {
    if (current.value === 1) {
      talkList.value = res.data.list
    } else {
      talkList.value.push(...res.data.list)
    }
    talkList.value.forEach((item) => {
      if (item.img_list) {
        previewList.value.push(...item.img_list)
      }
    })
    current.value++
    count.value = res.data.total
  })
}

const previewImg = (img) => {
  // $imagePreview({
  //   images: previewList.value,
  //   index: previewList.value.indexOf(img),
  // })
}

const like = (talk) => {
  // 判断登录
  if (!webStore.userInfo.id) {
    webStore.loginFlag = true
    return false
  }
  // 发送请求
  likeTalkApi(talk.id).then((res) => {
    // 判断是否点赞
    if (webStore.isTalkLike(talk.id)) {
      talk.like_count -= 1
    } else {
      talk.like_count += 1
    }
    webStore.talkLike(talk.id)
  })
}

const isLike = (talkId: number) => {
  return webStore.isTalkLike(talkId) ? "#eb5055" : "#999"
}

onMounted(() => {
  listTalks()
})
</script>

<style scoped>
.col-xl,
.col-xl-auto,
.col-xl-12,
.col-xl-11,
.col-xl-10,
.col-xl-9,
.col-xl-8,
.col-xl-7,
.col-xl-6,
.col-xl-5,
.col-xl-4,
.col-xl-3,
.col-xl-2,
.col-xl-1,
.col-lg,
.col-lg-auto,
.col-lg-12,
.col-lg-11,
.col-lg-10,
.col-lg-9,
.col-lg-8,
.col-lg-7,
.col-lg-6,
.col-lg-5,
.col-lg-4,
.col-lg-3,
.col-lg-2,
.col-lg-1,
.col-md,
.col-md-auto,
.col-md-12,
.col-md-11,
.col-md-10,
.col-md-9,
.col-md-8,
.col-md-7,
.col-md-6,
.col-md-5,
.col-md-4,
.col-md-3,
.col-md-2,
.col-md-1,
.col-sm,
.col-sm-auto,
.col-sm-12,
.col-sm-11,
.col-sm-10,
.col-sm-9,
.col-sm-8,
.col-sm-7,
.col-sm-6,
.col-sm-5,
.col-sm-4,
.col-sm-3,
.col-sm-2,
.col-sm-1,
.col,
.col-auto,
.col-12,
.col-11,
.col-10,
.col-9,
.col-8,
.col-7,
.col-6,
.col-5,
.col-4,
.col-3,
.col-2,
.col-1 {
  width: 100%;
  padding: 2px !important;
}

.talk-item:not(:first-child) {
  margin-top: 20px;
}

.talk-item {
  padding: 16px 20px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 3px 8px 6px rgb(7 17 27 / 6%);
  transition: all 0.3s ease 0s;
}

.talk-item:hover {
  box-shadow: 0 5px 10px 8px rgb(7 17 27 / 16%);
  transform: translateY(-3px);
}

.user-info-wrapper {
  width: 100%;
  display: flex;
}

.user-avatar {
  border-radius: 50%;
}

.user-avatar {
  transition: all 0.5s;
}

.user-avatar:hover {
  transform: rotate(360deg);
}

.user-detail-wrapper {
  flex: 1;
  margin-left: 10px;
  width: 0;
}

.user-nickname {
  font-size: 15px;
  font-weight: bold;
  vertical-align: middle;
}

.user-sign {
  margin-left: 4px;
}

.time {
  color: #999;
  margin-top: 2px;
  font-size: 12px;
}

.top {
  color: #ff7242;
  margin-left: 10px;
}

.talk-content {
  margin-top: 8px;
  font-size: 14px;
  white-space: pre-line;
  word-wrap: break-word;
  word-break: break-all;
}

.talk-images {
  padding: 0 10px;
  margin-top: 8px;
}

.images-items {
  cursor: pointer;
  border-radius: 4px;
}

.talk-operation {
  margin-top: 10px;
  display: flex;
  align-items: center;
}

.talk-operation-item {
  display: flex;
  align-items: center;
  margin-right: 40px;
  font-size: 12px;
}

.operation-count {
  margin-left: 4px;
}

.load-wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.load-wrapper button {
  background-color: #49b1f5;
  color: #fff;
}

.like-btn:hover {
  color: #eb5055 !important;
}
</style>
