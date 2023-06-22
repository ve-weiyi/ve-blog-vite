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
import { ref, reactive } from 'vue'

// 响应式数据
const listIsDis = ref(false) // 列表显示状态
const musicAlertState = ref(false) // 音乐提示状态
const musicAlertVal = ref('') // 音乐提示内容
const musicTypeList = reactive([]) // 音乐类型列表
const thisMusicType = ref(-1) // 当前音乐类型
const musicSearchVal = ref('') // 音乐搜索值
const musicSearchList = reactive([]) // 音乐搜索结果列表
const thisMusicList = reactive([]) // 当前音乐列表
const thisListPage = ref(1) // 当前列表页数
const listButtonActiveIndex = ref(-1) // 列表按钮激活索引
const thisMusicIndex = ref(-1) // 当前音乐索引
const musicList = reactive([]) // 音乐总列表
const musicImg = ref('') // 音乐图片
const hotTalkList = reactive([]) // 热门评论列表
const disActive = ref(false) // 盘片显示状态
const musicTitle = ref('') // 音乐标题
const musicName = ref('') // 音乐歌手名
const wordsTop = ref(0) // 歌词顶部偏移量
const musicWords = reactive([]) // 歌词列表
const wordIndex = ref(-1) // 当前歌词索引
const playIcon = ref('') // 播放图标
const currentProgress = ref('0%') // 当前播放进度
const musicUrl = ref('') // 音乐链接

// 方法
const DisList = () => {
  listIsDis.value = !listIsDis.value
}

const _getMusicType = (id: number) => {
  thisMusicType.value = id
}

const MusicStateChange = () => {
  musicAlertState.value = !musicAlertState.value
}

const ListAdd = (item: any) => {
  // 添加到 My Songs
}

const ButtonActive = (index: number) => {
  listButtonActiveIndex.value = index
}

const ListPlay = (index: number) => {
  thisMusicIndex.value = index
}

const ListChange = (isLast: boolean) => {
  if (isLast) {
    thisListPage.value--
  } else {
    thisListPage.value++
  }
}

const DisActive = () => {
  disActive.value = !disActive.value
}
</script>

<style scoped>
@import url('./player.css');
@import url('./playermobile.css');
</style>
