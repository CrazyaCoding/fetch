# fetch

## install

```#
npm i @shangs/fetch --save-dev
```

## useage

```javascript
import fetchs from '@shangs/fetch';
```

```javascript
let config = {
	mode: 'no-cors',
	credentials: 'same-origin',
	headers: {
		contentType: 'application/json',
		accept: 'application/json',
	}
	timeout: 5000
};
// GET
fetchs
	.get('http://localhost:3003/students', config)
	.then(response => {
		console.log(response);
	})
	.catch(e => {
		console.log(e);
	});

fetchs
	.get('http://localhost:3003/students', {params: {name: 'Lily'}}, config)
	.then(response => {
		console.log(response);
	})
	.catch(e => {
		console.log(e);
	});

// POST
fetchs
	.post(' http://localhost:3003/students', data, config)
	.then(response => {
		console.log(response);
	})
	.catch(e => {
		console.log(e);
	});
```

```javascript
// interceptors
fetchs.interceptors.request(config => {
	config = {
		timeout: 5000,
		mode: 'cors',
		credentials: 'include'
	};
	return config;
});

fetchs.interceptors.response(
	reponse => {
		return reponse;
	},
	err => {}
);
```
