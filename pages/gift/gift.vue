<template>
	<view class="container" style="overflow-x: hidden;">
		<u-mask :show="getGiftshow" :mask-click-able="false">
			<view class="warp">
				<view class="rect" @tap.stop>
					<view style="text-align: center;margin-bottom: 30rpx;">提示</view>
					<view style="text-align: left;font-size: 28rpx;padding-left: 30rpx;">
						<span style=" color: #82848A;font-size: 30rpx;">兑换码：</span>
						<span style="background-color: #ebebeb;padding: 0 20rpx;color: #808080;font-size: 30rpx;">{{redeemCode}}</span>
					</view>
					<view style="text-align: left;font-size: 24rpx;color: #808080;margin-top: 30rpx;padding-left: 30rpx;">复制兑换码，去游戏中使用</view>
					<view style="text-align: right;margin-top: 40rpx;">
						<u-button size="mini" style="margin-right: 20rpx;padding: 10rpx 30rpx;" @click="cancel">取消</u-button>
						<u-button size="mini" style="margin-right: 20rpx;padding: 10rpx 30rpx;" type="success" @click="copy(redeemCode)">复制</u-button>
					</view>
				</view>
			</view>
		</u-mask>
		<!-- 用户信息 -->
		<view class="top-box-login" style="margin-bottom: 20rpx;" v-if="logged">
			<image class="top-box-img" :src="userInfo.avatar" mode=""></image>
			<view class="top-info">
				<view class="nickname">{{userInfo.userName}}</view>
				<view class="integral-box">
					<image class="integral-img" src="../../static/integral_num.png"></image>
					<view class="integral-num">{{logged?userInfo.points:0}}</view>
				</view>
			</view>
		</view>
		<!-- 未登录用户 -->
		<view class="top-box-login" style="margin-bottom: 20rpx;" v-if="!logged">
			<image class="top-box-img" src="../../static/head.jpg" mode=""></image>
			<view class="top-info">
				<view class="nickname">游客玩家</view>
				<view class="integral-box">
					<image class="integral-img" src="../../static/integral_num.png"></image>
					<view class="integral-num">0</view>
				</view>
			</view>
		</view>
		<!-- 礼包 -->
		<view class="gift-box" v-for="(info,index) in giftList" :key="index">
			<view class="gift-top-box">
				<image :src="info.thumb" style="width: 100rpx;height: 100rpx;" mode="aspectFill"></image>
				<view class="gift-top-name">{{info.name}}</view>
			</view>
			<view class="gift-center-box" v-for="item in info.gifts">
				<view class="gift-c-l-box">
					<view class="top-box">
						<u-icon name="gift-fill" color="#f9c41f" size="34"></u-icon>
						<p style="height: 40rpx;margin-left: 10rpx;">{{item.giftName}}</p>
					</view>
					<view class="gift-c-b">{{item.description}}</view>
				</view>
				<u-button type="success" class="gift-btn" @click="getGiftBag(item)">{{item.received?'领取':'查看'}}</u-button>
			</view>
		</view>
		<u-divider style="margin: 20rpx 0;background-color: #f3f6fa;">没有更多了</u-divider>
		<view style="text-align: center;font-size: 24rpx;margin: 20rpx 0;color: #999999;">适龄提示：适合18岁以上用户 </view>
	</view>
</template>

<script>
	import {
		getUserToken,
		saveUserInfo,
		getUserInfo,
		saveUserToken,
		handleClipboard
	} from '../../utils/cs.js';
	export default {
		data() {
			return {
				integral: 10, //积分
				nickname: 'Holly', //用户昵称
				// 礼包列表
				giftList: [],
				logged: false, //是否登录
				giftInfoList: [],
				userInfo: {}, //用户信息
				// redeemCode: {
				// 	code:''
				// }, //礼包兑换码
				redeemCode: '',
				getGiftshow: false,
				// showGift:true,
				// getGiftLogout: false, //未登录领取礼包
			}
		},
		onLoad() {},
		onShow() {
			//查询用户信息
			this.getUserInfo()
			// 查询礼包列表
			this.getGiftInfo()
			// let token = getUserToken()
			// if (token) {
				
				// this.userInfo = getUserInfo()
				// console.log('onShow用户信息:', this.userInfo)
				// #ifdef H5
				this.logged = getUserToken() !== null
				// #endif
				// #ifdef APP-PLUS
				// this.logged = JSON.parse(getUserToken()) !== null
				this.logged = getUserToken() !== null && getUserToken() !== ''
				// #endif
			// }

		},
		methods: {
			/**
			 * 获取用户信息
			 */
			getUserInfo() {
				this.$u.api.getInfo().then(res => {
					if (res.status) {
						this.userInfo = res.data
					} 
				})
			},
			getGiftInfo() {
				this.$u.api.giftPage({
					pageNumber: 1
				}).then(res => {
					this.giftList = res.data
					console.log('礼包查询1', res.data)
					// console.log('礼包查询2', res.data.gifts[0])
				})
			},
			//取消
			cancel() {
				this.getGiftshow = false
				// this.getGiftLogout = false
			},
			//领取
			getGiftBag(item) {
				if (!(this.logged = getUserToken() !== null)) {
					uni.navigateTo({
						url: '../login/login'
					})
				} else {
					this.getGiftshow = true
					this.$u.api.getGift({
						gameId: item.gameId,
						giftType: item.giftType
					}).then(res => {
						console.log('领取礼包', res)
						this.redeemCode = res.data.code
						// this.showGift=!this.showGift
					})
				}
			},
			//复制
			copy(data) {
				// #ifdef H5
				handleClipboard(data, event, () => {
					this.getGiftshow = false
					uni.showToast({
						title: '领取成功',
						duration: 2000
					});
				}, () => {
					this.getGiftshow = false
					uni.showToast({
						title: '领取失败'
					});
				})
				// #endif
				// #ifdef APP-PLUS

				uni.setClipboardData({
					data: data,
					success: function() {
						// this.getGiftshow = false
						uni.showToast({
							title: '领取成功',
							duration: 2000
						});
					}
				});
				// #endif
			},
			nowLogin() {
				this.loginshow = true;
				this.getGiftLogout = false
			},
		}
	}
