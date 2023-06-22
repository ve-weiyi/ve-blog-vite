<template>
  <v-dialog v-model="loginFlag" :fullscreen="isMobile" max-width="460">
    <v-card class="login-container" style="border-radius: 4px">
      <v-icon style="margin-left: auto" @click="loginFlag = false"> mdi-close </v-icon>
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
            <a v-if="showLogin('weibo')" class="mr-3 iconfont iconweibo" style="color: #e05244" @click="weiboLogin" />
            <!-- qq登录 -->
            <a v-if="showLogin('qq')" class="iconfont iconqq" style="color: #00aaee" @click="qqLogin" />
          </div>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useWebStore } from '@/stores'

// 获取存储的博客信息
const webStore = useWebStore()

const username = ref('')
const password = ref('')
const show = ref(false)

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

const login = () => {
  const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  if (!reg.test(username.value)) {
    $toast({ type: 'error', message: '邮箱格式不正确' })
    return false
  }
  if (password.value.trim().length === 0) {
    $toast({
      type: 'error',
      message: '密码不能为空',
    })
    return false
  }
  const captcha = new TencentCaptcha(this.config.TENCENT_CAPTCHA, (res) => {
    if (res.ret === 0) {
      const param = new URLSearchParams()
      param.append('username', username.value)
      param.append('password', password.value)
      axios.post('/api/login', param).then(({ data }) => {
        if (data.flag) {
          username.value = ''
          password.value = ''
          $store.commit('login', data.data)
          $store.commit('closeModel')
          $toast({ type: 'success', message: '登录成功' })
        } else {
          $toast({ type: 'error', message: data.message })
        }
      })
    }
  })

  captcha.show()
}

const qqLogin = () => {
  $store.commit('saveLoginUrl', $route.path)
  if (navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i)) {
    QC.Login.showPopup({
      appId: this.config.QQ_APP_ID,
      redirectURI: this.config.QQ_REDIRECT_URI,
    })
  } else {
    window.open(
      `https://graph.qq.com/oauth2.0/show?which=Login&display=pc&client_id=${this.config.QQ_APP_ID}&response_type=token&scope=all&redirect_uri=${this.config.QQ_REDIRECT_URI}`,
      '_self',
    )
  }
}

const weiboLogin = () => {
  $store.commit('saveLoginUrl', $route.path)
  window.open(
    `https://api.weibo.com/oauth2/authorize?client_id=${this.config.WEIBO_APP_ID}&response_type=code&redirect_uri=${this.config.WEIBO_REDIRECT_URI}`,
    '_self',
  )
}

// 监听 username 和 password 变化
watch([username, password], () => {
  // console.log('Username or password changed')
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
  content: '';
  display: inline-block;
  background-color: #d8d8d8;
  width: 60px;
  height: 1px;
  margin: 0 12px;
  vertical-align: middle;
}

.social-login-title::after {
  content: '';
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
