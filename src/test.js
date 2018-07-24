import fetchs from './fetch.js';

fetchs.interceptors.request(config => {
	config = {
		timeout: 5000,
		mode: 'cors',
		credentials: 'include'
	};
	console.log('==========interceptors request===========');
	console.log(config);
	return config;
});

fetchs.interceptors.response(reponse => {
	console.log('==========interceptors response===========');
	console.log(reponse);
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
		console.log('==========test catch===========');
		console.log(e);
	});
