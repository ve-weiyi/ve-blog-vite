<template>
  <div ref="replyRef" class="reply-input-wrapper" style="display: block">
    <textarea
      v-model="content"
      class="comment-textarea"
      :placeholder="placeholder"
      auto-grow
      dense
    />
    <div class="emoji-container">
      <span
        :class="chooseEmoji ? 'emoji-btn-active' : 'emoji-btn'"
        @click="chooseEmoji = !chooseEmoji"
      >
        <i class="iconfont iconbiaoqing" />
      </span>
      <div style="margin-left: auto">
        <button class="cancel-btn v-comment-btn" @click="cancelReply">取消</button>
        <button class="upload-btn v-comment-btn" @click="confirmReply">提交</button>
      </div>
    </div>
    <!-- 表情框 -->
    <emoji :chooseEmoji="chooseEmoji" @addEmoji="addEmoji" />
  </div>
</template>

<script setup lang="ts">
import Emoji from "../Emoji.vue"
import { ref, watchEffect } from "vue"

// 父组件向子组件传输的数据
const props = defineProps({
  content: {
    type: String,
    required: false,
  },
  placeholder: {
    type: String,
    required: false,
  },
})

// 父组件向子组件传输的事件
const emit = defineEmits([
  // 定义事件
  "cancel",
  "confirm",
])

// 评论内容
const content = ref(props.content || "")
const placeholder = ref(props.placeholder)

const replyRef = ref()
const chooseEmoji = ref(false)

const cancelReply = () => {
  emit("cancel", content.value)
  // replyRef.value.style.display = "none"
}

const confirmReply = () => {
  console.log("confirmReply", content.value)
  emit("confirm", content.value)
}

const addEmoji = (text: string) => {
  content.value += text
}

watchEffect(() => {
  placeholder.value = props.placeholder
  content.value = props.content
})
//
// watch(placeholder, (val) => {
//   console.log("placeholder", placeholder)
// })

defineExpose({
  chooseEmoji,
  content,
  placeholder,
  cancelReply,
  confirmReply,
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
