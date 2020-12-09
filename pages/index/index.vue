<template>
	<view class="container">
		<!-- 下载提醒 -->
		<!-- #ifdef H5 -->
		<view>
			<u-popup v-model="download" mode="top" :closeable="true">
				<view style="width: 100%;padding: 20rpx 30rpx;display: flex;line-height: 50rpx;justify-content: space-around;">
					<view style="height: 150rpx;width: 200rpx;">
						<view style="font-size: 28rpx;">熙辰微游</view>
						<image src="../../static/logo.png" mode="widthFix" style="width: 100rpx;"></image>
					</view>
					<view class="" style="line-height: 150rpx;width: 300rpx;">
						<u-button size="mini">点击下载app</u-button>
					</view>
				</view>
			</u-popup>
		</view>
		<!-- #endif -->
		<!-- 首页轮播图 -->
		<view class="swiper-box">
			<swiper class="swiper" indicator-dots="true" autoplay="true" interval="5000" duration="2500">
				<swiper-item v-for="(info,index) in bannerlist" :key="index">
					<image style="width: 100%;" mode="widthFix" :src="info.bannerUrl" @click="goGame(info)"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 首页滚动通知 -->
		<u-notice-bar style="color:#ffaa00 ;" :more-icon="true" mode="vertical" :list="meaasgelist"></u-notice-bar>
		<!-- <view class="" v-for="info in hotInfoList" :key="info.id"> </view>-->
		<!-- 最近在玩 -->
		<view style="width: 100%;height: 180rpx;display: flex;" v-if="nowPlayOn">
			<view class="nowPlay">最近在玩</view>
			<view style="width: 90%;align-self:center;margin-left: 10rpx;">
				<scroll-view class="scrollView">
					<block v-for="info in nowList" :key="info.id">
						<view class="item">
							<image style="width: 100rpx;height: 100rpx;" :src="info.thumb" @click="goGame(info)"></image>
							<view class="" style="font-size: 24rpx;">{{info.name}}</view>
						</view>
					</block>
				</scroll-view>
			</view>
		</view>
		<!-- 首页选项卡 -->
		<view class="center-box">
			<view class="inv-h-w">
				<view :class="['inv-h',Inv==0?'inv-h-se':'']" @click="Inv=0">热门</view>
				<view :class="['inv-h',Inv==1?'inv-h-se':'']" @click="Inv=1">新游</view>
				<view :class="['inv-h',Inv==2?'inv-h-se':'']" @click="Inv=2">资讯</view>
			</view>
			<!-- 热门游戏 -->
			<view class="tab-box" v-show="Inv == 0">
				<view class="hot-top">
					<view class="hot-top-list" v-for="info in hotbanners">
						<image class="top-img" mode="widthFix" :src="info.bannerUrl" @click="goGame(info)"></image>
					</view>
				</view>
				<view class="list-box u-body-item" v-for="info in hotlist" :key="info.id">
					<view class="" style="display: flex;width: 80%;" @click="goGameInfo(info)">
						<image :src="info.thumb" mode="aspectFill"></image>
						<view class="game-desc">
							<view class="game-name">{{info.name}}</view>
							<view class="game-info">{{info.description}}</view>
						</view>
					</view>
					<view class="right-box">
						<u-button class="load-game" type="success" size="mini" @click="goGame(info)">开始游戏</u-button>
					</view>
				</view>
				<u-divider style="margin-top: 30rpx;">没有更多了</u-divider>
				<view style="text-align: center;font-size: 24rpx;margin-top: 10rpx;color: #999999;">适龄提示：适合18岁以上用户 </view>
			</view>
			<!-- 最新游戏 -->
			<view class="tab-box" v-show="Inv == 1">
				<view class="list-box u-body-item" v-for="info in newlist" :key="info.id">
					<view class="" style="display: flex;width: 80%;" @click="goGameInfo">
						<image :src="info.thumb" mode="aspectFill"></image>
						<view class="game-desc">
							<view class="game-name">{{info.name}}</view>
							<view class="game-info">{{info.description}}</view>
						</view>
					</view>
					<view class="right-box">
						<u-button class="load-game" type="success" size="mini" @click="goGame(info)">开始游戏</u-button>
					</view>
				</view>
				<u-divider style="margin-top: 30rpx;">没有更多了</u-divider>
				<view style="text-align: center;font-size: 24rpx;margin-top: 10rpx;color: #999999;">适龄提示：适合18岁以上用户 </view>
			</view>
			<!-- 资讯 -->
			<view class="tab-box" v-show="Inv == 2">
				<view class="" v-for="info in messagelist">
					<view class="" @click="godesc" style="display: flex;font-size: 28rpx;border-bottom: 1rpx solid #DBF1E1;padding: 20rpx 0;justify-content: space-between;">
						<view class="" style="display: flex;width: 60%;">
							<view style="background-color: #71D5A1;color: #ffffff;padding: 0 5rpx;border-radius: 10%;height: 40rpx;height: 40rpx;">公告</view>
							<view style="margin-left: 10rpx;width: 80%;">{{info.content}}</view>
						</view>
						<view class="" style="font-size: 24rpx;color: #999999;">{{info.updateTime}}</view>
					</view>
				</view>
				<u-divider style="margin-top: 30rpx;">没有更多了</u-divider>
				<view style="text-align: center;font-size: 24rpx;margin-top: 10rpx;color: #999999;">适龄提示：适合18岁以上用户 </view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getUserToken
	} from '../../utils/cs.js';
	export default {
		//import引入的组件需要注入到对象中才能使用
		components: {},
		data() {
			//这里存放数据
			return {
				messagelist: [], //资讯列表
				hotbanners: [], //首页最热banner列表
				scrollLeft: 0,
				scrollTop: 0,
				old: {
					scroupdatallLeft: 0,
					scrollTop: 0
				},
				// old: {
				// 	scrollTop: 0
				// }
				meaasgelist: [
					'双十一来了！双十一来了！',
					'免费抽奖！！！',
					'入门礼包'
				], //滚动通知消息
				meaasgelist: [{
					title: '1234341'
				}, {
					title: '099nssjvbab'
				}],
				nowList: [], //最近在玩
				Inv: 0, //选项卡显示or关闭
				bannerlist: [], //首页banner
				hotlist: [], //热门游戏
				newlist: [], //最新游戏
				nowPlayOn: false,
				logged: false,
				download: false,
				hotInfoList: [] //最热资讯
			};
		},
		onLoad() {
			this.getbanner() // 首页banners
			this.getGames() //首页游戏列表
			this.getHotBanners() //获取首页最热banner列表
			this.getInfos() //获取资讯列表
			this.getHotInfo() //获取最热资讯
			this.download = true
		},
		onShow() {
			// console.log('userInfo', getUserToken() !== '')
			this.getRecentGames() //最近在玩
			
		},
		onLaunch() {
			this.download = true
		},
		methods: {
			// 选项卡控制
			changeTab(Inv) {
				that.navIdx = Inv;
			},
			// 跳转到游戏详情页
			goGameInfo(info) {
				// let detail = info

				let str = JSON.stringify(info);
				console.log('123321', info)
				uni.navigateTo({
					url: '../index/gamedesc?jsonStr=' + str
				})
				console.log("去游戏详情页")
			},
			// 跳转到资讯详情页
			godesc() {
				uni.navigateTo({
					url: '../index/message'
				})
			},
			// 最近在玩列表滚动
			// scrollleft(e) {
			// 	// console.log(e)
			// 	this.old.scrollLeft = e.detail.scrollLeft
			// },
			// 首页banners
			getbanner() {
				this.$u.api.getBanners({}).then(res => {
					this.bannerlist = res.data
					console.log('首页banners', res.data)
				})
			},
			// 获取游戏列表
			getGames() {
				this.$u.api.getGames({
					pageNumber: 1,
					type: 1
				}).then(res => {
					this.hotlist = res.data
					this.newlist = res.data
					console.log('游戏列表', res)
				})
			},
			//获取首页最热banner列表
			getHotBanners() {
				this.$u.api.getHotBanners({}).then(res => {
					this.hotbanners = res.data
					console.log('首页最热banner列表', res)
				})
			},
			// 获取资讯列表
			getInfos() {
				this.$u.api.getInfos({
					pageNumber: 1,
					type: 1
				}).then(res => {
					this.messagelist = res.data
					console.log('资讯列表', res)
				})
			},
			//开始玩游戏上报
			startGame(info) {
				this.$u.api.startGame({
					entryUrl: info.entryUrl,
					id: info.id,
					name: info.name,
					thumb: info.thumb
				}).then(res => {
					console.log('玩游戏上报', res)
				})
			},
			//获取最近在玩游戏需要登录
			getRecentGames() {
				this.$u.api.getRecentGames({}).then(res => {
					this.nowList = res.data
					console.log('最近在玩456', res.data)
					//最近在玩显示or关闭
					// #ifdef H5
					if (getUserToken() === null || this.nowList.length === 0) {
						this.nowPlayOn = false
					} else if (getUserToken() !== null || this.nowList.length !== 0) {
						this.nowPlayOn = true
					}
					// #endif

					// #ifdef APP-PLUS
					if (getUserToken() === '' || this.nowList.length === 0) {
						this.nowPlayOn = false
						console.log('this.nowPlayOn455', this.nowPlayOn)
					} else if (getUserToken() !== '' || this.nowList.length !== 0) {
						this.nowPlayOn = true
						console.log('this.nowPlayOn123', this.nowPlayOn)
					}
					// #endif
				})
			},
			// 点击跳转游戏链接
			goGame(info) {
				// #ifdef H5
				if (this.logged = getUserToken() !== null) {
					uni.navigateTo({
						url: '../index/test?gameUrl=' + info.entryUrl
					})
					this.startGame(info)
				} else {
					uni.navigateTo({
						url: '../login/login'
					})
				}
				// #endif

				// #ifdef APP-PLUS
				if (this.logged = getUserToken() !== null && getUserToken() !== '') {
					uni.navigateTo({
						url: '../index/test?gameUrl=' + info.entryUrl
					})
					this.startGame(info)
				} else {
					uni.navigateTo({
						url: '../login/login'
					})
				}
				// #endif

			},
			phoneLogin() {
				this.loginshow = false;
				uni.navigateTo({
					url: '../login/login'
				})
			},
			getHotInfo() {
				this.$u.api.getHotInfo({}).then(res => {
					this.hotInfoList = res.data
					console.log('获取最热资讯', res.data)
					var pop = []
					for (var i = 0; i < this.hotInfoList.length; i++) {
						pop.push(this.hotInfoList[i].title);
					}
					this.meaasgelist = pop
					console.log(pop);
				})
			}
		},
	}
