<template>
  <div>
    <div class="comment-title"><i class="iconfont iconpinglunzu" />评论</div>
    <!-- 省略其余模板内容 -->
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// 定义组件的属性和事件
const props = defineProps({
  // 定义props
  // props: {
  //   ...
  // }
})

const emit = defineEmits([
  // 定义事件
  // 'eventName',
])

// 获取路由参数
const route = useRoute()
const tagId = route.params.tagId ? parseInt(route.params.tagId) : 0 // 假设路由参数名为 "id"

// 使用Composition API定义组件的逻辑
const commentContent = ref('')
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
    console.log(newValue, oldValue) // 1 'hhh' undefined undefined
  },
  { immediate: true }, // 立即监听属性
)
// 导出响应式数据、方法和事件
// export { commentContent, data, insertComment }
</script>
