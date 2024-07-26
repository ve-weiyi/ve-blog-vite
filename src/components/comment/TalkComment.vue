<template>
  <div>
    <div class="comment-title"><i class="iconfont iconpinglunzu" />评论</div>
    <!-- 评论框 -->
    <div class="comment-wrapper">
      <div style="display: flex; width: 100%">
        <v-avatar size="36">
          <img v-if="webStore.userInfo.avatar" height="36" :src="webStore.userInfo.avatar" />
          <img v-else height="36" :src="webStore.blogInfo.website_config.tourist_avatar" />
        </v-avatar>
        <div style="width: 100%" class="ml-3">
          <div class="comment-input">
            <textarea
              v-model="commentContent"
              class="comment-textarea"
              placeholder="留下点什么吧..."
              auto-grow
              dense
            />
          </div>
          <!-- 操作按钮 -->
          <div class="emoji-container">
            <span
              :class="chooseEmoji ? 'emoji-btn-active' : 'emoji-btn'"
              @click="chooseEmoji = !chooseEmoji"
            >
              <i class="iconfont iconbiaoqing" />
            </span>
            <button
              class="upload-btn v-comment-btn"
              style="margin-left: auto"
              @click="insertComment()"
            >
              提交
            </button>
          </div>
          <!-- 表情框 -->
          <emoji :chooseEmoji="chooseEmoji" @addEmoji="addEmoji" />
        </div>
      </div>
    </div>
    <!-- 评论详情 -->
    <div v-if="paginationData.total > 0">
      <!-- 评论列表 -->
      <div v-for="(item, index) of commentList" :key="item.id" class="comment-wrapper">
        <!-- 头像 -->
        <v-avatar size="40" class="comment-avatar">
          <img height="40" :src="item.avatar" />
        </v-avatar>
        <div class="comment-meta">
          <!-- 用户名 -->
          <div class="comment-user">
            <span v-if="!item.website">{{ item.nickname }}</span>
            <a v-else :href="item.website" target="_blank">{{ item.nickname }}</a>
            <v-icon v-if="item.user_id == 1" size="20" color="#ffa51e"> mdi-check-decagram</v-icon>
          </div>
          <!-- 信息 -->
          <div class="comment-info">
            <!-- 楼层 -->
            <span style="margin-right: 10px">{{ paginationData.total - index }}楼</span>
            <!-- 发表时间 -->
            <span style="margin-right: 10px">{{ formatDate(item.created_at) }}</span>
            <!-- 点赞 -->
            <span :class="isLike(item.id) + ' iconfont icondianzan'" @click="like(item)" />
            <span v-show="item.like_count > 0">{{ item.like_count }}</span>
            <!-- 回复 -->
            <span class="reply-btn" @click="replyComment(index, item, null)">回复</span>
          </div>
          <!-- 评论内容 -->
          <p class="comment-content" v-html="item.comment_content"></p>
          <!-- 回复人 -->
          <div v-for="reply of item.comment_reply_list" :key="reply.id" style="display: flex">
            <!-- 头像 -->
            <v-avatar size="36" class="comment-avatar">
              <img height="36" :src="reply.avatar" />
            </v-avatar>
            <div class="reply-meta">
              <!-- 用户名 -->
              <div class="reply-user">
                <span v-if="!reply.website">{{ reply.nickname }}</span>
                <a v-else :href="reply.website" target="_blank">{{ reply.nickname }}</a>
                <v-icon v-if="reply.user_id === 1" size="18" color="#ffa51e">
                  mdi-check-decagram
                </v-icon>
                <span style="margin-left: 5px; color: #999">回复</span>
                <a :href="`#${reply.reply_user_id}`" class="reply-link">
                  @{{ reply.reply_nickname }}
                </a>
              </div>
              <!-- 评论内容 -->
              <p class="reply-content" v-html="reply.comment_content"></p>
              <!-- 发表时间 -->
              <div class="comment-info">
                <span style="margin-right: 10px">{{ reply.created_at }}</span>
                <!-- 点赞 -->
                <span :class="isLike(reply.id) + ' iconfont icondianzan'" @click="like(reply)" />
                <span v-show="reply.like_count > 0">{{ reply.like_count }}</span>
                <!-- 回复 -->
                <span class="reply-btn" @click="replyComment(index, item, reply)">回复</span>
              </div>
            </div>
          </div>
          <!-- 回复输入框 -->
          <div v-if="replyCommentIndex === index" class="comment-wrapper">
            <div style="display: flex; width: 100%">
              <v-avatar size="36">
                <img v-if="webStore.userInfo.avatar" height="36" :src="webStore.userInfo.avatar" />
                <img v-else height="36" :src="webStore.blogInfo.website_config.tourist_avatar" />
              </v-avatar>
              <div style="width: 100%" class="ml-3">
                <div class="comment-input">
                  <textarea
                    v-model="replyContent"
                    class="comment-textarea"
                    placeholder="回复评论..."
                    auto-grow
                    dense
                  />
                </div>
                <div class="emoji-container">
                  <span
                    :class="chooseEmoji ? 'emoji-btn-active' : 'emoji-btn'"
                    @click="chooseEmoji = !chooseEmoji"
                  >
                    <i class="iconfont iconbiaoqing" />
                  </span>
                  <button
                    class="upload-btn v-comment-btn"
                    style="margin-left: auto"
                    @click="confirmReply(index, item, reply)"
                  >
                    提交
                  </button>
                </div>
                <emoji :chooseEmoji="chooseEmoji" @addEmoji="addEmoji" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 加载按钮 -->
      <div class="load-wrapper">
        <v-btn v-if="paginationData.total > commentList.length" outlined @click="listComments">
          加载更多...
        </v-btn>
      </div>
    </div>
    <!-- 没有评论提示 -->
    <div v-else style="padding: 1.25rem; text-align: center">来发评论吧~</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue"
