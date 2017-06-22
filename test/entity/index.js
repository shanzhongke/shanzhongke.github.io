import GO from '../register'
import T from '../query'

//获取指定數量的最新文章
GO('/api/getPreviewList', function(params) {
	var dataList = [];
	dataList = dataList.concat(T.getAllByAttr('wanderArticles', []), T.getAllByAttr('martialArticles', []));
	dataList.sort(function(a, b) {
		return -(Date.parse(a.time) - Date.parse(b.time));
	});
	
	return T.fr(dataList.slice(0, params.num).map(function(el) {
		delete el.content;
		return el;
	}));
});

//获取所有雲游類文章 按時間排序
GO('/api/getWanderList', function(params) {
	return getList('wanderArticles');
});

//获取所有拳技類文章 按時間排序
GO('/api/getMartialList', function(params) {
	return getList('martialArticles');
});

function getList(type) {
	var dataList = T.getAllByAttr(type, []).concat();
	dataList.sort(function(a, b) {
		return -(Date.parse(a.time) - Date.parse(b.time));
	});
	
	return T.fr(dataList.map(function(el) {
		delete el.content;
		delete el.describe;
		return el;
	}));
}
