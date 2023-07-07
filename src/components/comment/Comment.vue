<template>
  <div>
    <div class="comment-title"><i class="iconfont iconpinglunzu" />评论</div>
    <!-- 评论框 -->
    <div class="comment-input-wrapper">
      <div style="display: flex">
        <v-avatar size="40">
          <img height="40" v-if="webState.avatar" :src="webState.avatar" />
          <img height="40" v-else :src="webState.blogInfo.websiteConfig.touristAvatar" />
        </v-avatar>
        <div style="width: 100%" class="ml-3">
          <div class="comment-input">
            <textarea
              class="comment-textarea"
              v-model="commentContent"
              placeholder="留下点什么吧..."
              auto-grow
              dense
            ></textarea>
          </div>
          <!-- 操作按钮 -->
          <div class="emoji-container">
            <span :class="chooseEmoji ? 'emoji-btn-active' : 'emoji-btn'" @click="chooseEmoji = !chooseEmoji">
              <i class="iconfont iconbiaoqing" />
            </span>
            <button @click="insertComment" class="upload-btn v-comment-btn" style="margin-left: auto">提交</button>
          </div>
          <!-- 表情框 -->
          <emoji @addEmoji="addEmoji" :chooseEmoji="chooseEmoji" />
        </div>
      </div>
    </div>
    <!-- 评论详情 -->
    <div v-if="paginationData.total > 0 && reFresh">
      <!-- 评论数量 -->
      <div class="count">{{ paginationData.total }} 评论</div>
      <!-- 评论列表 -->
      <div style="display: flex" class="pt-5" v-for="(item, index) of commentList" :key="item.id">
        <!-- 头像 -->
        <v-avatar size="40" class="comment-avatar">
          <img height="40" :src="item.avatar" />
        </v-avatar>
        <div class="comment-meta">
          <!-- 用户名 -->
          <div class="comment-user">
            <span v-if="!item.webSite">{{ item.nickname }}</span>
            <a v-else :href="item.webSite" target="_blank">
              {{ item.nickname }}
            </a>
            <span class="blogger-tag" v-if="item.userId == 1">博主</span>
          </div>
          <!-- 信息 -->
          <div class="comment-info">
            <!-- 楼层 -->
            <span style="margin-right: 10px">{{ paginationData.total - index }}楼</span>
            <!-- 发表时间 -->
            <span style="margin-right: 10px">{{ item.createdAt }}</span>
            <!-- 点赞 -->
            <span :class="isLike(item.id) + ' iconfont icondianzan'" @click="like(item)"></span>
            <span v-show="item.likeCount > 0"> {{ item.likeCount }}</span>
            <!-- 回复 -->
            <span class="reply-btn" @click="replyComment(index, item)"> 回复 </span>
          </div>
          <!-- 评论内容 -->
          <p v-html="item.commentContent" class="comment-content"></p>
          <!-- 回复人 -->
          <div style="display: flex" v-for="reply of item.replyDTOList" :key="reply.id">
            <!--     头像-->
            <v-avatar size="36" class="comment-avatar">
              <img height="36" :src="reply.avatar" />
            </v-avatar>
            <div class="reply-meta">
              <!-- 用户名 -->
              <div class="comment-user">
                <span v-if="!reply.webSite">{{ reply.nickname }}</span>
                <a v-else :href="reply.webSite" target="_blank">
                  {{ reply.nickname }}
                </a>
                <span class="blogger-tag" v-if="reply.userId == 1">博主</span>
              </div>
              <!-- 信息 -->
              <div class="comment-info">
                <!-- 发表时间 -->
                <span style="margin-right: 10px">
                  {{ reply.createdAt }}
                </span>
                <!-- 点赞 -->
                <span :class="isLike(reply.id) + ' iconfont icondianzan'" @click="like(reply)"></span>
                <span v-show="reply.likeCount > 0"> {{ reply.likeCount }}</span>
                <!-- 回复 -->
                <span class="reply-btn" @click="replyComment(index, reply)"> 回复 </span>
              </div>
              <!-- 回复内容 -->
              <p class="comment-content">
                <!-- 回复用户名 -->
                <template v-if="reply.replyUserId != item.userId">
                  <span v-if="!reply.replyWebSite" class="ml-1"> @{{ reply.replyNickname }} </span>
                  <a v-else :href="reply.replyWebSite" target="_blank" class="comment-nickname ml-1">
                    @{{ reply.replyNickname }}
                  </a>
                  ，
                </template>
                <span v-html="reply.commentContent" />
              </p>
            </div>
          </div>
          <!-- 回复数量 -->
          <div class="mb-3" style="font-size: 0.75rem; color: #6d757a" v-show="item.replyCount > 3" ref="check">
            共
            <b>{{ item.replyCount }}</b>
            条回复，
            <span style="color: #00a1d6; cursor: pointer" @click="viewReply(index, item)"> 点击查看 </span>
          </div>
          <!-- 回复分页 -->
          <div class="mb-3" style="font-size: 0.75rem; color: #222; display: none" ref="paging">
            <span style="padding-right: 10px"> 共{{ Math.ceil(item.replyCount / 5) }}页 </span>
            <paging
              ref="page"
              :totalPage="Math.ceil(item.replyCount / 5)"
              :index="index"
              :commentId="item.id"
              @changeReplyCurrent="changeReplyCurrent"
            />
          </div>
          <!-- 回复框 -->
          <Reply
            :style="showReplyBlock === index ? 'display: block' : 'display: none'"
            :type="type"
            ref="replyRef"
            @reloadReply="reloadReply"
          />
        </div>
      </div>
      <!-- 加载按钮 -->
      <div class="load-wrapper">
        <v-btn outlined v-if="paginationData.total > commentList.length" @click="listComments"> 加载更多... </v-btn>
      </div>
    </div>
    <!-- 没有评论提示 -->
    <div v-else style="padding: 1.25rem; text-align: center">来发评论吧~</div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, watch, nextTick, onMounted, computed } from "vue"
