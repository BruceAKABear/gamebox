<template>
	<view class="container">
		<!-- <u-navbar title="商品详情" :background="background" titleColor="#ffffff" back-icon-color="#ffffff"></u-navbar> -->
		<!-- 商品top -->
		<view class="detail-top" style="">
			<!-- Image -->
			<view class="" style="width: 50%;height: 200rpx;">
				<image style="height: 200rpx;width: 100%;" src="https://act.11h5.com/score/goods_img/goods_thumb/20200723/11h5_goods_thumb_20200723Tn0xubiz_hO73eqBw2CRdXm2C0lfNhxW_1595482971.jpg"
				 mode=""></image>
			</view>
			<!-- 描述 -->
			<view class="" style="width: 50%;height: 200rpx;">
				<view style="font-size: 30rpx;margin-top: 10rpx;">小米空气净化器2S</view>
				<view class="" style="display: flex;margin-top: 10rpx;">
					<view class="" style="font-size: 26rpx;color: #888888;">所需积分：</view>
					<view class="" style="font-size: 24rpx;color: #14ACF7;">2600000</view>
				</view>
				<view class="" style="font-size: 26rpx;color: #888888;margin-top: 10rpx;">剩余个数：0</view>
				<view class="" style="background-color: #82848A;color: #ffffff;width: 250rpx;text-align: center;font-size: 30rpx;padding: 5rpx 0;margin-top: 10rpx;">已售罄</view>
			</view>
		</view>
		<!-- 配送信息 -->
		<view class="detail-center">
			<span style="font-size: 30rpx;color: #555555;padding-left: 25rpx;padding-right: 80rpx;">数量</span>
			<u-number-box v-model="value" @change="valChange"></u-number-box>
			<u-field style="margin-top: 10rpx;" v-model="code" label="姓名" placeholder="请填写收货人姓名">
			</u-field>
			<u-field v-model="mobile" label="手机" placeholder="请填写手机号">
			</u-field>
			<u-picker mode="region" value="region" title="收货地址" v-model="show"></u-picker>
		</view>
		<!-- 商品详情 -->
		<view class="detail-bottom">
			<span class="detail-title">商品详情</span>
			<view class="" style="padding: 30rpx 50rpx;font-size: 26rpx;color: #888888;">兑换成功后7个工作日内安排发货（周末节假日除外）</view>
			<view class="detail-img">
				<image src="//act.11h5.com/score/goods_img/image/20200723/11h5_shopO2nOPTv-Sobqm5Q7B29Lk8khjrrg7Ou2MTU5NTQ4Mjk0MQ==.jpg"
				 mode=""></image>
				<image src="//act.11h5.com/score/goods_img/image/20200723/11h5_shopjC87mgUcKXqrNwday28OAGMKf5ypER0bMTU5NTQ4Mjk1Ng==.jpg"
				 mode=""></image>
				<image src="//act.11h5.com/score/goods_img/image/20200723/11h5_shopGpYliPGAyrsUPnUgEQa5qXdZ6e7rmLYiMTU5NTQ4Mjk1Ng==.jpg"
				 mode=""></image>
				<image src="//act.11h5.com/score/goods_img/image/20200723/11h5_shop2Z4tPCbN7yfTJ2uOzTSTmn2Af45fYTpXMTU5NTQ4Mjk2MA==.jpg"
				 mode=""></image>
				<image src="//act.11h5.com/score/goods_img/image/20200723/11h5_shopchYBL3uNJwEXIV6rxujtMPmzc31DpHgSMTU5NTQ4Mjk2Mw==.jpg"
				 mode=""></image>
				<image src="//act.11h5.com/score/goods_img/image/20200723/11h5_shopT69eTpZDM7HiIYqPiFKWzvpHgPjWXIS9MTU5NTQ4Mjk2Ng==.jpg"
				 mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile: '',
				code: '',
				value: 0,
				show: false,
				background: {
					backgroundColor: '#55aaff',

					// 导航栏背景图
					// background: 'url(https://cdn.uviewui.com/uview/swiper/1.jpg) no-repeat',
					// 还可以设置背景图size属性
					// backgroundSize: 'cover',

					// 渐变色
					// backgroundImage: 'linear-gradient(45deg, rgb(85, 170, 255), rgb(255, 255, 255))'
				}
			}
		},
		onLoad(goDetail) {
			console.log('测试',goDetail)
			console.log('测试123',typeof(goDetail))
			
		},
		methods: {
			valChange(e) {
				console.log('当前值为: ' + e.value)
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