</script>
<style scoped lang="scss">
	.swiper-box {
		width: 100%;
		position: relative;
		top: -10rpx
	}

	.container {
		padding-top: 0;
	}

	.item {
		display: inline-block;
		margin-right: 20rpx;
		height: 120rpx;
		// align-self:center;
	}

	.scrollView {
		padding: 0 20rpx;
		white-space: nowrap;
		box-sizing: border-box;
	}

	.scrollItem {
		margin-right: 20rpx;
	}

	.nowPlay {
		width: 30rpx;
		height: 150rpx;
		line-height: 35rpx;
		background-color: #19be6b;
		padding: 10rpx 10rpx;
		text-align: center;
		color: #ffffff;
		font-size: 26rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
		// margin-right: 20rpx;
		margin: 0 auto;
	}

	.u-body-item {
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 10rpx;
	}

	.u-body-item image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
		margin-left: 12rpx;
	}

	.game-info {
		color: #adadad;
		font-size: 24rpx;
		margin-top: 15rpx;
		word-break: break-word;
	}

	.game-desc {
		width: 70%;
		margin-left: 20rpx;
		margin-right: 20rpx;
	}

	.right-box {
		display: flex;
		line-height: 70rpx;
	}

	.list-box {
		display: flex;
		padding: 30rpx 0;
		border-bottom: 1rpx #e7eaf0 solid;
	}


	.container {
		padding: 10rpx 0;
	}

	.inv-h-w {
		background-color: #FFFFFF;
		height: 100upx;
		display: flex;
	}

	.inv-h {
		font-size: 30upx;
		flex: 1;
		text-align: center;
		color: #6a6a6a;
		height: 100upx;
		line-height: 100upx;
	}

	.inv-h-se {
		color: #5BA7FF;
		border-bottom: 4upx solid #5BA7FF;
	}

	.tab-box {
		padding: 25rpx 30rpx;
	}

	.hot-top {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	.hot-top-list {
		width: 48%;
		// height: 200rpx;
		// background-color: #18B566;
	}

	.top-img {
		width: 100%;
		// height: 200rpx;
	}

	.game-name {
		margin-top: 5rpx;
		margin-bottom: 20rpx;
	}

	.load-game {
		height: 60rpx;
		width: 150rpx;
		padding: 0 10rpx;
		font-size: 14px;
		margin-top: 30rpx;
	}

	// 验证码
	.getyzmbut {
		background-color: #19BE6B;
		color: #ffffff;
		width: 300rpx;
		height: 70rpx;
		font-size: 12px;
		margin-top: 10px;
		padding: 0;
	}
</style>
