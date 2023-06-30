<template>
  <v-dialog v-model="webStore.emailFlag" :fullscreen="isMobile" max-width="460">
    <v-card class="login-container" style="border-radius: 4px">
      <v-icon class="float-right" @click="webStore.emailFlag = false"> mdi-close </v-icon>
      <div class="login-title">绑定邮箱</div>
      <div class="login-wrapper">
        <!-- 用户名 -->
        <v-text-field
          v-model="email"
          label="邮箱号"
          placeholder="请输入您的邮箱号"
          variant="underlined"
          clearable
          @keyup.enter="register"
        />
        <!-- 验证码 -->
        <div class="mt-7 send-wrapper">
          <v-text-field
            maxlength="6"
            v-model="code"
            label="验证码"
            variant="underlined"
            placeholder="请输入6位验证码"
            @keyup.enter="register"
          />
          <v-btn variant="text" small :disabled="flag" @click="sendCode">
            {{ codeMsg }}
          </v-btn>
        </div>
        <!-- 按钮 -->
        <v-btn class="mt-7" block color="blue" style="color: #fff" @click="saveUserEmail"> 绑定 </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useWebStore } from '@/stores'

// 获取存储的博客信息
const webStore = useWebStore()

const email = ref('')
const code = ref('')
const flag = ref(false)
const codeMsg = ref('发送')
const time = ref(60)
const show = ref(false)

const sendCode = () => {
  // 发送邮件
  countDown()
}

const countDown = () => {
  flag.value = true
  const timer = setInterval(() => {
    time.value--
    codeMsg.value = time.value + 's'
    if (time.value <= 0) {
      clearInterval(timer)
      codeMsg.value = '发送'
      time.value = 60
      flag.value = false
    }
  }, 1000)
}

const saveUserEmail = () => {
  var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  if (!reg.test(email.value)) {
    this.$toast({ type: 'error', message: '邮箱格式不正确' })
    return false
  }
  if (code.value.trim().length != 6) {
    this.$toast({ type: 'error', message: '请输入6位验证码' })
    return false
  }
  const user = {
    email: email.value,
    code: code.value,
  }
  // this.axios.post('/api/users/email', user).then(({ data }) => {
  //   if (data.flag) {
  //     this.$store.commit('saveEmail', email.value)
  //     email.value = ''
  //     code.value = ''
  //     this.$store.commit('closeModel')
  //     this.$toast({ type: 'success', message: data.message })
  //   } else {
  //     this.$toast({ type: 'error', message: data.message })
  //   }
  // })
}

const isMobile = computed(() => {
  const clientWidth = document.documentElement.clientWidth
  if (clientWidth > 960) {
    return false
  }
  return true
})

watch(email, (value) => {
  var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/
  flag.value = !reg.test(value)
})
</script>

<style scoped>
@media (min-width: 760px) {
  .login-container {
    padding: 1rem;
    border-radius: 4px;
    height: 400px;
  }
}
</style>
