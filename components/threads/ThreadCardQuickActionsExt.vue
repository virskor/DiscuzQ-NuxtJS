<template>
	<div class="ml-2">
		<v-menu top offset-y>
			<template v-slot:activator="{ on, attrs }">
				<v-btn text v-bind="attrs" v-on="on">
					更多
				</v-btn>
			</template>

			<v-list>
				<v-list-item  @click="$router.push(`/reports/?thread_id=${thread.id}`)">
					<v-list-item-title>举报</v-list-item-title>
				</v-list-item>
				<v-list-item  @click="deleteThread" v-if="canDelete">
					<v-list-item-title>删除该主题</v-list-item-title>
				</v-list-item>
				<v-list-item @click="showQrCode = true">
					<v-list-item-title>在手机中查看</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-menu>

		<!--二维码生成-->
		<v-dialog v-model="showQrCode" persistent max-width="300">
			<v-card>
				<v-card-title class="headline">扫描二维码来阅读</v-card-title>
				<ThreadQRCode :thread="thread"></ThreadQRCode>
				
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="primary" text @click="showQrCode = false">好的，完成扫描</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";

import threadsAPI from "~/api/threads";
import ThreadQRCode from "~/components/threads/ThreadQRCode";

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
			const { thread, hasLogined } = this;
			if(!hasLogined){
				return false;
			}
			return thread.attributes.canDelete;
		},
	},
	data() {
		return {
			showQrCode: false,
		};
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
					this.$router.go(-1);
					return;
				}

				this.$swal("未能成功删除");
			}
		},
	},
	components: {
		ThreadQRCode
	}
};
</script>

<style>
</style>