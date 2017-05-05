<template>
	<div id="app">
		<img src="./assets/logo.png">
		<button @click="click">全屏</button>
		<router-view></router-view>
		<audio-player :data="audioList"></audio-player>
	</div>
</template>

<script>
	import audioList from '../static/const/audioList'
	import audioPlayer from './components/audioPlayer';

	export default {
		name: 'app',
		data: () => {
			return {
				audioList
			}
		},
		methods: {
			click: () => {
				function launchFullscreen(element) {
					if(element.requestFullscreen) {
						element.requestFullscreen();
					} else if(element.mozRequestFullScreen) {
						element.mozRequestFullScreen();
					} else if(element.msRequestFullscreen) {
						element.msRequestFullscreen();
					} else if(element.webkitRequestFullscreen) {
						element.webkitRequestFullScreen();
					}
				}

				launchFullscreen(document.documentElement);
			}
		},
		components: {
			audioPlayer
		}
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
</style>