// 免费接口 查询文档 https://gist.github.com/greatghoul/803f6e6fdf8d04b1a3479eba0a4f6bd1
// https://v1.hitokoto.cn/
import fetchs from './lib/fetch';

fetchs.interceptors.request(config => {
	config = {
		timeout: 5000,
		mode: 'cors'
		// credentials: 'include'
	};
	return config;
});

fetchs.interceptors.response(
	reponse => {
		return reponse;
	},
	err => {
		console.log(err);
	}
);


function buttunClkGet() {
	fetchs
		.get('https://v1.hitokoto.cn/', {params: {c: 'a'}})
		// .get('https://v1.hitokoto.cn/', {params: {c: 'a'}}, {timeout: 1000})
		// .get('https://v1.hitokoto.cn/', {timeout: 1000})
		.then(response => {
			document.getElementById('content').innerHTML = response.hitokoto;
		})
		.catch(e => {
			console.log('==========test catch===========');
			console.log(e);
		});
}

function btnClkPost() {
	fetchs
		.post('https://api.apiopen.top/getWangYiNews', {page:1, count:1})
		.then(response => {
			var html = '<div>';
				html += '<a href="' + response.result[0].path + '">' + response.result[0].title +'</a>';
				html += '<img src="'+ response.result[0].image +'" />';
				html += '</div>';
			document.getElementById('content2').innerHTML = html;
		})
		.catch(e => {
			console.log('==========test catch===========');
			console.log(e);
		});
}
document.getElementById('btn').onclick = function() {
	buttunClkGet();
}
document.getElementById('btn2').onclick = function() {
	btnClkPost();
}