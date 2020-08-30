<template>
	<client-only>
		<v-card outlined flat>
			<v-overlay v-if="!hasLogined" absolute :opacity=".1" :value="true">
				<v-btn @click="login" depressed rounded color="primary">登录来发布或评论</v-btn>
			</v-overlay>
			<QuillEditor
				@addAttachements="addAttachements"
				@input="pub"
				v-model="content"
				:lightMode="lightMode"
				:isReply="isReply"
				@price="setPrice"
			></QuillEditor>
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
import QuillEditor from "~/components/editor/QuillEditor";

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
			price: '0.00'
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
		 * 添加附件
		 */
		addAttachements() {},
		/**
		 * 设置价格
		 */
		setPrice(price){
			this.price = price;
		},
		/**
		 * pub 发布
		 */
		pub() {
			const { content } = this;
			if (!this.$_.trim(content)) {
				this.$swal("请输入内容后再继续");
				return;
			}
			this.$swal(`即将支持您发布\r\n${content}`);
		},
	},
};
</script>