import Vue from 'vue'
import App from './App'
import Resource from 'vue-resource'
import router from './router'
import GlobalCaller from '../global'
import '../test/sim'

Vue.use(Resource);
Vue.config.productionTip = false; //是否关闭生产模式下给出的提示

/* eslint-disable no-new */
var vue = new Vue({
	el: '#app',
	router,
	render: h => h(App)
});

GlobalCaller("getNodes", { a: 0 }, data => {
	console.log(data.a);
});