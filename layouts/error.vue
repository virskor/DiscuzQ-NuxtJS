<template>
	<div>
		<AppTitle title="错误"></AppTitle>

		<div class="container text-center pt-5">
			<div v-if="error.statusCode === 404">
				<h1>Not Found</h1>
				<p>
					<span class="title blue-grey--text">{{error.message}}</span>
				</p>
			</div>
			<div v-else>
				<h1>{{error.statusCode}}：{{error.message}}</h1>
				<p>
					<span class="title blue-grey--text">{{error.message}}</span>
				</p>
			</div>
			<nuxt-link to="/">
				<v-btn depressed color="primary"><v-icon left>mdi-home</v-icon>前往首页</v-btn>
			</nuxt-link>

			<v-btn @click="$router.go(-1)" text color="primary">返回上一页</v-btn>
		</div>
	</div>
</template>

<script>
export default {
	props: ["error"],
	layout: "blog", // you can set a custom layout for the error page
	medthods: {},
};
</script>
