import GO from '../register'
import T from '../query'

//获取指定數量的最新文章
GO('/api/getPreviewList', function(params) {
	var dataList = [];
	dataList = dataList.concat(T.getAllByAttr('wanderArticles', []), T.getAllByAttr('martialArticles', []));
	dataList.sort(function(a, b) {
		return -(Date.parse(a.time) - Date.parse(b.time));
	});
	
	return T.fr(dataList.slice(0, params.num));
});

//获取雲游類文章列表 按時間排序
GO('/api/getWanderList', function(params) {
	return getList('wanderArticles');
});


//获取拳技類文章列表 按時間排序
GO('/api/getMartialList', function(params) {
	return getList('martialArticles');
});

//获取指定文章具體内容
GO('/api/getArticle', function(params) {
	var type = params.type;
	var id = params.id;
	var data = T.getByAttr(type + 'Articles', {
		type: type,
		id: id
	});
	var content = require('./' + type + '/' + data.title + '.md');
	data.content = content;
	return data;
});

function getList(type) {
	var dataList = T.getAllByAttr(type, []).concat();
	dataList.sort(function(a, b) {
		return -(Date.parse(a.time) - Date.parse(b.time));
	});
	
	return T.fr(dataList.map(function(el) {
		delete el.describe;
		return el;
	}));
}
