<template>
	<view class="container">
		<!-- <u-navbar title="游戏详情" :background="background" titleColor="#ffffff" back-icon-color="#ffffff"></u-navbar> -->
		<view class="game-info">
			<view class="game-top">
				<image class="game-top-img" :src="gameInfo.thumb" mode=""></image>
				<view class="game-top-text">
					<p style="font-weight: 600;">{{gameInfo.name}}</p>
					<p style="font-size: 26rpx;color: #606266;">{{gameInfo.description}}</p>
				</view>
			</view>
			<view class="carousel">
				<scroll-view @scroll="scroll1" :scroll-left="scrollLeft" class="scroll-x x" scroll-x="true">
					<view class="scroll-list-x">
						<!-- <image  :src="info.image" mode="widthFix"></image> -->
						<swiper class="swiper" autoplay="true" interval="3000" duration="1500">
							<swiper-item v-for="(info,index) in descimg" :key="index">
								<image style="width: 100%;" :src="info.image" mode="widthFix"></image>
							</swiper-item>
						</swiper>
					</view>
				</scroll-view>
			</view>
			<view class="game-desc">
				<view class="" style="font-size: 32rpx;margin: 20rpx 0;font-weight: 600;">游戏简介：</view>
				<view class="" style="font-size: 26rpx;color: #606266;text-indent:2em;">{{gameInfo.content}}</view>
			</view>
		</view>
		<view class="game-btn">
			<u-button class="btn-block" @click="goGame(gameInfo)">进入游戏</u-button>
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
			console.log(this.gameInfo)
			console.log(gamedesc);
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
			console.log('轮播图', imageList)

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
				}).then(res => {
					console.log('玩游戏上报', res)
				})
			},
			// 点击跳转游戏链接
			goGame(info) {
				if (this.logged = getUserToken() !== null) {
					uni.navigateTo({
						url: '../test/test?gameUrl=' + info.entryUrl
					})
					this.startGame(info)
				} else {
					console.log('请登录')
					uni.navigateTo({
						url:'../login/login'
					})
				}
			},
			phoneLogin() {
				this.loginshow = false;
				uni.navigateTo({
					url:'../login/login'
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	page {
		background-color: #f3f6fa;
	}

	.game-top {
		background-color: #ffffff;
		display: flex;
		height: 150rpx;
	}

	.game-top,
	.carousel,
	.game-desc {
		padding: 30rpx 30rpx;
		background-color: #ffffff;
	}

	.game-top-text {
		height: 150rpx;
		line-height: 70rpx;
		margin-left: 30rpx;
	}

	.game-top-img {
		width: 150rpx;
		height: 150rpx;
	}


	.scroll-x,
	.scroll-list-x {
		width: 100%;
		height: 300rpx;
		text-align: center;
		line-height: 300rpx;
		display: inline-block;
	}

	.x {
		flex-wrap: nowrap;
		white-space: nowrap;
	}

	.btn-block {
		width: 100%;
		position: fixed; //将button按钮固定在页面底部，注意，：和；是英文的哦，一定不要写成中文哦。
		bottom: 5px;
		background-color: #55aaff;
		color: #ffffff;
	}

	.game-desc {
		padding-bottom: 80rpx;
	}
</style>
