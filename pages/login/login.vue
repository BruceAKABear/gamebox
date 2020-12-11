<template>
	<view class="wrap">
		<u-top-tips ref="uTips" navbar-height="0"></u-top-tips>
		<view class="content">
			<view class="title">欢迎登录</view>
			<input class="u-border-bottom" type="number" v-model="phoneNumber" placeholder="请输入手机号" />
			<view class="tips">未注册的手机号验证后自动创建账号</view>
			<button @tap="submit" :style="[inputStyle]" class="getCaptcha">获取短信验证码</button>
		</view>
		<view class="buttom">
			<view class="loginType">
				<view class="wechat item">
					<view class="icon">
						<u-icon size="70" name="weixin-fill" color="rgb(83,194,64)"></u-icon>
					</view>
					微信
				</view>
			</view>
			<view class="hint">
				登录代表同意
				<text class="link">熙辰微游用户协议、隐私政策，</text>
				并授权使用您的熙辰微游账号信息(如昵称、头像、收获地址)
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phoneNumber: ''
			}
		},
		computed: {
			inputStyle() {
				let style = {};
				if (this.phoneNumber) {
					style.color = "#fff";
					style.backgroundColor = this.$u.color['success'];
				}
				return style;
			}
		},
		methods: {
			submit() {
				if (this.$u.test.mobile(this.phoneNumber)) {
					uni.reLaunch({
						url: '../login/verify?phoneNumber=' + this.phoneNumber
					})
				} else {
					this.$refs.uTips.show({
						title: '手机号不正确',
						type: 'warning',
						duration: '1500'
					})
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.wrap {
		font-size: 28rpx;
		height: 100%;

		.content {
			width: 600rpx;
			padding-top: 80rpx;
			margin-left: 80rpx;


			.title {
				text-align: left;
				font-size: 60rpx;
				font-weight: 500;
				margin-bottom: 100rpx;
			}

			input {
				text-align: left;
				margin-bottom: 10rpx;
				padding-bottom: 6rpx;
			}

			.tips {
				color: $u-type-info;
				margin-bottom: 60rpx;
				margin-top: 8rpx;
				font-size: 25rpx;
			}

			.getCaptcha {
				background-color: rgb(253, 243, 208);
				color: $u-tips-color;
				border: none;
				font-size: 30rpx;
				padding: 12rpx 0;

				&::after {
					border: none;
				}
			}
		}

		.buttom {
			.loginType {
				display: flex;
				padding: 100rpx;
				justify-content: center;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					color: $u-content-color;
					font-size: 28rpx;
				}
			}

			.hint {
				padding: 20rpx 40rpx;
				font-size: 20rpx;
				color: $u-tips-color;

				.link {
					color: $u-type-warning;
					font-size: 25rpx;
				}
			}
		}
	}
</style>
