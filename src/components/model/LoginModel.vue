<template>
  <v-dialog v-model="loginFlag" :fullscreen="isMobile" max-width="460">
    <v-card class="login-container" style="border-radius: 4px">
      <v-icon style="margin-left: auto" @click="loginFlag = false"> mdi-close </v-icon>
      <div class="login-title">登录账号</div>
      <div class="login-wrapper">
        <!-- 用户名 -->
        <v-text-field
          v-model="username"
          label="邮箱号"
          variant="underlined"
          placeholder="请输入您的邮箱号"
          clearable
          @keyup.enter="login"
        />
        <!-- 密码 -->
        <v-text-field
          v-model="password"
          class="mt-7"
          variant="underlined"
          label="密码"
          placeholder="请输入您的密码"
          @keyup.enter="login"
          :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          @click:append="show = !show"
        />
        <!-- 验证码 -->
        <div v-if="needCaptcha" class="mt-7 send-wrapper">
          <v-text-field
            maxlength="6"
            v-model="code"
            label="验证码"
            placeholder="请输入6位验证码"
            variant="underlined"
          />
          <div class="login-captcha">
            <img v-if="captcha" :src="captcha.encodeData" alt="请输入验证码" @click="getCaptchaImage()" />
          </div>
        </div>
        <!-- 按钮 -->
        <v-btn class="mt-7" block color="blue" style="color: #fff" @click="login"> 登录 </v-btn>
        <!-- 注册和找回密码 -->
        <div class="mt-10 login-tip">
          <span @click="openRegister">立即注册</span>
          <span @click="openForget" class="float-right">忘记密码?</span>
        </div>
        <div v-if="socialLoginList.length > 0">
          <div class="social-login-title">社交账号登录</div>
          <div class="social-login-wrapper">
            <!-- 微博登录 -->
            <a
              v-if="showLogin('weibo')"
              class="mr-2 iconfont icon-weibo-circle"
              style="color: #e05244"
              @click="weiboLogin"
            />
            <!-- qq登录 -->
            <a v-if="showLogin('qq')" class="mr-2 iconfont icon-qq-circle" style="color: #00aaee" @click="qqLogin" />
            <!-- 飞书登录 -->
            <a
              v-if="showLogin('feishu')"
              class="mr-2 iconfont icon-feishu-circle"
              style="color: #00aaee"
              @click="feishuLogin"
            />
            <!-- 微信登录 -->
            <a
              v-if="showLogin('wechat')"
              class="mr-2 iconfont icon-wechat-circle"
              style="color: #0be148"
              @click="feishuLogin"
            />
          </div>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue"
import { useWebStore } from "@/stores"
import { ElMessage } from "element-plus"
import { getOauthUrlApi, loginApi } from "@/api/login"
import { getCaptchaImageApi, sendCaptchaEmailApi, verifyCaptchaApi } from "@/api/captcha"
import cookies from "@/utils/cookies"

// 获取存储的博客信息
const webStore = useWebStore()

const username = ref("")
const password = ref("")
const code = ref("")
const show = ref(false)
const captcha = ref<any>()
const needCaptcha = ref(false)

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

const socialLoginList = computed(() => webStore.blogInfo.websiteConfig.socialLoginList)

const showLogin = (type) => socialLoginList.value.includes(type)

const openRegister = () => {
  webStore.loginFlag = false
  webStore.registerFlag = true
}

const openForget = () => {
  webStore.loginFlag = false
  webStore.forgetFlag = true
}

const getCaptchaImage = () => {
  getCaptchaImageApi({
    height: 40,
    width: 100,
    length: 6,
  }).then((res) => {
    captcha.value = res.data
  })
}

const login = () => {
  const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  if (!reg.test(username.value)) {
    ElMessage.error("邮箱格式不正确")
    return false
  }
  if (password.value.trim().length === 0) {
    ElMessage.error("密码不能为空")
    return false
  }

  // 校验验证码
  if (needCaptcha.value) {
    verifyCaptchaApi({
      id: captcha.value.id,
      code: code.value,
    })
      .then((res) => {
        emailLogin()
      })
      .catch((err) => {
        console.log(err)
        getCaptchaImage()
      })
  } else {
    emailLogin()
  }
}
const emailLogin = () => {
  loginApi({ username: username.value, password: password.value, code: code.value })
    .then((res) => {
      ElMessage.success("登录成功")
      console.log(res)

      cookies.set("token", res.data.token)
      webStore.userInfo = res.data.userInfo
      webStore.loginFlag = false
    })
    .catch((err) => {
      console.log(err)
    })
}

const qqLogin = () => {
  // $store.commit('saveLoginUrl', $route.path)
  if (navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i)) {
    // eslint-disable-next-line no-undef
    // QC.Login.showPopup({
    //   appId: this.config.QQ_APP_ID,
    //   redirectURI: this.config.QQ_REDIRECT_URI,
    // })
  } else {
    getOauthUrlApi({ platform: "qq" }).then((res) => {
      window.open(res.data.url)
    })
  }
}

const weiboLogin = () => {
  // $store.commit('saveLoginUrl', $route.path)
  getOauthUrlApi({ platform: "weibo" }).then((res) => {
    window.open(res.data.url)
  })
}

const feishuLogin = () => {
  // $store.commit('saveLoginUrl', $route.path)
  getOauthUrlApi({ platform: "feishu" }).then((res) => {
    window.open(res.data.url)
  })
}

// 监听变化
watch(loginFlag, (newLoginFlag) => {
  if (newLoginFlag === true) {
    // 在loginFlag为true时执行的操作
    getCaptchaImage()
  }
})
// 页面加载后执行的操作
onMounted(() => {
  // console.log('Page loaded')
})
</script>

<style scoped>
.social-login-title {
  margin-top: 1.5rem;
  color: #b5b5b5;
  font-size: 0.75rem;
  text-align: center;
}

.social-login-title::before {
  content: "";
  display: inline-block;
  background-color: #d8d8d8;
  width: 60px;
  height: 1px;
  margin: 0 12px;
  vertical-align: middle;
}

.social-login-title::after {
  content: "";
  display: inline-block;
  background-color: #d8d8d8;
  width: 60px;
  height: 1px;
  margin: 0 12px;
  vertical-align: middle;
}

.social-login-wrapper {
  margin-top: 1rem;
  font-size: 2rem;
  text-align: center;
}

.social-login-wrapper a {
  text-decoration: none;
}
</style>
