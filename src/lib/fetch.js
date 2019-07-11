import _fetch from './timeout_fetch';
import qs from 'qs';

var config_request = {
	mode: 'no-cors',
	credentials: 'same-origin',
	// contentType: 'application/json',
	// accept: 'application/json',
	timeout: 5000,
	headers: {
		// contentType: 'application/json',
		// accept: 'application/json',
	}
};

/**
 * request_error_fn = function() {} 稍后在加
 */
var request_fn = function() {};
function interceptors_request(fn = function() {}) {
	try {
		request_fn = function() {
			if (fn.toString() === 'function () {}') {
				return false;
			}
			config_request = Object.assign(config_request, fn(config_request));
		};
	} catch (e) {
		console.log(e);
	}
}

var response_fn = function() {},
	response_error_fn = function() {};
function interceptors_response(fn = function() {}, errfn = function() {}) {
	try {
		response_fn = function(response) {
			if (fn.toString() === 'function () {}') {
				return response;
			}
			return fn(response);
		};
		response_error_fn = function(err) {
			if (errfn.toString() === 'function () {}') {
				return err;
			}
			errfn(err);
		};
	} catch (e) {
		console.log(e);
	}
}

function get(url, data, config) {
	request_fn();

	let {formUrl, formConfig} = formGetArgs({url, data, config});
	config = Object.assign(config_request, formConfig);

	return _fetch(
		fetch(formUrl, {
			method: 'GET',
			mode: config.mode,
			credentials: config.credentials,
			headers: config.headers
		}),
		config.timeout
	)
		.then(checkoutStatus)
		.then(parseJson)
		.then(
			(data) => {
				let handle_data = null;
				try {
					handle_data = response_fn(data) || data;
				} catch (e) {
					console.log(e);
				}

				return handle_data;
			},
			(err) => {
				response_error_fn(err);
				throw new Error(err);
			}
		);
}

function post(url, data, config) {
	request_fn();
	config = Object.assign(config_request, config);
	return _fetch(
		fetch(url, {
			headers: config.headers,
			mode: config.mode,
			method: 'POST',
			credentials: config.credentials,
			body: qs.stringify(data)
		}),
		config.timeout
	)
		.then((response) => response.json())
		.then(
			(data) => {
				let handle_data = null;
				try {
					handle_data = response_fn(data) || data;
				} catch (e) {
					console.log(e);
				}
				return handle_data;
			},
			(err) => {
				response_error_fn(err);
				throw new Error(err);
			}
		);
}

function checkoutStatus(response) {
	let code = response.status,
		error = null;
	if (response.ok === true && ((code >= 200 && code < 300) || code === 304)) {
		return response;
	}
	error = new Error(response.statusText);
	error.reponse = response;
	throw error;
}
function parseJson(reponse) {
	return reponse.json();
}

/**
 * 格式化get函数的参数
 * @param {*} url 
 * @param {*} data 参数 
 * @param {*} config 配置 
 */
function formGetArgs({url, data={}, config={}}) {
	let { params } = data;
	if (params && Object.keys(params).length > 0) {
		url += '?';
		Object.keys(params).map(key => (url += key + '=' + params[key] + '&'));
		url.slice(0, -1); // 取走最后一位&
	} else {
		config = data;
	}

	return {
		formUrl: url,
		formConfig: config
	}
}

export default {
	get,
	post,
	interceptors: {
		request: interceptors_request,
		response: interceptors_response
	}
};
