<template>
	<div>
		<AppTitle title="隐私政策"> </AppTitle>

		<v-container>
			<v-card
				flat
				class="pa-4"
				v-if="!$_.isEmpty(forum) && forum.attributes.agreement.privacy"
			>
				<div
					class="policy-content"
					v-text="forum.attributes.agreement.privacy_content"
				></div>
			</v-card>
			<v-card flat class="pa-4" v-else>
				{{
					$_.isEmpty(forum) || forum.attributes.agreement.privacy
						? "正在加载..."
						: "暂未设置..."
				}}
			</v-card>
		</v-container>
	</div>
</template>

<script>
import forumAPI from "~/api/forum";

export default {
	head() {
		return {
			title: "隐私政策",
		};
	},
	data() {
		return {
			forum: {},
		};
	},
	mounted() {
		this.$nextTick(async () => {
			await this.getForumWithAgreements();
		});
	},
	methods: {
		async getForumWithAgreements() {
			const rs = await forumAPI.getForumAndAgreements();
			if (rs) {
				this.forum = rs.data;
			}
		},
	},
};
</script>

<style lang="less">
.policy-content {
	white-space: pre-line;
	text-align: justify;
}
</style>