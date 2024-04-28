<template>
  <div class="paging">
    <!-- 上一页按钮 第一页不显示 -->
    <a v-show="current !== 1" class="ml-1 mr-1" @click="prePage">上一页</a>

    <template v-if="totalPage < 6">
      <!-- 小于6页直接显示 -->
      <a
        v-for="i in totalPage"
        :key="i"
        :class="'ml-1 mr-1 ' + isActive(i)"
        @click="changeReplyCurrent(i)"
      >
        {{ i }}
      </a>
    </template>

    <template v-else-if="current < 3">
      <!-- 大于等于6页且在前两页 -->
      <a v-for="i in 4" :key="i" :class="'ml-1 mr-1 ' + isActive(i)" @click="changeReplyCurrent(i)">
        {{ i }}
      </a>
      <span class="ml-1 mr-1">···</span>
      <a class="ml-1 mr-1" @click="changeReplyCurrent(totalPage)">
        {{ totalPage }}
      </a>
    </template>

    <template v-else-if="current < 5">
      <!-- 大于等于6页且在3-4页 -->
      <a
        v-for="i in current + 2"
        :key="i"
        :class="'ml-1 mr-1 ' + isActive(i)"
        @click="changeReplyCurrent(i)"
      >
        {{ i }}
      </a>
      <span v-if="current + 2 < totalPage - 1" class="ml-1 mr-1">···</span>
      <a v-if="current + 2 < totalPage" class="ml-1 mr-1" @click="changeReplyCurrent(totalPage)">
        {{ totalPage }}
      </a>
    </template>

    <template v-else-if="current > totalPage - 2">
      <!-- 大于等于6页且在最后两页 -->
      <a class="ml-1 mr-1" @click="changeReplyCurrent(1)">1</a>
      <span class="ml-1 mr-1">···</span>
      <a
        v-for="i in 4"
        :key="i"
        :class="'ml-1 mr-1 ' + isActive(i + (totalPage - 4))"
        @click="changeReplyCurrent(i + (totalPage - 4))"
      >
        {{ i + (totalPage - 4) }}
      </a>
    </template>

    <template v-else-if="current > totalPage - 4">
      <!-- 大于等于6页且在最后三四页 -->
      <a class="ml-1 mr-1" @click="changeReplyCurrent(1)">1</a>
      <span class="ml-1 mr-1">···</span>
      <a
        v-for="i in totalPage - current + 3"
        :key="i"
        :class="'ml-1 mr-1 ' + isActive(i + current - 3)"
        @click="changeReplyCurrent(i + current - 3)"
      >
        {{ i + current - 3 }}
      </a>
    </template>

    <template v-else>
      <!-- 大于等于6页且在中间页 -->
      <a class="ml-1 mr-1" @click="changeReplyCurrent(1)">1</a>
      <span class="ml-1 mr-1">···</span>
      <a class="ml-1 mr-1" @click="changeReplyCurrent(current - 2)">
        {{ current - 2 }}
      </a>
      <a class="ml-1 mr-1" @click="changeReplyCurrent(current - 1)">
        {{ current - 1 }}
      </a>
      <a class="active ml-1 mr-1">{{ current }}</a>
      <a class="ml-1 mr-1" @click="changeReplyCurrent(current + 1)">
        {{ current + 1 }}
      </a>
      <a class="ml-1 mr-1" @click="changeReplyCurrent(current + 2)">
        {{ current + 2 }}
      </a>
      <span class="ml-1 mr-1">···</span>
      <a class="ml-1 mr-1" @click="changeReplyCurrent(totalPage)">{{ totalPage }}</a>
    </template>

    <!-- 下一页按钮 最后一页不显示 -->
    <a v-show="current !== totalPage" class="ml-1 mr-1" @click="nextPage"> 下一页 </a>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useWebStoreHook } from "@/store/modules/website"
import { useRoute } from "vue-router"

// 父组件向子组件传输的数据
const props = defineProps({
  totalPage: {
    type: Number,
    required: false,
  },
})

// 父组件向子组件传输的事件
const emit = defineEmits([
  // 定义事件
  "changeReplyCurrent",
])

// 获取存储的缓存信息
const webStore = useWebStoreHook()

// 获取路由参数
const route = useRoute()

const current = ref(1)

const changeReplyCurrent = (i) => {
  current.value = i
  emit("changeReplyCurrent", current.value)
}

const prePage = () => {
  current.value -= 1
  emit("changeReplyCurrent", current.value)
}

const nextPage = () => {
  current.value += 1
  emit("changeReplyCurrent", current.value)
}

const isActive = (i) => {
  return i === current.value ? "active" : ""
}
</script>

<style scoped>
.paging a {
  display: inline-block;
  color: #222;
}
.active {
  color: #00a1d6 !important;
  font-weight: bold;
}
</style>
