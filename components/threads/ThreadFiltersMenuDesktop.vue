<template>
	<v-card v-if="!$C.isMobile()" flat class="mb-2 pl-2 pr-2">
		<v-card-actions>
			<v-row wrap>
				<v-btn
					class="mr-2"
					:color="isEssence != 'yes' ? 'primary' : 'default'"
					@click="toggleIsEssence"
					depressed
					text
				>所有</v-btn>
				<v-btn
					class="mr-2"
					:color="isEssence == 'yes' ? 'primary' : 'default'"
					@click="toggleIsEssence"
					depressed
					text
				>精华</v-btn>
				<v-btn
					class="mr-2"
					v-if="user"
					@click="toggleFromUserID"
					:color="fromUserId == user.id ? 'primary' : 'default'"
					depressed
					text
				>只看已关注</v-btn>
				<v-menu offset-y bottom left>
					<template v-slot:activator="{ on, attrs }">
						<v-btn depressed text v-bind="attrs" v-on="on">
							<v-icon left>mdi-chevron-down</v-icon>类型
						</v-btn>
					</template>

					<v-list>
						<v-list-item
							@click="type = it.value"
							depressed
							rounded
							outlined
							v-for="(it,i) in types"
							:key="i"
						>
							<v-list-item-title
								:class="type == it.value ? 'primary--text' : 'default--text'"
							>{{it.caption}}</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>

				<v-spacer></v-spacer>
				<v-btn depressed @click="enSureUpdateFilter" icon color="primary">
					<v-icon>mdi-magnify</v-icon>
				</v-btn>
			</v-row>
		</v-card-actions>
	</v-card>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";

export default {
	data() {
		return {
			/**
			 * 分类ID
			 */
			categoryId: 0,
			/**
			 * 是否合法（0/1/2）
			 * 0 不合法
			 * 1 正常
			 * 2 忽略
			 */
			isApproved: 1,
			/**
			 * 是否是精华 yes no
			 * 默认为 ''
			 */
			isEssence: "",
			/**
			 * 是否为顶 yes no
			 * 默认为 ''
			 */
			isSticky: "",
			/**
			 * 是否被删除
			 * 默认为no 强制
			 */
			isDeleted: "no",
			/**
			 * 仅查看某人
			 * fromUserId 默认为0
			 */
			fromUserId: 0,
			/**
			 * type
			 * 类型：0 普通 1 长文 2 视频 3 图片
			 */
			type: "",
			/**
			 * 类型选择列表
			 */
			types: [
				{ caption: "普通", value: "0" },
				{ caption: "长文", value: "1" },
				{ caption: "视频", value: "2" },
				{ caption: "图片", value: "3" },
			],
		};
	},
	/**
	 * 一定要在 created 对store 进行更新
	 */
	created() {
		this.enSureUpdateFilter();
	},
	methods: {
		/**
		 * 更新 filter状态
		 */
		async enSureUpdateFilter() {
			const {
				categoryId,
				isApproved,
				isEssence,
				isSticky,
				isDeleted,
				fromUserId,
				type,
			} = this;

			await this.$store.dispatch("updateFilter", {
				categoryId,
				isApproved,
				isEssence,
				isSticky,
				isDeleted,
				fromUserId,
				type,
			});
		},
		/**
		 * toggle选中精华
		 */
		toggleIsEssence() {
			const { isEssence } = this;
			this.isEssence = isEssence == "yes" ? "" : "yes";
		},
		/**
		 * ID
		 */
		toggleFromUserID() {
			const { user, fromUserId } = this;
			if (!user) {
				return;
			}

			this.fromUserId = fromUserId == 0 ? user.id : 0;
		},
	},
	computed: {
		...mapGetters({
			filter: types.GETTERS_FILTER,
			categories: types.GETTERS_CATEGORIES,
			user: types.GETTERS_USER,
		}),
		/**
		 * 如果在分类下启用筛选，那么禁用筛选器中的分类菜单
		 * 筛选器仅在部分路由需要激活
		 */
		shouldClearCategoryFilter() {
			/**
			 * 允许显示筛选器的路由
			 */
			const wantRemoveOnPathList = ["/views/categories"];
			const match = wantRemoveOnPathList.find(
				(it) => it == this.$route.path
			);
			return typeof match == "undefined" ? false : true;
		},
	},
};
</script>

<style>
</style>