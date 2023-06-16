<template>
  <div>
    <div class="comment-title"><i class="iconfont iconpinglunzu" />评论</div>
    <!-- 省略其余模板内容 -->
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

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

// 导出响应式数据、方法和事件
// export { commentContent, data, insertComment }
</script>
