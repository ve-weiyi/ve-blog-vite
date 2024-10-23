<script setup lang="ts">
import Motion from "./utils/motion.ts"
import { useRouter } from "vue-router"
import { loginRules } from "./utils/rule.ts"
import { ElMessage, FormInstance } from "element-plus"
import { onBeforeUnmount, onMounted, reactive, ref } from "vue"
import { operates, thirdParty } from "./utils/enums.ts"
import { useI18n } from "vue-i18n"
import phone from "./components/phone.vue"
import qrCode from "./components/qrCode.vue"
import regist from "./components/regist.vue"
import update from "./components/update.vue"
import ReImageVerify from "@/components/ReImageVerify/index.vue"
import { loginApi } from "@/api/auth.ts"
import { getUserInfoApi } from "@/api/user.ts"
import { useWebStoreHook } from "@/store/modules/website.ts"

import Lock from "@iconify-icons/ri/lock-fill"
import Key from "@iconify-icons/ri/key-fill"
import User from "@iconify-icons/ri/user-3-fill"
import Info from "@iconify-icons/ri/information-line"

defineOptions({
  name: "Login",
})
const router = useRouter()
const { t } = useI18n()
const loginFlag = ref(true)
const imgCode = ref("")
const loginDay = ref(7)
const loading = ref(false)
const checked = ref(false)
const disabled = ref(false)
const ruleFormRef = ref<FormInstance>()
const currentPage = ref(0)
const ruleForm = reactive({
  username: "admin@qq.com",
  password: "admin@qq.com",
  verifyCode: "",
})

const onLogin = async (formEl: FormInstance | undefined) => {
  loading.value = true
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      // 模拟登录请求，需根据实际开发进行修改
      setTimeout(() => {
        loading.value = false
      }, 2000)
    } else {
      loading.value = false
      return
    }
  })
}

// 获取存储的博客信息
const webStore = useWebStoreHook()

/** 使用公共函数，避免`removeEventListener`失效 */
function onkeypress({ code }: KeyboardEvent) {
  if (code === "Enter") {
    onLogin(ruleFormRef.value)
  }
}

onMounted(() => {
  window.document.addEventListener("keypress", onkeypress)
})

onBeforeUnmount(() => {
  window.document.removeEventListener("keypress", onkeypress)
})
</script>

<template>
  <v-dialog v-model="loginFlag" max-width="460">
    <v-card class="login-container" style="border-radius: 4px">
      <v-icon style="margin-left: auto" @click="loginFlag = false"> mdi-close</v-icon>
      <div class="login-title">ve-blog-vite</div>
      <div class="login-wrapper">
        <el-form
          v-if="currentPage === 0"
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="loginRules"
          size="large"
        >
          <Motion :delay="100">
            <el-form-item
              :rules="[
                {
                  required: true,
                  message: '',
                  trigger: 'blur',
                },
              ]"
              prop="username"
            >
              <el-input
                v-model="ruleForm.username"
                clearable
                placeholder="账号"
                :prefix-icon="User"
              />
            </el-form-item>
          </Motion>

          <Motion :delay="150">
            <el-form-item prop="password">
              <el-input
                v-model="ruleForm.password"
                clearable
                show-password
                placeholder="密码"
                :prefix-icon="Lock"
              />
            </el-form-item>
          </Motion>

          <Motion :delay="200">
            <el-form-item prop="verifyCode">
              <el-input
                v-model="ruleForm.verifyCode"
                clearable
                placeholder="验证码"
                :prefix-icon="Key"
              >
                <template v-slot:append>
                  <ReImageVerify v-model:code="imgCode" />
                </template>
              </el-input>
            </el-form-item>
          </Motion>

          <Motion :delay="250">
            <el-form-item>
              <div class="w-full h-[20px] flex-bc">
                <el-checkbox v-model="checked">
                  <span class="flex"> 7 天内免登录 </span>
                  <iconify-icon icon="ri:folder-keyhole-fill"></iconify-icon>
                </el-checkbox>
                <el-button link type="primary" @click="currentPage = 4"> 忘记密码</el-button>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button
                class="w-full mt-4"
                size="default"
                type="primary"
                :loading="loading"
                :disabled="disabled"
                @click="onLogin(ruleFormRef)"
              >
                登录
              </el-button>
            </el-form-item>
          </Motion>

          <Motion :delay="300">
            <el-form-item>
              <div class="w-full h-[20px] flex justify-between items-center">
                <el-button
                  v-for="(item, index) in operates"
                  :key="index"
                  class="w-full mt-4"
                  size="default"
                  @click="currentPage = index + 1"
                >
                  {{ item.title }}
                </el-button>
              </div>
            </el-form-item>
          </Motion>
        </el-form>
        <Motion v-if="currentPage === 0" :delay="350">
          <el-form-item>
            <el-divider>
              <p class="text-gray-500 text-xs">
                {{ "第三方登录" }}
              </p>
            </el-divider>
            <div class="w-full flex justify-evenly">
              <span v-for="(item, index) in thirdParty" :key="index" :title="t(item.title)">
                <a target="_blank" style="font-size: 30px" class="mr-5 iconfont iconqq"></a>
              </span>
            </div>
          </el-form-item>
        </Motion>
        <!-- 手机号登录 -->
        <phone v-if="currentPage === 1" @onBack="() => (currentPage = 0)" />
        <!-- 二维码登录 -->
        <qrCode v-if="currentPage === 2" @onBack="() => (currentPage = 0)" />
        <!-- 注册 -->
        <regist v-if="currentPage === 3" @onBack="() => (currentPage = 0)" />
        <!-- 忘记密码 -->
        <update v-if="currentPage === 4" @onBack="() => (currentPage = 0)" />
      </div>
    </v-card>
  </v-dialog>
</template>

<style scoped>
@import url("@/styles/login.css");
</style>

<style lang="scss" scoped>
:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}

.translation {
  ::v-deep(.el-dropdown-menu__item) {
    padding: 5px 40px;
  }

  .check-zh {
    position: absolute;
    left: 20px;
  }

  .check-en {
    position: absolute;
    left: 20px;
  }
}
</style>
