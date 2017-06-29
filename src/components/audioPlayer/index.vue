<template>
	<div class="audio">
		<audio ref="player" :src="src" 
			@ended="ended" 
			@play="canplay"
			autoplay
		>
		</audio>
		<i class="iconfont icon-play" v-if="status == 'pause'" @click="play"></i>
		<i class="iconfont icon-pause" v-if="status == 'play'" @click="pause"></i>
		<i class="iconfont icon-next" @click="next"></i>
		<div class="text" :title="name + '-' + singer">
			<span>{{name}} - {{singer}}</span>
		</div>
		<div class="loading" v-show="loading">
			<i></i>
		</div>
	</div>
</template>

<script>
	import '../../assets/css/iconfont.css';
	/*data曲目数据格式: [{name,singer,src}]*/
	export default {
		name: "audioPlayer",
		props: {
			random: { //是否随机播放
				type: Boolean,
				default: false
			},
			data: { //曲目数据
				type: Array,
				default() {
					return [];
				}
			}
		},
		data() {
			return {
				status: '', //播放状态:play/pause
				loading: true, //音频是否处于加载状态
				index: 0, //当前播放曲目序号
				src: '', //曲目路径
				name: '', //曲目名
				singer: '' //演唱者
			}
		},
		methods: {
			play() { //播放
				this.$refs.player.play();
				this.status = 'play';
			},
			pause() { //暂停
				this.$refs.player.pause();
				this.status = 'pause';
			},
			next() { //下一首
				if(!this.data.length) return;
				let index = this.index === this.data.length - 1 ? 0 : this.index + 1;
				this.index = index;
				this.modifyAudio(index);
			},
			ended() { //当前曲目播放结束
				if(!this.data.length) return;
				let index = this.index;
				this.index = index === this.data.length - 1 ? 0 : ++index;
				this.modifyAudio(this.index);
			},
//			progress() { //音频处于加载过程中
//				this.loading = true;
//			},
			canplay() { //音频开始播放
				this.loading = false;
			},
			modifyAudio(index, autoplay) { //切换曲目
				this.loading = true;
				this.src = this.data[index].src;
				this.name = this.data[index].name;
				this.singer = this.data[index].singer;
				this.status = 'play';
			}
		},
		mounted() {
			if(!this.data.length) return;
			this.index = this.random ? Math.floor(Math.random() * this.data.length) : 0;
			this.modifyAudio(this.index);
		}
	}
</script>

<style lang="less" scoped>
	.audio {
		display: flex;
		align-items: center;
		width: 190px;
		padding: 3px 5px;
		position: relative;
		overflow: hidden;
		border-radius: 8px;
		box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
		font-size: 13px;
		.loading {
			height: 100%;
			width: 100%;
			position: absolute;
			z-index: 99;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: rgba(255,255,255, .9);
			i {
				display: block;
				width: 20px;
				height: 20px;
				animation: loading 2s linear infinite;
				transform-origin: center center;
				background: url(../../assets/img/loading.png) center no-repeat;
				background-size: 100%;
			}
		}
	}
	
	.iconfont {
		margin-right: 7px;
		font-size: 14px;
		cursor: pointer;
	}
	
	.text {
		float: right;
		width: 130px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		word-wrap: normal;
	}
	
	@keyframes loading {
		from {
			transform: rotate(0);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>