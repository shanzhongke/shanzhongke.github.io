<template>
	<div class="audio">
		<audio ref="player" :src="src" @ended="ended" preload="auto" autoplay>
		</audio>
		<i class="iconfont icon-play" v-if="status == 'pause'" @click="play"></i>
		<i class="iconfont icon-pause" v-if="status == 'play'" @click="pause"></i>
		<i class="iconfont icon-next" @click="next"></i>
		<span>{{name}} - {{singer}}</span>
	</div>
</template>

<script>
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
				let index = this.index === this.data.length - 1 ? 0 : ++this.index;
				this.modifyAudio(index);
			},
			ended() { //当前曲目播放结束
				if(!this.data.length) return;
				let index = this.index;
				this.index = index === this.data.length - 1 ? 0 : ++index;
				this.modifyAudio(this.index);
			},
			modifyAudio(index) { //切换曲目
				this.src = './static/audio/' + this.data[index].src + '.mp3';
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

<style scoped>
	.audio {
		width: 180px;
		padding: 5px;
		position: relative;
		overflow: hidden;
		border-radius: 8px;
		box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
		font-size: 13px;
		/*font-family: SimSun,"宋体";*/
	}
	
	.iconfont {
		margin-right: 5px;
		font-size: 14px;
		cursor: pointer;
	}
</style>