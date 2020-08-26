<template>
	<div>
		<AppTitle title="我的收藏"></AppTitle>
		<v-container fluid>
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
