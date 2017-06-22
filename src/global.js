import Vue from 'vue'
import Resource from 'vue-resource'

let GlobalCaller = ((name, params, callback, urlPar, failFn) => {
	let request = URLS[name];
	let urlPars = urlPar || {}; //url附带参数 如/getNode/{id} /getNode/3esd42
	let resource;
	if(params && request[1] === 'get') {
		let par = '?';
		for(var key in params) {
			par += key + '=' + params[key] + '&';
		}
		par = par.substring(0, par.length - 1);
		resource = Vue.resource(request[0] + par);
	} else {
		resource = Vue.resource(request[0]);
	}
	resource[request[1]](urlPars, params).then(response => {
		callback(response.body);
	}).catch(response => { //捕捉所有失败情况并处理
		console.log('fail callback:' + response.statusText)
	});
});

//get: {method: 'GET'},
//save: {method: 'POST'},
//query: {method: 'GET'},
//update: {method: 'PUT'},
//remove: {method: 'DELETE'},
//delete: {method: 'DELETE'}
const URLS = {
	getNodes: ['/api/getNodes{/ids}', 'get'],
	getPreviewList: ['/api/getPreviewList', 'get'],
	//获取指定數量的最新文章
	//request:{num} 文章數量
	//response:[{id,title,describe,time,type}]
	getWanderList: ['/api/getWanderList', 'get'],
	//获取所有雲游類文章 按時間排序
	//request:{}
	//response:[{id,title,describe,time}]
	getMartialList: ['/api/getMartialList', 'get'],
	//获取所有雲游類文章 按時間排序
	//request:{}
	//response:[{id,title,describe,time}]
};

export default GlobalCaller