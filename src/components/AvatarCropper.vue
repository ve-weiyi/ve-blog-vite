<template>
  <v-dialog v-model="dialog" persistent justify="center" width="auto" height="auto">
    <v-card>
      <v-card-title class="text-h5"> 修改头像 </v-card-title>
      <vue-cropper
        class="cropper-avatar"
        ref="vueCropperRef"
        :img="imageSrc"
        :config="cropperConfig"
        alt="Source Image"
      />

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green-darken-1" variant="text" @click="cancel"> 取消 </v-btn>
        <v-btn color="green-darken-1" variant="text" @click="confirm"> 确定 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue"
// 使用cropper头像裁剪
import "vue-cropper/dist/index.js"
import { VueCropper } from "vue-cropper"
import { uploadFileApi } from "@/api/file"

// 父组件向子组件传输的数据
const props = defineProps({
  src: {
    type: String,
    required: false,
  },
})

// 父组件向子组件传输的事件
const emit = defineEmits([
  // 定义事件
  "onCancel",
  "onConfirm",
])

const dialog = ref(false)
const imageSrc = ref("")
const cropperConfig = ref({
  zoomable: false,
  zoomOnTouch: false,
  zoomOnWheel: false,
})
const vueCropperRef = ref()

function openFilePicker() {
  const fileInput = document.createElement("input")
  fileInput.type = "file"
  fileInput.accept = "image/*"
  fileInput.addEventListener("change", handleFileChange)
  fileInput.click()
}
function handleFileChange(event) {
  const file = event.target.files[0]
  console.log("file", file)
  dialog.value = true
  imageSrc.value = URL.createObjectURL(file)
  // 处理选择的文件
}

function cancel() {
  // 触发事件
  emit("onCancel")
}

function confirm() {
  // 触发事件
  emit("onConfirm")
  // const cropperInstance = vueCropperRef.value.getCropper()
  // const croppedData = cropperInstance.getCroppedCanvas().toDataURL('image/jpeg')

  const croppedData = vueCropperRef.value.getData()
  // 将 base64 格式的图像数据转换为 Blob 对象
  console.log("croppedData", croppedData)
  // 创建一个新的 File 对象
  const file = new File(croppedData, "cropped-image.jpg", { type: "image/jpeg" })
  uploadFileApi("avatar", file).then((res) => {
    console.log("res", res)
  })

  // 上传图片
}

const dataURItoBlob = (dataURI) => {
  const byteString = atob(dataURI.split(",")[1])
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0]
  const ab = new ArrayBuffer(byteString.length)
  const ia = new Uint8Array(ab)
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  return new Blob([ab], { type: mimeString })
}

onMounted(() => {
  console.log("mounted")
  openFilePicker()
})

watchEffect(() => {
  if (dialog.value) {
    // 对话框显示时的逻辑
    console.log("对话框显示")
  } else {
    // 对话框隐藏时的逻辑
    console.log("对话框隐藏")
  }
})
</script>

<style scoped>
.cropper-avatar {
  width: 400px;
  height: 400px;
}
</style>
