<template>
  <div>
    <!-- 聊天界面 -->
    <div
      class="chat-container animated bounceInUp"
      v-show="isShow"
      @click="closeAll"
      @contextmenu.prevent.stop="closeAll"
    >
      <!-- 标题 -->
      <div class="header">
        <img width="32" height="32" :src="image" alt="聊天室" />
        <div style="margin-left: 12px">
          <div>聊天室</div>
          <div style="font-size: 12px">当前{{ count }}人在线</div>
        </div>
        <v-icon class="close" @click="isShow = false"> mdi-close</v-icon>
      </div>
      <!-- 对话内容 -->
      <div class="message" id="message">
        <!-- 录音遮罩层 -->
        <div
          v-show="voiceActive"
          class="voice"
          @mousemove.prevent.stop="translationMove"
          @mouseup.prevent.stop="translationEnd"
        >
          <v-icon ref="voiceClose" class="close-voice">mdi-close</v-icon>
        </div>
        <div :class="isMyMessage(item)" v-for="(item, index) of chatRecordList" :key="index">
          <!-- 头像 -->
          <img :src="item.avatar" :class="isleft(item)" />
          <div>
            <div class="nickname" v-if="!isSelf(item)">
              {{ item.nickname }}
              <span style="margin-left: 12px">{{ item.created_at }}</span>
            </div>
            <!-- 内容 -->
            <div ref="all-content" @contextmenu.prevent.stop="showBack(item, index, $event)" :class="isMyContent(item)">
              <!-- 文字消息 -->
              <div v-if="item.type == 3" v-html="item.content" />
              <!-- 语音消息 -->
              <div v-if="item.type == 5" @click.prevent.stop="playVoice(item)">
                <audio
                  @ended="endVoice(item)"
                  @canplay="getVoiceTime(item)"
                  ref="voices"
                  :src="item.content"
                  style="display: none"
                />
                <!-- 播放 -->
                <v-icon
                  :color="isSelf(item) ? '#fff' : '#000'"
                  ref="plays"
                  style="display: inline-flex; cursor: pointer"
                >
                  mdi-arrow-right-drop-circle
                </v-icon>
                <!-- 暂停 -->
                <v-icon :color="isSelf(item) ? '#fff' : '#000'" ref="pauses" style="display: none; cursor: pointer">
                  mdi-pause-circle
                </v-icon>
                <!-- 音频时长 -->
                <span ref="voiceTimes" />
              </div>
              <div class="back-menu" ref="backBtn" @click="back(item, index)">撤回</div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <!-- 表情框 -->
        <div class="emoji-box" v-show="isEmoji">
          <Emoji :chooseEmoji="true" @addEmoji="addEmoji" />
        </div>
        <div class="emoji-border" v-show="isEmoji" />
        <!-- 切换输入方式 -->
        <v-icon v-show="!isVoice" @click="isVoice = !isVoice" style="margin-right: 8px"> mdi-microphone</v-icon>
        <v-icon v-show="isVoice" @click="isVoice = !isVoice" style="margin-right: 8px"> mdi-keyboard</v-icon>
        <!-- 文字输入 -->
        <textarea
          v-show="!isVoice"
          ref="chatInput"
          v-model="content"
          @keydown.enter="saveMessage($event)"
          placeholder="请输入内容"
        ></textarea>
        <!-- 语音输入 -->
        <button
          class="voice-btn"
          v-show="isVoice"
          @mousedown.prevent.stop="translationStart"
          @mouseup.prevent.stop="translationEnd"
          @touchstart.prevent.stop="translationStart"
          @touchend.prevent.stop="translationEnd"
          @touchmove.prevent.stop="translationMove"
        >
          按住说话
        </button>
        <!-- 表情 -->
        <i
          class="iconfont iconbiaoqing emoji"
          :style="isEmoji ? 'color:#FFC83D' : ''"
          @click.prevent.stop="openEmoji"
        ></i>
        <!-- 发送按钮 -->
        <i :class="isInput" @click="saveMessage" style="font-size: 1.5rem"></i>
      </div>
    </div>
    <!-- 未读数量 -->
    <div class="chat-btn" @click="open">
      <span class="unread" v-if="unreadCount > 0">{{ unreadCount }}</span>
      <div style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%">
        <img width="36" height="36" :src="image" alt="聊天室" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onBeforeUnmount, nextTick, computed } from "vue"
