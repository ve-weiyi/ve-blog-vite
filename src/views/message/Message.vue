<template>
  <div>
    <!-- banner -->
    <div class="message-banner" :style="cover">
      <!-- 弹幕输入框 -->
      <div class="message-container">
        <h1 class="message-title">留言板</h1>
        <div class="animated fadeInUp message-input-wrapper">
          <input v-model="messageContent" @click="show = true" @keyup.enter="addToList" placeholder="说点什么吧" />
          <button class="ml-3 animated bounceInLeft" @click="addToList" v-show="show">发送</button>
        </div>
      </div>
      <!-- 弹幕列表 -->
      <vue-danmaku ref="danmakuRef" v-model:danmus="danmus" isSuspend v-bind="config">
        <!-- 弹幕slot -->
        <template v-slot:dm="{ danmu, index }">
          <div class="barrage-items">
            <img class="img" :src="danmu.avatar" />
            <span>{{ index }}{{ danmu.name }}：</span>
            <span>{{ danmu.text }}</span>
          </div>
        </template>
      </vue-danmaku>
      <div class="barrage-container">
        <!--        <vue-baberrage :barrageList="barrageList">-->
        <!--          <template #default="slotProps">-->
        <!--            <span class="barrage-items">-->
        <!--              <img :src="slotProps.item.avatar" width="30" height="30" style="border-radius: 50%" />-->
        <!--              <span class="ml-2">{{ slotProps.item.nickname }} :</span>-->
        <!--              <span class="ml-2">{{ slotProps.item.messageContent }}</span>-->
        <!--            </span>-->
        <!--          </template>-->
        <!--        </vue-baberrage>-->

        <!--        <vue-danmaku ref="danmakuRef" v-model:danmus="barrageList" useSlot>-->
        <!--          <template v-slot:dm="{ index, danmu }">-->
        <!--            <span class="barrage-items">-->
        <!--              <img :src="danmu.avatar" width="30" height="30" style="border-radius: 50%" alt="img" />-->
        <!--              <span class="ml-2">{{ danmu.nickname }} :</span>-->
        <!--              <span class="ml-2">{{ danmu.messageContent }}</span>-->
        <!--            </span>-->
        <!--          </template>-->
        <!--        </vue-danmaku>-->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useWebStore } from "@/stores"
