//拦截网络请求 模拟数据返回

import Vue from 'vue'
import Resource from 'vue-resource'
import './entity/text'
import data from './data'

Vue.use(Resource);

let interceptor = (() => {
	Vue.http.interceptors.push(((request, next) => {
		let params = request.body;
		let res = {};
		let fn = data.URL['^' + request.method + '|' + request.url];
		if(fn) res = fn(params);
		else console.log('不存在该url或method: ' + '^' + request.method + '|' + request.url);

		// stop and return response 拦截并返回模拟数据
		next(request.respondWith(res, {
			status: 200
		}));
	}));
});

interceptor();
