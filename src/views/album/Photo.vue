<template>
  <div>
    <!-- banner -->
    <div class="banner" :style="cover">
      <h1 class="banner-title">{{ photoAlbumName }}</h1>
    </div>
    <!-- 相册列表 -->
    <v-card class="blog-container">
      <div class="photo-wrap">
        <photo-provider>
          <photo-consumer v-for="(item, index) of photoList" :intro="item.photoDesc" :key="index" :src="item.photoSrc">
            <img class="photo" :src="item.photoSrc" />
          </photo-consumer>
        </photo-provider>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useWebStore } from "@/stores"
import { findPhotoListApi } from "@/api/photo"

// 获取存储的博客信息
const webState = useWebStore()
const cover = ref(webState.getCover("album"))

const photoAlbumName = ref("相册详情")
const photoAlbumCover = ref("")
const photoList = ref([])
const current = ref(1)
const size = ref(10)

onMounted(() => {
  listPhoto()
})

function listPhoto() {
  findPhotoListApi({}).then((res) => {
    photoList.value = res.data.list
  })
}
</script>

<style scoped>
.photo-wrap {
  display: flex;
  flex-wrap: wrap;
}
.photo {
  margin: 3px;
  cursor: pointer;
  flex-grow: 1;
  object-fit: cover;
  height: 200px;
}
.photo-wrap::after {
  content: "";
  display: block;
  flex-grow: 9999;
}
@media (max-width: 759px) {
  .photo {
    width: 100%;
  }
}
</style>
