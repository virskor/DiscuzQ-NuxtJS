<template>
	<div class="qui-footer v-list-item__subtitle" v-if="forum">
		<v-footer color="transparent" padless>
			<v-col
				class="pb-0"
				cols="12"
			>Copyright © 2013-{{ new Date().getFullYear() }}</v-col>
			<v-col class="pt-0" cols="12">
				<p>
					<!-- <span>用户：{{forum.attributes.other.count_users}}</span>
					<span>主题：{{forum.attributes.other.count_threads}}</span>
					<span>主题：{{forum.attributes.other.count_posts}}</span> -->
					<nuxt-link to="/views/license/privacy">隐私政策</nuxt-link>
					<nuxt-link to="/views/license/policy">用户协议</nuxt-link>
					<a target="_blank" href="https://app.clodra.com/helpcenter/">帮助中心</a>
				</p>

				<p>
					ICP备：
					<a
						href="http://www.beian.miit.gov.cn"
						target="_blank"
					>{{forum.attributes.set_site.site_record}}</a>
				</p>
			</v-col>
			<v-col class="pt-0" cols="12">Powered by Discuz!Q & Dehong.ren</v-col>
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