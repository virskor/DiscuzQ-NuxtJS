<template>
	<v-card flat tile class="mb-2" v-if="wallet">
		<v-card-title class="text-h3 font-weight-black primary--text">{{$C.formatAmounts(wallet.available_amount)}}元</v-card-title>
		<v-card-subtitle>可用余额</v-card-subtitle>
		<v-divider></v-divider>
		<v-card-subtitle>
			冻结金额{{$C.formatAmounts(wallet.freeze_amount)}}元
		</v-card-subtitle>

		<!-- <v-card-actions>
			<v-btn @click="$router.push('/wallet/cash')" color="primary" depressed>申请提现</v-btn>
            <v-btn @click="$router.push('/wallet/freeze')" text small color="primary">查看冻结明细</v-btn>
		</v-card-actions> -->
	</v-card>
</template>

<script>
export default {
	props: {
		/**
		 * wallet
		 */
		wallet: Object,
	},
};
</script>

<style>
</style>