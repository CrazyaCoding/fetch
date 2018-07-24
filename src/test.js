import fetchs from './fetch.js';

fetchs.interceptors.request(config => {
	config = {
		timeout: 2,
		mode: 'cors',
		credentials: 'include'
	};
	return config;
});

fetchs.interceptors.response(reponse => {
	console.log('==========interceptors response===========');
	return reponse;
});

/* fetchs
	.get('http://localhost:3003/students')
	.then(response => {
		console.log('========== success ======');
		console.log(response);
	})
	.catch(e => {
		console.log('==========test catch===========');
		console.log(e);
	}); */

fetchs
	.post(' http://localhost:3003/students')
	.then(response => {
		console.log('========== success ======');
		console.log(response);
	})
	.catch(e => {
		console.log(e);
	});