import vueDanmaku from "vue3-danmaku"
import { ElMessage } from "element-plus"
import { findRemarkListApi } from "@/api/remark"
const danmus = [
  {
    avatar:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoKCgoKCgsMDAsPEA4QDxYUExMUFiIYGhgaGCIzICUgICUgMy03LCksNy1RQDg4QFFeT0pPXnFlZXGPiI+7u/sBCgoKCgoKCwwMCw8QDhAPFhQTExQWIhgaGBoYIjMgJSAgJSAzLTcsKSw3LVFAODhAUV5PSk9ecWVlcY+Ij7u7+//CABEIADIAMgMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAFBAYBAgMAB//aAAgBAQAAAAD7HU4ObhMC3AnlYvY8ISwA+6WDOd4/RA96FVeF66BOVWB3TsAOgZC27wv/xAAYAQEBAQEBAAAAAAAAAAAAAAACAwQAAf/aAAgBAhAAAAC3sw8uyRDQPV//xAAYAQADAQEAAAAAAAAAAAAAAAAAAgMBBP/aAAgBAxAAAACQ7LfmoUTNvFf/xAA0EAACAQMBBAcHAwUAAAAAAAABAgMABBESBRMxQRAhIjJRYbEUIzRCUnOBM3KSU2KRoeH/2gAIAQEAAT8AmmSCJpHOAoq6vZp8lmITkgonSQCMZxikkdGDxsVbxFbK2l7TGUkwHQfy6Ln4if7jetbcdglvH9TFv40hD71CGzlQpAyACRkt4VcxojxOdIj06GzwA5VKkilGUdjUcNxD9XlwI5g1Bfm0u4nC5UHDeYNWu0LS4B3D6mHHIwaufiJ/uN61tm6Et6GPCIbv8mtqi4gtrFkzjeuxIGRq+TP4orI1jpK+8MHAfVprYcM8kVysmoIGiwG8UfVgVcwh1ecDGiYcvlNWk7W9zDKucqwyPEVOczzfvb1q/wBkXWqR4Sja8nDHGCajAEagHIAx/jourmK0haaV9KrWyrFZLRZJ07MqNhc8Q3M/irfZFlaOGQF2HzOc1cACeYD+o3r0XptYEJKAyMx06TgsxOaupr+MhkIQk6TlfPlkVNCIxBc3A9onLjRG/WtWV1BPFlRp09TpzBHLoufiJ/uN69G05JLxt8C2ksQpTiAMHIq0mQz6HnMnZwurBwBRhKTLLK5Y6Oz/AGf9qwla3u4TykBRh/sdFx8RN9xvWpri43Unv5O6fmNSSSCHGtsb0DGfKrFm3zdZ7o9RUskhMnbbu+NLJJrh7bfqJz869onxjfSY/callk3knvG7x51//8QAIxEAAgEEAQMFAAAAAAAAAAAAAQIRAAMSMRAEIXETMjNBUf/aAAgBAgEBPwBMUTNv3tSdQrgZDYpwMmx0N8PdFv0iBMAyKS4QroF99JcxDhhMntwxgUCoJIER90jZCeG2PBpvjNWtHzx//8QAIBEAAgICAgIDAAAAAAAAAAAAAQIAERASAyEyM0GBkf/aAAgBAwEBPwBtmbURuErdRb1W/nCIW3vqMgJVr8YyWVIyvYG/5CKwJze36jY//9k=",
    name: "美绪",
    text: "马什么梅？",
  },
  {
    avatar:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoKCgoKCgsMDAsPEA4QDxYUExMUFiIYGhgaGCIzICUgICUgMy03LCksNy1RQDg4QFFeT0pPXnFlZXGPiI+7u/sBCgoKCgoKCwwMCw8QDhAPFhQTExQWIhgaGBoYIjMgJSAgJSAzLTcsKSw3LVFAODhAUV5PSk9ecWVlcY+Ij7u7+//CABEIADIAMgMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAABQIDBAEGB//aAAgBAQAAAAD65hzG3WLcATfCbHYQ9IY0uiEfRkU1IOr+RoUG1ornWj7Y6//EABgBAQADAQAAAAAAAAAAAAAAAAQAAgUD/9oACAECEAAAACEf3IJba51tGDNq/wD/xAAYAQEAAwEAAAAAAAAAAAAAAAAEAQMFAv/aAAgBAxAAAABSg0MWQdj+c6VozP/EAC0QAAIBAwMBBgUFAAAAAAAAAAECEQADBBASMUEiUVJhcZEFExQhgSAyQoKx/9oACAEBAAE/AKu5oEi2A3meKOXf8cfgV9Xe2kEgyOeCKsZSXAqs0XP91z7+wC3MSCzeg/RbuG06uO8T6a5kNkOOu0CpUXWQMdo4kQRPQihPd9tH+4jXIw0yDukq0RNHFu2/iOVku0pfx7foHt91MttbMyN7njqQDo3BPkdWEqRJEjkV8QOV2LVq2xBBlkoq+y181CrgHn1nXHffZQ+UH8aEwCaEoJP9qzbe+ySOUO7XCuxca2f5CR6jS477H7bftPWt7+NvekdzbWXYyo60rvtXtHgda3v4j71Yd/qLPaPJ6+Vb38be9f/EACYRAAECBAQHAQAAAAAAAAAAAAECAwAEEBIREzFSITNBQlFhgXL/2gAIAQIBAT8AffKDYjXqYznd5hhwuI46ijjOOaSfaYUm232Ik9F/KKQFRMN2LHgiJVdrmG6s32fYa5iP0Kf/xAAmEQABAgQFBAMAAAAAAAAAAAABAgMAEBESBBNCUoEhMTNhUXFy/9oACAEDAQE/AGGAoXK4EZLWwQ+2G19Oxk28RlhI9GEqur9xi9HMm3C2qtAfRhhy9J+axiUXIrtnhdfEOeNf5Mv/2Q==",
    name: "博士",
    text: "马东什么？",
  },
  {
    avatar:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoKCgoKCgsMDAsPEA4QDxYUExMUFiIYGhgaGCIzICUgICUgMy03LCksNy1RQDg4QFFeT0pPXnFlZXGPiI+7u/sBCgoKCgoKCwwMCw8QDhAPFhQTExQWIhgaGBoYIjMgJSAgJSAzLTcsKSw3LVFAODhAUV5PSk9ecWVlcY+Ij7u7+//CABEIADIAMgMBIgACEQEDEQH/xAAxAAACAgMBAAAAAAAAAAAAAAAABgQFAQIHAwEBAAMBAAAAAAAAAAAAAAAAAwABAgT/2gAMAwEAAhADEAAAAI7CsPnN1VeZ0okpTbSWASKzwmMPRy3PuuWhpv4KvQ7pcJYTUb+hdLQYWJoaVU+RU3jcXiaoegAhWOAPeeaBd1wGtf/EAC4QAAIBAwIEBAUFAQAAAAAAAAECAwAEEQUhBhASMRMiQWEUI3KBoSAzQlFSkv/aAAgBAQABPwDTxidHHbdTyZGjdkcYYelBGKM4HlUgH7/osXInRfQsK0q18abxGHkj/JrV0KXrEfzUGtLiE0F1G48r4GfcVJDJFI0TbMp52W91D9VXt42mWQCu0QUqHZQC7SyDIRA22QO5NXkFyLeFpnWRggYsMZw/+ioAPsRVlOtrpsshx+6d2OFGw3J/oVK897YR6nbfORCTkp0OVQ7lRk5Aq5gMZSVR8qVepfbPpy0jDSRyEZxIg/6JrjKJytlEEJ63uJD7ttXB6Tn41bhW8Mwxxjqzt3OBWrx+Bw9fQsRvIgBzjYutcP3F8upWVmZZltvjFPQW22BqeAJpHh+kWyeyhsL+KXS9RcB1WLpYZGSc4NcKwxTrcRy+qrj2IJIqe3S5AEsSOAcgMobB+9Lb9KhVAAHYCntRIjI6hkYYZWGQRUGm2ltMssVsiSKCAVGMZqWFZ4fDY4XYn7ULaEgF182N/Me9cIuI3kY9gFodLAEHINFgKDKdqwK1LVotOMSsnWz5JAPYUeJZyTiKMVwv2n+la08npcZOBjke3LVWZtRuizE4kI5f/8QAIBEBAAIBAgcAAAAAAAAAAAAAAQARAwIQEiAhMTJBcf/aAAgBAgEBPwDL5HzkadfX0RDjmTSUJtks1MqWpVypk7uxt//EACARAQABAwMFAAAAAAAAAAAAAAEAAhEhAxATEiIxYXH/2gAIAQMBAT8A0m1L9l+2++Sg9sF45p1N7M6iUJYwM5GYW4ZmZT4Njb//2Q==",
    name: "柚子",
    text: "什么冬梅？",
  },
]

