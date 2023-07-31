<template>
	<div>
		<div class="comment-title"><i class="iconfont iconpinglunzu" />评论</div>
		<!-- 评论框 -->
		<div class="comment-wrapper">
			<div style="display: flex; width: 100%">
				<v-avatar size="36">
					<img v-if="webState.avatar" :src="webState.avatar" />
					<img v-else :src="webState.blogInfo.websiteConfig.touristAvatar" />
				</v-avatar>
				<div style="width: 100%" class="ml-3">
					<div class="comment-input">
						<textarea
							class="comment-textarea"
							v-model="commentContent"
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
						<button @click="insertComment" class="upload-btn v-comment-btn" style="margin-left: auto">
							提交
						</button>
					</div>
					<!-- 表情框 -->
					<emoji @addEmoji="addEmoji" :chooseEmoji="chooseEmoji" />
				</div>
			</div>
		</div>
		<!-- 评论详情 -->
		<div v-if="count > 0 && reFresh">
			<!-- 评论列表 -->
			<div class="comment-wrapper" v-for="(item, index) of commentList" :key="item.id">
				<!-- 头像 -->
				<v-avatar size="40" class="comment-avatar">
					<img :src="item.avatar" />
				</v-avatar>
				<div class="comment-meta">
					<!-- 用户名 -->
					<div class="comment-user">
						<span v-if="!item.webSite">{{ item.nickname }}</span>
						<a v-else :href="item.webSite" target="_blank">{{ item.nickname }}</a>
						<v-icon size="20" color="#ffa51e" v-if="item.userId == 1"> mdi-check-decagram </v-icon>
					</div>
					<!-- 信息 -->
					<div class="comment-info">
						<!-- 楼层 -->
						<span style="margin-right: 10px">{{ count - index }}楼</span>
						<!-- 发表时间 -->
						<span style="margin-right: 10px">{{ item.createdAt }}</span>
						<!-- 点赞 -->
						<span :class="isLike(item.id) + ' iconfont icondianzan'" @click="like(item)" />
						<span v-show="item.likeCount > 0">{{ item.likeCount }}</span>
						<!-- 回复 -->
						<span class="reply-btn" @click="replyComment(index, item)">回复</span>
					</div>
					<!-- 评论内容 -->
					<p v-html="item.commentContent" class="comment-content"></p>
					<!-- 回复人 -->
					<div style="display: flex" v-for="reply of item.replyDTOList" :key="reply.id">
						<!-- 头像 -->
						<v-avatar size="36" class="comment-avatar">
							<img :src="reply.avatar" />
						</v-avatar>
						<div class="reply-meta">
							<!-- 用户名 -->
							<div class="reply-user">
								<span v-if="!reply.webSite">{{ reply.nickname }}</span>
								<a v-else :href="reply.webSite" target="_blank">{{ reply.nickname }}</a>
								<v-icon size="18" color="#ffa51e" v-if="reply.userId === 1">
									mdi-check-decagram
								</v-icon>
								<span style="margin-left: 5px; color: #999">回复</span>
								<a :href="`#${reply.replyId}`" class="reply-link"> @{{ reply.replyNickname }} </a>
							</div>
							<!-- 评论内容 -->
							<p v-html="reply.commentContent" class="reply-content"></p>
							<!-- 发表时间 -->
							<div class="comment-info">
								<span style="margin-right: 10px">{{ reply.createdAt }}</span>
								<!-- 点赞 -->
								<span :class="isLike(reply.id) + ' iconfont icondianzan'" @click="like(reply)" />
								<span v-show="reply.likeCount > 0">{{ reply.likeCount }}</span>
								<!-- 回复 -->
								<span class="reply-btn" @click="replyComment(index, item, reply)">回复</span>
							</div>
						</div>
					</div>
					<!-- 回复输入框 -->
					<div v-if="replyCommentIndex === index && replyToCommentId === item.id" class="comment-wrapper">
						<div style="display: flex; width: 100%">
							<v-avatar size="36">
								<img v-if="webState.avatar" :src="webState.avatar" />
								<img v-else :src="webState.blogInfo.websiteConfig.touristAvatar" />
							</v-avatar>
							<div style="width: 100%" class="ml-3">
								<div class="comment-input">
									<textarea
										class="comment-textarea"
										v-model="replyContent"
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
										@click="insertComment(reply.id)"
										class="upload-btn v-comment-btn"
										style="margin-left: auto"
									>
										提交
									</button>
								</div>
								<emoji @addEmoji="addEmoji" :chooseEmoji="chooseEmoji" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 加载按钮 -->
			<div class="load-wrapper">
				<v-btn outlined v-if="paginationData.total > commentList.length" @click="listComments">
					加载更多...
				</v-btn>
			</div>
		</div>
		<!-- 没有评论提示 -->
		<div v-else style="padding: 1.25rem; text-align: center">来发评论吧~</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from "vue"
