import Vue from 'vue'
import App from './App'
import Resource from 'vue-resource'
import router from './router'
import $ from 'jquery'
import GlobalCaller from './global'
import '../test/sim' //开启本地模拟数据

Vue.use(Resource);
//Vue.http.options.emulateJSON = true; //true时ajax请求参数切换为formData形式
Vue.config.productionTip = true; //是否关闭生产模式下给出的提示
window.GlobalCaller = GlobalCaller;
window.$ = $;

/* eslint-disable no-new */
var vue = new Vue({
	el: '#app',
	router,
	render: h => h(App)
});
