<template>
	<div>
		<AppTitle showExtendedNav title="下载APP"></AppTitle>
		<AppLanding />
	</div>
</template>

<script>
import AppLanding from "~/components/landings/AppLanding";

export default {
	head() {
		return {
			title: "APP下载",
		};
	},
	components: {
		AppLanding,
	},
};
</script>
