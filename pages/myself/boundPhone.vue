<template>
	<view class="container">
		<view class="top-logo">
			<image class="top-logo-img" src="../../static/logo.png" mode=""></image>
		</view>
		<view class="center-info">
			<view class="center-box-list">
				<view class="list-left">
					<u-icon name="phone" color="#b3b3b3" size="46"></u-icon>
				</view>
				<view class="text-box">
					<input type="text" v-model="phone" placeholder="请输入您的手机号码" value="" />
				</view>
			</view>
			<view class="center-box-list">
				<view class="list-left">
					<u-icon name="calendar-fill" color="#b3b3b3" size="46"></u-icon>
				</view>
				<view class="text-box">
					<input type="text" v-model="code" placeholder="请输入短信验证码" value="" />
				</view>
				<view class="">
					<button type="default" v-if="yzmbotshou" class="verification-btn" @click="getyzm">获取验证码</button>
					<button type="default" v-if="yzmbothide" class="verification-btn" style="background-color: #8F8F94;">{{times}}s后重新获取</button>
				</view>
			</view>
		</view>
		<view class="center-text">绑定后，可使用手机登录，保障账号安全。我们尊重、保护用户的个人隐私，并郑重承诺，除非有法律或程序要求，否则未经用户授权我们不会公布与用户个人有关资料。</view>
		<u-button class="btn-bound" type="primary" shape="circle" :ripple="true" ripple-bg-color="#0055ff" @click="bound">完成绑定</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#55aaff',
				},
				yzmbotshou: true,
				yzmbothide: false,
				phone: '',
				code: '',
				times: 300, //验证码时间
			}
		},
		methods: {
			getyzm() {
				if (this.phone === '') {
					this.$refs.uTips.show({
						title: '请将信息填写完整',
						type: 'error',
						duration: '1000'
					})
				} else {
					var num = 300;
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
					}, 300000)

					this.$u.api.getLoginCode({
						phone: this.phone
					}).then(res => {
						if (res.status) {
							console.log("验证码发送成功", res)
						}
					})
				}

			},
			bound() {
				this.$u.api.bindPhone({
					phone: this.phone,
					code: this.code
				}).then(res => {
					if (res.status) {
						console.log("手机号绑定成功")
					}
				})
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

	.top-logo {
		height: 300rpx;
		text-align: center;
	}

	.top-logo-img {
		width: 150rpx;
		height: 150rpx;
		margin-top: 75rpx;
		border-radius: 50%;
	}

	.btn-bound {
		margin-top: 30rpx;
	}

	.center-info {
		background-color: #ffffff;
	}

	.center-box-list {
		display: flex;
		height: 100rpx;
		line-height: 100rpx;
	}

	.text-box {
		width: 70%;
		height: 100rpx;
		line-height: 100rpx;
		padding: 0 15rpx;
		justify-content: space-between;
	}

	.text-box input {
		height: 60rpx;
		margin-top: 20rpx;
	}

	.list-left {
		margin: 0 20rpx;
	}

	.center-text {
		padding: 25rpx 30rpx;
		font-size: 26rpx;
		color: #b3b3b3;
		text-align: center;
	}

	.verification-btn {
		padding: 0;
		font-size: 12px;
		width: 180rpx;
		height: 70rpx;
		text-align: center;
		background-color: #55aa00;
		color: #ffffff;
		margin-top: 15rpx;
		margin-right: 15rpx;
	}
</style>
