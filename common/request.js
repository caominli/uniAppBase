
//导入基本方法
import * as base from '@/common/base.js'
//导入api路径和超时设置
import { apiUrl,timeout } from '@/config/config'
//导入用户模块
import { getToken } from '@/common/user'
/**
 * @description request 网络请求
 * @param {string} url 请求的地址
 * @param {string} method 请求类型，默认get
 * @param {object} data 请求参数
 * @param {function} success 成功后回调的方法
 * @param {function} fail 失败后回调的方法
 * @param {string} contentType 内容类型(默认application/json）)
*/

//封装的请求函数
function request(url, method, data, contentType){
	//显示加载中
	showLoading()
	//检查上传类型
	if (base.isNull(contentType))
		contentType = 'application/json'
	
	//返回Promise函数方法，
	return new Promise((resolve, reject) => {
	        uni.request({
	            method: method || 'get',
	            timeout: timeout,
				//这里因为app是模拟器，无法访问本机127.0.0.1所以需要根据条件判断和修改
				// #ifndef APP
	            url: apiUrl + url,
				// #endif
				// #ifdef APP
				url: 'http://192.168.199.119:5280' + url,
				// #endif
	            data: data,
	            header: {
	                'content-type': contentType,
	                'Authorization': getToken()
	                // 'Authorization': 'Bearer ' + getToken()
	            },
	            success: (response) => {
	                //关闭加载中
	                uni.hideLoading()
	                //取返回代码
	                const code = response.statusCode || 200;
	                if (code === 401) {
	                    //跳转到登录页
	                    console.log('开始执行跳转');
	                    uni.navigateTo({
	                        url: "/pages/user/login/index",
	                        fail: function() {
	                            console.log('跳转失败')
	                        }
	                    });
	                    console.log('执行完了跳转');
	                    reject({ statusCode: 401, message: 'Unauthorized' });
	                } else if (code === 500) {
	                    uni.showToast({
	                        title: '服务器错误，稍后再试',
	                        duration: 3000,
	                        icon: "none"
	                    });
	                    reject({ statusCode: 500, message: '服务器错误，稍后再试' });
	                } else if (code !== 200) {
	                    uni.showToast({
	                        title: response.data.msg,
	                        duration: 3000,
	                        icon: "none"
	                    });
	                    reject({ statusCode: code, message: response.data.msg });
	                } else {
	                    resolve(response.data)
	                }
	            },
	            fail: (error) => {
	                //关闭加载中
	                uni.hideLoading()
	                let message = error && error.errMsg ? error.errMsg : '未知错误'
	                if (message === 'Network Error') {
	                    message = '后端接口连接异常'
	                } else if (message.includes('timeout')) {
	                    message = '系统接口请求超时'
	                } else if (message.includes('Request failed with status code')) {
	                    const statusCode = parseInt(message.substr(message.length - 3))
	                    message = '系统接口' + statusCode + '异常'
	                }
					//弹出错误
					uni.showToast({
					    title: message,
					    duration: 3000,
					    icon: "none"
					});
	                // console.log('请求失败：', message)
	                reject(error)
	            }
	        })
	    })
	}

/**
 * @description 显示等待框,需要点击确认后关闭
 */
function showLoading() {
	uni.showLoading({
		title: '请等待',
		mask: true
	})
}

/**
 * @description 隐藏等待框,需要点击确认后关闭
 */
function hideLoading() {
	uni.hideLoading()
}




export { request }