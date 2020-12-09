<!-- 资讯详情 -->
<template>
	<view class="container" :style="'height:'+ screenHeight +'px !important;'">
		<!-- <u-navbar title="游戏公告" :background="background" titleColor="#ffffff" back-icon-color="#ffffff"></u-navbar> -->
		<view class="detail-content">
			<!-- 标题 -->
			<view class="info-title-box">
				<text>{{title}}</text>
			</view>
			<view class="info-time-box">
				<text>{{timer}}</text>
			</view>
			<!-- 描述 -->
		<!-- 	<view class="info-desc-box">
				<text>{{descrip}}</text>
			</view> -->
			<!-- 内容 -->
			<view class="info-content-box">
				<u-parse :html="content"></u-parse>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			//这里存放数据
			return {
				timer:'2020-11-10 19:36:28',
				title: '《传奇来了》新玩法',
				descrip: '露从今夜白、月是故乡明',
				content: `<p>传奇来了传奇来了传奇来了传奇来了传奇来了传奇来了传奇来了传奇来了传奇来了传奇来了传奇来了传奇来了传奇来了传奇来了传奇来了传奇来了传奇来了传奇来了传奇来了传奇来了传奇来了传奇来了传奇来了传奇来了传奇来了传奇来了传奇来了传奇来了传奇来了传奇来了传奇来了传奇来了传奇来了传奇来了传奇来了传奇来了传奇来了传奇来了传奇来了传奇来了传奇来了传奇来了</p>
				<img style="margin-top:20rpx;width:100%;" src="https://cdn.uviewui.com/uview/swiper/2.jpg" />`,
				background: {
					backgroundColor: '#55aaff',
				
					// 导航栏背景图
					// background: 'url(https://cdn.uviewui.com/uview/swiper/1.jpg) no-repeat',
					// 还可以设置背景图size属性
					// backgroundSize: 'cover',
				
					// 渐变色
					// backgroundImage: 'linear-gradient(45deg, rgb(85, 170, 255), rgb(255, 255, 255))'
				},
				// selectedInfo:
			};
		},
		onLoad() {
			this.screenHeight = uni.getSystemInfoSync().windowHeight;
		},
		methods:{
			// goback(){
				
			// }
		}
	}
</script>
<style lang="scss" scoped>
	.detail-content {
		padding: 20rpx;

		.info-title-box {
			display: flex;
			justify-content: center;
			font-size: 36rpx;
			font-weight: bold;
			margin-top: 50rpx;
		}

		.info-content-box {
			margin-top: 30rpx;
			padding: 15rpx;
			font-size: 30rpx;
			text-indent:2em;
			color: #606060;
		}
		.info-time-box{
			text-align: center;
			margin-top: 10rpx;
			color: #999999;
			font-size: 26rpx;
		}
		
		// .info-desc-box {
		// 	margin-top: 20rpx;
		// 	text-align: center;
		// 	padding: 20rpx;
		// 	font-size: 26rpx;
		// 	box-shadow: 0 0 6rpx #C8C9CC;

		// }



	}

	// .container{
	// 	position: relative;
	// }
	.info-btn {
		width: 100%;
		padding: 20rpx;
		text-align: center;
		font-size: 30rpx;
		color: #606266;
		// box-shadow: 0 0 6rpx #C8C9CC;
		// background-color: #f4f7fd;
	}
</style>
