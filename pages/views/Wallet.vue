<template>
	<div>
		<AppTitle title="卡包"></AppTitle>
		<v-container fluid>
			<!--钱包金融数字预览-->
			<WalletAmountsCard v-if="!loading" :wallet="wallet"></WalletAmountsCard>

			<template v-else>
				<v-sheet class="px-3 pb-3">
					<v-skeleton-loader ref="skeleton" type="card" class="mx-auto"></v-skeleton-loader>
				</v-sheet>
			</template>

			<v-divider></v-divider>
			<!--钱包明细，订单明细 提现记录-->
		</v-container>
	</div>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";

import WalletAmountsCard from "~/components/financial/wallet/WalletAmountsCard";
import walletAPI from "~/api/wallet";

export default {
	head() {
		return {
			title: "卡包",
		};
	},
	computed: {
		...mapGetters({
			user: types.GETTERS_USER,
		}),
	},
	mounted() {
		this.$nextTick(async () => {
			await this.$store.dispatch("shouldLogin");
			await this.getWallet();
		});
	},
	data() {
		return {
			wallet: null,
			loading: true,
		};
	},
	methods: {
		/**
		 * get wallet
		 */
		async getWallet() {
			const { user } = this;

			this.loading = true;

			const rs = await walletAPI.getUserWallet(user.id);

			this.loading = false;

			if (rs) {
				this.wallet = rs.data;
			}
		},
	},
	components: { WalletAmountsCard },
};
</script>
