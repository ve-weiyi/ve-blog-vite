<template>
  <div>
    <!-- banner -->
    <div class="message-banner" :style="cover">
      <!-- 弹幕输入框 -->
      <div class="message-container">
        <h1 class="message-title">留言板</h1>
        <div class="animated fadeInUp message-input-wrapper">
          <input v-model="addMessageContent" @click="show = true" @keyup.enter="addToList" placeholder="说点什么吧" />
          <button class="ml-3 animated bounceInLeft" @click="addToList" v-show="show">发送</button>
        </div>
      </div>
      <!-- 弹幕列表 -->
      <vue-danmaku ref="danmakuRef" class="barrage-container" v-model:danmus="barrageList" isSuspend v-bind="config">
        <template v-slot:dm="{ index, danmu }">
          <span class="barrage-items">
            <img :src="danmu.avatar" width="30" height="30" style="border-radius: 50%" alt="img" />
            <span class="ml-2">{{ danmu.nickname }} :</span>
            <span class="ml-2">{{ danmu.message_content }}</span>
          </span>
        </template>
      </vue-danmaku>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useWebStoreHook } from "@/stores/modules/website"
import VueDanmaku from "vue3-danmaku"
import { ElMessage } from "element-plus"
import { createRemarkApi, findRemarkListApi } from "@/api/remark"
import { Remark } from "@/api/types"

// 获取存储的博客信息
const webStore = useWebStoreHook()
const cover = ref(webStore.getCover("message"))

const config = ref({
  channels: 7, // 轨道数量，为0则弹幕轨道数会撑满容器
  useSlot: true, // 是否开启slot
  loop: true, // 是否开启弹幕循环
  speeds: 100, // 弹幕速度
  fontSize: 20, // 文本模式下的字号
  top: 5, // 弹幕轨道间的垂直间距
  right: 10, // 同一轨道弹幕的水平间距
  debounce: 100, // 弹幕刷新频率（多少毫秒插入一条弹幕，建议不小于50）
  randomChannel: true, // 随机弹幕轨道
})

const danmakuRef = ref(null)
const show = ref(false)
const addMessageContent = ref("")
const barrageList = ref<Remark[]>([])

const addToList = () => {
  if (addMessageContent.value.trim() == "") {
    ElMessage({ type: "error", message: "留言不能为空" })
    return false
  }
  const userAvatar = webStore.userInfo.avatar
    ? webStore.userInfo.avatar
    : webStore.blogInfo.website_config.tourist_avatar
  const userNickname = webStore.userInfo.nickname ? webStore.userInfo.nickname : "游客"
  const message = {
    avatar: userAvatar,
    nickname: userNickname,
    messageContent: addMessageContent.value,
    time: Math.floor(Math.random() * (10 - 7)) + 7,
  }
  addMessageContent.value = ""
  createRemarkApi(message).then((res) => {
    barrageList.value.push(message)
    ElMessage({ type: "success", message: "留言成功" })
  })
}

const listMessage = () => {
  findRemarkListApi({}).then((res) => {
    barrageList.value = res.data.list
  })
}

onMounted(() => {
  listMessage()
  danmakuRef.value.play()
})
</script>

<style scoped>
.message-banner {
  position: absolute;
  top: 0px;
  left: 0;
  right: 0;
  height: 100vh;
  background-color: #49b1f5;
  animation: header-effect 1s;
}

.message-title {
  color: #eee;
  animation: title-scale 1s;
}

.message-container {
  position: absolute;
  width: 360px;
  top: 35%;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 5;
  margin: 0 auto;
  color: #fff;
}

.message-input-wrapper {
  display: flex;
  justify-content: center;
  height: 2.5rem;
  margin-top: 2rem;
}

.message-input-wrapper input {
  outline: none;
  width: 70%;
  border-radius: 20px;
  height: 100%;
  padding: 0 1.25rem;
  color: #eee;
  border: #fff 1px solid;
}

.message-input-wrapper input::-webkit-input-placeholder {
  color: #eeee;
}

.message-input-wrapper button {
  outline: none;
  border-radius: 20px;
  height: 100%;
  padding: 0 1.25rem;
  border: #fff 1px solid;
}

.barrage-container {
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  height: calc(100% - 60px);
  width: 100%;
}

.barrage-items {
  background: rgb(0, 0, 0, 0.7);
  border-radius: 100px;
  color: #fff;
  padding: 5px 10px 5px 5px;
  align-items: center;
  display: flex;
}
</style>
