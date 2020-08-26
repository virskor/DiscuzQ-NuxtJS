<script>
export default {
	name: "VarBox",
	render() {
		return this.$scopedSlots.default(this.$attrs);
	},
};
</script>