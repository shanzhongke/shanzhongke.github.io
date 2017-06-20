<template>
	<div class="list">
		<ul>
			<li class="list-item" v-for="item in data">
				<router-link :to="'/' + item.type + '/' + item.id">
					<p>{{item.title}}</p>
					<p>{{item.time}}</p>
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
	}
</style>