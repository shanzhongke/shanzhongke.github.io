<template>
	<div class="list">
		<ul>
			<li class="list-item" v-for="item in data">
				<router-link :to="'/' + item.type + '/' + item.id">
					<p class="title">{{item.title}}</p>
					<p class="time">{{item.time}}</p>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'list',
		props: {
			data: {
				type: Array,
				default() {
					return [];
				}
			}
		},
		data: () => {
			return {
				list: []
			}
		},
		mounted() {
		}
	}
</script>

<style lang="less" scoped>
	.list-item {
		padding-bottom: 5px;
		border-bottom: 1px solid #eee;
		margin-bottom: 10px;
		&:first-of-type {
			padding-top: 5px;
			border-top: 1px solid #eee;
		}
		.title {
			color: #404040;
		}
		.time {
			color: #aaa;
		}
		&:hover {
			opacity: .7;
		}
	}
</style>