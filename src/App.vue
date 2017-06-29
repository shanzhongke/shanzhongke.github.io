<template>
	<div id="app" :class="{ active: loadComplete}" @click="menuActive = false">
		<!--<button @click="click">全屏</button>-->
		<transition name="load">
			<div class="loading" v-if="!loadComplete">
				<div class="loading-logo">
					<div class="row">
						<div class="logo"></div>
					</div>
					<div class="row">
						<div class="logo"></div>
						<div class="circle"></div>
						<div class="logo"></div>
					</div>
					<div class="row">
						<div class="logo"></div>
					</div>
				</div>
			</div>
		</transition>
		<nav class="navbar">
			<transition name="nav" appear>
				<div class="content" v-if="loadComplete">
					<div class="nav-left">
						<router-link to="/">
							<h4>游方居</h4>
						</router-link>
					</div>
					<div class="nav-right">
						<button id="nav-btn" 
							class="nav-btn iconfont icon-menu" 
							@click.stop="menuActive = !menuActive">
						</button>
						<ul class="menu" 
							tabindex="0"
							ref="menu"
							:class="{ active: menuActive, out: !menuActive}" 
						>
							<li>
								<router-link to="/wander">雲游</router-link>
							</li>
							<li>
								<router-link to="/martial">拳技</router-link>
							</li>
							<!--<li>
								<router-link to="/">中醫</router-link>
							</li>-->
							<!--<li>
								<router-link to="/">書單</router-link>
							</li>-->
						</ul>
					</div>
				</div>
			</transition>
		</nav>
		<header class="header" :style="headBg">
			<transition-group class="content" tag="div" name="header" appear 
				appear-class="header-appear"
				>
				<h1 v-for="(value, key) in moduleName" 
					v-show="key === navName"
					:key="key"
				>
					<span v-for="item in value">{{item}}</span>
				</h1>
			</transition-group>
			<h1 ref="wisdom" :class="['wisdom', {active: wisdomStatus}]">
				{{wisdomName}}
			</h1>
		</header>
		<div class="container">
			<div class="audio-container clearfix">
				<audio-player 
					v-if="loadComplete" 
					ref="audio" 
					:data="songList" 
					:random="true" 
					class="rf"
				>
				</audio-player>
			</div>
			<transition name="switch" 
				v-on:before-leave="pageSwitch = true;"
				v-on:after-enter="pageSwitch = false;"
			>
				<router-view @video="videoPlay"></router-view>
			</transition>
			<footer :class="{out: pageSwitch}">
				<div class="links">
					<h5>推薦站點</h5>
					<ul>
						<li v-for="item in links">
							<a :href="item.url" target="_blank">{{item.name}}</a>
						</li>
					</ul>
				</div>
				<div class="copy">
					<p>
                    	Copyright © 游方 2017 <br />
                    	Email: fengshicanxue@hotmail.com | 
                    	<iframe
                    		v-if="loadComplete"
						    style="margin-left: 2px; margin-bottom:-5px;"
						    frameborder="0" scrolling="0" width="91px" height="20px"
						    src="https://ghbtns.com/github-btn.html?user=shanzhongke&repo=shanzhongke.github.io&type=star&count=true" >
						</iframe>
					</p>
				</div>
			</footer>
		</div>
	</div>
</template>

