import Clipboard from 'clipboard'
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
	return uni.setStorageSync('userInfo', userInfo);
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
	// uni.removeStorageSync('userToken');
	// #endif
}


const handleClipboard = (text, event, onSuccess, onError) => {

	event = event || {}
	const clipboard = new Clipboard(event.target, {
		text: () => text
	})
	clipboard.on('success', () => {
		onSuccess()
		clipboard.off('error')
		clipboard.off('success')
		clipboard.destroy()
	})
	clipboard.on('error', () => {
		onError()
		clipboard.off('error')
		clipboard.off('success')
		clipboard.destroy()
	})
	clipboard.onClick(event)
}

export {
	saveUserToken,
	getUserToken,
	saveUserInfo,
	getUserInfo,
	clearUserInfo,
	handleClipboard,
	// getSignStatus,
	// saveSignStatus
}
