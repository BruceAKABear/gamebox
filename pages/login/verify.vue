<!--  -->
<template>
	<view class="content">
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="phone-box">
			<view class="phone-login-title">输入验证码</view>
			<view class="phone-login-desc">验证码已发送</view>
			<u-message-input :maxlength="6" :focus="true" @finish="finish" :breathe="true"></u-message-input>
			<view class="login-protocol" @click="reGetCode">{{times>0?times+'秒后重新获取验证码':'重新获取验证码'}}</view>
		</view>
		<u-button class="btn-login" type="success" size="default" @click="doLogin" :disabled="!canSubmit">登录</u-button>
	</view>
</template>

<script>
	import {
		saveUserToken
	} from '../../utils/token.js';
	export default {
		data() {
			return {
				canSubmit: false,
				times: 300,
				phoneNumber: '',
				code: ''
			};
		},
		/**
		 * 页面加载时封装手机号
		 * @param {Object} phoneNumber
		 */
		onLoad(params) {
			this.phoneNumber = params.phoneNumber
			this.getCode()
		},
		//方法集合
		methods: {

			getCode() {
				this.$u.api.getLoginCode({
					phone: this.phoneNumber
				}).then(res => {
					//验证码发送成功后，倒计时
					this.timeDecrease()
				})
			},
			/**
			 * 时间减少
			 */
			timeDecrease() {
				var that = this
				var interval = setInterval(() => {
					if (that.times > 0) {
						--that.times
					} else {
						//停止
						clearInterval(interval)
					}
				}, 1000)
			},
			/**
			 * 重新获取验证码
			 */
			reGetCode() {
				if (this.times <= 0) {
					this.times = 300
					this.getCode()
				}
			},
			doLogin() {
				this.$u.api.loginByPhone({
					code: this.code,
					phone: this.phoneNumber
				}).then(res => {
					if (res.status) {
						saveUserToken(res.data);
						uni.reLaunch({
							url: '../index/index'
						})
					}
				})
			},
			finish(e) {
				this.code = e
				this.canSubmit = true
			}
		}
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
		margin-top: 80rpx;
	}

	.login-protocol {
		margin-top: 10rpx;
		font-size: 24rpx;
		color: #C8C9CC;
	}
</style>
