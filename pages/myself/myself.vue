<template>
	<view class="container">
		<!-- 用户信息  -->
		<view class="top-box-login" v-if="userInfo" @click="loginshow">
			<image class="top-box-img" :src="userInfo.avatar"></image>
			<view class="nickname">{{userInfo.userName}}</view>
		</view>
		<view class="top-box-login" v-if="!userInfo" @click="loginshow">
			<image class="top-box-img" src="../../static/head.jpg" mode=""></image>
			<view class="nickname">点击登录</view>
		</view>
		<view class="center-box">
			<!-- 积分条目 -->
			<view class="center-box-list">
				<u-icon name="calendar" color="#ffa742" size="46"></u-icon>
				<view class="text-box">
					<view class="title">我的积分</view>
					<view class="title-num" style="color: #C8C9CC;">{{userInfo?userInfo.points:0}}</view>
				</view>
			</view>
			<!-- 已登录 -->
			<view class="center-box-list" @click="goSign">
				<u-icon name="file-text" color="#12b823" size="46"></u-icon>
				<view class="text-box">
					<view class="title">签到</view>
					<u-icon name="arrow-right" color="#c8c9cc" size="34"></u-icon>
				</view>
			</view>
			<view class="center-box-list" @click="boundPhone">
				<u-icon name="phone" color="#5BA7FF" size="46"></u-icon>
				<view class="text-box">
					<view class="title">绑定手机</view>
					<u-icon name="arrow-right" color="#c8c9cc" size="34"></u-icon>
				</view>
			</view>
			<u-popup v-model="phoneN" mode="center" border-radius="14" length="60%">
				<view style="padding: 30rpx 30rpx;">
					<view class="" style="text-align: center;margin: 20rpx 0;width: 100%;">绑定手机</view>
					<view class="" style="display: flex;justify-content: space-around;margin: 50rpx;">您已完成绑定</view>
				</view>
			</u-popup>
			<view class="center-box-list" @click="anti">
				<u-icon name="file-text" color="#12b823" size="46"></u-icon>
				<view class="text-box">
					<view class="title">防沉迷系统说明</view>
					<u-icon name="arrow-right" color="#c8c9cc" size="34"></u-icon>
				</view>
			</view>
			<view class="center-box-list" @click="attestationOpen">
				<u-icon name="account-fill" color="#ff6826" size="46"></u-icon>
				<view class="text-box">
					<view class="title">实名认证</view>
					<u-icon name="arrow-right" color="#c8c9cc" size="34"></u-icon>
				</view>
			</view>
			<view class="center-box-list" @click="gokefu">
				<u-icon name="kefu-ermai" color="#ff6826" size="46"></u-icon>
				<view class="text-box">
					<view class="title">联系客服</view>
					<u-icon name="arrow-right" color="#c8c9cc" size="34"></u-icon>
				</view>
			</view>
			<view class="center-box-list" @click="modifiedData">
				<u-icon name="order" color="#5BA7FF" size="46"></u-icon>
				<view class="text-box">
					<view class="title">个人信息</view>
					<u-icon name="arrow-right" color="#c8c9cc" size="34"></u-icon>
				</view>
			</view>
		</view>
		<!-- v-if="logged" -->
		<u-button class="btn-login" type="success" shape="circle" :ripple="true" ripple-bg-color="#0055ff" @click="clear"
		 v-if="userInfo">退出登录</u-button>
	</view>
</template>

<script>
	import {
		getUserToken,
		getUserInfo,
		clearUserInfo
	} from '../../utils/UserUtil.js';
	export default {
		data() {
			return {
				userInfo: {},
				realName: false,
				signLogout: false,
				phoneN: false,
			}
		},
		/**
		 * 页面显示生命周期
		 */
		onShow() {
			this.getUserInfo()
		},
		methods: {
			// 跳转手机号码绑定
			boundPhone() {
				if (getUserToken() === null) {
					uni.navigateTo({
						url: '../login/login'
					})
				} else {
					if (!this.userinfos.phone) {
						uni.navigateTo({
							url: '../myself/boundPhone'
						})
					} else {
						uni.showToast({
							title: '已绑定手机号',
							duration: 2000
						});
					}
				}

			},
			/**
			 * 获取用户信息
			 */
			getUserInfo() {
				this.userInfo = getUserInfo()
			},
			clear() {
				uni.showModal({
					title: '提示',
					content: '确认要退出吗？',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							clearUserInfo()
							this.userinfos = {}
							uni.switchTab({
								url: '../index/index'
							})
							// this.logged = false
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 实名认证页面打开or关闭
			attestationOpen() {
				if (!this.logged) {
					uni.navigateTo({
						url: '../login/login'
					})
					// this.attestationShow=false
				} else {
					//已经完成认证
					if (this.realName) {
						// this.realN = true
						uni.showToast({
							title: '已完成认证',
							duration: 2000
						});
					} else { //未完成认证
						uni.navigateTo({
							url: '../myself/realname'
						})
					}
				}
			},
			// 登录
			loginshow() {
				uni.navigateTo({
					url: '../login/login'
				})
			},
			// 实名认证接口
			realNameDto() {
				this.$u.api.realName({
					idNumber: this.realParam.number,
					name: this.realParam.realname,
					type: this.realParam.type
				}).then(res => {
					if (res.status) {
						console.log("实名认证成功", res)
						this.attestationShow = false;
					}
				})
			},
			// 跳转防沉迷页面
			anti() {
				uni.navigateTo({
					url: '../myself/antiAddiction'
				})
			},
			// 跳转签到页面
			goSign() {
				if (this.logged = getUserToken() !== null) {
					uni.navigateTo({
						url: '../myself/sign'
					})
				} else {
					uni.navigateTo({
						url: '../login/login'
					})
				}
			},
			// 跳转客服页面
			gokefu() {
				uni.navigateTo({
					url: '../myself/service'
				})
			},

			modifiedData() {
				if (this.logged = getUserToken() !== null) {
					uni.navigateTo({
						url: '../myself/modified'
					})
				} else {
					uni.navigateTo({
						url: '../login/login'
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	page {
		background-color: #f3f6fa;
		height: 100%;
		width: 100%;
	}

	.container {
		width: 100%;
	}

	.top-box-img {
		width: 100rpx;
		height: 100rpx;
		margin-top: 30rpx;
		border-radius: 50%;
	}

	.top-box-login {
		width: 100%;
		color: #ffffff;
		padding: 80rpx 0;
		background-color: #19be6b;
		text-align: center;
	}

	.top-info {
		width: 70%;
		margin-top: 30rpx;
		margin-left: 20rpx;
		height: 160rpx;
		color: #606266;
	}

	.nickname,
	.my-uid {
		height: 50rpx;
		line-height: 50rpx;
	}

	.my-uid {
		font-size: 28rpx;
	}

	.center-box {
		background-color: #ffffff;
		padding: 0 20rpx;
		margin-top: 20rpx;
	}

	.center-box-list {
		display: flex;
	}

	.text-box {
		width: 90%;
		height: 100rpx;
		line-height: 100rpx;
		padding: 0 15rpx;
		display: flex;
		justify-content: space-between;
	}

	.title {
		// width: 300rpx;
		color: #555555;
	}

	.text-right {
		margin-top: 25rpx;
		margin-right: 20rpx;
		text-align: right;
	}

	.title-num {
		padding: 0 10rpx;
		color: #808080;
	}

	.btn-login {
		width: 90%;
		position: absolute;
		bottom: 5%;
		margin-left: 5%;
	}

	.verify {
		display: flex;
	}

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
