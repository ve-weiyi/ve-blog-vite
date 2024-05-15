<script setup lang="ts">
import { useI18n } from "vue-i18n"
import { reactive, ref } from "vue"
import Motion from "../utils/motion.ts"
import { phoneRules } from "../utils/rule.ts"
import { ElMessage, FormInstance } from "element-plus"
import { useVerifyCode } from "../utils/verifyCode.ts"
import { Iphone } from "@element-plus/icons-vue"

const { t } = useI18n()
const loading = ref(false)
const ruleForm = reactive({
  phone: "",
  verifyCode: "",
})
const ruleFormRef = ref<FormInstance>()
const { isDisabled, text } = useVerifyCode()

const onLogin = async (formEl: FormInstance | undefined) => {
  loading.value = true
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      // 模拟登录请求，需根据实际开发进行修改
      setTimeout(() => {
        ElMessage.success("")
        loading.value = false
      }, 2000)
    } else {
      loading.value = false
      return fields
    }
  })
}

const emit = defineEmits(["onBack"])

function onBack() {
  useVerifyCode().end()
  emit("onBack")
}
</script>

<template>
  <el-form ref="ruleFormRef" :model="ruleForm" :rules="phoneRules" size="large">
    <Motion>
      <el-form-item prop="phone">
        <el-input v-model="ruleForm.phone" clearable :placeholder="'手机号'" prefix-icon="Iphone" />
      </el-form-item>
    </Motion>

    <Motion :delay="100">
      <el-form-item prop="verifyCode">
        <div class="w-full flex justify-between">
          <el-input
            v-model="ruleForm.verifyCode"
            clearable
            :placeholder="'验证码'"
            prefix-icon="Key"
          />
          <el-button
            :disabled="isDisabled"
            class="ml-2"
            @click="useVerifyCode().start(ruleFormRef, 'phone')"
          >
            {{ text.length > 0 ? text + "秒后重新获取" : "获取验证码" }}
          </el-button>
        </div>
      </el-form-item>
    </Motion>

    <Motion :delay="150">
      <el-form-item>
        <el-button
          class="w-full"
          size="default"
          type="primary"
          :loading="loading"
          @click="onLogin(ruleFormRef)"
        >
          {{ "" }}
        </el-button>
      </el-form-item>
    </Motion>

    <Motion :delay="200">
      <el-form-item>
        <el-button class="w-full" size="default" @click="onBack">
          {{ "" }}
        </el-button>
      </el-form-item>
    </Motion>
  </el-form>
</template>
