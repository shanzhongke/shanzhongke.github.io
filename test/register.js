import data from './data'

export default function(url, controller, method) {
	var _url_ = method ? "^" + method + "|" + url : "^GET|" + url;
	data.URL[_url_] = controller;
}