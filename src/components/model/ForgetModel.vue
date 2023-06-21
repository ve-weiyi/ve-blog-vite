<template>
  <v-dialog v-model="forgetFlag" :fullscreen="isMobile" max-width="460">
    <v-card class="login-container" style="border-radius: 4px">
      <v-icon class="float-right" style="margin-left: auto" @click="forgetFlag = false"> mdi-close </v-icon>
      <div class="login-wrapper">
        <!-- 用户名 -->
        <v-text-field
          v-model="username"
          label="邮箱号"
          placeholder="请输入您的邮箱号"
          clearable
          variant="underlined"
          @keyup.enter="forget"
        />
        <!-- 验证码 -->
        <div class="mt-7 send-wrapper">
          <v-text-field
            maxlength="6"
            v-model="code"
            label="验证码"
            placeholder="请输入6位验证码"
            variant="underlined"
            @keyup.enter="forget"
          />
          <v-btn :disabled="flag" variant="text" small @click="sendCode">
            {{ codeMsg }}
          </v-btn>
        </div>
        <!-- 密码 -->
        <v-text-field
          v-model="password"
          class="mt-7"
          label="密码"
          placeholder="请输入您的密码"
          variant="underlined"
          @keyup.enter="forget"
          :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          @click:append="show = !show"
        />
        <!-- 按钮 -->
        <v-btn class="mt-7" block color="green" style="color: #fff" @click="forget"> 确定 </v-btn>
        <!-- 登录 -->
        <div class="mt-10 login-tip">已有账号？<span @click="openLogin">登录</span></div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useWebStore } from '@/stores'

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
  forgetFlag.value = false
  loginFlag.value = true
}

const sendCode = () => {
  // ...
}

const countDown = () => {
  // ...
}

const forget = () => {
  // ...
}

const forgetFlag = computed({
  get() {
    return webStore.forgetFlag
  },
  set(value) {
    webStore.forgetFlag = value
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
