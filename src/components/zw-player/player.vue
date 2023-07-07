<template>
  <div>
    <transition name="dis_list">
      <div class="list_box" v-if="listIsDis">
        <transition name="music_alert">
          <span class="music_alert" v-if="musicAlertState">{{ musicAlertVal }}</span>
        </transition>
        <div class="list_close" @click="DisList">x</div>
        <div class="music_list">
          <div class="list_l">
            <ul class="music_type">
              <li
                v-for="(item, index) in musicTypeList"
                :key="index"
                @click="_getMusicType(item.id)"
                :class="{ type_active: item.id == thisMusicType }"
              >
                {{ item.name }}
              </li>
            </ul>
            <div class="list_title">
              <span style="font-size: 14px">歌曲列表</span>
              <img :src="musicStateButton" alt="" class="music_state" @click="MusicStateChange" />
              <div class="music_search_box">
                <input type="text" class="music_search" v-model="musicSearchVal" placeholder="搜索歌曲" />
                <transition name="music_search">
                  <ul class="search_list" v-if="musicSearchVal != ''">
                    <li v-for="(item, index) in musicSearchList" :key="index" @click="ListAdd(item)">
                      <span class="music_search_name">{{ item.name }}</span>
                      <span class="music_search_ar">{{ item.artists[0].name }}</span>
                    </li>
                  </ul>
                </transition>
              </div>
            </div>
            <div class="music_ul_title"><span>歌曲</span><span>歌手</span><span>专辑</span></div>
            <ul class="list">
              <li
                v-for="(item, index) in thisMusicList"
                :key="index"
                @mouseover="ButtonActive(index)"
                @dblclick="ListPlay((thisListPage - 1) * 10 + index)"
              >
                <div class="this_music_shlter" v-if="(thisListPage - 1) * 10 + index == thisMusicIndex"></div>
                <span>{{ item.name }}</span
                ><span>{{ item.ar[0].name }}</span
                ><span>{{ item.al.name }}</span>
                <transition name="list_button">
                  <div class="music_button" v-if="listButtonActiveIndex == index">
                    <div
                      class="list_play"
                      title="播放这首歌"
                      :style="{ backgroundImage: 'url(' + listPlay + ')' }"
                      @click="ListPlay((thisListPage - 1) * 10 + index)"
                    ></div>
                    <div
                      class="list_play"
                      title="添加到 My Songs"
                      :style="{ backgroundImage: 'url(' + add + ')' }"
                      @click="ListAdd(item)"
                      v-if="thisMusicType != -1"
                    ></div>
                  </div>
                </transition>
              </li>
            </ul>
            <div class="list_page">
              <div class="page_last" v-if="thisListPage != 1" @click="ListChange(true)">&lt;</div>
              <div class="page_next" v-if="thisListPage != Math.ceil(musicList.length / 10)" @click="ListChange(false)">
                >
              </div>
            </div>
          </div>
          <div class="list_r">
            <img class="music_list_bg" :src="musicImg" />
            <div class="music_list_shlter" :style="{ backgroundImage: 'url(' + shlter + ')' }"></div>
            <ul class="music_talk_list">
              <li v-for="(item, index) in hotTalkList" :key="index">
                <div class="talk_head">
                  <img :src="item.user.avatarUrl" alt="" class="talk_head_img" />
                  <span class="talk_head_name">{{ item.user.nickname }}</span>
                </div>
                <p class="talk_content">
                  <img class="talk_icon_l" :src="talkicon1" />
                  {{ item.content }}
                  <img class="talk_icon_r" :src="talkicon2" />
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
    <div class="bbox" :class="{ bbox_active: disActive }">
      <div
        class="pan"
        :style="{ backgroundImage: 'url(' + pan + ')' }"
        :class="{ pan_active: disActive }"
        @click="DisActive"
      >
        <img :src="musicImg" alt="" class="pan_c" />
      </div>
      <div
        class="box"
        :style="{ backgroundImage: 'url(' + musicImg + ')' }"
        :class="{ box_active: disActive }"
        @dblclick="DisList"
      >
        <div
          class="music_shlter_2"
          :style="{ backgroundImage: 'url(' + musicImg + ')' }"
          :class="{ shlter_active: disActive }"
        ></div>
        <div
          class="music_shlter"
          :style="{ backgroundImage: 'url(' + musicImg + ')' }"
          :class="{ shlter_active: disActive }"
        ></div>
        <div class="music_shlter_3"></div>
        <div class="music_dis">
          <div class="dis_list" @click="DisList">···</div>
          <p class="music_title">{{ musicTitle }}</p>
          <p class="music_intro">歌手: {{ musicName }}</p>
          <ul class="music_words">
            <div class="music_words_box" :style="{ top: wordsTop + 'px' }">
              <li
                v-for="(item, index) in musicWords"
                :key="index"
                class="music_word"
                :class="{ word_highlight: wordIndex == index }"
              >
                {{ item }}
              </li>
            </div>
          </ul>
        </div>
        <div class="control_box">
          <div class="control_button">
            <img :src="playIcon" alt="" class="control_icon" />
          </div>
          <div class="progress">
            <div class="progress_c" :style="{ width: currentProgress }">
              <div class="progress_circle">
                <div class="progress_circle_c"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <video id="music" autoplay="autoplay" :src="musicUrl" name="media"></video>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, computed, watch } from "vue"
