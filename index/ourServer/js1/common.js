var Root_Request_Url = "http://112.125.95.124:8888/api/app/"; //接口地址
var img_Url = "http://112.125.95.124:8888/api/app/upload_image"; //上传图片地址
var app_type = 'android'
var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJiYmlibSIsImF1ZCI6ImJiaWJtIiwiaWF0IjoxNTk0NjIzNzgzLCJuYmYiOjE1OTQ2MjM3ODMsImV4cCI6MTU5NTIyODU4MywicGFyYW1zIjp7ImN1c3RvbWVyX2lkIjo1LCJub19zbiI6Ik5PMDAwMDAwMDAwNTAwNSIsIm1vYmlsZSI6IjEzMTEyMzQ1Njc4Iiwibmlja25hbWUiOiJcdTc1MzBcdTkxY2VcdTVmNzFcdTUwY2ZfdlcyclNQIiwiYXZhdGFyIjoibG9nb1wvYXZhdGFyLnBuZyIsImljX3R5cGUiOjB9fQ.dbVNr1gHgj89XyG7tvEIOnlvhH3ST5VeD3pnPwQzo4o'


var Ajax = (function() {
	var sendRequest = function(options) {
		app_type = options.app_type || 'android'
		token = options.token
		// console.log(options)
		var data = {};
		data.method = options.method;
		data = options.data;
		var timestamp = (new Date().getTime()).toString()
		// config.headers['app-type'] = 'web'
		// config.headers['timestamp'] = timestamp
		// const token = localStorage.getItem('token')
		// token && (config.headers['access-token'] = token)
		// 使请求参数有序排列
		// if (config.method === 'post' ) {
		var params = {}
		
		if (!options.data) {
			// for (let key in config.params) {
			// 	if (typeof(config.params[key]) === 'string' || typeof(config.params[key]) === 'number') {
			// 		if (config.params[key] !== '' || config.params[key]) {
			// 			params[key] = config.params[key]
			// 		}
			// 	}
			// }
		} else {
			for (let key in options.data) {
				if (typeof(options.data[key]) === 'string' || typeof(options.data[key]) === 'number') {
					if (options.data[key] !== '' || options.data[key]) {
						params[key] = options.data[key]
					}
				}
			}
		}
		
		let param = params
		param.app_type = app_type
		param.timestamp = timestamp
		var newkey = Object.keys(param).sort()
		// 先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
		var newObj = {} // 创建一个新的对象，用于存放排好序的键值对
		for (var i = 0; i < newkey.length; i++) { // 遍历newkey数组
			newObj[newkey[i]] = param[newkey[i]] // 向新创建的对象中按照排好的顺序依次增加键值对
		}
		// 签名算法
		let str = ''
		Object.keys(newObj).map((key, item) => {
			str = str + key + '=' + newObj[key] + '&'
		})

		let stringSignTemp = str + 'secret_key=h6sB45z5ADsYYn4XuDF5TK6WyqUh1dHf'
		let sign = md5(stringSignTemp).toUpperCase()
		console.log(stringSignTemp)
		console.log(sign)
		// config.headers['sign'] = sign

		// data = JSON.stringify(options.data);
		// data.token = "";
		// 默认参数
		
		console.log(token)
		
		$.ajax({
			url:Root_Request_Url + options.api,
			data:data,
			type:options.type || "GET",
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'access-token':token,
				'sign': sign,
				'timestamp': timestamp,
				'app-type':app_type
			},
			success: function(data) {
				if (options.success) {
					options.success(data);
				}
			},
		})
	}

	return {
		get: function(options) {
			return sendRequest(options);
		},
		post: function(options) {
			options.type = "POST";
			return sendRequest(options);
		},
		ajax: function(options) {
			return sendRequest(options);
		}
	};
})();



(function(doc, win) {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function() {
			var clientWidth = docEl.clientWidth;
			if (!clientWidth) return;
			if (clientWidth >= 720) {
				docEl.style.fontSize = '100px';
			} else {
				docEl.style.fontSize = 100 * (clientWidth / 720) + 'px';
			}
		};

	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
