import GO from '../register'
import T from '../query'

//依据类型获取
GO('/api/getPreviewList', function(params) {
	var dataList = [];
	dataList = dataList.concat(T.getAllByAttr('travelArticles', []), T.getAllByAttr('martialArticles', []));
	dataList.sort(function(a, b) {
		return -(Date.parse(a.time) - Date.parse(b.time));
	});

	return T.fr(dataList.slice(0, 5));
});