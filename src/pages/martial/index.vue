<template>
	<div class="martial">
		<list :data="listData"></list>
	</div>
</template>

<script>
	import list from '../../components/list';
	
	export default {
		name: 'martial',
		data: () => {
			return {
				listData: []
			}
		},
		mounted() {
			let _this = this;
			GlobalCaller("getMartialList", {}, data => {
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