const config = ref({
  channels: 5, // 轨道数量，为0则弹幕轨道数会撑满容器
  useSlot: true, // 是否开启slot
  loop: true, // 是否开启弹幕循环
  speeds: 200, // 弹幕速度，实际为弹幕滚动完一整屏的秒数，值越小速度越快
  fontSize: 20, // 文本模式下的字号
  top: 10, // 弹幕轨道间的垂直间距
  right: 0, // 同一轨道弹幕的水平间距
  debounce: 100, // 弹幕刷新频率（多少毫秒插入一条弹幕，建议不小于50）
  randomChannel: true, // 随机弹幕轨道
})

// 获取存储的博客信息
const webState = useWebStore()

const show = ref(false)
const messageContent = ref("")
const barrageList = ref([])

const addToList = () => {
  if (messageContent.value.trim() == "") {
    ElMessage({ type: "error", message: "留言不能为空" })
    return false
  }
  const userAvatar = webState.avatar ? webState.avatar : webState.blogInfo.websiteConfig.touristAvatar
  const userNickname = webState.nickname ? webState.nickname : "游客"
  const message = {
    avatar: userAvatar,
    nickname: userNickname,
    messageContent: messageContent.value,
    time: Math.floor(Math.random() * (10 - 7)) + 7,
  }
  messageContent.value = ""
  findRemarkListApi({}).then(({ data }) => {
    if (data.flag) {
      barrageList.value.push(message)
      ElMessage({ type: "success", message: "留言成功" })
    } else {
      ElMessage({ type: "error", message: data.message })
    }
  })
}

const listMessage = () => {
  findRemarkListApi({}).then((res) => {
    barrageList.value = res.data.list
    console.log("listMessage", barrageList.value)
  })
}

const cover = ref(webState.getCover("message"))
const danmakuRef = ref(null)

onMounted(() => {
  listMessage()
  danmakuRef.value.play()
})
</script>

<style scoped>
.message-banner {
  position: absolute;
  top: 0px;
  left: 0;
  right: 0;
  height: 100vh;
  background-color: #49b1f5;
  animation: header-effect 1s;
}

.message-title {
  color: #eee;
  animation: title-scale 1s;
}

.message-container {
  position: absolute;
  width: 360px;
  top: 35%;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 5;
  margin: 0 auto;
  color: #fff;
}

.message-input-wrapper {
  display: flex;
  justify-content: center;
  height: 2.5rem;
  margin-top: 2rem;
}

.message-input-wrapper input {
  outline: none;
  width: 70%;
  border-radius: 20px;
  height: 100%;
  padding: 0 1.25rem;
  color: #eee;
  border: #fff 1px solid;
}

.message-input-wrapper input::-webkit-input-placeholder {
  color: #eeee;
}

.message-input-wrapper button {
  outline: none;
  border-radius: 20px;
  height: 100%;
  padding: 0 1.25rem;
  border: #fff 1px solid;
}

.barrage-container {
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  height: calc(100% - 50px);
  width: 100%;
}

.barrage-items {
  background: rgb(0, 0, 0, 0.7);
  border-radius: 100px;
  color: #fff;
  padding: 5px 10px 5px 5px;
  align-items: center;
  display: flex;
}
</style>
