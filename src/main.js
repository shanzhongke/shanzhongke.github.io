import Vue from 'vue'
import App from './App'
import Resource from 'vue-resource'
import router from './router'
import GlobalCaller from './global'
import '../test/sim'

Vue.use(Resource);
//Vue.http.options.emulateJSON = true; //true时ajax请求参数切换为formData形式
Vue.config.productionTip = false; //是否关闭生产模式下给出的提示

/* eslint-disable no-new */
var vue = new Vue({
	el: '#app',
	router,
	render: h => h(App)
});

GlobalCaller("getNodes", { a: '123' }, data => {
	console.log(data.a);
});