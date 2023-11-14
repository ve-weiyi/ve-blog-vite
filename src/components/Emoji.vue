<template>
  <div v-show="chooseEmoji" class="emoji-wrapper">
    <span class="emoji-item" v-for="(item, key, index) of emojiList" :key="index" @click="addEmoji(key)">
      <v-img
        :lazy-src="getImage(item.normal)"
        :src="getImage(item.active)"
        :title="item.key"
        class="emoji"
        width="24"
        height="24"
      />
    </span>
  </div>
</template>

<script setup lang="ts">
import EmojiList from "@/assets/emojis/qq_emoji.json"
import { ref } from "vue"

// 定义组件的 props
const props = defineProps({
  chooseEmoji: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(["addEmoji"])

// 响应式数据
const emojiList = ref<any>(EmojiList)

// 方法
const addEmoji = (key: any) => {
  emit("addEmoji", key)
}

const getImage = (localUrl) => {
  return new URL(`/src/assets/${localUrl}`, import.meta.url).href
}
</script>

<style scoped>
.emoji {
  user-select: none;
  margin: 0.1rem;
  vertical-align: middle;
}
.emoji-item {
  cursor: pointer;
  display: inline-block;
}
.emoji-item:hover {
  transition: all 0.2s;
  border-radius: 0.25rem;
  background: #dddddd;
}
.emoji-wrapper {
  max-height: 150px;
  overflow-y: auto;
}
</style>