import Recorderx, { ENCODE_TYPE } from "recorderx"
import Emoji from "./Emoji.vue"
import EmojiList from "@/assets/emojis/qq_emoji.json"
import { useWebStoreHook } from "@/stores/modules/website"
import axios from "axios"
import image from "@/assets/images/avatar.jpg"
import { ElMessage } from "element-plus"
import { replaceEmoji } from "@/utils/emoji"
import { findChatRecordsApi } from "@/api/website"
import { ChatRecord } from "@/api/types.ts"
// 获取存储的博客信息
const webStore = useWebStoreHook()
const blogInfo = webStore.blogInfo

const isInput = computed(() => {
  if (typeof content.value === "string") {
    return content.value.trim() != "" ? "iconfont iconzhifeiji submit-btn" : "iconfont iconzhifeiji"
  }
  return "iconfont iconzhifeiji"
})

// 是否显示表情面板
const isEmoji = ref(false)
// 是否显示聊天面板
const isShow = ref(false)
// WebSocket 实例
const websocket = ref<WebSocket | null>(null)
// 输入框内容
const content = ref("")
// 聊天记录列表
const chatRecordList = ref<ChatRecord[]>([])
// 语音消息列表
const voiceList = ref([])
// Recorderx 实例
const rc = ref(null)
// IP 地址
const ipAddress = ref("")
// IP 来源
const ipSource = ref("")
// 在线人数
const count = ref(0)
// 未读消息数
const unreadCount = ref(1)
// 是否语音输入模式
const isVoice = ref(false)
// 是否正在录音
const voiceActive = ref(false)
// 开始录音时间
const startVoiceTime = ref<Date>(null)

// 心跳定时器
let heartBeat: NodeJS.Timeout | null = null

// 监听聊天记录列表变化
watch(chatRecordList, (newList) => {
  // 更新语音消息列表
  voiceList.value = newList.filter((item: any) => item.type === 5).map((item: any) => item.id)
})

// 监听输入框内容变化
watch(content, (newVal) => {})

// 组件销毁前清除定时器
onBeforeUnmount(() => {
  clearInterval(heartBeat!)
})

// 打开/关闭聊天面板
const open = () => {
  if (!websocket.value) {
    connect()
    getChatRecords()
  }
  unreadCount.value = 0
  isShow.value = !isShow.value
}

const getChatRecords = () => {
  findChatRecordsApi({
    page: 1,
    page_size: 10,
    sorts: [{ field: "created_at", order: "desc" }],
  }).then((res) => {
    if (res.code === 200) {
      chatRecordList.value = res.data.list.reverse()
    }
  })
}

// 打开/关闭表情面板
const openEmoji = () => {
  isEmoji.value = !isEmoji.value
  isVoice.value = false
}

// 连接 WebSocket
const connect = () => {
  websocket.value = new WebSocket(blogInfo.websiteConfig.websocketUrl)

  // 连接发生错误的回调方法
  websocket.value.onerror = (event) => {
    console.log(event)
    console.log("连接失败")
  }

  // 连接成功建立的回调方法
  websocket.value.onopen = (event) => {
    console.log(event)
    // 发送心跳消息
    heartBeat = setInterval(() => {
      const beatMessage = {
        type: 6,
        data: "ping",
      }
      websocket.value?.send(JSON.stringify(beatMessage))
    }, 30 * 1000)
  }

  // 接收到消息的回调方法
  websocket.value.onmessage = (event) => {
    const data = JSON.parse(event.data)
    switch (data.type) {
      case 1:
        // 在线人数
        count.value = data
        break
      case 2:
        // 聊天历史记录
        chatRecordList.value = data.chatRecordList
        ipAddress.value = data.ipAddress
        ipSource.value = data.ipSource
        break
      case 3:
        // 文字消息
        chatRecordList.value.push(data)
        if (!isShow.value) {
          unreadCount.value++
        }
        break
      case 4:
        // 撤回消息
        if (data.isVoice) {
          const index = voiceList.value.indexOf(data.id)
          if (index !== -1) {
            voiceList.value.splice(index, 1)
          }
        }
        for (let i = 0; i < chatRecordList.value.length; i++) {
          if (chatRecordList.value[i].id === data.id) {
            chatRecordList.value.splice(i, 1)
            i--
          }
        }
        break
      case 5:
        // 语音消息
        voiceList.value.push(data.id)
        chatRecordList.value.push(data)
        if (!isShow.value) {
          unreadCount.value++
        }
        break
    }
  }

  // 连接关闭的回调方法
  websocket.value.onclose = () => {}
}

