<template>
	<div class="article">
		<h2 class="title">{{title}}</h2>
		<div class="content" v-html="html"></div>
	</div>
</template>

<script>
	import { markdown } from 'markdown';

	export default {
		name: 'article',
		data: () => {
			return {
				title: '',
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
				_this.title = data.title;
				_this.html = markdown.toHTML(data.content);
			});
		}
	}
</script>

<style lang="less">
	.article {
		.title {
			margin-bottom: 15px;
			text-align: center;
		}
		font-size: 13px;
		line-height: 18px;
		color: #737373;
		a {
			color: #0069d6;
		}
		a:hover {
			color: #0050a3;
		}
		h1,
		h2,
		h3,
		h4,
		h5,
		h6 {
			color: #404040;
			line-height: 36px;
		}
		h1 {
			margin-bottom: 18px;
			font-size: 30px;
		}
		h2 {
			font-size: 24px;
		}
		h3 {
			font-size: 18px;
		}
		h4 {
			font-size: 16px;
		}
		h5 {
			font-size: 14px;
		}
		h6 {
			font-size: 13px;
		}
		hr {
			margin: 0 0 19px;
			border: 0;
			border-bottom: 1px solid #ccc;
		}
		blockquote {
			padding: 13px 13px 21px 15px;
			margin-bottom: 18px;
			font-family: georgia, serif;
			font-style: italic;
		}
		blockquote:before {
			content: "\201C";
			font-size: 40px;
			margin-left: -10px;
			font-family: georgia, serif;
			color: #eee;
		}
		blockquote p {
			font-size: 14px;
			font-weight: 300;
			line-height: 18px;
			margin-bottom: 0;
			font-style: italic;
		}
	}
</style>