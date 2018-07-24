function _fetch(fetch_promise, timeout) {
	let abort_fn = null;
	let abort_promise = new Promise((resolve, reject) => {
		abort_fn = function() {
			reject('time out!');
		};
	});

	let aborttable_promise = Promise.race([fetch_promise, abort_promise]);

	setTimeout(function() {
		abort_fn();
	}, timeout);

	return aborttable_promise;
}

export default _fetch;
