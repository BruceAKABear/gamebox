/**
 * 保存用户token
 */
const saveUserToken = (userToken) => {
	// #ifdef H5
	sessionStorage.setItem('userToken', userToken)
	// #endif
	// #ifdef APP-PLUS
	uni.setStorageSync('userToken', userToken);
	// #endif
}

/**
 * 获取用户token
 */
const getUserToken = () => {
	// #ifdef H5
	return sessionStorage.getItem('userToken')
	// #endif
	// #ifdef APP-PLUS
	return uni.getStorageSync('userToken');
	// #endif
}

/**
 * 保存用户信息
 */
const saveUserInfo = (userInfo) => {
	// #ifdef H5
	sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
	// #endif
	// #ifdef APP-PLUS
	uni.setStorageSync('userInfo', userInfo);
	// #endif
}
/**
 * 获取用户信息
 */
const getUserInfo = () => {
	// #ifdef H5
	return JSON.parse(sessionStorage.getItem('userInfo'))
	// #endif
	// #ifdef APP-PLUS
	return uni.getStorageSync('userInfo');
	// #endif
}

/**
 * 清空用户信息
 */
const clearUserInfo = () => {
	// #ifdef H5
	sessionStorage.clear()
	// #endif
	// #ifdef APP-PLUS
	uni.clearStorageSync()
	// #endif
}



export {
	saveUserToken,
	getUserToken,
	saveUserInfo,
	getUserInfo,
	clearUserInfo
}
