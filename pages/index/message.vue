<!-- 资讯详情 -->
<template>
	<view class="container">
		<view class="detail-content">
			<!-- 标题 -->
			<view class="" style="border-bottom: 1rpx solid #e7e8eb;padding-bottom: 20rpx;">
				<view class="info-title-box"> {{messagelist.title}} </view>
				<view class="info-time-box">熙辰微游 {{messagelist.updateTime}} </view>
			</view>
			<!-- 内容 -->
			<view class="info-content-box">
				<u-parse :html="messagelist.content"></u-parse>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			//这里存放数据
			return {
				messagelist: {}
			};
		},
		onLoad(options) {
			this.screenHeight = uni.getSystemInfoSync().windowHeight;
			let messageinfo = JSON.parse(options.messageinfo);
			this.messagelist = messageinfo
			console.log(this.messagelist)
		},
		methods: {

		}
	}
</script>
<style lang="scss" scoped>
	.detail-content {
		padding: 0 20rpx;
	}


	.info-content-box {
		margin-top: 30rpx;
		padding: 15rpx;
		font-size: 30rpx;
		text-indent: 2em;
		color: #606060;
	}

	.info-title-box {
		font-size: 36rpx;
		font-weight: bold;
		margin-top: 50rpx;
	}

	.info-time-box {
		text-align: left;
		margin-top: 10rpx;
		color: #999999;
		font-size: 24rpx;
	}

	.info-btn {
		width: 100%;
		padding: 20rpx;
		text-align: center;
		font-size: 30rpx;
		color: #606266;
		box-sizing: border-box;
	}
</style>
