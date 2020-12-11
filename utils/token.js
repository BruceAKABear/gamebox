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

const clearToken = () => {
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
	clearToken
}
