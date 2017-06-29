<template>
	<div class="article">
		<h2 class="title">{{title}}</h2>
		<h5 class="describe">{{describe}}</h5>
		<div class="content" v-html="html"></div>
		<video controls v-if="video" @play="play">
			<source :src="videoSrc" type="video/mp4">
			浏覽器不支持 video
		</video>
	</div>
</template>

<script>
	import { markdown } from 'markdown';

	export default {
		name: 'article',
		data: () => {
			return {
				title: '',
				describe: '',
				html: '',
				video: false,
				videoSrc: ''
			}
		},
		methods: {
			play() {
				this.$emit('video');
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
				_this.describe = data.describe;
				_this.html = markdown.toHTML(data.content);
				if(data.video) {
					_this.video = true;
					_this.videoSrc = '../../static/' + data.video;
				}
			});
		}
	}
</script>

<style lang="less">
	.article {
		padding-bottom: 20px;
		border-bottom: 1px solid #eee;
		font-size: 13px;
		line-height: 18px;
		color: #737373;
		.title,
		.describe {
			text-align: center;
		}
		.describe {
			font-style: italic;
			color: #a3a3a3;
		}
		video {
			display: block;
			width: 100%;
			margin: 20px auto 0;
			max-width: 665px;
		}
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