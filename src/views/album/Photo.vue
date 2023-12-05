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
          <photo-consumer
            v-for="(item, index) of photoList"
            :intro="item.photo_desc"
            :key="index"
            :src="item.photo_src"
          >
            <img class="photo" :src="item.photo_src" />
          </photo-consumer>
        </photo-provider>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useWebStoreHook } from "@/store/modules/website"
import { findPhotoListApi } from "@/api/photo"
import { Photo } from "@/api/types"

// 获取存储的博客信息
const webStore = useWebStoreHook()
const cover = ref(webStore.getCover("album"))

const photoAlbumName = ref("相册详情")
const photoAlbumCover = ref("")
const photoList = ref<Photo[]>([])
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
