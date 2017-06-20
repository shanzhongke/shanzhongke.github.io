<template>
	<div class="wander">
		<list :data="listData"></list>
	</div>
</template>

<script>
	import list from '../../components/list';
	
	export default {
		name: 'wander',
		data: () => {
			return {
				listData: []
			}
		},
		mounted() {
			let _this = this;
			GlobalCaller("getWanderList", {}, data => {
				_this.listData = data.data;
			});
		},
		components: {
			list
		}
	}
</script>

<style>
</style>