<template>
	<div class="qui-footer" v-if="forum">
		<v-footer color="transparent" padless>
			<v-col
				class="text-center pb-0"
				cols="12"
			>Copyright © 2013-{{ new Date().getFullYear() }} {{forum.attributes.set_site.site_name}}. All Rights Reserved.</v-col>
			<v-col class="text-center pt-0" cols="12">
				<p>
					<!-- <span>用户：{{forum.attributes.other.count_users}}</span>
					<span>主题：{{forum.attributes.other.count_threads}}</span>
					<span>主题：{{forum.attributes.other.count_posts}}</span> -->
					<a href="https://app.clodra.com/policies/privacy.html" target="_blank">隐私政策</a>
					<a href="https://app.clodra.com/policies/policy.html" target="_blank">用户协议</a>
				</p>

				<p>
					ICP备：
					<a
						href="http://www.beian.miit.gov.cn"
						target="_blank"
					>{{forum.attributes.set_site.site_record}}</a>
				</p>
			</v-col>
			<v-col class="text-center pt-0" cols="12">Powered by Discuz!Q & Dehong.ren</v-col>
		</v-footer>
	</div>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";

export default {
	computed: {
		...mapGetters({
			forum: types.GETTERS_FORUM,
		}),
	},
};
</script>

<style lang="less">
.qui-footer {
	p {
		margin-bottom: 0px;
	}
}
</style>