import { useWebStore } from "@/stores"
import { findCommentListApi, queryCommentApi } from "@/api/comment"
import { usePagination } from "@/hooks/usePagination"
import { useRoute } from "vue-router"

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

// 定义响应式变量
const commentContent = ref("") // 评论内容
const replyContent = ref("") // 回复内容
const commentList = ref([]) // 评论列表
const chooseEmoji = ref(false) // 是否选择表情
const replyCommentIndex = ref(-1) // 回复评论的索引
const replyToCommentId = ref(null) // 回复的评论 ID
const count = ref(0) // 评论总数
const reFresh = ref(true) // 是否刷新评论

const listComments = () => {
	// 查看评论
	const path = route.path
	const arr = path.split("/")
	let conditions
	switch (props.type) {
		case 1:
		case 3:
			conditions = [
				{
					field: "topic_id",
					value: arr[2],
					rule: "=",
				},
			]
			break
		default:
			break
	}
	findCommentListApi({
		page: paginationData.currentPage,
		page_size: paginationData.pageSize,
		sorts: [
			{
				field: "created_at",
				rule: "desc",
			},
		],
		conditions: [
			{
				field: "type",
				value: props.type,
				rule: "=",
			},
			{
				field: "parent_id",
				value: 0,
				rule: "=",
			},
		],
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

// 提交新评论
async function submitComment() {
	// 验证评论内容
	if (commentContent.value.trim() === "") {
		// 显示错误信息或处理验证错误
		return
	}

	// 创建新的评论对象
	const newComment = {
		content: commentContent.value,
		// 如果需要，可以添加其他属性到评论对象中
	}

	// 调用 API 提交新评论
	const response = await fetch("/api/comments", {
		method: "POST",
		body: JSON.stringify(newComment),
		headers: {
			"Content-Type": "application/json",
		},
	})

	if (response.ok) {
		// 评论提交成功
		// 清空评论输入框
		commentContent.value = ""
		// 获取更新后的评论列表
		listComments()
	} else {
		// 处理错误响应
		// 显示错误信息或执行其他必要操作
	}
}

// 回复评论
function replyComment(index, item, reply) {
	// 设置索引和评论 ID，以便跟踪回复输入框
	replyCommentIndex.value = index
	replyToCommentId.value = item.id
}

// 插入回复评论
async function insertComment(parentId) {
	// 验证回复内容
	if (replyContent.value.trim() === "") {
		// 显示错误信息或处理验证错误
		return
	}

	// 创建新的回复评论对象
	const newReply = {
		parentId: parentId,
		content: replyContent.value,
		// 如果需要，可以添加其他属性到回复评论对象中
	}

	// 调用 API 插入回复评论
	const response = await fetch("/api/comments", {
		method: "POST",
		body: JSON.stringify(newReply),
		headers: {
			"Content-Type": "application/json",
		},
	})

	if (response.ok) {
		// 回复评论插入成功
		// 清空回复输入框
		replyContent.value = ""
		// 重置回复评论的索引和 ID
		replyCommentIndex.value = -1
		replyToCommentId.value = null
		// 获取更新后的评论列表
		listComments()
	} else {
		// 处理错误响应
		// 显示错误信息或执行其他必要操作
	}
}

// 生命周期钩子
onMounted(() => {
	// 在组件挂载时获取初始评论
	listComments()
})

// 监听响应式变量的变化
watch([commentContent, replyContent], () => {
	// 当评论内容或回复内容发生变化时执行必要的操作
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
