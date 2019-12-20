import Request from './request'
import $api from '@/common/common.js'

const http = new Request()

http.setConfig((config) => { /* 设置全局配置 */
	// config.baseUrl = 'http://task.com/plugin/task/index/api/index.html'
    config.baseUrl = 'https://task.zhengdui.com/api.html'
	config.dataType = 'json'
	config.responseType = 'json'
	return config
})

http.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
	var res = {}
	if(config.name === 'file') {
		res.data = config.formData || {}
	}else{
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
		res.data = config.data || {}
	}
	res.api  = config.url
	res = JSON.stringify(res)
	var data = {
		data: res
	}
	if (res) {
		data.data = $api.aes(res)
	}
	if(config.name === 'file') {
		config.formData = data
	}else{
		config.data = data
	}
    config.url  = ''
    return config
})

http.interceptor.response((response) => { /* 请求之后拦截器 */
	var data = response.data;
    var res = $api.getJSON(data)
	if (false === res) {
        if (typeof data === 'string') {
            data = $api.aes(data, true)
            if (data != '') {
                data = JSON.parse(data);
            }
        }
	} else {
        data = res;
	}
	response.data = data
	return response
}, (response) => {
	return response
})

export default http
