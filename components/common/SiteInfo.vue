<template>
	<div>
		<v-card v-if="forum" class="text-center" tile flat>
			<!--允许嵌入-->
			<slot/>

			<v-row align="center">
				<v-col cols="4">
					<span class="font-weight-black">{{forum.attributes.other.count_users || 0}}</span>
					<p>
						<span class="v-list-item__subtitle">会员</span>
					</p>
				</v-col>
				<v-col cols="4">
					<span class="font-weight-black">{{forum.attributes.other.count_threads || 0}}</span>
					<p>
						<span class="v-list-item__subtitle">主题</span>
					</p>
				</v-col>
				<v-col cols="4">
					<span class="font-weight-black">{{forum.attributes.other.count_posts || 0}}</span>
					<p>
						<span class="v-list-item__subtitle">评论</span>
					</p>
				</v-col>
			</v-row>
		</v-card>
	</div>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";

export default {
	props: {
		/**
		 * show subheader
		 */
		subHeader: Boolean
	},
	computed: {
		...mapGetters({
			forum: types.GETTERS_FORUM,
		}),
	},
};
</script>

<style>
</style>