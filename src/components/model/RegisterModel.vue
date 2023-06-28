<template>
  <v-dialog v-model="registerFlag" :fullscreen="isMobile" max-width="460">
    <v-card class="login-container" style="border-radius: 4px">
      <v-icon class="float-end" style="margin-left: auto" @click="registerFlag = false"> mdi-close </v-icon>
      <div class="login-wrapper">
        <!-- 用户名 -->
        <v-text-field
          v-model="username"
          label="邮箱号"
          placeholder="请输入您的邮箱号"
          variant="underlined"
          clearable
          @keyup.enter="register"
        />
        <!-- 密码 -->
        <v-text-field
          v-model="password"
          class="mt-7"
          label="密码"
          placeholder="请输入您的密码"
          variant="underlined"
          @keyup.enter="register"
          :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          @click:append="show = !show"
        />
        <!-- 验证码 -->
        <div class="mt-7 send-wrapper">
          <v-text-field
            maxlength="6"
            v-model="code"
            label="验证码"
            placeholder="请输入6位验证码"
            variant="underlined"
            @keyup.enter="register"
          />
          <v-btn variant="text" small :disabled="flag" @click="sendCode">
            {{ codeMsg }}
          </v-btn>
        </div>
        <!-- 注册按钮 -->
        <v-btn class="mt-7" block color="red" style="color: #fff" @click="register"> 注册 </v-btn>
        <!-- 登录 -->
        <div class="mt-10 login-tip">已有账号？<span @click="openLogin">登录</span></div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useWebStore } from '@/stores'
import { registerApi } from '@/api/login'
import { ElMessage } from 'element-plus'

// 获取存储的博客信息
const webStore = useWebStore()

const username = ref('')
const code = ref('')
const password = ref('')
const flag = ref(true)
const codeMsg = ref('发送')
const time = 60
const show = ref(false)

const openLogin = () => {
  registerFlag.value = false
  loginFlag.value = true
}

const sendCode = () => {
  // ...
}

const countDown = () => {
  // ...
}

const register = () => {
  // ...
  registerApi({ username: username.value, password: password.value, code: code.value }).then((res) => {
    console.log(res)
    ElMessage.success('注册成功')
    openLogin()
  })
}

const registerFlag = computed({
  get() {
    return webStore.registerFlag
  },
  set(value) {
    webStore.registerFlag = value
  },
})

const loginFlag = computed({
  get: () => webStore.loginFlag,
  set: (value) => {
    webStore.loginFlag = value
  },
})

const isMobile = computed(() => {
  const clientWidth = document.documentElement.clientWidth
  return clientWidth <= 960
})

watch(username, (value) => {
  // ...
})
</script>

<style scoped>
.float-end {
  float: right !important;
}
</style>
