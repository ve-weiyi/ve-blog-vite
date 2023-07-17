<template>
  <div class="reply-input-wrapper" style="display: block" ref="reply">
    <textarea
      class="comment-textarea"
      :placeholder="'回复 @' + nickname + '：'"
      auto-grow
      dense
      v-model="commentContent"
    />
    <div class="emoji-container">
      <span :class="chooseEmoji ? 'emoji-btn-active' : 'emoji-btn'" @click="chooseEmoji = !chooseEmoji">
        <i class="iconfont iconbiaoqing" />
      </span>
      <div style="margin-left: auto">
        <button @click="cancelReply" class="cancel-btn v-comment-btn">取消</button>
        <button @click="insertReply" class="upload-btn v-comment-btn">提交</button>
      </div>
    </div>
    <!-- 表情框 -->
    <emoji @addEmoji="addEmoji" :chooseEmoji="chooseEmoji" />
  </div>
</template>

<script setup lang="ts">
import Emoji from "../Emoji.vue"
import EmojiList from "@/assets/emojis/qq_emoji.json"

import { ref, watch } from "vue"
import { useWebStore } from "@/stores"
import { useRoute } from "vue-router"
import axios from "axios"
import { ElMessage } from "element-plus"
import { replaceEmoji } from "@/utils/emoji"
import { createCommentApi } from "@/api/comment"

// 父组件向子组件传输的数据
const props = defineProps({
  type: {
    type: Number,
    required: false,
  },
  data: {
    type: Object,
    required: false,
  },
})

// 父组件向子组件传输的事件
const emit = defineEmits([
  // 定义事件
  // 'eventName',
])

// 获取存储的缓存信息
const webState = useWebStore()

// 获取路由参数
const route = useRoute()

// console.log('reply', props.data)
const type = ref(props.type)
const reply = ref()
const chooseEmoji = ref(false)

const index = ref(0)
const nickname = ref("nickname")
const replyUserId = ref(0)
const parentId = ref(0)
const commentContent = ref("")

const cancelReply = () => {
  console.log("cancelReply")
  console.log("webState.replyInfo", webState.replyInfo)
  console.log("webState.replyInfo.replyUserId", replyUserId)
  reply.value.style.display = "none"
}

const insertReply = () => {
  // 判断登录
  if (!webState.isLogin()) {
    webState.loginFlag = true
    return false
  }
  if (commentContent.value.trim() == "") {
    ElMessage.error("回复不能为空")
    return false
  }
  // 解析表情
  commentContent.value = replaceEmoji(commentContent.value)
  const path = route.path
  const arr = path.split("/")
  var comment = {
    type: type.value,
    replyUserId: replyUserId.value,
    parentId: parentId.value,
    commentContent: commentContent.value,
    topicId: parseInt(arr[2]),
  }
  switch (type.value) {
    case 1:
    case 3:
      comment.topicId = parseInt(arr[2])
      break
    default:
      break
  }

  createCommentApi(comment)
    .then((res) => {
      emit("reloadReply", index.value)
      ElMessage.success("回复成功")
    })
    .catch((error) => {
      console.error(error.message)
    })
  commentContent.value = ""
}

const addEmoji = (text) => {
  commentContent.value += text
}
watch(reply, (val) => {
  // console.log('reply', val)
})
watch(webState.replyInfo, (val) => {
  console.log("webState.replyInfo", val)
})
defineExpose({
  index,
  chooseEmoji,
  nickname,
  replyUserId,
  parentId,
  commentContent,
  cancelReply,
  insertReply,
  addEmoji,
})
</script>

<style scoped>
.reply-input-wrapper {
  border: 1px solid #90939950;
  border-radius: 4px;
  padding: 10px;
  margin: 0 0 10px;
}
</style>
