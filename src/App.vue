<template>
	<div id="app">
		<!--<button @click="click">全屏</button>-->
		<nav class="navbar">
			<div class="content">
				<div class="nav-left">
					<a href="">
						<h4>游方居</h4>
					</a>
				</div>
				<div class="nav-right">
					<button class="nav-btn iconfont icon-menu" @click="menuActive = !menuActive"></button>
					<ul class="menu" :class="{ active: menuActive, out: !menuActive}" @blur="menuActive">
						<li>
							<a href="">雲游</a>
						</li>
						<li>
							<a href="">拳技</a>
						</li>
						<li>
							<a href="">中醫</a>
						</li>
						<li>
							<a href="">書單</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
		<header class="header" :style="headBg">
			<div class="content">
				<h1>游方居</h1>
			</div>
		</header>
		<div class="audio-container clearfix">
			<audio-player :data="audioList" :random="true" class="rf"></audio-player>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
	import './assets/css/cube.css';
	import audioList from './const/audioList'
	import audioPlayer from './components/audioPlayer';

	export default {
		name: 'app',
		data() {
			return {
				audioList,
				menuActive: false,
				headBgUrl: ['weishuifeixiong',
					'wangchuantu1', 'wangchuantu2', 'wangchuantu3', 'wangchuantu4', 'wangchuantu5'
				]
			}
		},
		computed: {
			headBg() {
				let index = Math.floor(Math.random() * this.headBgUrl.length);
				return {
					'background-image': 'url(../static/img/' + this.headBgUrl[index] + '.jpg)'
				}
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

<style lang="less">
	@font-face {
		font-family: mingTi;
		src: url('../static/font/WenYue-GuDianMingChaoTi-NC-W5.otf')
	}
	
	#app {
		font-family: mingTi;
		h1 {
			font-family: mingTi;
		}
	}
	
	.navbar {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		.content {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 10px;
		}
		a {
			display: block;
			color: #fff;
		}
	}
	
	.nav-left {
		a {
			padding: 10px;
		}
	}
	
	.nav-right {
		position: relative;
		.nav-btn {
			display: none;
			outline: none;
		}
		.menu {
			display: flex;
			a {
				padding: 15px;
				width: 14px;
				line-height: 22px;
				white-space: normal;
				transition: all .2s;
				&:hover {
					color: #000;
					background-color: gainsboro;
				}
			}
		}
	}
	
	.header {
		margin-bottom: 10px;
		background: no-repeat center;
		background-color: gray;
		background-size: cover;
		.content {
			padding: 100px 15px 80px;
			h1 {
				margin: 0 auto;
				width: 50px;
				line-height: 70px;
				font-size: 50px;
				color: #fff;
			}
		}
	}
	
	.audio-container {
		padding-right: 10px;
		margin-bottom: 10px;
	}
	
	@media only screen and (max-width: 767px) {
		.navbar .content {
			padding: 0;
		}
		.nav-right {
			.nav-btn {
				display: block;
				padding: 10px;
				color: #fff;
				border: none;
				background: none;
				font-size: 20px;
				&:hover {
					color: #D2D2D2;
				}
			}
			.menu {
				position: absolute;
				top: 35px;
				right: 10px;
				background-color: #FFFFFF;
				box-shadow: rgba(0, 0, 0, .117647) 0 1px 6px, rgba(0, 0, 0, .239216) 0 1px 4px;
				border-radius: 2px;
				transform: scale(0);
				transform-origin: top right;
				transition: transform 500ms cubic-bezier(0.23, 1, .32, 1);
				&.active {
					transform: scale(1);
					a {
						opacity: 1;
					}
				}
				&.out {
					opacity: 0;
				}
				a {
					opacity: 0;
					transition: all .2s, opacity .2s .2s;
					color: #777;
				}
			}
		}
		.header {
			.content {
				padding: 60px 15px 40px;
				h1 {
					width: 36px;
					font-size: 36px;
					line-height: 50px;
				}
			}
		}
	}
</style>