<template>
  <div class="rightside" :style="isShow">
    <div :class="'rightside-config-hide ' + isOut">
      <i :class="'iconfont rightside-icon ' + icon" @click="check" />
    </div>
    <div class="setting-container" @click="show">
      <i class="iconfont iconshezhi setting" />
    </div>
    <i @click="backTop" class="iconfont rightside-icon iconziyuanldpi" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()

const isShow = ref('')
const isOut = ref('rightside-out')
const icon = ref('iconyueliang')
let scrollTop = 0

// 回到顶部方法
const backTop = () => {
  window.scrollTo({
    behavior: 'smooth',
    top: 0,
  })
}

// 为了计算距离顶部的高度，当高度大于100显示回顶部图标，小于100则隐藏
const scrollToTop = () => {
  scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop
  if (scrollTop > 20) {
    isShow.value = 'opacity: 1; transform: translateX(-38px);'
  } else {
    isShow.value = ''
  }
}

const show = () => {
  isOut.value = isOut.value === 'rightside-out' ? 'rightside-in' : 'rightside-out'
}

const check = () => {
  icon.value = icon.value === 'iconyueliang' ? 'icontaiyang' : 'iconyueliang'
  // 在此处添加处理主题切换的逻辑
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

onMounted(() => {
  window.addEventListener('scroll', scrollToTop)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', scrollToTop)
})
</script>

<style scoped>
.rightside {
  z-index: 4;
  position: fixed;
  right: -38px;
  bottom: 85px;
  transition: all 0.5s;
}
.rightside-config-hide {
  transform: translate(35px, 0);
}
.rightside-out {
  animation: rightsideOut 0.3s;
}
.rightside-in {
  transform: translate(0, 0) !important;
  animation: rightsideIn 0.3s;
}
.rightside-icon,
.setting-container {
  display: block;
  margin-bottom: 2px;
  width: 30px;
  height: 30px;
  background-color: #49b1f5;
  color: #fff;
  text-align: center;
  font-size: 16px;
  line-height: 30px;
  cursor: pointer;
}
.rightside-icon:hover,
.setting-container:hover {
  background-color: #ff7242;
}
.setting-container i {
  display: block;
  animation: turn-around 2s linear infinite;
}
@keyframes turn-around {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes rightsideOut {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(30px, 0);
  }
}
@keyframes rightsideIn {
  0% {
    transform: translate(30px, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}
</style>
