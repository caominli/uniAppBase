import {
	ref
} from 'vue';

/**
 * 所有封装包的基础方法
 */
// import * as md5 from 'js-md5'
// /**
//  * @description 返回md5加密后的结果
//  * @param {string} val 要加密的数据
//  */
// //md5加密
// function toMD5(val) {
// 	return md5(val)
// }

/**
 * @description 判断是否空值,如果是空值,则返回true 
 * @param {string} val 要判断的数据
 */
function isNull(val) {
	var isNull = false
	if (typeof(val) === undefined)
		isNull = true
	if (val == null)
		isNull = true
	if (val == '')
		isNull = true
	return isNull
}



// /**
//  * @description 一次检查多个参数是否非空
//  * <br/>有一个为空则返回false
//  * <br/>返回false时,显示为空的错误提醒
//  * @param {array} arr 要检查的数据描述
//  * <br/>参数格式: [{val:'xxx',msg:'xxx'},...]
//  */
// function checkArrayNotNull(arr) {
// 	var isNotNull = true
// 	if (typeof(arr) === 'object') {
// 		for (let item of arr) {
// 			if (isNull(item.val)) {
// 				isNotNull = false
// 				alert.showError(item.msg)
// 				break
// 			}
// 		}
// 	} else {
// 		isNotNull = false
// 		alert.showError('参数不合法')
// 	}
// 	return isNotNull
// }

/**
 * @description 检查注册手机号是否合法
 * <br/>this.$Regex_phonenumber -> this.sjuRegex.phoneNumber
 * @param {string} val 要检查的值
 */
function isPhone(val) {
	let regex_s = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
	if (regex_s.test(val)) {
		return true
	} else {
		return false
	}
}


/**
 * @description 检查Email地址是否合法
 * <br/>this.$Regex_Email -> this.sjuRegex.Email
 * @param {Number} val 要检查的值
 */
function isEmail(str) {
	let regex_s = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
	if (regex_s.test(str)) {
		return true
	} else {
		return false
	}
}

/**
 * @description 防抖函数，对于持续性请求操作节流,触发函数后500毫秒内没有再触发，则执行传入函数
 * @param {function} fn 要执行的函数
 * @param {Number} delay 等待时间
 * import { useDebounce } from '@/common/base.js';
 * //假设需要执行的函数名为'input'
 * const { debouncedFunction: input } = useDebounce(
 *  () => {  
 *    console.log('触发了input函数');  
 *  },  
 *  500 // 延迟500毫秒  
 *);
 */
const useDebounce = (fn, delay = 500) => {
	// 创建一个ref来存储定时器ID  
	const timer = ref(null);

	const debouncedFunction = (...args) => {
		// 如果存在定时器，则清除它  
		if (timer.value) {
			clearTimeout(timer.value);
		}

		// 设置新的定时器  
		timer.value = setTimeout(() => {
			fn(...args); // 使用扩展运算符传递所有参数  
		}, delay);
	};
	// 返回防抖函数
	return {
		debouncedFunction
	};
};

/**
 * @description 防抖误触函数，按钮在点击后1.5秒内无法再点击
 * @param {function} fn 要执行的函数
 * @param {Number} delay 等待时间
 * import { doubleClick } from '@/common/base.js';
 * //假设需要为toRepassword函数增加防超点
 *	const toRepassword = doubleClick(
 *  () => {  
 *		console.log('执行了一次重置密码');  
 * },1500);
 */
const doubleClick = (fn, delay = 1500) => {
	// 创建一个响应式引用来跟踪是否在冷却期
	const isCoolingDown = ref(false);

	// 定义一个包装函数，它将处理防误触逻辑
	return (...args) => {
		if (isCoolingDown.value) {
			// 如果在冷却期，则不执行fn
			console.log('还未冷却');
			return;
		}

		// 标记为冷却中
		isCoolingDown.value = true;

		// 调用原始函数，并传递所有参数
		fn(...args);
		// 设置定时器，在指定时间后重置冷却状态
		setTimeout(() => {
			isCoolingDown.value = false;
		}, delay);
	};
};


export {
	isNull,
	isEmail,
	isPhone,
	useDebounce,
	doubleClick
}