<template>
	<audio :src="src" @ended="ended" preload="auto" controls autoplay></audio>
</template>

<script>
	/*data曲目数据格式: [{name,singer,src}]*/
	export default {
		name: "audioPlayer",
		props: {
			data: { //曲目数据
				type: Array,
				default() {
					return [];
				}
			}
		},
		data() {
			return {
				index: 0, //当前播放曲目序号
				src: '', //曲目路径
				name: '', //曲目名
				singer: '' //演唱者
			}
		},
		methods: {
			ended() { //当前曲目播放结束
				if(this.data.length) {
					let index = this.index;
					this.index = index === this.data.length - 1 ? 0 : ++index;
					this.modifyAudio(this.index);
				}
			},
			modifyAudio(index) {
				this.src = './static/audio/' + this.data[index].src + '.mp3';
				this.name = this.data[index].name;
				this.singer = this.data[index].singer;
			}
		},
		mounted() {
			if(this.data.length) this.modifyAudio(0);
		}
	}
</script>

<style>

</style>