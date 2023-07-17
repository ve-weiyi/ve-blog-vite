<template>
  <div>
    <div class="comment-title"><i class="iconfont iconpinglunzu" />评论</div>
    <!-- 省略其余模板内容 -->
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted, watchEffect } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useWebStore } from "@/stores"

// 父组件向子组件传输的数据
const props = defineProps({
  type: {
    type: Number,
    required: false,
  },
})

// 父组件向子组件传输的事件
const emit = defineEmits([
  // 定义事件
  // 'eventName',
])

// 获取缓存信息
const store = useWebStore()

// 获取路由参数
const route = useRoute()
// 路由
const router = useRouter()

const tagId = route.params.tagId ? parseInt(route.params.tagId as string) : 0 // 假设路由参数名为 "id"

// 使用Composition API定义组件的逻辑
const commentContent = ref("")
// 其他变量和方法...

// 返回响应式数据
const data = reactive({
  commentList: [],
  // 其他数据...
})

// 生命周期钩子
onMounted(() => {
  // mounted钩子代码
})

// 定义方法
function insertComment() {
  // insertComment方法代码
}

// 监听属性变化
watch(
  // sum, //监听一个
  [1, 2], // 监听多个
  (newValue, oldValue) => {
    console.log(newValue, oldValue)
  },
  { immediate: true } // 立即监听属性
)
// watchEffect 会自动追踪依赖并在其变化时执行回调函数。
watchEffect(() => {
  console.log("watchEffect", props.type)
})

// 使用v-if时不能使用defineExpose的属性，要使用display: none
defineExpose({
  data,
})
// 导出响应式数据、方法和事件
// export { commentContent, data, insertComment }
</script>
