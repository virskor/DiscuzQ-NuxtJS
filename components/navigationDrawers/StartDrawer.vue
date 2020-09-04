<template>
	<v-navigation-drawer class="start-drawer" :width="300" v-model="show" clipped app>
		<v-toolbar dense elevation="0">
			<AppLogo />
			<v-spacer></v-spacer>
			<v-btn
				@click="$router.push('/views/editor')"
				:elevation="0"
				color="primary"
				text
				bottom
				rounded
			>发帖</v-btn>
		</v-toolbar>
		<v-card tile flat>
			<v-list>
				<template v-for="(item, i) in navigationItems">
					<template v-if="item.shouldLogin && !hasLogined"></template>
					<template v-else>
						<v-divider v-if="item.divider" :key="i" dark></v-divider>
						<v-list-item :ripple="false" @click="onSelected(item)" v-else :key="i">
							<v-list-item-action v-if="item.icon">
								<i
									:class="!item.color && $route.path == item.route ? `primary--text iconfont icon-menu ${item.icon}`:`iconfont icon-menu ${item.icon}`"
								></i>
							</v-list-item-action>
							<v-list-item-content>
								<v-list-item-title
									:class="!item.color &&  $route.path == item.route  ? 'primary--text font-weight-bold' : 'font-weight-bold'"
								>
									<v-badge v-if="item.badge" color="red" :content="item.badge">{{ item.text }}</v-badge>
									<span v-else>{{ item.text }}</span>
								</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</template>
				</template>
				<v-list-item>
					<DarkSwitcher showLabel></DarkSwitcher>
				</v-list-item>
			</v-list>
		</v-card>
	</v-navigation-drawer>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";
import DarkSwitcher from "~/components/settings/DarkSwitcher";
import NavigationItems from "~/components/navigationDrawers/NavigationItems";

export default {
	mixins: [NavigationItems],
	props: {
		value: Boolean,
	},
	computed: {
		...mapGetters({
			user: types.GETTERS_USER,
		}),
		hasLogined() {
			const { user } = this;
			return !this.$_.isEmpty(user);
		},
		width() {
			return this.$C.isMobile() ? 300 : 440;
		},
		/**
		 * 未读消息数量
		 */
		unreadNotifications() {
			const { hasLogined, user } = this;
			if (!hasLogined) {
				return 0;
			}
			return user.attributes.unreadNotifications || 0;
		},
	},
	data() {
		return {
			show: true,
		};
	},
	components: {
		DarkSwitcher,
	},
	mounted() {
		this.$nextTick(() => {
			this.show = this.value;
		});
	},
	methods: {
		/**
		 * 用户选中菜单
		 */
		onSelected(selection) {
			if (this.$_.isEmpty(selection)) {
				return;
			}

			if (selection.callback) {
				selection.callback();
				return;
			}

			this.$router.push(selection.route || "/");
		},
	},
	watch: {
		value() {
			this.show = this.value;
		},
		show() {
			this.$emit("input", this.show);
		},
	},
};
</script>

<style lang="less" scoped>
.start-drawer {
	.icon-menu {
		font-size: 22px;
	}
}
</style>