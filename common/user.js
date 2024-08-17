/**
 * @description 读取token 返回token
 */
function getToken() {
		return uni.getStorageSync('token')
}

/**
 * @description 设置token
 */
function setToken(token) {
		uni.setStorageSync('token',token)
}

//导出
export {
  getToken,
  setToken
}