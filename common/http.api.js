// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)
let getLoginCodeUrl = '/user/getLoginCode';
let bindPhoneUrl = '/user/bindPhone';
let getInfoUrl = '/user/getInfo';
let loginByPhoneUrl = '/user/loginByPhone';
let realNameUrl = '/user/realName';
let getBannersUrl = '/index/getBanners';
let getGamesUrl = '/index/getGames';
let getHotBannersUrl = '/index/getHotBanners';
let getInfosUrl = '/index/getInfos';
let getRecentGamesUrl = '/index/getRecentGames';
let startGameUrl = '/index/startGame';
let giftPageUrl = '/gift/page';
let getPointsUrl = '/points/getPoints';
let getPointsPageUrl = '/points/page';
let getGiftUrl = '/gift/getGift';
let checkPointsStatusUrl = '/points/checkPointsStatus';
let productPageUrl = '/product/page';
let productpageVirtualUrl = '/product/pageVirtual';
let getHotInfoUrl = '/index/getHotInfo';
let productGetLogUrl = '/product/getLog';
let getProductUrl = '/product/getProduct';
let prePayUrl = '/pay/prePay';
let productByIdUrl = '/product/getById';
let getByMonthUrl = '/checkIn/getByMonth';
let doCheckInUrl = '/checkIn/doCheckIn';


// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	//发送手机登录验证码,每个验证码间隔时间5分钟
	let getLoginCode = (params = {}) => vm.$u.get(getLoginCodeUrl, params);
	// 绑定手机号
	let bindPhone = (params = {}) => vm.$u.post(bindPhoneUrl, params);
	// 查询用户信息
	let getInfo = (params = {}) => vm.$u.get(getInfoUrl, params);
	// 手机号验证码登录
	let loginByPhone = (params = {}) => vm.$u.post(loginByPhoneUrl, params);
	// 实名认证
	let realNameApi = (params = {}) => vm.$u.post(realNameUrl, params);
	// 获取首页banner列表
	let getBanners = (params = {}) => vm.$u.get(getBannersUrl, params);
	// 获取游戏列表
	let getGames = (params = {}) => vm.$u.get(getGamesUrl, params);
	// 获取首页最热banner列表
	let getHotBanners = (params = {}) => vm.$u.get(getHotBannersUrl, params);
	// 获取资讯
	let getInfos = (params = {}) => vm.$u.get(getInfosUrl, params);
	// 获取最近在玩游戏，需要登录
	let getRecentGames = (params = {}) => vm.$u.get(getRecentGamesUrl, params);
	// 开始玩游戏上报
	let startGame = (params = {}) => vm.$u.post(startGameUrl, params);
	//礼包分页查询
	let giftPage = (params = {}) => vm.$u.get(giftPageUrl, params);
	// 增加积分type:1签到2每日首冲3充值4绑定手机5实名认证
	let getPoints = (params = {}) => vm.$u.get(getPointsUrl, params);
	// 分页查询积分
	let getPointsPage = (params = {}) => vm.$u.get(getPointsPageUrl, params);
	// 获取礼包码,需要登陆
	let getGift = (params = {}) => vm.$u.post(getGiftUrl, params);
	// 查询积分任务完成状态
	let checkPointsStatus = (params = {}) => vm.$u.get(checkPointsStatusUrl, params);
	// 实体商品分页查询
	let productPage = (params = {}) => vm.$u.get(productPageUrl, params);
	// 虚拟商品分页查询
	let productpageVirtual = (params = {}) => vm.$u.get(productpageVirtualUrl, params);
	// 获取最热资讯
	let getHotInfo = (params = {}) => vm.$u.get(getHotInfoUrl, params);
	// 兑换记录
	let productGetLog = (params = {}) => vm.$u.get(productGetLogUrl, params);
	// 领取商品
	let getProduct = (params = {}) => vm.$u.get(getProductUrl, params);
	//支付
	let prePay = (params = {}) => vm.$u.post(prePayUrl, params);
	let productById = (params = {}) => vm.$u.get(productByIdUrl, params);
	let getByMonth = (params = {}) => vm.$u.get(getByMonthUrl, params);
	let doCheckIn = (params = {}) => vm.$u.post(doCheckInUrl, params);


	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {
		getLoginCode,
		bindPhone,
		getInfo,
		loginByPhone,
		realNameApi,
		getBanners,
		getGames,
		getHotBanners,
		getInfos,
		getRecentGames,
		startGame,
		giftPage,
		getPoints,
		getPointsPage,
		getGift,
		checkPointsStatus,
		productPage,
		productpageVirtual,
		getHotInfo,
		productGetLog,
		getProduct,
		prePay,
		productById,
		getByMonth,
		doCheckIn
	};
}

export default {
	install
}
