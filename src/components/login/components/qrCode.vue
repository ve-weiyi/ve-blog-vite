<script setup lang="ts">
import Motion from "../utils/motion.ts"
import avatar from "@/assets/images/avatar.jpg"

const emit = defineEmits(["onBack"])

function onBack() {
  emit("onBack")
}
</script>

<template>
  <Motion class="-mt-2 -mb-2">
    <img :src="avatar" />
  </Motion>
  <Motion :delay="100">
    <el-divider>
      <p class="text-gray-500 text-xs">{{ "提示" }}</p>
    </el-divider>
  </Motion>
  <Motion :delay="150">
    <el-button class="w-full mt-4" @click="onBack">
      {{ "返回" }}
    </el-button>
  </Motion>
</template>