// 保存消息
const saveMessage = (e: Event) => {
  e.preventDefault()
  if (content.value.trim() === "") {
    // 内容不能为空
    ElMessage.error("内容不能为空")
    return
  }

  // 解析表情
  content.value = replaceEmoji(content.value)
  // WebSocket 消息对象
  const WebsocketMessage = {
    type: 3,
    nickname: webStore.nickname,
    avatar: webStore.avatar,
    content: content.value,
    userId: webStore.userId,
    ipAddress: ipAddress.value,
    ipSource: ipSource.value,
  }

  websocket.value?.send(JSON.stringify(WebsocketMessage))
  content.value = ""
}

// 添加表情
const addEmoji = (key: string) => {
  isEmoji.value = false
  content.value += key
}

const backBtn = ref<any>([])
// 展示操作菜单
const showBack = (item: any, index: number, e: MouseEvent) => {
  backBtn.value.forEach((item) => {
    item.style.display = "none"
  })

  if (item.ipAddress === ipAddress.value || (item.userId != null && item.userId === webStore.userId)) {
    backBtn.value[index].style.left = e.offsetX + "px"
    backBtn.value[index].style.bottom = e.offsetY + "px"
    backBtn.value[index].style.display = "block"
  }
}

// 撤回消息
const back = (item: any, index: number) => {
  const WebsocketMessage = {
    id: item.id,
    isVoice: item.type === 5,
    type: 4,
  }
  websocket.value?.send(JSON.stringify(WebsocketMessage))
  backBtn.value[index].style.display = "none"
}

// 关闭所有操作菜单
const closeAll = () => {
  isEmoji.value = false
  backBtn.value.forEach((item) => {
    item.style.display = "none"
  })
}

// 开始录音
const translationStart = (event: Event) => {
  voiceActive.value = true
  rc.value = new Recorderx()
  nextTick(() => {
    rc.value
      .start()
      .then(() => {
        startVoiceTime.value = new Date()
        console.log("start recording")
      })
      .catch((error) => {
        console.log("Recording failed.", error)
      })
  })
}

const translationMove = (event: Event) => {}

// 结束录音
const translationEnd = (event: Event) => {
  console.log("结束")
  voiceActive.value = false
  rc.value.pause()
  if (new Date().getTime() - startVoiceTime.value.getTime() < 1000) {
    // 按键时间太短
    alert("按键时间太短")
    return
  }
  const wav = rc.value.getRecord({
    encodeTo: ENCODE_TYPE.WAV,
  })
  const file = new File([wav], "voice.wav", {
    type: wav.type,
  })
  const formData = new FormData()
  formData.append("file", file)
  formData.append("type", "5")
  formData.append("nickname", webStore.nickname)
  formData.append("avatar", webStore.avatar)
  if (webStore.userId !== null) {
    formData.append("userId", webStore.userId)
  }
  formData.append("ipAddress", ipAddress.value)
  formData.append("ipSource", ipSource.value)
  const options = {
    url: "/api/voice",
    data: formData,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
  axios(options)
}

const voices = ref([])
const plays = ref([])
const pauses = ref([])
const voiceTimes = ref([])
// 播放语音
const playVoice = (item: any) => {
  const index = voiceList.value.indexOf(item.id)
  const player = voices.value[index]
  if (player.paused) {
    player.play()
    plays.value[index].$el.style.display = "none"
    pauses.value[index].$el.style.display = "inline-flex"
  } else {
    plays.value[index].$el.style.display = "inline-flex"
    pauses.value[index].$el.style.display = "none"
    player.pause()
  }
}

// 语音结束
const endVoice = (item: any) => {
  const index = voiceList.value.indexOf(item.id)
  plays.value[index].$el.style.display = "inline-flex"
  pauses.value[index].$el.style.display = "none"
}

// 获取语音时长
const getVoiceTime = (item: any) => {
  const index = voiceList.value.indexOf(item.id)
  const time = voices.value[index].duration
  const roundedTime = Math.ceil(time)
  let str = "⬝⬝⬝"
  for (let i = 0; i < roundedTime; i++) {
    if (i % 2 === 0) {
      str += "⬝"
    }
  }
  voiceTimes.value[index].innerHTML = " " + str + " " + roundedTime + " ''"
}

// 计算属性
const isSelf = (item: any) => {
  return item.ipAddress === ipAddress.value || (item.userId !== null && item.userId === webStore.userId)
}

const isleft = (item: any) => {
  return isSelf(item) ? "user-avatar right-avatar" : "user-avatar left-avatar"
}

const isMyContent = (item: any) => {
  return isSelf(item) ? "my-content" : "user-content"
}

const isMyMessage = (item: any) => {
  return isSelf(item) ? "my-message" : "user-message"
}
</script>

<style scoped>
@media (min-width: 760px) {
  .chat-container {
    position: fixed;
    color: #4c4948 !important;
    bottom: 104px;
    right: 20px;
    height: calc(85% - 64px - 20px);
    max-height: 590px !important;
    min-height: 250px !important;
    width: 400px !important;
    border-radius: 16px !important;
  }

  .close {
    display: none;
  }
}

@media (max-width: 760px) {
  .chat-container {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }

  .close {
    display: block;
    margin-left: auto;
  }
}

.chat-container {
  box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16) !important;
  font-size: 14px;
  background: #f4f6fb;
  z-index: 1200;
}

