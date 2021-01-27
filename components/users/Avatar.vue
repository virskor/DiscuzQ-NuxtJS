<template>
	<div :style="`width:${size || 50}; height: ${size || 50}`" class="qui-avatar">
		<v-avatar rounded @click="onWantOpenUserHomePage" :size="size || 50" color="primary">
			<template>
				<v-img v-if="!showEmpty" :src="userAvatar" :lazy-src="emptyAvatar" :alt="alt" @error="onError"></v-img>
				<!--头像如果加载失败，那么将会以标签的形式呈现-->
				<span v-else class="white--text headline">{{alt.substring(0,1).toUpperCase()}}</span>
			</template>
		</v-avatar>
		<!--实名认证标志-->
		<i v-if="user.attributes.isReal" class="iconfont icon-best_answerer isReal"></i>
	</div>
</template>

<script>
export default {
	props: {
		/**
		 * 注意，头像直接传入一个对象
		 * 这样做是为了以后更容易拓展
		 */
		user: Object,
		/**
		 * 头像大小
		 */
		size: Number,
		/**
		 * preventClick
		 */
		preventClick: Boolean,
	},
	data() {
		return {
			/**
			 * 发生错误，或者为空的时候将返回空的头像
			 */
			emptyAvatar: "/noavatar.gif",
			/**
			 * 头像加载错误时，将使用span来代替
			 * 默认false
			 */
			showEmpty: false,
		};
	},
	computed: {
		/**
		 * 用户头像地址
		 */
		userAvatar() {
			const { user, emptyAvatar } = this;

			if (this.$_.isEmpty(user)) {
				return emptyAvatar;
			}

			return user.attributes.avatarUrl || emptyAvatar;
		},
		/**
		 * alt 取用户名
		 */
		alt() {
			const { user } = this;
			if (this.$_.isEmpty(user)) {
				return "user";
			}

			return user.attributes.username || "";
		},
	},
	methods: {
		/**
		 * 头像加载出现问题
		 */
		onError() {
			this.showEmpty = true;
		},
		/**
		 * 想要打开用户主页
		 */
		onWantOpenUserHomePage() {
			const { user, preventClick } = this;
			if(preventClick){
				return;
			}
			this.$router.push({ path: `/users/${user.id || 0}` });
		},
	},
};
</script>

<style scoped lang="less">
.qui-avatar {
	position: relative;
	cursor: pointer;
	.isReal {
		position: absolute;
		padding: 0;
		height: 15px;
		width: 15px;
		bottom: 0;
		right: 0;
		color: #1da1f2;
		background-color: #ffffff;
		border-radius: 50px;
	}
}
</style>