<script>
	import './assets/css/cube.css';
	import audioList from './const/audioList'
	import wisdoms from './const/wisdom'
	import audioPlayer from './components/audioPlayer';
	import attachFastClick from "fastclick";
	new attachFastClick(document.body);
	
	export default {
		name: 'app',
		data() {
			return {
				audioList,
				menuActive: false,
				loadComplete: false,
				menuCancel: false, //標識小屏幕右上角導航菜單失焦事件是否發生
				headBgUrl: [ //头部背景图片路径
					'weishuifeixiong',
					'wangchuantu1',
					'wangchuantu2',
					'wangchuantu3',
					'wangchuantu4',
					'wangchuantu5'
				],
				moduleName: {
					index: ['游', '方', '居'],
					wander: ['雲', '游', '篇'],
					martial: ['拳', '技', '篇']
				},
				links: [
					{name: '書格', url: 'https://shuge.org/'},
					{name: '中國大學(慕課)', url: 'http://www.icourse163.org/'},
					{name: '道教百科', url: 'http://zh.daoinfo.org/'},
					{name: '邱祖百科', url: 'http://www.qiuchuji.org/'},
					{name: '中華珍寶館', url: 'http://www.ltfc.net/'}
				],
				wisdomStatus: false,
				pageSwitch: false //页面是否切换
			}
		},
		computed: {
			wisdomName() {
				if(this.navName === 'index') return '';
				let i = Math.floor(Math.random() * wisdoms[this.navName].length);
				let name = wisdoms[this.navName][i];
				return name;
			},
			navName() {
				let name = this.$route.path.split('/')[1];
				if(name === '') return 'index';
				return name;
			},
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
		watch: {
			navName(newVal) {
				this.wisdomStatus = false;
				setTimeout(() => {
					this.wisdomStatus = true;
				},200);
			}
		},
		methods: {
			videoPlay() {
				this.$refs.audio.$refs.player.pause();
			},
			click() {
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
			window.onload = (() => {
				setTimeout(() => {
					_this.wisdomStatus = true;
				}, 200);
				_this.loadComplete = true;
			});
		}
	}
</script>

<style lang="less">
	@font-face {
		font-family: mingTi;
		src: url('/static/fonts/WenYue-GuDianMingChaoTi-NC-W5.ttf')
	}
	
	#app {
		line-height: 1.5;
		font-family: mingTi;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		h1 {
			font-family: mingTi;
		}
		.preview-item{
			right: 100%;
			opacity: 0;
		}
		&.active {
			.preview-item{
				right: 0;
				opacity: 1;
			}
		}
	}
	
	.loading{
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 999;
		background: #ecdec5 repeat;
	}
	
	.loading-logo{
		width: 300px;
		height: 300px;
		.row {
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.row:nth-of-type(2) {
		  	justify-content: space-between;
		}
		.circle{
			width: 60px;
			height: 60px;
			animation: loading 2s linear infinite;
			background: url(assets/img/loading.png) center no-repeat;
			background-size: 100%;
		}
		.logo {
			width: 100px;
			height: 100px;
			border-radius: 50%;
			background: url(./assets/img/xuanwu.png) center no-repeat;
			background-size: cover;
			/*animation: loading 4s linear infinite;*/
		}
		.row:nth-of-type(2) .logo {
			background-image: url(./assets/img/baihu.png);
			&:nth-child(3) {
				background-image: url(./assets/img/qinglong.png);
			}
		}
		.row:nth-of-type(3) .logo{
			background-image: url(./assets/img/zhuque.png);
		}
	}
	
	@keyframes loading{
		from{
			transform: rotate(0);
		}
		to{
			transform: rotate(360deg);
		}
	}
	
	.load-leave-to {
		opacity: 0;
	}
	
	.load-leave-active {
		transition: opacity .5s;
	}
	
	.navbar {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
	    z-index: 99;
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
		position: relative;
		a {
			padding: 10px;
		}
		&:hover {
			transform: scale(1.05);
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
	
	.nav-enter{
		.nav-left {
			left: -75px;
			opacity: 0;
		}
		.nav-right {
			top: -75px;
			opacity: 0;
		}
	}
	.nav-enter-active {
		transition: left 1s;
		.nav-left {
			transition: left 1s, opacity 2s;
		}
		.nav-right {
			transition: top 1s, opacity 2s;
		}
	}
	.nav-enter-to {
		.nav-left {
			opacity: 1;
			left: 0;
		}
		.nav-right {
			opacity: 1;
			top: 0;
		}
	}
	
	.header {
		margin-bottom: 10px;
		position: relative;
		background: no-repeat center;
		background-color: gray;
		background-size: cover;
		.content {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 400px;
			padding: 80px 15px 90px;
			h1 {
				writing-mode: vertical-rl;
				font-size: 50px;
				color: #fff;
				span {
					display: inline-block;
					margin: 10px 0;
				}
			}
		}
		.wisdom{
			position: absolute;
			opacity: 0;
			left: 20px;
			bottom: 20px;
			max-height: 200px;
			writing-mode: vertical-rl;
		    letter-spacing: 2px;
			color: #fff;
			font-size: 16px;
			&.active {
				opacity: .6;
				transition: opacity 2s 1s;
			}
		}
	}
	
	.header-appear {
		opacity: 0;
		span{
			opacity: 0;
			transform: translateY(100%);
		}
	}
	.header-enter{
		transform: translateX(50%);
		opacity: 0;
	}
	.header-enter-active {
		transition: transform 1s .3s, opacity 1.3s .3s;
		span{
			transition: transform 1s .3s, opacity 1.3s .3s;
			&:nth-of-type(2) {
				transition-delay: .5s;
			}
			&:nth-of-type(3) {
				transition-delay: .7s;
			}
		}
	}
	.header-leave-active {
		transition: all .3s;
	}
	.header-leave-to {
		transform: translateX(-50%);
		opacity: 0;
	}
	
	.audio-container {
		margin-bottom: 15px;
	}
	
	.container {
		padding-right: 15px;
		padding-left: 15px;
		margin-right: auto;
		margin-left: auto;
		position: relative;
	}
	
	footer {
		margin: 20px 0 30px;
		&.out {
			position: fixed;
			top: 100%;
		}
	}
	
	.links {
		    padding-bottom: 20px;
    		border-bottom: 1px solid #eee;
		h5 {
			margin-bottom: 10px;
		}
		ul {
			display: flex;
		}
		li {
			padding: 0 7px;
			a {
				color: #bfbfbf;
				&:hover {
					color: #0085a1;
					text-decoration: underline;
				}
			}
		}
	}
	
	.copy {
		margin-top: 30px;
		text-align: center;
		a {
			color: #000;
		}
	}
	
	.switch-enter {
		transform: translateX(103%);
	}
	.switch-leave, .switch-enter-to {
		transform: translateX(0);
	}
	.switch-enter-active{
		position: absolute;
		top: 42px;
		left: 15px;
		right: 15px;
	}
	.switch-leave-active, 
	.switch-enter-active {
		transition: all 1.3s;
	}
	.switch-leave-to {
		transform: translateX(-103%);
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
				height: 250px;
				padding: 60px 15px 40px;
				h1 {
					font-size: 36px;
					line-height: 50px;
					span{
						margin: 7px 0;
					}
				}
			}
			.wisdom {
				left: 15px;
				bottom: 10px;
				max-height: 150px;
				font-size: 14px;
			}
		}
	}
	
	::-webkit-scrollbar{
		width: 0px;
	}
</style>