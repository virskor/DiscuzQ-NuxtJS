<template>
	<client-only>
		<v-card outlined flat>
			<v-overlay v-if="!hasLogined" absolute :opacity=".1" :value="true">
				<v-btn @click="login" depressed rounded color="primary">登录来发布或评论</v-btn>
			</v-overlay>
			<MarkdownEditor
				@input="pub"
				@price="setPrice"
				@title="setThreadTitle"
				@addAttachments="addAttachments"
				@removeAttachments="removeAttachments"
				v-model="content"
				:lightMode="lightMode"
				:isReply="isReply"
			></MarkdownEditor>
		</v-card>
	</client-only>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";
/**
 * 该编辑器直接嵌入的话，会不限定高度宽度
 * 注意，嵌入编辑器时要自定义盒子来引入该组件，可以使dialog，也可以是普通的DIV
 *
 * https://github.com/sparksuite/simplemde-markdown-editor
 */
import MarkdownEditor from "~/components/editor/mavon/MarkdownEditor";
import postsAPI from "~/api/posts";
import threadsAPI from "~/api/threads";

export default {
	name: "Editor",
	props: {
		/**
		 * 精简模式将不支持输入标题，等，适用于快速发帖，回复嵌入
		 */
		lightMode: Boolean,
		/**
		 * 回复时，关联post, 将补全replyId
		 */
		post: Object,
		/**
		 * 回复时，关联thread
		 */
		thread: Object,
		/**
		 * isEditMode
		 * 编辑数据时，区分thread, post 传入thread则编辑thread, 传入post则编辑Post
		 */
		isEditMode: Boolean,
	},
	mounted() {
		this.$nextTick(async () => {});
	},
	data() {
		return {
			content: "",
			/**
			 * 标题
			 */
			title: "",
			/**
			 * 价格
			 */
			price: "0.00",
			/**
			 * 附件
			 */
			attachments: [],
			/**
			 * 经度
			 */
			longitude: null,
			/**
			 * 纬度
			 */
			latitude: null,
			/**
			 * address
			 * 经纬度坐标对应的地址（如：广东省深圳市深南大道 10000 号）
			 */
			address: "",
			/**
			 * location
			 * 经纬度坐标对应的位置（如：腾讯大厦）
			 */
			location: "",
		};
	},
	computed: {
		...mapGetters({
			user: types.GETTERS_USER,
		}),
		hasLogined() {
			const { user } = this;
			return !this.$_.isEmpty(user);
		},
		/**
		 * 是否用于回复
		 */
		isReply() {
			const { thread } = this;
			if (thread) {
				return true;
			}
			return false;
		},
		/**
		 * 计算帖子类型
		 * 文章类型（0: 文字 1: 帖子 2: 视频 3:图片）
		 *
		 * todo: 视频
		 */
		type() {
			const { title, attachments } = this;

			if (!this.$_.isEmpty(attachments)) {
				return 3;
			}

			if (this.$_.isEmpty(title)) {
				return 0;
			}

			return 1;
		},
	},
	methods: {
		/**
		 * 跳转登录页面
		 */
		login() {
			this.$router.push({
				path: "/users/login",
				query: { callback: this.$route.path },
			});
		},
		/**
		 * 设置价格
		 */
		setPrice(price) {
			this.price = price;
		},
		/**
		 * pub 发布
		 */
		async pub() {
			const {
				content,
				title,
				price,
				attachments,
				isReply,
				thread,
				post,
			} = this;
			if (!this.$_.trim(content)) {
				this.$swal("请输入内容后再继续");
				return;
			}

			/**
			 * 发布回复
			 */
			if (isReply) {
				const rs = await this.createPost();
				this.$emit("onPosted", rs);
				return;
			}

			/**
			 * 发布主题
			 */
			const rs = await this.createThread();
			if (rs) {
				this.$emit("onThreadCreated", rs);
				return;
			}

			/** 发布主题 */

			this.$swal(`未能发布\r\n${title}\r\n${content}`);
		},
		/**
		 * 发布主题
		 */
		async createThread() {
			const {
				content,
				title,
				price,
				attachments,
				isReply,
				type,
				longitude,
				latitude,
				address,
				location,
			} = this;

			let data = {
				type: "threads",
				attributes: {
					type,
					title,
					price,
					content,
					longitude,
					latitude,
					address,
					location,
				},
				relationships: {
					attachments,
					category: {},
				},
			};

			console.log(data);
		},
		/**
		 * 发布评论
		 */
		async createPost() {
			const {
				content,
				title,
				price,
				attachments,
				isReply,
				thread,
				post,
			} = this;

			if (this.$_.isEmpty(thread)) {
				await this.$swal("未正确关联主题数据");
				return;
			}

			let data = {
				type: "posts",
				attributes: { content },
				relationships: {
					attachments,
					thread: {
						data: {
							type: "threads",
							id: thread.id,
						},
					},
				},
			};

			/**
			 * isComment
			 */
			if (!this.$_.isEmpty(post)) {
				data.attributes["isComment"] = true;
				data.attributes["replyId"] = post.id;
			}

			const rs = await postsAPI.create(data);
			if (rs) {
				/**
				 * 成功发布评论
				 */
				this.content = "";
				await this.$swal(
					"回复成功!",
					"回复成功，刷新或关闭对话框来查看!",
					"success"
				);
				return rs;
			}
		},
		/**
		 * 设置主题标题
		 */
		setThreadTitle(val) {
			this.title = val;
		},
		/**
		 * 新增附件
		 */
		addAttachments() {},
		/**
		 * 移除附件
		 */
		removeAttachments() {},
	},
	components: {
		MarkdownEditor,
	},
};
</script>