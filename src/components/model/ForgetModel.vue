<template>
  <v-dialog v-model="webStore.forgetFlag" :fullscreen="isMobile" max-width="460">
    <v-card class="login-container" style="border-radius: 4px">
      <v-icon class="float-right" style="margin-left: auto" @click="webStore.forgetFlag = false"> mdi-close </v-icon>
      <div class="login-title">忘记密码</div>
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
        <!-- 按钮 -->
        <v-btn class="mt-7" block color="green" style="color: #fff" @click="forget"> 确定 </v-btn>
        <!-- 登录 -->
        <div class="mt-10 login-tip">已有账号？<span @click="openLogin">登录</span></div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue"
import { useWebStore } from "@/stores"
import { forgetPasswordApi, resetPasswordApi } from "@/api/login"
import { ElMessage } from "element-plus"

// 获取存储的博客信息
const webStore = useWebStore()

const username = ref("")
const code = ref("")
const password = ref("")
const flag = ref(false)
const codeMsg = ref("发送")
const countdown = ref(0)
const show = ref(false)

const openLogin = () => {
  webStore.forgetFlag = false
  webStore.loginFlag = true
}

const sendCode = () => {
  forgetPasswordApi({ username: username.value }).then((res) => {
    ElMessage.success("发送成功")
    countDown()
  })
}

// 忘记密码函数
const forget = () => {
  const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  if (!reg.test(username.value)) {
    ElMessage.error("邮箱格式不正确")
    return false
  }
  if (password.value.trim().length < 6) {
    ElMessage.error("密码不能少于6位")
    return false
  }
  if (code.value.trim().length !== 6) {
    ElMessage.error("请输入6位验证码")
    return false
  }

  const user = {
    username: username.value,
    password: password.value,
    code: code.value,
  }

  resetPasswordApi(user).then((res) => {
    ElMessage.success("修改成功")
    openLogin()
  })
}

const isMobile = computed(() => {
  const clientWidth = document.documentElement.clientWidth
  return clientWidth <= 960
})

// 倒计时函数
const countDown = () => {
  flag.value = true
  countdown.value = 60
}

// 监听countdown变化
watch(countdown, (newValue) => {
  if (newValue > 0) {
    setTimeout(() => {
      countdown.value--
      codeMsg.value = `${countdown.value}s`
    }, 1000)
  } else {
    codeMsg.value = "发送"
    countdown.value = 60
    flag.value = false
  }
})
</script>
