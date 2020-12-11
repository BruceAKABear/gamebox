<template>
	<view class="container">
		<!-- 商品top -->
		<view class="detail-top" style="">
			<!-- Image -->
			<view class="" style="width: 50%;height: 200rpx;">
				<image style="height: 200rpx;width: 100%;" :src="productObj.thumb" mode=""></image>
			</view>
			<!-- 描述 -->
			<view class="" style="width: 50%;height: 200rpx;">
				<view style="font-size: 30rpx;margin-top: 10rpx;">{{productObj.name}}</view>
				<view class="" style="display: flex;margin-top: 10rpx;">
					<view class="" style="font-size: 26rpx;color: #888888;">所需积分：</view>
					<view class="" style="font-size: 24rpx;color: #14ACF7;">{{productObj.needPoints}}</view>
				</view>
				<view class="" style="font-size: 26rpx;color: #888888;margin-top: 10rpx;">剩余个数：{{productObj.stock}}</view>
				<view class="" style="background-color: #82848A;color: #ffffff;width: 250rpx;text-align: center;font-size: 30rpx;padding: 5rpx 0;margin-top: 10rpx;"
				 :style="productObj.stock>0?{'background-color':'#19be6b'}:''">{{productObj.stock>0?'订购':'已售罄'}}</view>
			</view>
		</view>
		<!-- 配送信息 -->
		<view class="detail-center">
			<span style="font-size: 30rpx;color: #555555;padding-left: 25rpx;padding-right: 80rpx;">数量</span>
			<u-number-box></u-number-box>
			<u-field style="margin-top: 10rpx;" label="姓名" placeholder="请填写收货人姓名"></u-field>
			<u-field label="手机" placeholder="请填写手机号"></u-field>
			<u-field v-model="address" label="收货地址" placeholder="收货地址"></u-field>
		</view>
		<!-- 商品详情 -->
		<view class="detail-bottom">
			<span class="detail-title">商品详情</span>
			<view class="" style="padding: 30rpx 50rpx;font-size: 26rpx;color: #888888;">兑换成功后7个工作日内安排发货（周末节假日除外）</view>
			<u-parse :html="productObj.detail"></u-parse>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				productObj: {},
				address: ''
			}
		},
		onLoad(goDetail) {
			console.log('测试', goDetail)
			this.getProductDetail()
		},
		methods: {
			valChange(e) {
				console.log('当前值为: ' + e.value)
			},
			getProductDetail() {
				this.$u.api.productById({
					productId: '1'
				}).then(res => {
					if (res.status) {
						console.log(res.data)
						this.productObj = res.data
					}
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #f3f6fa;
	}

	.detail-top {
		background-color: #ffffff;
		display: flex;
		padding: 30rpx 0;
	}

	.detail-center {
		padding: 30rpx 0;
		background-color: #ffffff;
		margin-top: 10rpx;
	}

	.detail-bottom {
		padding: 30rpx 0;
		background-color: #ffffff;
		margin-top: 10rpx;
	}

	.detail-img {
		width: 100%;
		/* padding: 0 30rpx; */
		vertical-align: text-top;
		text-align: center;
	}

	.detail-img image {
		/* width: 100%; */
		vertical-align: text-top;
	}

	.detail-title {
		width: 100%;
		padding: 10rpx 20rpx;
		border-bottom: 2rpx solid #F29100;
	}
</style>
