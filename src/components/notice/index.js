import Vue from 'vue'
import Noticer from './notification';

const div = document.createElement('div');
div.id = 'noticer';
div.innerHTML = '<Noticer></Noticer>';
document.body.appendChild(div);

const notification = new Vue({
	el: div,
	components: { Noticer }
}).$children[0];

let addNoticer = (noticeProps => {
	notification.add(noticeProps);
});

Vue.prototype.$Notice = {
	open: addNoticer
};