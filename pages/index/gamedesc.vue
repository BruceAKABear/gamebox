<template>
	<view class="container">
		<view class="game-info">
			<view class="game-top">
				<image class="game-top-img" :src="gameInfo.thumb" mode="widthFix"></image>
				<view style="position: relative;height: 170rpx;">
					<view class="game-top-text">
						<p style="font-weight: 600;">{{gameInfo.name}}</p>
						<p style="font-size: 24rpx;color: #8c8f95;margin-top: 5rpx; word-break:break-all;">{{gameInfo.description}}</p>
					</view>
					<u-button type="success" size="mini" class="btn-block" @click="goGame(gameInfo)">进入游戏</u-button>
				</view>
			</view>
			<view>
				<u-grid :col="2">
					<u-grid-item style="background-color: #f8f8f8;">
						<view class="grid-text">语言</view>
						<view class="grid-text">中文</view>
					</u-grid-item>
					<u-grid-item style="background-color: #f8f8f8;border-left: 1rpx solid #C8C9CC;">
						<view class="grid-text">年龄</view>
						<view class="grid-text">18+</view>
					</u-grid-item>
				</u-grid>
			</view>
			<view class="carousel">
				<view class="" style="font-size: 32rpx;margin: 20rpx 0;font-weight: 600;">预览：</view>
				<scroll-view @scroll="scroll1" :scroll-left="scrollLeft" class="scroll-x x" scroll-x="true">
					<view class="scroll-list-x">
						<!-- <image  :src="info.image" mode="widthFix"></image> -->
						<swiper class="swiper" autoplay="true" interval="4000" duration="1500">
							<swiper-item v-for="(info,index) in descimg" :key="index">
								<image style="width: 98%;border-radius: 10rpx;" :src="info.image" mode="widthFix"></image>
							</swiper-item>
						</swiper>
					</view>
				</scroll-view>
			</view>
			<view class="game-desc">
				<view class="" style="font-size: 32rpx;margin: 20rpx 0;font-weight: 600;">游戏简介：</view>
				<view class="" style="font-size: 26rpx;color: #606266;text-indent:2em; word-break:break-all;">{{gameInfo.content}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		saveUserToken,
		getUserToken,
		saveUserInfo,
		getUserInfo,
		clearUserInfo
	} from '../../utils/cs.js';
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#55aaff',
				},
				//当前距离顶部位置
				scrollTop: 0,
				scrollLeft: 0,
				old: {
					//记录距离顶部位置
					scrollTop: 0,
					scrollLeft: 0
				},
				gameInfo: [],
				content: '',
				descimg: [],
				logged: false,
			}
		},
		onLoad(options) {
			let gamedesc = JSON.parse(options.jsonStr);
			this.gameInfo = gamedesc
			let pics = gamedesc.bannerPics.split(',')
			var imageList = [];
			pics.forEach((item, index) => {
				const image = item.split(",")[0]
				let obj = {
					image
				}
				imageList.push(obj)
			})
			this.descimg = imageList

		},
		methods: {
			scroll(e) {
				this.old.scrollTop = e.detail.scrollTop
			},
			goTop(e) {
				//给当前距离顶部位置赋值
				this.scrollTop = this.old.scrollTop
				//异步更新距离顶部位置
				this.$nextTick(function() {
					this.scrollTop = 0
				});
			},
			scroll1(e) {
				this.old.scrollLeft = e.detail.scrollLeft
			},
			//开始玩游戏上报
			startGame(info) {
				this.$u.api.startGame({
					entryUrl: info.entryUrl,
					id: info.id,
					name: info.name,
					thumb: info.thumb
				}).then(res => {})
			},
			// 点击跳转游戏链接
			goGame(info) {
				if (this.logged = getUserToken() !== null) {
					uni.navigateTo({
						url: '../test/test?gameUrl=' + info.entryUrl
					})
					this.startGame(info)
				} else {
					uni.navigateTo({
						url: '../login/login'
					})
				}
			},
			phoneLogin() {
				this.loginshow = false;
				uni.navigateTo({
					url: '../login/login'
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.grid-text {
		font-size: 28rpx;
		margin-top: 4rpx;
	}

	.game-info {
		padding-top: 30rpx;
	}

	.game-top {
		background-color: #ffffff;
		display: flex;
		height: 180rpx;
	}

	.game-top,
	.carousel,
	.game-desc {
		padding: 15rpx 30rpx;
		background-color: #ffffff;
	}

	.game-top-text {
		margin-left: 30rpx;
	}

	.game-top-img {
		width: 180rpx;
	}


	.scroll-x,
	.scroll-list-x {
		width: 100%;
		text-align: center;
		display: inline-block;
	}

	.x {
		flex-wrap: nowrap;
		white-space: nowrap;
	}

	.btn-block {
		position: absolute;
		bottom: 0;
		left: 30rpx;

	}

	.headtop-img {
		width: 100%;
	}
</style>
