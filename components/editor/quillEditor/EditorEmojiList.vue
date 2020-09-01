<template>
	<v-card class="pa-4" max-width="500px">
		<v-row no-gutters>
			<v-col v-for="(e, i) in emojis" :key="i" cols="1">
				<v-img
					@click="select(e)"
					class="qq-emotion clickable"
					:lazy-src="e.attributes.url"
					:src="e.attributes.url"
					:alt="e.attributes.code"
				></v-img>
			</v-col>
		</v-row>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn @click="$emit('close')" text color="primary">完成</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";

import EditorEmojiList from "~/components/editor/quillEditor/EditorEmojiList";

export default {
	computed: {
		...mapGetters({
			emojis: types.GETTERS_EMOJIS,
		}),
	},
	methods: {
		select(emoji) {
			this.$emit("input", emoji);
		},
	},
	components: {
		EditorEmojiList,
	},
};
</script>

<style>
</style>