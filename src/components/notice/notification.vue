<template>
	<div class="noticer">
		<Notice v-for="notice in notices" 
				:key="notice.name" 
				:duration="notice.duration" 
				:title="notice.title" 
				:desc="notice.desc" 
				:name="notice.name" 
				:on-close="notice.onClose" 
				@close="close">
		</Notice>
	</div>
</template>
<script>
	import Notice from './notice';

	let seed = 0;
	const now = Date.now();

	function getUuid() {
		return 'notification_' + now + '_' + (seed++);
	}

	export default {
		components: { Notice },
		data() {
			return {
				notices: []
			};
		},
		methods: {
			add(notice) {
				const defaultDuration = 1.5;
				const name = getUuid();
				const title = notice.title || '';
			    const desc = notice.desc || '';
			    const onClose = notice.onClose || (() => {});
			    const duration = (notice.duration === 0) ? 0 : notice.duration || defaultDuration;

				let _notice = {
					title,
					desc,
					duration,
					name,
					onClose
				};

				this.notices.push(_notice);
			},
			close(name) {
				const notices = this.notices;

				for(let i = 0; i < notices.length; i++) {
					if(notices[i].name === name) {
						this.notices.splice(i, 1);
						break;
					}
				}
			}
		}
	};
</script>
<style lang="less" scoped>
	* {
		box-sizing: border-box;
	}
	.noticer {
		width: 335px;
		margin-right: 24px;
		position: fixed;
		top: 24px;
		right: 0px;
		z-index: 1010;
	}
</style>