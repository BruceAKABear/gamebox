<template>
	<view class="content">
		<view class="logo-box">
			<image class="logo" src="/static/logo.png"></image>
		</view>
		<view class="login-type-box">
			<u-button class="login-type" type="success" shape="circle" size="default" @click="phoneLogin">手机号码登录</u-button>
			<u-button class="login-type" type="success" shape="circle" size="default">微信登录</u-button>
			<view class="login-protocol">
				<span>登录即代表您同意</span>
				<span style="color: #19BE6B;">服务协议</span>
				<span>和</span>
				<span style="color: #19BE6B;">隐私协议</span>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {

		},
		methods: {
			phoneLogin() {
				uni.navigateTo({
					url: '/pages/login/phoneLogin'
				});
			},
			closelogin() {
				uni.switchTab({
					url: '../index/index'
				});
			}
		}
	}
</script>

<style>
	page {
		height: 100%;
		width: 100%;
	}

	.close-btn {
		margin-left: 40rpx;
		margin-top: 40rpx;
	}

	.logo-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 150rpx;
		width: 150rpx;
		margin-top: 400rpx;
		margin-left: auto;
		margin-right: auto;
	}

	.login-type-box {
		width: 100%;
		height: 150rpx;
		position: absolute;
		top: 70%;
	}

	.login-type {
		width: 80%;
		font-size: 26rpx;
		margin-top: 30rpx;
	}

	.login-protocol {
		font-size: 24rpx;
		color: #C0C4CC;
		text-align: center;
		margin-top: 10%;
	}
</style>
