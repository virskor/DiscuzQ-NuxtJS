<template>
	<div>
		<AppTitle showExtendedNav title="我的收藏"></AppTitle>
		<v-container>
			<ThreadsCollectionList></ThreadsCollectionList>
		</v-container>
	</div>
</template>

<script>
import ThreadsCollectionList from '~/components/threads/ThreadsCollectionList';

export default {
	head() {
		return {
			title: "我的收藏",
		};
	},
	mounted() {
		this.$nextTick(async()=>{
			await this.$store.dispatch("shouldLogin");
		});
	},
	components: {
		ThreadsCollectionList
	}
};
</script>
