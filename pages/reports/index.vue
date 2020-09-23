<template>
	<div>
		<AppTitle showExtendedNav :title="title"></AppTitle>

		<v-container>
			<v-card flat>
				<v-card-title>{{title}}的ID：{{thread_id || post_id || user_id}}</v-card-title>
				<v-card-text>
					<v-radio-group v-model="selectedReason">
						<v-radio v-for="(p, i) in presetReasons" :key="i" :label="p" :value="p"></v-radio>
					</v-radio-group>
					<v-textarea
						label="更加详细的信息"
						v-model="reason"
						hint="请描述举报的理由，以便我们审核"
						clearable
					></v-textarea>
				</v-card-text>
				<v-card-actions>
					<v-btn @click="report" depressed large color="primary">提交举报信息</v-btn>
					<v-btn @click="$router.go(-1)" depressed large>取消</v-btn>
				</v-card-actions>
			</v-card>
		</v-container>
	</div>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";

import reportsAPI from "~/api/reports";

export default {
	mounted() {
		this.$nextTick(async () => {
			await this.$store.dispatch("shouldLogin");
		});
	},
	data() {
		return {
			/**
			 * 传入的主题id
			 */
			thread_id: this.$route.query.thread_id || 0,
			/**
			 * 传入评论的id
			 */
			post_id: this.$route.query.post_id || 0,
			/**
			 * 传入要举报的用户id
			 */
			user_id: this.$route.query.user_id || 0,
			/**
			 * 原因
			 */
			reason: "",
			/**
			 * presetReasons
			 */
			presetReasons: [
				"广告垃圾",
				"恶意灌水",
				"违规内容",
				"重复发帖",
				"言语攻击",
				"暴恐谣言",
				"其他",
			],
			/**
			 * 用户选择的理由
			 */
			selectedReason: "其他",
		};
	},
	computed: {
		/**
		 * 标题
		 */
		title() {
			const { thread_id, post_id, user_id } = this;
			if (!this.$_.isEmpty(thread_id)) {
				return "举报主题";
			}

			if (!this.$_.isEmpty(post_id)) {
				return "举报评论";
			}

			if (!this.$_.isEmpty(user_id)) {
				return "举报用户";
			}

			return "举报";
		},
		/**
		 * 类型
		 * 0个人主页 1主题 2评论/回复
		 */
		type() {
			const { thread_id, post_id, user_id } = this;
			if (!this.$_.isEmpty(thread_id)) {
				return 1;
			}

			if (!this.$_.isEmpty(post_id)) {
				return 2;
			}

			if (!this.$_.isEmpty(user_id)) {
				return 0;
			}

			return null;
		},
	},
	methods: {
		/**
		 * 提交举报数据
		 */
		async report() {
			const {
				thread_id,
				post_id,
				user_id,
				reason,
				type,
				selectedReason,
			} = this;

			if (this.$_.isEmpty(reason)) {
				this.$swal("请填写举报的理由");
				return;
			}

			const rs = await reportsAPI.create({
				thread_id,
				post_id,
				user_id,
				reason: `${selectedReason} - ${reason}`,
				type,
			});

			if (rs) {
				await this.$swal(
					"举报成功!",
					"我们已经收到您的举报并将及时处理，谢谢!",
					"success"
				);
				this.$router.go(-1);
			}
		},
	},
};
</script>

<style>
</style>