import Reply from "./Reply.vue"
import Paging from "../Paging.vue"
import Emoji from "../Emoji.vue"
import { useWebStore } from "@/stores"
import { ElMessage } from "element-plus"
import { replaceEmoji } from "@/utils/emoji"
import { useRoute } from "vue-router"
import {
  createCommentApi,
  findCommentListApi,
  findCommentReplyListApi,
  likeCommentApi,
  queryCommentApi,
} from "@/api/comment"
import { usePagination } from "@/hooks/usePagination"
import axios from "axios"

const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

// 父组件向子组件传输的数据
const props = defineProps({
  type: {
    type: Number,
    required: false,
  },
})

// 获取存储的博客信息
const webState = useWebStore()

// 获取路由参数
const route = useRoute()

const commentContent = ref("")
const commentList = ref([])
const chooseEmoji = ref(false)
// const reply = ref([])
const check = ref([])
const paging = ref([])

// 查看评论
const listComments = () => {
  const order = [
    {
      field: "created_at",
      rule: "desc",
    },
  ]
  const conditions: Condition[] = [
    {
      field: "type",
      value: props.type,
      rule: "=",
    },
    {
      flag: "and",
      field: "parent_id",
      value: 0,
      rule: "=",
    },
  ]
  const path = route.path
  const arr = path.split("/")
  switch (props.type) {
    case 1:
    case 3:
      conditions.push({
        field: "topic_id",
        value: arr[2],
        rule: "=",
      })
      break
    default:
      break
  }
  findCommentListApi({
    page: paginationData.currentPage,
    pageSize: paginationData.pageSize,
    orders: order,
    conditions: conditions,
  }).then((res) => {
    console.log(res)
    if (paginationData.currentPage === 1) {
      commentList.value = res.data.list
    } else {
      commentList.value.push(...res.data.list)
    }
    paginationData.currentPage = res.data.page + 1
    paginationData.pageSize = res.data.pageSize
    paginationData.total = res.data.total
  })
}

const insertComment = () => {
  // 判断登录
  if (!webState.isLogin()) {
    webState.loginFlag = true
    return false
  }
  // 判空
  if (commentContent.value.trim() === "") {
    ElMessage.error("评论不能为空")
    return false
  }
  // 解析表情
  commentContent.value = replaceEmoji(commentContent.value)

  // 发送请求
  const path = route.path
  const arr = path.split("/")
  const comment = {
    commentContent: commentContent.value,
    type: props.type,
    topicId: null,
  }
  switch (props.type) {
    case 1:
    case 3:
      comment.topicId = arr[2]
      break
    default:
      break
  }

  createCommentApi(comment)
    .then((res) => {
      // 查询最新评论
      paginationData.currentPage = 1
      listComments()
      const isReview = webState.blogInfo.websiteConfig.isCommentReview
      if (isReview) {
        ElMessage.success("评论成功，正在审核中")
      } else {
        ElMessage.success("评论成功")
      }
    })
    .catch((err) => {
      ElMessage.error(err.message)
    })

  commentContent.value = ""
}

const replyRef = ref()
const showReplyBlock = ref(-1)

const replyComment = (index, item) => {
  console.log(index, item)
  if (showReplyBlock.value == index) {
    showReplyBlock.value = -1
    return
  }
  showReplyBlock.value = index

  webState.replyInfo = item

  const childComponent = replyRef.value[index]
  console.log("replyRef", replyRef.value[0])
  console.log("childComponent", childComponent.commentContent)

  childComponent.commentContent = ""
  childComponent.nickname = item.nickname
  childComponent.replyUserId = item.userId
  childComponent.parentId = commentList.value[index].id
  childComponent.chooseEmoji = false
  childComponent.index = index
  // reply.value[index].$el.style.display = 'block'
}

