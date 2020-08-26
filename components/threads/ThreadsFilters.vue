<template>
	<div>
		<v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-y>
			<template v-slot:activator="{ on, attrs }">
				<v-btn v-bind="attrs" v-on="on" depressed text rounded small color="primary">
					<i class="iconfont icon-Filter"></i>
				</v-btn>
			</template>

			<v-card>
				<v-list>
					<v-list-item>
						<v-list-item-content>
							<v-list-item-title>筛选查询帖子</v-list-item-title>
							<v-list-item-subtitle>根据选中的偏好，来为您展示帖子</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>
				</v-list>

				<v-list v-if="!shouldClearCategoryFilter">
					<v-divider />
					<v-list-item>
						<v-list-item-content>
							<v-list-item-title>版块分类</v-list-item-title>
							<v-list-item-subtitle class="pt-3">
								<v-row class="ml-0 mr-0" justify="start">
									<v-btn
										class="mr-2 mt-2"
										:color="categoryId && categoryId == it.id ? 'primary' : 'default'"
										@click="categoryId = it.id"
										depressed
										rounded
										outlined
										v-for="(it,i) in categories"
										:key="i"
									>{{it.attributes.name}}</v-btn>
								</v-row>
							</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>
				</v-list>

				<v-list>
					<v-divider />
					<v-list-item>
						<v-list-item-content>
							<v-list-item-title>类型</v-list-item-title>
							<v-list-item-subtitle class="pt-3">
								<v-btn
									class="mr-2"
									:color="type == it.value ? 'primary' : 'default'"
									@click="type = it.value"
									depressed
									rounded
									outlined
									v-for="(it,i) in types"
									:key="i"
								>{{it.caption}}</v-btn>
							</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>
				</v-list>

				<v-list>
					<v-list-item>
						<v-list-item-content>
							<v-list-item-title>其他筛选</v-list-item-title>
							<v-list-item-subtitle class="pt-3">
								<v-btn
									class="mr-2"
									:color="isEssence == 'yes' ? 'primary' : 'default'"
									@click="toggleIsEssence"
									depressed
									rounded
									outlined
								>精华</v-btn>
								<v-btn
									class="mr-2"
									v-if="user"
									@click="toggleFromUserID"
									:color="fromUserId == user.id ? 'primary' : 'default'"
									depressed
									rounded
									outlined
								>只看已关注</v-btn>
							</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>
				</v-list>

				<v-card-actions>
					<v-spacer></v-spacer>

					<v-btn depressed rounded @click="menu = false">关闭</v-btn>
					<v-btn depressed @click="enSureUpdateFilter" color="primary" rounded>筛选并查询</v-btn>
				</v-card-actions>
			</v-card>
		</v-menu>
	</div>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";

export default {
	data() {
		return {
			menu: false,
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
			type: '',
			/**
			 * 类型选择列表
			 */
			types: [
				{ caption: "普通", value: '0' },
				{ caption: "长文", value: '1' },
				{ caption: "视频", value: '2' },
				{ caption: "图片", value: '3' },
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
				categoryid,
				isApproved,
				isEssence,
				isSticky,
				isDeleted,
				fromUserId,
				type,
			} = this;

			await this.$store.dispatch("updateFilter", {
				categoryid,
				isApproved,
				isEssence,
				isSticky,
				isDeleted,
				fromUserId,
				type,
			});
			this.menu = false;
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