import { getWords, getMusicInfo, getMusicUrl, getHotMusic, getSearchSuggest, getHotTalk } from "./api/music"
import talkicon1 from "./img/talkicon1.png"
import talkicon2 from "./img/talkicon2.png"
import add from "./img/add.png"
import list_bg from "./img/list_bg.jpg"
import list_pan from "./img/list_pan.png"
import list_play_hover from "./img/list_play_hover.png"
import pan from "./img/pan.png"
import pause from "./img/pause.png"
import play from "./img/play.png"
import state0 from "./img/state_0.png"
import state1 from "./img/state_1.png"

let player: HTMLAudioElement
let controlIcon: HTMLElement
let progress: HTMLElement
let music_word: HTMLElement
let music_words: HTMLElement
// 音乐播放器界面的响应式变量
const listIsDis = ref(false) // 列表显示状态
const musicAlertState = ref(false) // 音乐提示状态
const musicAlertVal = ref("") // 音乐提示内容
const thisMusicType = ref(-1) // 当前音乐类型
const musicSearchVal = ref("") // 音乐搜索值
const thisListPage = ref(1) // 当前列表页数
const listButtonActiveIndex = ref(-1) // 列表按钮激活索引
const thisMusicIndex = ref(-1) // 当前音乐索引
const musicImg = ref("") // 音乐图片
const disActive = ref(false) // 盘片显示状态
const musicTitle = ref("") // 音乐标题
const musicName = ref("") // 音乐歌手名
const wordsTop = ref(0) // 歌词顶部偏移量
const wordIndex = ref(-1) // 当前歌词索引
const playIcon = ref(pause) // 播放图标
const currentProgress = ref("0%") // 当前播放进度
const musicUrl = ref("") // 音乐链接
const musicWords = ref([]) // 音乐歌词

// 音乐类型列表
const musicTypeList = ref([])

// 音乐搜索结果列表
const musicSearchList = ref([])

// 当前音乐列表
const thisMusicList = computed(() => {
  return [...musicList.value].splice((thisListPage.value - 1) * 10, 10)
})

// 音乐总列表
const musicList = ref([])

// 热门评论列表
const hotTalkList = ref([])

// 音乐提示
let musicAlertTimer = null

// 我的音乐列表
const myMusicList = ref([])

// 音乐状态
const musicState = ref(0) // 0: 列表循环模式，1: 单曲循环模式
const musicStateButton = ref("")

function DisAuthorInfo() {
  console.log(
    "%c音乐播放器作者----仲威，博客地址：https://blogme.top",
    "background-color:rgb(30,30,30);border-radius:4px;font-size:12px;padding:4px;color:rgb(220,208,129);",
  )
}

function MusicAlert(val) {
  musicAlertState.value = true
  musicAlertVal.value = val
  clearTimeout(musicAlertTimer)
  musicAlertTimer = setTimeout(() => {
    musicAlertState.value = false
    musicAlertVal.value = ""
  }, 2000)
}

function ListAdd(obj) {
  getMusicInfo(obj.id).then((res) => {
    musicSearchVal.value = ""
    if (myMusicList.value.length === 0) {
      myMusicList.value = [res.data.songs[0]]
      _getMusicType(-1)
      // 第一次搜索直接播放
    } else {
      myMusicList.value.push(res.data.songs[0])
      // 提示已经添加进去
    }
    MusicAlert("添加成功")
  })
}

function MusicStateChange() {
  if (musicState.value === 0) {
    musicState.value = 1
    musicStateButton.value = state0
    MusicAlert("已切换为单曲循环模式")
  } else {
    musicState.value = 0
    musicStateButton.value = state1
    MusicAlert("已切换为列表循环模式")
  }
}

// 列表显示状态切换
function DisList() {
  listIsDis.value = !listIsDis.value
}

// 列表切换
function ListChange(isLast) {
  if (isLast) {
    thisListPage.value--
  } else {
    thisListPage.value++
  }
}

