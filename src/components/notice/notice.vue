<template>
	<transition name="notice">
		<div class="notice" :class="{hasDesc: desc}">
			<div class="notice-content" ref="content">
				<div class="notice-content-title">{{title}}</div>
				<div class="notice-content-desc">{{desc}}</div>
			</div>
			<a class="notice-close" @click="close">+</a>
		</div>
	</transition>
</template>
<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			},
			desc: {
				type: String,
				default: ''
			},
			duration: {
				type: Number,
				default: 1.5
			},
			name: {
				type: String,
				required: true
			},
			onClose: {
				type: Function
			}
		},
		data() {
			return {
				closeTimer: null
			};
		},
		methods: {
			clearCloseTimer() {
				if(this.closeTimer) {
					clearTimeout(this.closeTimer);
					this.closeTimer = null;
				}
			},
			close() {
				this.clearCloseTimer();
				this.onClose();
				this.$emit('close', this.name);
			}
		},
		mounted() {
			if(this.duration !== 0) {
				this.closeTimer = setTimeout(() => {
					this.close();
				}, this.duration * 1000);
			}
		},
		beforeDestroy() {
			this.clearCloseTimer();
		}
	};
</script>
<style lang="less" scoped>
	.notice-enter-active,
	.notice-leave-active {
		transition: all .5s;
	}
	
	.notice-enter-active {
		left: 0;
	}
	
	.notice-enter,
	.notice-leave-active {
		opacity: 0;
		left: 363px;
	}
	
	.notice {
		margin-bottom: 10px;
		padding: 16px;
		line-height: 1;
		position: relative;
		overflow: hidden;
		border-radius: 4px;
		box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
		background: #fff;
		&-close {
			position: absolute;
			right: 16px;
			top: 15px;
			transform: rotateZ(46deg);
			color: #999;
			outline: 0;
		}
		&-content {
			&-title {
				font-size: 14px;
				color: #464c5b;
				padding-right: 10px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			&-desc {
				display: none;
				font-size: 12px;
				color: #999;
				text-align: justify;
				line-height: 1.5;
			}
		}
		&.hasDesc {
			.notice-content {
				&-title {
					margin-bottom: 8px;
				}
				&-desc {
					display: block;
				}
			}
			.notice-close {
				top: 11px;
			}
		}
	}
</style>