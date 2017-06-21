<template>
	<div class="wrap">
		<div class="preview-list">
			<div class="preview-item" v-if="list.length" v-for="item in list" :key="item.type + item.id">
				<router-link :to="'/' + item.type + '/' + item.id">
					<h3>{{item.title}}</h3>
					<p class="post-describe">{{item.describe}}</p>
				</router-link>
				<p class="post-date">{{item.time}}</p>
			</div>
		</div>
		<h2 class="none" v-if="!list.length">無</h2>
	</div>
</template>

<script>
	export default {
		name: 'index',
		data: () => {
			return {
				list: []
			}
		},
		mounted() {
			let _this = this;
			GlobalCaller("getPreviewList", {
				num: 5
			}, data => {
				_this.list = data.data;
			});
		}
	}
</script>

<style lang='less' scoped>
	.preview-item {
		position: relative;
		padding-bottom: 10px;
		border-bottom: 1px solid #eee;
		margin-bottom: 20px;
		a {
			display: block;
			&:hover {
				opacity: .6;
			}
		}
		h3 {
			margin-bottom: 8px;
			color: #404040;
		}
		.post-describe {
			text-indent: 26px;
			font-size: 13px;
			font-style: italic;
			color: #a3a3a3;
		}
		.post-date {
			margin-top: 8px;
			color: #aaa;
			font-size: 16px;
			font-style: italic;
		}
		transition: all 2s;
		&:nth-of-type(2) {
			transition-delay: .2s;
		}
		&:nth-of-type(3) {
			transition-delay: .4s;
		}
		&:nth-of-type(4) {
			transition-delay: .6s;
		}
		&:nth-of-type(5) {
			transition-delay: .8s;
		}
	}
	
	.none {
		margin-top: 50px;
		text-align: center;
	}
</style>