// 播放列表
const ListPlay = (id: number) => {
  if (thisMusicIndex.value !== id) {
    thisMusicIndex.value = id > musicList.value.length - 1 ? 0 : id
    _getInfo()
    top.value = 0
    o.value = 0
    wordIndex.value = 0
    wordsTop.value = 0
    currentProgress.value = "0%"
    if (!playState.value) {
      controlIcon.click()
    }
  }
}

// 按钮激活
function ButtonActive(id) {
  listButtonActiveIndex.value = id
}

// 显示/隐藏盘片
function DisActive() {
  disActive.value = !disActive.value
}

const notPlay = ref([])
const playState = ref(false)

// 获取音乐类型
function _getMusicType(id) {
  if (thisMusicType.value !== id) {
    notPlay.value = []
    if (id === -1) {
      if (myMusicList.value.length !== 0) {
        musicList.value = myMusicList.value
        thisMusicType.value = id
        thisMusicIndex.value = 0
        thisListPage.value = 1
        _getInfo()
        top.value = 0
        o.value = 0
        wordIndex.value = 0
        wordsTop.value = 0
        currentProgress.value = "0%"
        if (!playState.value) {
          controlIcon.click()
        }
      } else {
        // 自定义库没有歌曲，提示需要搜索才可以添加
        MusicAlert("没有歌曲，需要自己添加")
      }
    } else {
      getHotMusic(id).then((res) => {
        musicList.value = res.data.playlist.tracks.splice(0, 200)
        thisMusicType.value = id
        thisMusicIndex.value = 0
        thisListPage.value = 1
        _getInfo()
        top.value = 0
        o.value = 0
        wordIndex.value = 0
        wordsTop.value = 0
        currentProgress.value = "0%"
        if (!playState.value) {
          controlIcon.click()
        }
      })
    }
  }
}

// 获取音乐信息
function _getInfo() {
  getMusicUrl(musicList.value[thisMusicIndex.value].id).then((res) => {
    if (!res.data.data[0].url || res.data.data[0].url === "" || res.data.data[0].url === undefined) {
      if (notPlay.value.length !== musicList.value.length) {
        const nextIndex = thisMusicIndex.value + 1
        if (notPlay.value.indexOf(thisMusicIndex.value) === -1) {
          notPlay.value.push(thisMusicIndex.value)
        }
        MusicAlert(`${musicList.value[thisMusicIndex.value].name}因为一些原因不能播放`)
        ListPlay(nextIndex) // 寻找下一首歌 直到找到
      } else {
        // 遍历完没有找到
        console.log("not")
        MusicAlert("此列表所有歌都不能播放")
      }
    } else {
      musicUrl.value = res.data.data[0].url.replace("http://", "https://")
      musicImg.value = musicList.value[thisMusicIndex.value].al.picUrl.replace("http://", "https://") + "?param=300y300"
      musicTitle.value = musicList.value[thisMusicIndex.value].name
      const name_arr = []
      musicList.value[thisMusicIndex.value].ar.forEach((i) => {
        name_arr.push(i.name)
      })
      musicName.value = name_arr.join("/")
      getWords(musicList.value[thisMusicIndex.value].id).then((res) => {
        if (!res.data.nolyric) {
          const info = cutLyric(res.data.lrc.lyric)
          musicWords.value = info.wordArr
          wordsTime.value = info.timeArr
        }
      })
      getHotTalk(musicList.value[thisMusicIndex.value].id).then((res) => {
        let count = 0
        hotTalkList.value = res.data.hotComments.splice(0, 3)
        hotTalkList.value.forEach((e) => {
          count += e.content.length
          e.user.avatarUrl = e.user.avatarUrl + "?param=50y50"
        })
        if (count >= 200) {
          hotTalkList.value = hotTalkList.value.slice(0, 2)
        }
      })
    }
  })
}

// 去除字符串左侧空格
function ltrim(s) {
  return s.replace(/(^\s*)/g, "")
}

// 去除字符串右侧空格
function rtrim(s) {
  return s.replace(/(\s*$)/g, "")
}

// 歌词截取函数
function cutLyric(str) {
  let timeArr = []
  const wordArr = []
  timeArr = str.split("[")
  timeArr.splice(0, 1)
  for (let i = 0; i < timeArr.length; i++) {
    const cut = timeArr[i].split("]")
    const time = cut[0].split(".")[0].split(":")
    timeArr[i] = parseInt(time[0]) * 60 + parseInt(time[1])
    timeArr[i] = isNaN(timeArr[i]) ? 0 : timeArr[i] // 处理 NaN
    wordArr[i] = rtrim(ltrim(cut[1]))
  }
  return { timeArr, wordArr }
}

// 示例数据
const music = ref(null)
const top = ref(0)
const o = ref(0)
const wordsTime = ref([])

