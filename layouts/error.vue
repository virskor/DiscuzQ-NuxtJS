<template>
	<div class="container text-center pt-5">
		<div v-if="error.statusCode === 404">
			<h1>404 Not Found</h1>
			<p>
				<span class="title blue-grey--text">{{error.message}}</span>
			</p>
		</div>
		<div v-else>
			<h1>{{error.message}}</h1>
			<p>
				<span class="title blue-grey--text">{{error.message}}</span>
			</p>
		</div>
		<nuxt-link to="/">
			<v-btn :elevation="0" color="primary">返回首页</v-btn>
		</nuxt-link>
	</div>
</template>

<script>
export default {
	props: ["error"],
	layout: "blog", // you can set a custom layout for the error page
	medthods: {
	}
};
</script>