.chat-btn {
  background: #1f93ff;
  border-radius: 100px !important;
  position: fixed;
  bottom: 15px;
  right: 5px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.16) !important;
  cursor: pointer;
  height: 60px !important;
  width: 60px !important;
  z-index: 1000 !important;
  user-select: none;
}

.header {
  display: flex;
  align-items: center;
  padding: 20px 24px;
  background: #ffffff;
  border-radius: 1rem 1rem 0 0;
  box-shadow: 0 10px 15px -16px rgba(50, 50, 93, 0.08), 0 4px 6px -8px rgba(50, 50, 93, 0.04);
}

.footer {
  padding: 8px 16px;
  position: absolute;
  width: 100%;
  bottom: 0;
  background: #f7f7f7;
  border-radius: 0 0 1rem 1rem;
  display: flex;
  align-items: center;
}

.footer textarea {
  background: #fff;
  padding-left: 10px;
  padding-top: 8px;
  width: 100%;
  height: 32px;
  outline: none;
  resize: none;
  overflow: hidden;
  font-size: 13px;
}

.voice-btn {
  font-size: 13px;
  outline: none;
  height: 32px;
  width: 100%;
  background: #fff;
  border-radius: 2px;
}

.message {
  position: absolute;
  width: 100%;
  padding: 20px 16px 0 16px;
  top: 80px;
  bottom: 50px;
  overflow-y: auto;
  overflow-x: hidden;
}

.text {
  color: #999;
  text-align: center;
  font-size: 12px;
  margin-bottom: 12px;
}

.user-message {
  display: flex;
  margin-bottom: 10px;
}

.my-message {
  display: flex;
  margin-bottom: 10px;
  justify-content: flex-end;
}

.left-avatar {
  margin-right: 10px;
}

.right-avatar {
  order: 1;
  margin-left: 10px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.nickname {
  display: flex;
  align-items: center;
  font-size: 12px;
  margin-top: 3px;
  margin-bottom: 5px;
}

.user-content {
  position: relative;
  background-color: #fff;
  padding: 10px;
  border-radius: 5px 20px 20px 20px;
  width: fit-content;
  white-space: pre-line;
  word-wrap: break-word;
  word-break: break-all;
}

.my-content {
  position: relative;
  border-radius: 20px 5px 20px 20px;
  padding: 12px;
  background: #12b7f5;
  color: #fff;
  white-space: pre-line;
  word-wrap: break-word;
  word-break: break-all;
}

.submit-btn {
  color: rgb(31, 147, 255);
}

.emoji {
  cursor: pointer;
  font-size: 1.3rem;
  margin: 0 8px;
}

.emoji-box {
  position: absolute;
  box-shadow: 0 8px 16px rgba(50, 50, 93, 0.08), 0 4px 12px rgba(0, 0, 0, 0.07);
  background: #fff;
  border-radius: 8px;
  right: 20px;
  bottom: 52px;
  height: 180px;
  width: 300px;
  overflow-y: auto;
  padding: 6px 16px;
}

.emoji-border:before {
  display: block;
  height: 0;
  width: 0;
  content: "";
  border-left: 14px solid transparent;
  border-right: 14px solid transparent;
  border-top: 12px solid #fff;
  bottom: 40px;
  position: absolute;
  right: 43px;
}

.unread {
  text-align: center;
  border-radius: 50%;
  font-size: 14px;
  height: 20px;
  width: 20px;
  position: absolute;
  background: #f24f2d;
  color: #fff;
}

.back-menu {
  font-size: 13px;
  border-radius: 2px;
  position: absolute;
  background: rgba(255, 255, 255, 0.9);
  color: #000;
  width: 80px;
  height: 35px;
  text-align: center;
  line-height: 35px;
  display: none;
}

.voice {
  position: fixed;
  z-index: 1500;
  bottom: 52px;
  left: 0;
  right: 0;
  top: 80px;
  background: rgba(0, 0, 0, 0.8);
}

.close-voice {
  position: absolute;
  bottom: 60px;
  left: 30px;
  display: inline-block;
  height: 50px;
  width: 50px;
  line-height: 50px;
  border-radius: 50%;
  text-align: center;
  background: #fff;
}
</style>