// 播放器控制
function Player() {
  let playerTimer = setInterval(timer, 1000)
  playIcon.value = "pause"
  // 定时器函数
  document.body.addEventListener("click", () => {
    player.play()
    document.body.removeEventListener("click", () => {})
  })

  function timer() {
    music_words = document.querySelector(".music_words") as HTMLElement
    music_word = document.querySelector(".music_word") as HTMLElement

    currentProgress.value = `${(player.currentTime / player.duration) * 100}%`
    // 这里写歌词滚动
    if (player.currentTime >= wordsTime.value[o.value + 1]) {
      top.value += parseInt(music_word.eq(o.value).height()) + parseInt(music_word.eq(o.value).css("marginTop"))
      if (top.value >= music_words.height() / 2 - 11) {
        wordsTop.value += -parseInt(music_word.eq(o.value).height()) + parseInt(music_word.eq(o.value).css("marginTop"))
      }
      wordIndex.value = o.value + 1
      o.value++
    }
    if (player.currentTime >= player.duration) {
      // 切歌
      if (musicList.value.length != 1) {
        // 只有一首歌，重复播放
        if (musicState.value == 0) {
          thisMusicIndex.value = thisMusicIndex.value >= musicList.value.length - 1 ? 0 : thisMusicIndex.value + 1
          _getInfo()
        }
      }
      player.play()
      top.value = 0
      o.value = 0
      wordIndex.value = 0
      wordsTop.value = 0
      currentProgress.value = "0%"
    }
  }

  // 进度条控制
  progress.addEventListener("mousedown", (ev) => {
    const e = ev || event
    let pro = (e.clientX - progress.offsetLeft) / progress.offsetWidth
    clearInterval(playerTimer)
    currentProgress.value = `${pro * 100}%`
    document.addEventListener("mousemove", (ev) => {
      const e = ev || event
      pro = (e.clientX - progress.offsetLeft) / progress.offsetWidth
      currentProgress.value = `${pro * 100}%`
    })
    document.addEventListener("mouseup", () => {
      player.currentTime = player.duration * pro
      const c_arr = [...wordsTime.value]
      c_arr.push(player.currentTime)
      c_arr.sort((l, r) => {
        return l - r
      })
      const now_o = c_arr.indexOf(player.currentTime) - 1

      let diff_h = 0
      if (o.value < now_o) {
        for (let i = o.value; i < now_o; i++) {
          diff_h += -parseInt(music_word.eq(i).offsetHeight) + parseInt(music_word.eq(i).style.marginTop)
        }
      } else {
        for (let i = now_o; i < o.value; i++) {
          diff_h += parseInt(music_word.eq(i).offsetHeight) + parseInt(music_word.eq(i).style.marginTop)
        }
      }
      wordsTop.value += diff_h
      wordIndex.value = o.value = now_o
      clearInterval(playerTimer)
      playerTimer = setInterval(timer, 1000)
      playState.value = true
      playIcon.value = "pause"
      if (player.currentTime >= player.duration) {
        top.value = 0
        o.value = 0
        wordIndex.value = 0
        wordsTop.value = 0
        currentProgress.value = "0%"
      }
      player.play()
      document.removeEventListener("mousemove", () => {})
      document.removeEventListener("mouseup", () => {})
    })
  })

  // 播放暂停按钮控制
  controlIcon.addEventListener("click", () => {
    if (playState.value) {
      player.pause()
      playState.value = false
      playIcon.value = "play"
      clearInterval(playerTimer)
    } else {
      player.play()
      playState.value = true
      playIcon.value = "pause"
      clearInterval(playerTimer)
      playerTimer = setInterval(timer, 1000)
    }
  })
}

function Contorl() {
  player.currentTime = 100
}

onMounted(() => {
  player = document.querySelector("#music") as HTMLAudioElement
  controlIcon = document.querySelector(".control_icon") as HTMLElement
  progress = document.querySelector(".progress") as HTMLElement
  // 初始化操作，可以放在此处
  Player()
})

onUnmounted(() => {
  // 组件卸载前的清理操作，可以放在此处
  clearTimeout(musicAlertTimer)
})

const created = () => {
  _getMusicType(3779629)
  DisAuthorInfo()
}

created()

watch(
  () => musicSearchVal.value,
  (newValue) => {
    if (newValue === "") {
      musicSearchList.value = []
    } else {
      getSearchSuggest(newValue).then((res) => {
        if (res.data.result.songs === undefined) {
          musicSearchList.value = []
        } else {
          musicSearchList.value = res.data.result.songs
        }
      })
    }
  },
)
</script>

<style scoped>
@import url("./player.css");
@import url("./playermobile.css");
</style>
