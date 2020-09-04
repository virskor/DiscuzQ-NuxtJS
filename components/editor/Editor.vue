<template>
	<client-only>
		<v-card outlined flat>
			<v-overlay v-if="!hasLogined" absolute :opacity=".1" :value="true">
				<v-btn @click="login" depressed rounded color="primary">登录来发布或评论</v-btn>
			</v-overlay>
			<MarkdownEditor
				@input="pub"
				@price="(p) => price = p"
				@title="(t) => title = t"
				@category="(c) => category = c"
				@attachments="addAttachments"
				@del-attachments="removeAttachments"
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
import attachmentsAPI from "~/api/attachments";
import Captcha from "~/utils/captcha";

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
			/**
			 * 分类
			 */
			category: null,
			/**
			 * 要发布的内容
			 */
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
			longitude: 0,
			/**
			 * 纬度
			 */
			latitude: 0,
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
			forum: types.GETTERS_FORUM,
			user: types.GETTERS_USER,
		}),
		/**
		 * Captcha App ID
		 */
		captchaAppID() {
			const { forum } = this;
			return forum.attributes.qcloud.qcloud_captcha_app_id;
		},
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
				if (rs) {
					await this.$swal(
						"回复成功!",
						"回复成功，刷新或关闭对话框来查看!",
						"success"
					);

					// if (!this.$_.isEmpty(post)) {
					// 	this.$router.push({
					// 		path: `/posts/${post.id}`,
					// 		query: { threadID: thread.id },
					// 	});
					// 	return;
					// }

					// this.$router.push({
					// 	path: `/posts/${rs.data.id}`,
					// 	query: { threadID: thread.id },
					// });

					this.$emit("onPosted");
				}
				return;
			}

			/**
			 * 发布主题
			 */
			const rs = await this.createThread();
			if (rs) {
				//this.$emit("onThreadCreated", rs);

				const jump = await this.$swal({
					title: "发布成功",
					text: "继续发帖，或者前往查看刚才发布的帖子",
					icon: "success",
					buttons: {
						cancel: "继续发帖",
						catch: {
							text: "前往查看",
						},
					},
					dangerMode: true,
				});

				if (jump) {
					this.$router.push(`/threads/${rs.data.id}`);
				}
				return;
			}
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
				captchaAppID,
				category,
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
					captcha_ticket: "",
					captcha_rand_str: "",
					/**
					 * 付费主题可免费阅读字数
					 */
					free_words: 0,
				},
				relationships: {
					attachments,
					category,
				},
			};

			/**
			 * 补全腾讯云验证码
			 */
			if (captchaAppID) {
				try {
					let captchaResult = await this.requestUserCaptcha();
					data.attributes["captcha_ticket"] = captchaResult.ticket;
					data.attributes["captcha_rand_str"] = captchaResult.randstr;
				} catch (err) {
					console.error(err);
					return;
				}
			}

			const rs = await threadsAPI.create(data);
			if (rs) {
				this.content = "";
				this.title = "";
				this.price = "0.00";
				return rs;
			}
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
				return rs;
			}
		},
		/**
		 * request user captcha actions
		 * return object
		 */
		async requestUserCaptcha() {
			const { captchaAppID } = this;

			if (!captchaAppID) {
				return null;
			}

			try {
				const captcha = new Captcha({
					appId: captchaAppID,
				});
				const res = await captcha.showCaptcha();
				return res;
			} catch (err) {
				throw err;
			}
		},
		/**
		 * 新增附件
		 */
		addAttachments(a) {
			this.attachments.push(a);
		},
		/**
		 * 移除附件
		 */
		async removeAttachments(a) {
			const { attachments } = this;

			if (this.$_.isEmpty(a)) {
				return;
			}
			await attachmentsAPI.delete(a.id);

			this.attachments = attachments.filter((el) => el.id != a.id);
		},
	},
	components: {
		MarkdownEditor,
	},
};
</script>