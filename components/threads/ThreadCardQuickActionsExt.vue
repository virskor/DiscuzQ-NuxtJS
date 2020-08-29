<template>
	<!--todo: 菜单增加后，记得移除if canDelete -->
	<div v-if="hasLogined && canDelete" class="ml-2">
		<v-menu top offset-y>
			<template v-slot:activator="{ on, attrs }">
				<v-btn icon v-bind="attrs" v-on="on">
					<v-icon>mdi-dots-horizontal</v-icon>
				</v-btn>
			</template>

			<v-list>
				<v-list-item @click="deleteThread" v-if="canDelete">
					<v-list-item-title>删除该主题</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-menu>
	</div>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";

import threadsAPI from "~/api/threads";

export default {
	props: {
		/**
		 * 当前主题对象
		 */
		thread: Object,
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
		 * 用户是否有删除权限
		 */
		canDelete() {
			const { thread } = this;
			return thread.attributes.canDelete;
		},
	},
	data() {
		return {};
	},
	methods: {
		/**
		 * 删除主题
		 */
		async deleteThread() {
			const { thread } = this;

			const result = await this.$swal({
				title: "确认删除该主题吗",
				text: "主题删除后无法恢复",
				icon: "info",
				buttons: {
					cancel: "取消",
					catch: {
						text: "确认删除",
					},
				},
				dangerMode: true,
			});

			if (result) {
				const rs = await threadsAPI.deleteThread(thread.id);
				if (rs) {
					this.$route.go(-1);
					return;
				}

				this.$swal("未能成功删除");
			}
		},
	},
};
</script>

<style>
</style>