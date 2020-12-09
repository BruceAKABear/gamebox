<template>
	<view class="content">
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="phone-box">
			<view class="phone-login-title">验证码登录</view>
			<view class="phone-login-desc">首次登录即视为注册并绑定手机</view>
			<view class="phone-login-num">
				<u-input v-model="phoneNumber" type="number" :focus="true" placeholder="请输入手机号" />
			</view>
			<view class="login-protocol">
				<span>登录即代表您同意</span>
				<span style="color: #19BE6B;">服务协议</span>
				<span>和</span>
				<span style="color: #19BE6B;">隐私协议</span>
			</view>
		</view>
		<view class="verify-box">
			<u-button class="btn-verify" type="success" shape="circle" size="default" @click="getVerify(phoneNumber)">获取验证码</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phoneNumber: '',
			}
		},
		methods: {
			getVerify(phoneNumber) {
				if (this.phoneNumber === '') {
					//抛出异常
					this.$refs.uTips.show({
						title: '请填写手机号',
						type: 'error',
						duration: '1000'
					})
				} else if (!/^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/.test(this.phoneNumber)) {
					//抛出异常
					this.$refs.uTips.show({
						title: '请填写正确的手机号',
						type: 'error',
						duration: '1000'
					})
				} else {
					// this.$u.api.getLoginCode({
					// 	phone: this.phoneNumber
					// }).then(res => {
					// console.log("验证码", res)
					// let str = JSON.stringify(phoneNumber);
					uni.navigateTo({
						url: '/pages/login/verify?phoneNumber=' + phoneNumber
					})
					// })
				}
			},
		}
	}
</script>

<style>
	.phone-box {
		width: 80%;
		margin: auto;
		padding: 0 30rpx;
		margin-top: 120rpx;
	}

	.phone-login-title {
		font-size: 34rpx;
		font-weight: bold;
	}

	.phone-login-desc {
		color: #C0C4CC;
		font-size: 24rpx;
		padding: 10rpx 0;
		margin-bottom: 20rpx;
	}

	.phone-login-num input {
		font-size: 26rpx;
		padding: 20rpx 0;
		border-bottom: 1rpx solid #EEEEEE;
	}

	.btn-verify {
		font-size: 26rpx;
		width: 80%;
		margin-top: 50rpx;
	}

	.login-protocol {
		font-size: 24rpx;
		color: #C0C4CC;
		margin-top: 20rpx;
	}
</style>
