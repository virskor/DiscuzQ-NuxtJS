<template>
	<client-only>
		<v-card class="pa-2" flat>
			<v-overlay v-if="!hasLogined" absolute :opacity=".1" :value="true">
				<v-btn @click="login" depressed rounded color="primary">登录来继续</v-btn>
			</v-overlay>

			<MarkdownEditor
				@pub="pub"
				@price="(p) => price = p"
				@category="(c) => category = c"
				:lightMode="lightMode"
				:isReply="isReply"
				:enableAttachment="enableAttachment"
				:enablePrice="enablePrice"
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
		/**
		 * enable upload attachment
		 * 是否允许上传附件
		 */
		enableAttachment: Boolean,
		/**
		 * 是否允许设置价格
		 */
		enablePrice: Boolean
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
			 * 价格
			 */
			price: "0.00",
		};
	},
	computed: {
		...mapGetters({
			forum: types.GETTERS_FORUM,
			user: types.GETTERS_USER,
			editor: types.GETTERS_EDITOR,
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
			const { editor } = this;

			/**
			 * 如果用户上传了图片，则为图片贴
			 */
			const uploadTypeImages  = attachmentsAPI.types.UPLOAD_TYPE_THREAD_IMAGES;
			if (!this.$_.isEmpty(editor.attachments.find(a => a.type == uploadTypeImages))) {
				return 3;
			}

			/**
			 * 如果用户上传了附件，则为帖子
			 */
			if (!this.$_.isEmpty(editor.attachments)) {
				return 1;
			}

			/**
			 * 如果用户没有上传图片，且没有标题，则为文字
			 */
			if (this.$_.isEmpty(editor.title)) {
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
		 * 重新初始化编辑器
		 */
		async reload() {
			await this.$store.dispatch('clearEditor');
		},
		/**
		 * pub 发布
		 */
		async pub() {
			const { price, editor, isReply, thread, post } = this;

			if (!this.$_.trim(editor.content)) {
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
				price,
				editor,
				isReply,
				type,
				captchaAppID,
				category,
			} = this;

			const attachments = editor.attachments.map((a)=>{
				return {
					id: a.id,
					type: "attachments"
				}
			});

			let data = {
				type: "threads",
				attributes: {
					type,
					...editor,
					captcha_ticket: "",
					captcha_rand_str: "",
					/**
					 * 付费主题可免费阅读字数
					 */
					free_words: 0,
				},
				relationships: {
					attachments: {
						data: attachments,
					},
					category,
				},
			};

			/**
			 * 删除不必要的属性
			 */
			delete data.attributes.attachments

			// 调试用
			// debugger
			// console.log(data);
			// return;

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
				this.price = "0.00";
				await this.reload();
				return rs;
			}
		},
		/**
		 * 发布评论
		 */
		async createPost() {
			const { price, editor, isReply, thread, post } = this;

			if (this.$_.isEmpty(thread)) {
				await this.$swal("未正确关联主题数据");
				return;
			}

			const attachments = editor.attachments.map((a)=>{
				return {
					id: a.id,
					type: "attachments"
				}
			});

			let data = {
				type: "posts",
				attributes: { content: editor.content },
				relationships: {
					attachments: {
						data: attachments,
					},
					thread: {
						data: {
							type: "threads",
							id: thread.id,
						},
					},
				},
			};

			/**
			 * 删除不必要的属性
			 */
			delete data.attributes.attachments

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
				await this.reload();
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
	},
	components: {
		MarkdownEditor,
	},
};
</script>