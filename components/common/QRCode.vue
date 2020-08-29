<template>
	<div v-if="dataUrl">
		<p align="center">
			<img :src="dataUrl" />
		</p>
	</div>
</template>

<script>
import QRCode from "qrcode";
import discuzConf from "~/discuz.config";

export default {
	props: {
		thread: Object,
	},
	data() {
		return {
			dataUrl: null,
		};
	},
	mounted() {
		this.$nextTick(async () => {
			const { thread } = this;
			const threadUri = `${discuzConf.responsive.redirectDomain}/pages/topic/index?id=${thread.id}`;
			QRCode.toDataURL(threadUri, { errorCorrectionLevel: 'H' }, (err, url) => {
                if(err){
                    console.log(err);
                    return;
                }
				this.dataUrl = url;
			});
		});
	},
};
</script>

<style>
</style>