import { useWebStoreHook } from "@/store/modules/website"
import { formatDate } from "@/utils/formatDate.ts"
import {
  createCommentApi,
  getCommentListApi,
  getCommentReplyListApi,
  likeCommentApi,
} from "@/api/comment"
import { usePagination } from "@/hooks/usePagination"
import { useRoute } from "vue-router"
import { CommentDTO, CommentNewReq, CommentQueryReq } from "@/api/types.ts"
import { ElMessage } from "element-plus"
import { replaceEmoji } from "@/utils/emoji.ts"

const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

// 父组件向子组件传输的数据
const props = defineProps({
  type: {
    type: Number,
    required: false,
  },
})

// 获取存储的博客信息
const webStore = useWebStoreHook()

// 获取路由参数
const route = useRoute()

const commentContent = ref("")
const commentList = ref<CommentDTO[]>([])
const chooseEmoji = ref(false)
const check = ref([])
const paging = ref([])
const replyCommentIndex = ref(-1)
const replyRef = ref()
const replyCommentRef = ref()
const replyContent = ref("")
const reply = ref()
// 查看评论
const listComments = () => {
  const path = route.path
  const arr = path.split("/")
  const data: CommentQueryReq = {
    page: paginationData.currentPage,
    page_size: paginationData.pageSize,
    topic_id: parseInt(arr[2]) | 0,
    parent_id: 0,
    type: props.type,
    order_by: "created_at",
  }

  getCommentListApi(data).then((res) => {
    console.log(res)
    if (paginationData.currentPage === 1) {
      commentList.value = res.data.list
    } else {
      commentList.value.push(...res.data.list)
    }
    paginationData.currentPage = res.data.page + 1
    paginationData.pageSize = res.data.page_size
    paginationData.total = res.data.total
  })
}

