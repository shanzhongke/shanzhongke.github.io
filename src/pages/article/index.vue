<template>
	<div class="article" v-html="html"></div>
</template>

<script>
	import { markdown } from 'markdown';

	export default {
		name: 'article',
		data: () => {
			return {
				html: ''
			}
		},
		mounted() {
			let _this = this;
			let id = _this.$route.params.id;
			let type = _this.$route.path.split('/')[1];
			GlobalCaller("getArticle", {
				id,
				type
			}, data => {
				_this.html = markdown.toHTML(data.content);
			});
		}
	}
</script>

<style>

</style>