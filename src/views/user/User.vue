<template>
  <div>
    <div class="banner" :style="cover">
      <h1 class="banner-title">个人中心</h1>
    </div>
    <v-card class="blog-container">
      <div>
        <span class="info-title">基本信息</span>
      </div>
      <v-row class="info-wrapper">
        <v-col md="3" cols="12">
          <button id="pick-avatar" @click="showCropperDialog">
            <v-avatar size="140">
              <img :src="userInfo.avatar" />
            </v-avatar>
          </button>
          <avatar-cropper
            v-if="showCropper"
            :src="userInfo.avatar"
            @onCancel="showCropper = false"
            @onConfirm="showCropper = false"
          />
        </v-col>
        <v-col md="7" cols="12">
          <v-text-field v-model="userInfo.nickname" variant="underlined" label="昵称" placeholder="请输入您的昵称" />
          <v-text-field
            v-model="userInfo.webSite"
            variant="underlined"
            class="mt-7"
            label="个人网站"
            placeholder="http://你的网址"
          />
          <v-text-field
            v-model="userInfo.intro"
            variant="underlined"
            class="mt-7"
            label="简介"
            placeholder="介绍下自己吧"
          />
          <div v-if="loginType !== 0" class="mt-7 binding">
            <v-text-field disabled v-model="email" label="邮箱号" placeholder="请绑定邮箱" />
            <v-btn v-if="email" variant="text" small @click="openEmailModel"> 修改绑定 </v-btn>
            <v-btn v-else variant="text" small @click="openEmailModel"> 绑定邮箱 </v-btn>
          </div>
          <v-btn @click="updateUserInfo" outlined class="mt-5">修改</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useWebStore } from '@/stores'
import AvatarCropper from '@/components/AvatarCropper.vue'

// 获取存储的博客信息
const store = useWebStore()

const userInfo = store

const showCropper = ref(false)

const showCropperDialog = () => {
  showCropper.value = !showCropper.value
  console.log('showCropperDialog', showCropper.value)
}
// 更新用户信息
const updateUserInfo = () => {
  // axios.put('/api/users/info', userInfo.value).then(({ data }) => {
  //   if (data.flag) {
  //     store.commit('nickname', userInfo.value.nickname)
  //     store.commit('intro', userInfo.value.intro)
  //     store.commit('webSite', userInfo.value.webSite)
  //     $toast({ type: 'success', message: '修改成功' })
  //   } else {
  //     $toast({ type: 'error', message: data.message })
  //   }
  // })
}

// 上传头像
const uploadAvatar = (data: any) => {
  // if (data.flag) {
  //   store.commit('avatar', data.data)
  //   $toast({ type: 'success', message: '上传成功' })
  // } else {
  //   $toast({ type: 'error', message: data.message })
  // }
}

// 打开邮箱模态框
const openEmailModel = () => {
  console.log('打开邮箱模态框')
  store.emailFlag = true
}

const email = computed(() => store.email)
const loginType = computed(() => store.loginType)

const cover = computed(() => {
  let cover = ''
  store.blogInfo.pageList.forEach((item: any) => {
    if (item.pageLabel === 'user') {
      cover = item.pageCover
    }
  })
  return `background-image: url(${cover})`
})
</script>

<style scoped>
.info-title {
  font-size: 1.25rem;
  font-weight: bold;
}
.info-wrapper {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
#pick-avatar {
  outline: none;
}
.binding {
  display: flex;
  align-items: center;
}
</style>
