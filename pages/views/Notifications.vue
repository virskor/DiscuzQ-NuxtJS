<template>
	<div>
		<AppTitle title="消息提醒"></AppTitle>
		<v-container fluid>
			<MessageTypesMenuList></MessageTypesMenuList>
			<PrivateMessagesList></PrivateMessagesList>
		</v-container>
	</div>
</template>

<script>
import MessageTypesMenuList from "~/components/message/MessageTypesMenuList";
import PrivateMessagesList from "~/components/message/PrivateMessagesList";

export default {
	head() {
		return {
			title: "消息提醒",
		};
	},
	mounted() {
		this.$nextTick(async () => {
			await this.$store.dispatch("shouldLogin");
		});
	},
	components: {
		MessageTypesMenuList,
		PrivateMessagesList,
	},
};
</script>
