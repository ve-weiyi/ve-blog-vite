<script setup lang="ts">
import { useI18n } from "vue-i18n"
import { reactive, ref } from "vue"
import Motion from "../utils/motion"
import { updateRules } from "../utils/rule"
import { ElMessage, FormInstance } from "element-plus"
import { useVerifyCode } from "../utils/verifyCode"

const { t } = useI18n()
const checked = ref(false)
const loading = ref(false)
const ruleForm = reactive({
  username: "",
  phone: "",
  verifyCode: "",
  password: "",
  repeatPassword: "",
})
const ruleFormRef = ref<FormInstance>()
const { isDisabled, text } = useVerifyCode()
const repeatPasswordRule = [
  {
    validator: (rule, value, callback) => {
      if (value === "") {
        callback(new Error(""))
      } else if (ruleForm.password !== value) {
        callback(new Error(""))
      } else {
        callback()
      }
    },
    trigger: "blur",
  },
]

const onUpdate = async (formEl: FormInstance | undefined) => {
  loading.value = true
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (checked.value) {
        // 模拟请求，需根据实际开发进行修改
        setTimeout(() => {
          ElMessage.success("")
          loading.value = false
        }, 2000)
      } else {
        loading.value = false
        ElMessage.warning("")
      }
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
  <el-form ref="ruleFormRef" :model="ruleForm" :rules="updateRules" size="large">
    <Motion>
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
        <el-input v-model="ruleForm.username" clearable :placeholder="''" prefix-icon="User" />
      </el-form-item>
    </Motion>

    <Motion :delay="100">
      <el-form-item prop="phone">
        <el-input v-model="ruleForm.phone" clearable :placeholder="''" prefix-icon="Iphone" />
      </el-form-item>
    </Motion>

    <Motion :delay="150">
      <el-form-item prop="verifyCode">
        <div class="w-full flex justify-between">
          <el-input v-model="ruleForm.verifyCode" clearable :placeholder="''" prefix-icon="Lock" />
          <el-button
            :disabled="isDisabled"
            class="ml-2"
            @click="useVerifyCode().start(ruleFormRef, 'phone')"
          >
            {{ text.length > 0 ? text + ' t("login.pureInfo")' : 't("login.pureGetVerifyCode")' }}
          </el-button>
        </div>
      </el-form-item>
    </Motion>

    <Motion :delay="200">
      <el-form-item prop="password">
        <el-input
          v-model="ruleForm.password"
          clearable
          show-password
          :placeholder="''"
          prefix-icon="Lock"
        />
      </el-form-item>
    </Motion>

    <Motion :delay="250">
      <el-form-item :rules="repeatPasswordRule" prop="repeatPassword">
        <el-input
          v-model="ruleForm.repeatPassword"
          clearable
          show-password
          :placeholder="''"
          prefix-icon="Lock"
        />
      </el-form-item>
    </Motion>

    <Motion :delay="300">
      <el-form-item>
        <el-checkbox v-model="checked">
          {{ "" }}
        </el-checkbox>
        <el-button link type="primary">
          {{ "" }}
        </el-button>
      </el-form-item>
    </Motion>

    <Motion :delay="350">
      <el-form-item>
        <el-button
          class="w-full"
          size="default"
          type="primary"
          :loading="loading"
          @click="onUpdate(ruleFormRef)"
        >
          {{ "" }}
        </el-button>
      </el-form-item>
    </Motion>

    <Motion :delay="400">
      <el-form-item>
        <el-button class="w-full" size="default" @click="onBack">
          {{ "" }}
        </el-button>
      </el-form-item>
    </Motion>
  </el-form>
</template>
