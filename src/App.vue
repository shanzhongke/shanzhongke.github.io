<template>
	<div id="app" :class="{ active: loadComplete}">
		<!--<button @click="click">全屏</button>-->
		<nav class="navbar">
			<div class="content">
				<div class="nav-left">
					<router-link to="/">
						<h4>游方居</h4>
					</router-link>
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
				<h1>
					<span>游</span>
					<span>方</span>
					<span>居</span>
				</h1>
			</div>
		</header>
		<div class="audio-container clearfix">
			<audio-player :data="songList" :random="true" class="rf"></audio-player>
		</div>
		<div class="container">
			<router-view></router-view>
		</div>
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
				loadComplete: false,
				headBgUrl: [
					'weishuifeixiong',
					'wangchuantu1',
					'wangchuantu2',
					'wangchuantu3',
					'wangchuantu4',
					'wangchuantu5'
				]
			}
		},
		computed: {
			songList() { //背景音乐路径处理
				let list = this.audioList.map((el) => {
					el.src = '/static/audio/' + el.src + '.mp3';
					return el;
				});
				return list;
			},
			headBg() {
				let index = Math.floor(Math.random() * this.headBgUrl.length);
				return {
					'background-image': 'url(/static/img/' + this.headBgUrl[index] + '.jpg)'
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
		},
		mounted() {
			let _this = this;
			setTimeout(() => {
				_this.loadComplete = true;
			}, 1000);
		}
	}
</script>

<style lang="less">
	@font-face {
		font-family: mingTi;
		src: url('/static/fonts/WenYue-GuDianMingChaoTi-NC-W5.otf')
	}
	
	#app {
		line-height: 1.5;
		font-family: mingTi;
		h1 {
			font-family: mingTi;
		}
		&.active {
			.nav-left {
				opacity: 1;
				left: 0;
			}
			.nav-right {
				opacity: 1;
				top: 0;
			}
			.header h1 span {
				opacity: 1;
				transform: scale(1);
			}
		}
	}
	
	.navbar {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		.content {
			display: flex;
			align-items: baseline;
			justify-content: space-between;
			padding: 0 10px;
		}
		a {
			display: block;
			color: #fff;
		}
	}
	
	.nav-left {
		left: -75px;
		opacity: 0;
		position: relative;
		transition: left 1s, opacity 2s;
		a {
			padding: 10px;
		}
	}
	
	.nav-right {
		top: -75px;
		opacity: 0;
		position: relative;
		transition: top 1s, opacity 2s;
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
				span {
					display: block;
					transform: scale(0);
					opacity: 0;
					transition: transform 1.2s .6s, opacity 2s .6s;
					&:nth-of-type(2) {
						transition-delay: 1.1s;
					}
					&:nth-of-type(3) {
						transition-delay: 1.6s;
					}
				}
			}
		}
	}
	
	.audio-container {
		padding-right: 10px;
		margin-bottom: 10px;
	}
	
	.container {
		padding-right: 15px;
		padding-left: 15px;
		margin-right: auto;
		margin-left: auto;
	}
	
	@media (min-width: 768px) {
		.container {
			width: 750px;
		}
	}
	
	@media (min-width: 992px) {
		.container {
			width: 970px;
		}
	}
	
	@media (min-width: 1200px) {
		.container {
			width: 1170px;
		}
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
						&:hover {
							border-radius: 2px;
						}
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