<!--  -->
<template>
	<view class="content">
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="phone-box">
			<view class="phone-login-title">输入验证码</view>
			<view class="phone-login-desc">验证码已发送</view>
			<u-message-input :maxlength="6" :focus="true" @finish="finish"></u-message-input>
			<view class="login-protocol" v-if="yzmbothide">{{times}}秒后重新获取验证码</view>
			<view class="login-protocol" v-if="yzmbotshou" @click="getyzm">重新获取验证码</view>
		</view>
		<u-button class="btn-login" type="success" shape="circle" size="default" @click="login">登录</u-button>
	</view>
</template>

<script>
	import {
		saveUserToken,
		saveUserInfo
	} from '../../utils/cs.js';
	export default {
		//import引入的组件需要注入到对象中才能使用
		components: {},
		data() {
			//这里存放数据
			return {
				times: 10,
				yzmbotshou: false,
				yzmbothide: false,
				phone: '',
				code: ''
			};
		},
		onLoad(phoneNumber) {
			this.phone = phoneNumber
			console.log(this.phone)
			this.gettime()
		},
		//方法集合
		methods: {
			finish(e) {
				this.code = e
				console.log('输入结束，当前值为：' + e);
			},
			gettime() {
				var num = 10;
				this.yzmbotshou = false,
					this.yzmbothide = true
				var interval = setInterval(() => {
					if (this.is_sendsms == false) {
						this.sendsms()
					}
					--this.times
				}, 1000)
				setTimeout(() => {
					clearInterval(interval)
					this.yzmbotshou = true,
						this.yzmbothide = false,
						this.times = num
				}, 10000)
			},
			getyzm() {
				// this.$u.api.getLoginCode({
				// 	phone: this.phoneNumber
				// }).then(res => {
				// 	this.gettime()
				// 	console.log("验证码", res)
				// })
			},
			login() {
				this.yzmbotshou = true
				this.yzmbothide = false
				console.log(this.code)
				console.log(this.phone.phoneNumber)
				this.$u.api.loginByPhone({
					code: this.code,
					phone: this.phone.phoneNumber
				}).then(res => {
					if (res.status) {
						saveUserToken(res.data);
						this.userinfo()
						uni.switchTab({
							url: '../index/index'
						});
					}
				})
			},
			userinfo() {
				this.$u.api.getInfo({}).then(res => {
					if (res.status) {
						saveUserInfo(res.data);
						console.log("用户信息", res)
					}
				})
			},
		},
	}
</script>
<style scoped>
	.content {
		width: 100%;
	}

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

	.btn-login {
		font-size: 26rpx;
		width: 80%;
		margin-top: 50rpx;
	}

	.login-protocol {
		font-size: 24rpx;
	}
</style>
