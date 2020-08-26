<template>
	<div class="pa-5">
		<v-row>
			<v-col v-for="(p ,i) in presets" :key="i" class="d-flex child-flex" cols="4">
				<v-btn @click="next(p)" depressed class="font-weight-black text-h6">¥{{p}}</v-btn>
			</v-col>

			<v-col class="d-flex child-flex" cols="4">
				<v-btn @click="custom" depressed class="font-weight-black text-h6">自定义</v-btn>
			</v-col>
		</v-row>
	</div>
</template>

<script>
export default {
	data() {
		return {
			/**
			 * 预设定
			 */
			presets: [1, 2, 5, 10, 20, 50, 88, 128],
		};
	},
	methods: {
		/**
		 * 自定义金额
		 */
		async custom() {
            this.$emit('close');
			const value = await this.$swal("请输入要支付的金额", {
				content: "input",
            });

            if(this.$C.formatAmounts(value) > 0){
                this.next(value);
                return;
            }

            await this.$swal('输入的价格无效');
            this.$emit('open');
		},
		/**
		 * 调用创建订单并支付的组件来继续
		 */
		next(value) {
            this.$emit('continuTopay', value);
        },
	},
};
</script>

<style>
</style>