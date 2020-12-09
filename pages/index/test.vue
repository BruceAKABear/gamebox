<template>
	<view>
		<u-mask :show="payment"  :mask-click-able="false">
			<view class="warp">
				<view class="rect" @tap.stop>
					<view class="close-btn">
						<u-icon size="20" name="close" @click="closePay" color="#c2c2c2"></u-icon>
					</view>
					<view class="pay-top">
						<view class="change-pay1">订单详情</view>
						<view class="pro-box">
							<view class="pro-name">订单详情订单详情{{pro.productName}}</view>
							<view class="pro-price">订单详情{{pro.price/100}}</view>
						</view>
					</view>
					<view class="change-pay2">选择支付方式</view>
					<view class="payment-box">
						<view :class="payType===1?'pay-list2':'pay-list'" @click="changePay(1)">
							<u-icon label="微信支付" margin-top="8" label-pos="bottom" label-size="24" size="55" color="#00aa00" name="weixin-circle-fill"></u-icon>
						</view>
						<view :class="payType===2?'pay-list2':'pay-list'" @click="changePay(2)">
							<u-icon label="支付宝支付" margin-top="8" label-pos="bottom" label-size="24" size="55" color="#1e6fff" name="zhifubao-circle-fill"></u-icon>
						</view>
					</view>
					<u-button class="pay-btn" type="success" @click="prePay">立即支付</u-button>
				</view>
			</view>
		</u-mask>
		<web-view :src="gameUrl"></web-view>
	</view>
</template>

<script>
	var jweixin = require('jweixin-module')
	export default {
		data() {
			return {
				gameUrl: '',
				payment: false,
				pro: {},
				payType: 0
			}
		},
		methods: {
			connect() {
				// var that = this
				uni.connectSocket({
					url: 'ws://192.168.101.19:8111/paySocket/' + 123
				});
				uni.onSocketOpen(function(res) {
					console.log('WebSocket连接已打开！', res);
				});
				uni.onSocketMessage(function(res) {
					console.log('收到服务器内容：', res.data);
					let num = JSON.parse(res.data)
					// if (num.data) {
					// 	console.log('订单')
					// 	that.payment = true
					// 	that.pro = num.data
					// }
				});
			},
			closePay() {
				this.payment = false
			},
			prePay() {
				if (this.payType === 1) {
					this.$u.api.prePay({
						payType: this.payType
					}).then(res => {
						console.log(res, '----------微信预支付响应')
						if (res.status) {
							// jweixin.ready(function() {
							// 	jweixin.config({
							// 		debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
							// 		appId: res.data.appId, // 必填，公众号的唯一标识
							// 		timestamp: res.data.timeStamp, // 必填，生成签名的时间戳
							// 		nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
							// 		signature: res.data.paySign, // 必填，签名，见附录1
							// 		jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
							// 	})
							// 	jweixin.chooseWXPay({
							// 		timestamp: res.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
							// 		nonceStr: res.data.nonceStr, // 支付签名随机串，不长于 32 位
							// 		package: res.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
							// 		signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
							// 		paySign: res.data.paySign, // 支付签名
							// 		success: function(res) {
							// 			if (res.errMsg == "chooseWXPay:ok") {
							// 				//支付成功
							// 				alert('支付成功');
							// 			} else {
							// 				alert(res.errMsg);
							// 			}

							// 		},
							// 		cancel: function(r) {
							// 			console.log('支付取消')
							// 		},
							// 		fail: function(res) {
							// 			console.log('payfail')

							// 		}
							// 	})

							// })
						}
					})

				} else if (this.payType === 2) {
					this.$u.api.prePay({
						payType: this.payType
					}).then(res => {
						console.log(res, '----------支付宝预支付响应')
						if (res.status) {
							// AlipayJSBridge.call("tradePay", {
							// 	tradeNO: res.data.tradeNO, // 必传，此使用方式下该字段必传
							// 	bizType: res.data.bizType, // 非必传，默认为 “trade”
							// 	bizSubType: res.data.bizSubType, // 非必传，默认为 “”
							// 	bizContext: res.data.bizContext // 非必传，默认为H5启动选项(safePayContext)
							// }, function(result) {
							// 	console.log(JSON.stringify(result));
							// });
						}
					})
				}
			},
			changePay(data) {
				this.payType = data
				console.log(this.payType)
			}
		},
		onLoad(option) {
			this.gameUrl = option.gameUrl
			this.connect()
			this.payment = true
		},
	}
</script>

<style>
	.warp {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.rect {
		width: 65%;
		height: 40%;
		border-radius: 1em;
		background-color: #FFFFFF;
		position: relative;
	}

	.pay-title {
		width: 100%;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		margin: 25rpx 0;
	}

	.change-pay1,
	.change-pay2 {
		color: #999999;
		font-size: 24rpx;
		padding: 10rpx 30rpx;
	}

	.change-pay2 {
		position: absolute;
		bottom: 50%;
	}

	.change-pay1 {
		position: absolute;
		top: 8%;
	}

	.payment-box {
		width: 100%;
		display: flex;
		justify-content: space-around;
		position: absolute;
		bottom: 25%;
	}

	.pro-name,
	.pro-price {
		padding: 10rpx 20rpx;
		font-size: 26rpx;
	}


	.pay-list {
		width: 150rpx;
		text-align: center;
		padding: 15rpx 5rpx;
		border-radius: 10%;
		/* border: 1rpx solid #e7e9ee; */
		/* box-shadow: 0 0 10px 3px #d7d9de */
		box-shadow: 0 0 10px 3px #e7e9ee
	}

	.pay-list2 {
		width: 150rpx;
		text-align: center;
		padding: 15rpx 5rpx;
		border-radius: 10%;
		border: 1rpx solid #ffaa00;
	}

	.pay-btn {
		width: 80%;
		/* margin-top: 50rpx; */
		height: 60rpx;
		font-size: 26rpx;
		position: absolute;
		bottom: 8%;
		left: 10%;
	}

	.pro-box {
		position: absolute;
		top: 16%;
		padding: 0 30rpx;
		left: 20%;
	}

	.pay-top {
		margin-top: 40rpx;
	}

	.close-btn {
		text-align: right;
		margin-top: 15rpx;
		margin-right: 30rpx;
	}
</style>
