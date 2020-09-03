<template>
	<div class="qui-attachments ml-2">
		<v-card flat max-width="700">
			<!--使用九宫格渲染-->
			<v-row class="pl-5 pr-5" v-if="shouldShowAttchments && grid">
				<template v-for="(a, i) in attachments">
					<v-col
						:key="i"
						v-if="!$_.isEmpty(a.attributes.thumbUrl)"
						class="d-flex child-flex ma-0 pa-1"
						cols="4"
					>
						<v-card :ripple="false" @click="show()" v-if="i < 9" flat class="d-flex">
							<v-img
								:src="a.attributes.url"
								:lazy-src="a.attributes.thumbUrl"
								aspect-ratio="1"
								class="grey lighten-2 rounded-lg"
							>
								<template v-slot:placeholder>
									<v-row class="fill-height ma-0" align="center" justify="center">
										<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
									</v-row>
								</template>
							</v-img>
						</v-card>
					</v-col>
				</template>
			</v-row>
			<!--不使用九宫格渲染-->
			<v-row class="pl-5 pr-5" v-else-if="shouldShowAttchments">
				<template v-for="(a, i) in attachments">
					<v-col
						:key="i"
						v-if="!$_.isEmpty(a.attributes.thumbUrl)"
						class="d-flex child-flex ma-0 pa-1"
						cols="12"
					>
						<v-img
							@click="show()"
							:src="a.attributes.url"
							:lazy-src="a.attributes.thumbUrl"
							class="grey lighten-2 rounded-lg clickable"
						>
							<template v-slot:placeholder>
								<v-row class="fill-height ma-0" align="center" justify="center">
									<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
								</v-row>
							</template>
						</v-img>
					</v-col>
				</template>
			</v-row>
		</v-card>
	</div>
</template>

<script>
export default {
	props: {
		/**
		 * 当前主题关联的数据
		 */
		attachments: Array,
		/**
		 * 是否使用九宫格渲染
		 */
		grid: Boolean,
	},
	computed: {
		shouldShowAttchments() {
			const { attachments } = this;
			return attachments && attachments.length > 0;
		},
		images() {
			const { attachments } = this;
			return attachments.map((a) => a.attributes.url);
		},
	},
	methods: {
		/**
		 * 展示图片
		 */
		show() {
			const { images } = this;
			const gallery = images.map((it) => {
				if (it) {
					return {
						src: it,
					};
				}
			});

			this.$Pswp.open({
				items: gallery || [],
			});
		},
	},
};
</script>

<style scoped lang="less">
.qui-attachments {
	.v-image {
		border: 1px solid rgba(0, 0, 0, 0.01) !important;
	}
}
</style>