// 新增评论
const insertComment = () => {
  // 判断登录
  if (!webStore.isLogin()) {
    webStore.loginFlag = true
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
  const comment: CommentNewReq = {
    topic_id: parseInt(arr[2]) | 0,
    reply_user_id: 0,
    parent_id: 0,
    session_id: 0,
    comment_content: commentContent.value,
    type: props.type,
  }

  createCommentApi(comment)
    .then((res) => {
      const isReview = webStore.blogInfo.website_config.is_comment_review
      if (isReview) {
        ElMessage.success("评论成功，正在审核中")
      } else {
        ElMessage.success("评论成功")
      }
      // 查询最新评论
      paginationData.currentPage = 1
      listComments()
    })
    .catch((err) => {
      ElMessage.error(err.message)
    })

  commentContent.value = ""
}

// 回复评论
function replyComment(index: number, item: CommentDTO, replay: CommentDTO) {
  console.log(index, item)
  if (replyCommentIndex.value == index) {
    replyCommentIndex.value = -1
    return
  }
  replyCommentIndex.value = index

  const replyComponent = replyCommentRef.value[index]
  replyComponent.placeholder = "回复@" + item.nickname + ":"
}

// 确认回复
function confirmReply(index: number, item: CommentDTO, replay: CommentDTO) {
  // 判断登录
  if (!webStore.isLogin()) {
    webStore.loginFlag = true
    return false
  }

  const replyComponent = replyCommentRef.value[replyCommentIndex.value]
  const parent = item
  console.log("parent", parent)

  if (replyComponent.content.trim() == "") {
    ElMessage.error("回复不能为空")
    return false
  }

  const path = route.path
  const arr = path.split("/")
  const comment: CommentNewReq = {
    topic_id: 0,
    parent_id: parent.parent_id != 0 ? parent.parent_id : parent.id,
    reply_user_id: parent.user_id != webStore.userInfo.id ? parent.user_id : 0,
    session_id: parent.session_id | parent.id,
    comment_content: replaceEmoji(replyComponent.content),
    type: props.type,
  }
  switch (props.type) {
    case 1:
    case 3:
      comment.topic_id = parseInt(arr[2])
      break
    default:
      break
  }

  createCommentApi(comment)
    .then((res) => {
      replyCommentIndex.value = -1
      const isReview = webStore.blogInfo.website_config.is_comment_review
      if (isReview) {
        ElMessage.success("评论成功，正在审核中")
      } else {
        ElMessage.success("评论成功")
      }
      // 查询最新评论
      paginationData.currentPage = 1
      listComments()
    })
    .catch((err) => {
      ElMessage.error(err.message)
    })

  replyComponent.content = ""
}

// 取消回复
function cancelReply(index: number, item: CommentDTO) {
  console.log("cancelReply")
  replyCommentIndex.value = -1
}

// 查看更多回复
function viewMoreReply(index: number, item: CommentDTO) {
  const path = route.path
  const arr = path.split("/")
  const data: CommentQueryReq = {
    page: 1,
    page_size: 5,
    topic_id: parseInt(arr[2]) | 0,
    parent_id: item.id,
    // session_id: -1,
    type: props.type,
    order_by: "created_at",
  }

  getCommentReplyListApi(data).then((res) => {
    check.value[index].style.display = "none"
    item.comment_reply_list = res.data.list
    // 超过1页才显示分页
    if (Math.ceil(item.reply_count / 5) > 1) {
      paging.value[index].style.display = "flex"
    }
  })
}

function changeReplyCurrent(index: number, item: CommentDTO, page: number) {
  // console.log("changeReplyCurrent", current, index, commentId)
  const path = route.path
  const arr = path.split("/")
  const data: CommentQueryReq = {
    page: page,
    page_size: 5,
    topic_id: parseInt(arr[2]) | 0,
    parent_id: item.id,
    // session_id: -1,
    type: props.type,
    order_by: "created_at",
  }

  getCommentReplyListApi(data).then((res) => {
    check.value[index].style.display = "none"
    item.comment_reply_list = res.data.list
    // 超过1页才显示分页
    if (Math.ceil(item.reply_count / 5) > 1) {
      paging.value[index].style.display = "flex"
    }
  })
}

const addEmoji = (emoji) => {
  commentContent.value += emoji
}

const like = (comment) => {
  // 判断登录
  if (!webStore.isLogin()) {
    webStore.loginFlag = true
    return false
  }

  const data = {
    id: comment.id,
  }
  likeCommentApi(data).then((res) => {
    ElMessage.success("点赞成功")
    if (webStore.isCommentLike(comment.id)) {
      comment.likeCount--
    } else {
      comment.likeCount++
    }
    webStore.commentLike(comment.id)
  })
}

const isLike = (commentId) => {
  return webStore.isCommentLike(commentId) ? "like-active" : "like"
}

onMounted(() => {
  listComments()
  console.log("replyRef", replyRef.value)
})

watch(commentContent, (val) => {
  if (val.indexOf("[") != -1) {
  }
})
</script>

<style scoped>
.comment-wrapper {
  margin-top: 20px;
  display: flex;
  padding: 16px 20px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 3px 8px 6px rgb(7 17 27 / 6%);
  transition: all 0.3s ease 0s;
}

.comment-wrapper:hover {
  box-shadow: 0 5px 10px 8px rgb(7 17 27 / 16%);
  transform: translateY(-3px);
}

.comment-title {
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  font-weight: bold;
  line-height: 40px;
  margin-top: 20px;
}

.comment-title i {
  font-size: 1.5rem;
  margin-right: 5px;
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
  font-size: 15px;
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