const reloadReply = (index) => {
  findCommentReplyListApi(commentList.value[index].id, {
    orders: [
      {
        field: "created_at",
        rule: "desc",
      },
    ],
    conditions: [
      {
        flag: "and",
        field: "type",
        value: props.type,
        rule: "=",
      },
    ],
  })
  // findCommentReplyListApi(commentList.value[index].id)
}

const viewReply = (index, item) => {
  const orders = [
    {
      field: "created_at",
      rule: "desc",
    },
  ]
  const conditions: Condition[] = [
    {
      field: "type",
      value: props.type,
      rule: "=",
    },
  ]

  findCommentReplyListApi(commentList.value[index].id, {
    orders: orders,
    conditions: conditions,
  }).then(({ data }) => {
    check[index].style.display = "none"
    item.replyDTOList = data.data
    // 超过1页才显示分页
    if (Math.ceil(item.replyCount / 5) > 1) {
      paging[index].style.display = "flex"
    }
  })
}

const changeReplyCurrent = (current, index, commentId) => {
  // 查看下一页回复
  axios
    .get("/api/comments/" + commentId + "/replies", {
      params: { current: current, size: 5 },
    })
    .then(({ data }) => {
      commentList[index].replyDTOList = data.data
    })
}

const addEmoji = (emoji) => {
  commentContent.value += emoji
}

const like = (comment) => {
  // 判断登录
  if (!webState.isLogin()) {
    webState.loginFlag = true
    return false
  }

  likeCommentApi(comment.id).then((res) => {
    ElMessage.success("点赞成功")
    const commentLikeSet = webState.commentLikeSet
    if (commentLikeSet.indexOf(comment.id) !== -1) {
      comment.likeCount--
    } else {
      comment.likeCount++
    }
    webState.commentLike(comment.id)
  })
}

const isLike = (commentId) => {
  var commentLikeSet = webState.commentLikeSet
  return commentLikeSet.indexOf(commentId) != -1 ? "like-active" : "like"
}

const reFresh = ref(true)

onMounted(() => {
  listComments()
  console.log("replyRef", replyRef.value)
})

watch(commentList, () => {
  reFresh.value = false
  nextTick(() => {
    reFresh.value = true
  })
})
watch(commentContent, (val) => {
  if (val.indexOf("[") != -1) {
  }
})
</script>

<style scoped>
.blogger-tag {
  background: #ffa51e;
  font-size: 12px;
  display: inline-block;
  border-radius: 2px;
  color: #fff;
  padding: 0 5px;
  margin-left: 6px;
}
.comment-title {
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  font-weight: bold;
  line-height: 40px;
  margin-bottom: 10px;
}
.comment-title i {
  font-size: 1.5rem;
  margin-right: 5px;
}
.comment-input-wrapper {
  border: 1px solid #90939950;
  border-radius: 4px;
  padding: 10px;
  margin: 0 0 10px;
}
.count {
  padding: 5px;
  line-height: 1.75;
  font-size: 1.25rem;
  font-weight: bold;
}
.comment-meta {
  margin-left: 0.8rem;
  width: 100%;
  border-bottom: 1px dashed #f5f5f5;
}
.reply-meta {
  margin-left: 0.8rem;
  width: 100%;
}
.comment-user {
  font-size: 14px;
  line-height: 1.75;
}
.comment-user a {
  color: #1abc9c !important;
  font-weight: 500;
  transition: 0.3s all;
}
.comment-nickname {
  text-decoration: none;
  color: #1abc9c !important;
  font-weight: 500;
}
.comment-info {
  line-height: 1.75;
  font-size: 0.75rem;
  color: #b3b3b3;
}
.reply-btn {
  cursor: pointer;
  float: right;
  color: #ef2f11;
}
.comment-content {
  font-size: 0.875rem;
  line-height: 1.75;
  padding-top: 0.625rem;
  white-space: pre-line;
  word-wrap: break-word;
  word-break: break-all;
}
.comment-avatar {
  transition: all 0.5s;
}
.comment-avatar:hover {
  transform: rotate(360deg);
}
.like {
  cursor: pointer;
  font-size: 0.875rem;
}
.like:hover {
  color: #eb5055;
}
.like-active {
  cursor: pointer;
  font-size: 0.875rem;
  color: #eb5055;
}
.load-wrapper {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.load-wrapper button {
  background-color: #49b1f5;
  color: #fff;
}
</style>