</script>

<style>
	page {
		background-color: #f3f6fa;
	}

	/* 用户头像 */
	.top-box-img {
		width: 80rpx;
		height: 80rpx;
		margin-top: 20rpx;
		border-radius: 50%;
	}

	/* 登陆后用户信息 */
	.top-box-login {
		padding: 0 25rpx;
		width: 100%;
		height: 130rpx;
		background-color: #ffffff;
		display: flex;
	}

	.top-info {
		width: 60%;
		margin-top: 10rpx;
		margin-left: 20rpx;
		height: 120rpx;
		color: #606266;
	}

	.nickname {
		height: 50rpx;
		line-height: 50rpx;
		font-size: 26rpx;
	}

	.message {
		height: 130rpx;
		line-height: 130rpx;
	}

	.sign-btn {
		height: 50rpx;
		line-height: 50rpx;
		font-size: 24rpx;
		background-color: #ffffff;
		border: 1rpx solid #14acf7;
		color: #14acf7;
		margin-top: 40rpx;
	}

	.integral-box {
		display: flex;
		margin-top: 5rpx;
	}

	.integral-num {
		font-size: 28rpx;
		color: #999999;
	}

	.integral-img {
		width: 35rpx;
		height: 35rpx;
	}

	.list-box {
		/* margin-bottom: 20rpx; */
		/* border-bottom: 1rpx #e7eaf0 solid; */
	}

	.gift-top-box {
		display: flex;
		margin-bottom: 30rpx;
	}

	.top-box {
		display: flex;
		margin-bottom: 10rpx;
		height: 40rpx;
		line-height: 40rpx;
	}

	.gift-center-box {
		display: flex;
		border-bottom: 1rpx solid #DBF1E1;
		padding: 20rpx 0;
		display: -webkit-flex;
		jusitify-content: center;
		align-items: center;
	}

	.gift-center-box:last-child {
		border: 0;
	}

	.gift-box {
		background-color: #ffffff;
		padding: 30rpx 30rpx;
		margin-bottom: 20rpx;
	}

	.gift-c-l-box {
		width: 78%;
		/* height: 130rpx; */
	}

	.gift-top-name {
		height: 100rpx;
		line-height: 100rpx;
		margin-left: 30rpx;
		font-size: 34rpx;
		font-weight: bold;
	}

	.gift-c-b {
		font-size: 24rpx;
		color: #999999;
	}

	.gift-btn {
		width: 20%;
		font-size: 26rpx;
		height: 65rpx;
	}

	.unicode {
		background-color: #2697fd;
		color: #ffffff;
		padding: 0 5rpx;
		font-size: 8px;
		border-radius: 10rpx;
		margin-right: 30rpx;
	}

	.unicodeto {
		background-color: #ffaa00;
		color: #ffffff;
		padding: 0 5rpx;
		font-size: 8px;
		border-radius: 10rpx;
		margin-right: 30rpx;
	}

	/*  验证码 */
	.getyzmbut {
		background-color: #19BE6B;
		color: #ffffff;
		width: 300rpx;
		height: 70rpx;
		font-size: 12px;
		margin-top: 10px;
		padding: 0;
	}
	.warp {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}
	
	.rect {
		width: 70%;
		height: 350rpx;
		padding: 30rpx 20rpx;
		box-sizing: border-box;
		border-radius: 1em;
		background-color: #FFFFFF;
	}
</style>
