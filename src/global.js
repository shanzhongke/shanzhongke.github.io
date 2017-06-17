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
//	let httpBody = {
//		url: request[0],
//		method: request[1]
//	};
//	//根据不同方法获取不同请求参数
//	if(request[1] === 'get') Object.assign(httpBody, {
//		params
//	});
//	else Object.assign(httpBody, {
//		body: params
//	});

	//发送http请求
//	Vue.http(httpBody).then(data => { //成功回调
//		callback(data.body);
//	}).catch(data => { //捕捉所有失败情况并处理
//		console.log('fail callback:' + data.statusText)
//	});
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
	getPreviewList: ['/api/getPreviewList', 'get']
};

export default GlobalCaller