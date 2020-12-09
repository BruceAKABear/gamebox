<template>
	<view class="container">
		<!-- 用户信息 -->
		<view class="top-box-login" style="margin-bottom: 20rpx;" v-if="logged">
			<image class="top-box-img" :src="userInfos.avatar" mode=""></image>
			<view class="top-info">
				<view class="nickname">{{userInfos.userName}}</view>
				<view class="integral-box">
					<image class="integral-img" src="../../static/integral_num.png"></image>
					<view class="integral-num">{{logged?userInfos.points:0}}</view>
				</view>
			</view>
		</view>
		<!-- 未登录用户 -->
		<view class="top-box-login" style="margin-bottom: 20rpx;" v-if="!logged">
			<image class="top-box-img" src="../../static/head.jpg" mode=""></image>
			<view class="top-info">
				<view class="nickname">游客玩家</view>
				<view class="integral-box">
					<image class="integral-img" src="../../static/integral_num.png"></image>
					<view class="integral-num">0</view>
				</view>
			</view>
		</view>
		<!-- 积分 -->
		<view class="center-box">
			<view class="inv-h-w">
				<view :class="['inv-h',Inv==0?'inv-h-se':'']" @click="Inv=0">积分商城</view>
				<view :class="['inv-h',Inv==1?'inv-h-se':'']" @click="Inv=1">积分任务</view>
				<view :class="['inv-h',Inv==2?'inv-h-se':'']" @click="Inv=2">积分记录</view>
				<view :class="['inv-h',Inv==3?'inv-h-se':'']" @click="Inv=3">积分规则</view>
			</view>
			<!-- 积分商城 -->
			<view class="integralInfo-box" v-show="Inv == 0">
				<u-notice-bar mode="vertical" :list="list" style="color:#ffaa00 ;background-color: #f3f6fa;"></u-notice-bar>
				<view class="inv-h-w">
					<view :class="['inv-h',integralShop==0?'integralBox':'']" @click="integralShop=0">虚拟物品</view>
					<view :class="['inv-h',integralShop==1?'integralBox':'']" @click="integralShop=1">实物商品</view>
				</view>
				<!-- 虚拟物品 -->
				<view class="virtual" v-show="integralShop == 0">
					<view style="padding: 30rpx 30rpx;background-color: #ffffff;margin-bottom: 20rpx;border-bottom: 1rpx solid #DCDFE6;"
					 v-for="info in integralGift" :key="info.id">
						<view class="" style="display: flex;">
							<image style="width: 100rpx;height: 100rpx;" :src="info.game.thumb"></image>
							<view class="" style="height: 100rpx;line-height: 100rpx;margin-left: 30rpx;">{{info.game.name}}</view>
						</view>
						<view class="" style="display: flex;margin-top: 20rpx;height: 100rpx;" v-for="item in info.products">
							<view class="" style="width: 80%;">
								<span style="font-size: 28rpx;width: 100rpx;margin-right: 20rpx;">{{item.name}}</span>
								<span class="color-int">限领取1次</span>
								<!-- {{item.detail}} -->
								<p style="color: #999999;font-size: 26rpx;margin-top: 15rpx;padding-right: 10rpx;" v-html="item.detail"></p>
							</view>
							<button type="default" class="integral-btn">{{item.needPoints}}积分</button>
						</view>
					</view>
					<u-divider style="margin-top: 80rpx;">没有更多了</u-divider>
					<view style="text-align: center;font-size: 24rpx;margin: 20rpx;color: #999999;">适龄提示：适合18岁以上用户 </view>
				</view>
				<!-- 实物商品 -->
				<view class="" v-show="integralShop == 1">
					<view style="background-color: #ffffff;">
						<view style="display: flex; flex-direction: row;flex-wrap: wrap;margin: 0 5%;padding: 30rpx 0;">
							<view style="width: 50%;margin-bottom: 16upx;" v-for="info in entityList.records" :key="info.id" @click="goDetail(info)">
								<view>
									<image :src="info.thumb" style="width: 96%;justify-content: space-between;border-radius: 10rpx;height: 180rpx;"></image>
									<view style="text-align: left;font-size: 30rpx;">{{info.name}}</view>
									<view class="" style="width: 96%;display: flex;font-size: 24rpx;justify-content: space-between;margin-top: 10rpx;color: #999999;margin-bottom: 20rpx;">
										<view class="">{{info.needPoints}}积分</view>
										<view class="">剩余：{{info.stock}}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<u-divider style="margin: 20rpx 0;">没有更多了</u-divider>
					<view style="text-align: center;font-size: 24rpx;margin: 20rpx;color: #999999;">适龄提示：适合18岁以上用户 </view>
				</view>
			</view>
			<!-- 积分任务 -->
			<view class="integralInfo-box" v-show="Inv == 1">
				<view class="" style="background-color: #ffffff;margin-top: 10rpx;">
					<view class="task-box">
						<view class="task-btn-box">
							<image class="task-img" src="../../static/sign.png" mode=""></image>
						</view>
						<view class="task-info">
							<view style="display: flex;">
								<view style="font-size: 30rpx;">签到</view>
								<view class="task-type">日常</view>
							</view>
							<view style="font-size: 24rpx; color: #999999;margin-top: 10rpx;">明日再来即可获得10积分</view>
						</view>
						<button class="task-btn" type="default" @click="getPoints(1)">{{ischeckIn}}</button>
					</view>
					<view class="task-box">
						<view class="task-btn-box">
							<image class="task-img" src="../../static/money.png" mode=""></image>
						</view>
						<view class="task-info">
							<view style="display: flex;">
								<view style="font-size: 30rpx;">每日首充</view>
								<view class="task-type">日常</view>
							</view>
							<view style="font-size: 24rpx; color: #999999;margin-top: 10rpx;">每日首充可获得100积分</view>
						</view>
						<button class="task-btn" type="default" @click="getPoints(2)">{{isFirstCharge}}</button>
					</view>
					<!-- 充值弹窗 -->
					<u-mask :show="noPrepaid" @click="noPrepaid = false">
						<view class="warp">
							<view class="rect" @tap.stop>
								<view class="gopay-top">
									<image class="pay-logo" src="../../static/pay-logo.png" mode="widthFix"></image>
								</view>
								<view class="gopay-bottom">
									<view style="font-size: 28rpx;text-align: center;margin-top: 20rpx;">充值即可兑换相应积分</view>
									<u-button class="pay-btn" @click="gopay">去充值</u-button>
								</view>
							</view>
						</view>
					</u-mask>
					<u-mask :show="recharged" @click="recharged = false">
						<view class="warp">
							<view class="rect" @tap.stop>
								<view class="">
									<view style="width: 100%;text-align: center;margin-top: 40rpx;">
										<image class="pay-logo" src="../../static/success.png" mode="widthFix"></image>
									</view>
									<view class="exchange">兑换成功</view>
								</view>
							</view>
						</view>
					</u-mask>
					<view class="task-box">
						<view class="task-btn-box">
							<image class="task-img" src="../../static/pay.png" mode=""></image>
						</view>
						<view class="task-info">
							<view style="display: flex;">
								<view style="font-size: 30rpx;">充值</view>
								<view class="task-type">长期</view>
							</view>
							<view style="font-size: 24rpx; color: #999999;margin-top: 10rpx;">每充值一元获得10积分</view>
						</view>
						<button class="task-btn" type="default" @click="getPoints(3)">去完成</button>
					</view>
					<view class="task-box">
						<view class="task-btn-box">
							<image class="task-img" src="../../static/boundphone.png" mode=""></image>
						</view>
						<view class="task-info">
							<view style="display: flex;">
								<view style="font-size: 30rpx;">绑定手机</view>
								<view class="task-type">一次性</view>
							</view>
							<view style="font-size: 24rpx; color: #999999;margin-top: 10rpx;">完成绑定即可获得1000积分</view>
						</view>
						<button class="task-btn" type="default" @click="getPoints(4)">{{isBoundPhone}}</button>
					</view>
					<view class="task-box">
						<view class="task-btn-box">
							<image class="task-img" src="../../static/boundphone.png" mode=""></image>
						</view>
						<view class="task-info">
							<view style="display: flex;">
								<view style="font-size: 30rpx;">实名认证</view>
								<view class="task-type">一次性</view>
							</view>
							<view style="font-size: 24rpx; color: #999999;margin-top: 10rpx;">完成认证即可获得1000积分</view>
						</view>
						<button class="task-btn" type="default" @click="getPoints(5)">{{isReanlName}}</button>
					</view>
					<!-- 实名认证L -->
					<u-popup v-model="attestationShow" mode="center" border-radius="14" width="600rpx" height="450rpx">
						<view style="padding: 30rpx 30rpx;">
							<view class="" style="text-align: center;margin: 20rpx 0;width: 100%;">实名认证</view>
							<view class="" style="width: 100%;">
								<u-field style="margin-bottom: 20rpx;" v-model="realParam.mobile" label="姓名" placeholder="请填写您的真实姓名">
								</u-field>
								<u-field style="margin-bottom: 20rpx;" v-model="realParam.code" label="号码" placeholder="请填写证件号码"></u-field>
								<u-button type="success" @click="realNameDto">认证</u-button>
							</view>
						</view>
					</u-popup>
				</view>
			</view>
			<!-- 积分记录 -->
			<view class="integralInfo-box" v-show="Inv == 2">
				<view class="" style="background-color: #ffffff;margin-top: 10rpx;">
					<view class="inv-h-w">
						<view :class="['inv-h',integralBox==0?'integralBox':'']" @click="integralBox=0">获取记录</view>
						<view :class="['inv-h',integralBox==1?'integralBox':'']" @click="integralBox=1">兑换记录</view>
					</view>
					<view class="" v-show="integralBox == 0">
						<view class="" style="background-color: #ffffff;margin-top: 10rpx;">
							<view class="">
								<view class="" style="display: flex;justify-content: space-between;border-bottom: 1rpx solid #DCDFE6;padding: 10rpx 20rpx;"
								 v-for="info in inntergralInfo" :key="info.id">
									<view class="" style="line-height: 50rpx;">
										<view class="" style="font-size: 24rpx;color: #808080;">{{info.getDate}}</view>
										<!-- <view class="">{{info.type===1?'签到':'首充'}}</view> -->
										<view class="" v-if="info.type===1">签到</view>
										<view class="" v-else-if="info.type===2">每日首充</view>
										<view class="" v-else-if="info.type===3">充值</view>
										<view class="" v-else-if="info.type===4">绑定手机</view>
										<view class="" v-else-if="info.type===5">实名认证</view>
									</view>
									<view class="" style="line-height: 100rpx;font-size: 24rpx;color: #19BE6B;">+{{info.points}}积分</view>
								</view>
							</view>
							<u-divider style="padding-top: 30rpx;">没有更多了</u-divider>
							<view style="text-align: center;font-size: 24rpx;padding: 20rpx;color: #999999;">适龄提示：适合18岁以上用户 </view>
						</view>
						<view v-show="emptyData" style="height: 500rpx;">
							<u-empty text="无积分获取记录" mode="list"></u-empty>
						</view>
					</view>
					<view class="integralInfo-no" v-show="integralBox == 1">
						<view style="height: 500rpx;">
							<u-empty text="无兑换记录" mode="list"></u-empty>
						</view>
					</view>
				</view>
			</view>
			<!-- 积分规则 -->
			<view class="integralInfo-box" v-show="Inv == 3">
				<view class="" style="background-color: #ffffff;padding: 20rpx 0;">
					<view class="info-desc">
						<p class="info-title">一：什么是积分？</p>
						<p class="info-desc-info">积分是为了感谢广大熙辰微游粉丝对熙辰微游的支持，根据用户体验游戏，游戏中心活跃度等情况推出的一项长期的回馈服务。积分作为积分商城的一种货币，可用于兑换积分商城里面的各种虚拟奖励，游戏礼包等。</p>
						<p class="info-title">二：如何使用积分？</p>
						<p class="info-desc-info">进入积分商城，找到自己喜欢的商品并点击，即可显示商品详情，当达到所需的兑换条件时，点击兑换按钮即可。</p>
						<p class="info-title">三：哪些地方可以使用积分？</p>
						<p class="info-title">1、游戏特权</p>
						<p class="info-desc-info">限量游戏礼包，游戏道具随心兑换</p>
						<p class="info-title">2、商城礼物</p>
						<p class="info-desc-info">限时限量兑换虚拟商品</p>
						<p class="info-title">四：积分如何获取？</p>
						<p class="info-title">1、每日签到</p>
						<p class="info-desc-info">进入游戏中心“个人”界面或者积分商城界面，点击签到，即可获得对应的积分奖励。</p>
						<p class="info-title">2、游戏充值</p>
						<p class="info-desc-info">在平台任意游戏内每充值1元获得10积分</p>
						<p class="info-title">五：积分的有效期是多久？</p>
						<p class="info-desc-info">积分永久有效</p>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getUserToken,
		getUserInfo,
	} from '../../utils/cs.js';
	export default {
		data() {
			return {
				userInfos: {
					avatar: '',
					userName: '',
					id: ''
				},
				Inv: 0, //积分选项卡显示
				integralBox: 0, //获取记录&兑换记录选项卡
				integralShop: 0, //虚拟物品&实物商品选项卡
				pointstype: 0, //获取积分类型
				logged: false, //是否登录
				isReanlName: '+1000积分', //实名认证
				isBoundPhone: '+1000积分', //手机绑定
				isFirstCharge: '+100积分', //每日首充
				ischeckIn: '+10积分', //签到
				list: [
					'[二师兄]兑换了入门礼包',
					'[STAR]兑换了入门礼包',
					'[晴天]兑换了入门礼包',
					'[不忘初心]兑换了入门礼包'
				], //滚动通知
				//虚拟物品列表
				inntergralInfo: [],
				integralGift: [], //虚拟商品
				entityList: [], // 实物商品列表
				signIntegral: 10, //签到积分
				pointsstatus: {}, //积分状态
				attestationShow: false,
				realParam: {
					realname: '',
					number: '',
					type: ''
				}, //实名认证info
				emptyData: false,
				noPrepaid: false, //未充值弹窗
				recharged: false, //已充值弹窗
			}
		},
		onLoad() {},
		onShow() {
			this.getPointsStatus()
			this.getPointsPage()
			this.userInfos = getUserInfo()
			// this.logged = getUserToken() !== null
			// #ifdef H5
			this.logged = getUserToken() !== null
			// #endif
			// #ifdef APP-PLUS
			console.log('-------', getUserToken() == '')
			this.logged = getUserToken() !== null && getUserToken() !== ''
			console.log('logged', this.logged)
			// #endif
			this.getProductpageVirtual() //可兑换虚拟商品
			this.getProductPage() //可兑换实体商品
			this.productGetLog() // 兑换记录
			this.getProduct() // 领取商品
			if (!this.logged) {
				uni.navigateTo({
					url: '../login/login'
				})
			}
		},
		methods: {
			// 跳转道手机绑定页面
			goboundPhone() {
				uni.navigateTo({
					url: '../myself/boundPhone'
				})
			},
			// 跳转到实物商品详情页面
			goDetail(goDetail) {
				let str = JSON.stringify(goDetail)
				uni.navigateTo({
					url: '../integral/detail?detail=' + str
				})
			},
			getPointsPage() {
				this.$u.api.getPointsPage({
					pageNumber: 1
				}).then(res => {
					this.inntergralInfo = res.data
					if (res.data === null) {
						this.emptyData === true
					}
					console.log('分页查询积分', res.data)
				})
			},
			getPoints(data) {
				if (!this.logged) {
					uni.navigateTo({
						url: '../login/login'
					})
				} else {
					if (data === 1) {
						console.log(data)
						if (this.pointsstatus.checkIn) {
							uni.showToast({
								title: '已签到',
								duration: 2000
							});
						} else {
							this.$u.api.getPoints({
								type: data
							}).then(res => {
								uni.showToast({
									title: '签到成功',
									duration: 2000
								});
								console.log('签到获得积分', res)
							})

						}
					} else if (data === 2) {
						console.log(data)
					} else if (data === 3) {
						console.log(data)
						if (!this.pointsstatus.charge) {
							this.noPrepaid = true
						} else {
							this.recharged = true
						}
						// uni.navigateTo({
						// 	url: '../pay/pay'
						// })
					} else if (data === 4) {
						console.log(data)
						if (!this.pointsstatus.bindPhone) {
							uni.navigateTo({
								url: '../myself/boundPhone'
							})
						}
					} else if (data === 5) {
						console.log(data)
						if (!this.pointsstatus.realName) {
							this.attestationShow = true
						}
					}
				}
			},
			getPointsStatus() {
				this.$u.api.checkPointsStatus({}).then(res => {
					console.log('积分任务状态：', res)
					this.pointsstatus = res.data
					if (this.logged) {
						if (res.data.realName) {
							this.isReanlName = '已完成'
						}
						if (res.data.bindPhone) {
							this.isBoundPhone = '已绑定'
						}
						if (res.data.firstCharge) {
							this.isFirstCharge = '已完成'
						}
						if (res.data.checkIn) {
							this.ischeckIn = '已签到'
						}
					}
				})
			},
			// 实名认证接口
			realNameDto() {
				this.$u.api.realName({
					idNumber: this.realParam.number,
					name: this.realParam.realname,
					type: this.realParam.type
				}).then(res => {
					if (res.status) {
						console.log("实名认证成功", res)
						this.attestationShow = false;

					}
				})
			},
			//虚拟商品接口
			getProductpageVirtual() {
				this.$u.api.productpageVirtual({
					pageNumber: 1
				}).then(res => {
					this.integralGift = res.data
					console.log('虚拟商品', res.data)
				})
			},
			// 实体商品接口
			getProductPage() {
				this.$u.api.productPage({
					pageNumber: 1
				}).then(res => {
					this.entityList = res.data
					console.log('实体商品', res.data)
				})
			},
			// 兑换记录
			productGetLog() {
				this.$u.api.productGetLog({}).then(res => {
					console.log('兑换记录', res.data)
				})
			},
			// 领取商品
			getProduct() {
				this.$u.api.getProduct({}).then(res => {
					console.log('领取商品', res.data)
				})
			},
			//积分任务跳转首页去游戏充值
			gopay() {
				uni.switchTab({
					url: '../index/index'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	// page {
	// 	background-color: #f3f6fa;
	// }

	.container {
		width: 100%;
	}

	.top-box-img {
		width: 80rpx;
		height: 80rpx;
		margin-top: 25rpx;
		border-radius: 50%;
	}

	.top-box-login {
		padding: 0 25rpx;
		width: 100%;
		height: 130rpx;
		background-color: #ffffff;
		display: flex;
		border-bottom: 1rpx solid #DCDFE6;
	}

	.top-info {
		width: 60%;
		margin-top: 25rpx;
		margin-left: 20rpx;
		height: 120rpx;
		color: #606266;
	}

	.nickname {
		height: 50rpx;
		line-height: 50rpx;
		font-size: 26rpx;
	}

	.message {
		height: 130rpx;
		line-height: 130rpx;
	}

	.integral-box {
		display: flex;
		margin-top: 5rpx;
	}

	.integral-num {
		font-size: 28rpx;
		color: #999999;
	}

	.integral-img {
		width: 35rpx;
		height: 35rpx;
	}

	.inv-h-w {
		background-color: #FFFFFF;
		height: 80rpx;
		display: flex;
	}

	.inv-h {
		font-size: 30upx;
		flex: 1;
		text-align: center;
		color: #838383;
		height: 80rpx;
		line-height: 80rpx;
	}

	.inv-h-se {
		color: #ffffff;
		background-color: #fe9b51;
		// background-color: #f9c41f;
	}

	.integralBox {
		color: #fe9b51;
		border-bottom: 1rpx solid #fe9b51;
		// border-bottom: 1rpx solid #5BA7FF;
	}

	.task-box {
		display: flex;
		height: 150rpx;
		border-bottom: 1rpx solid #ecebef;
	}

	.task-btn {
		width: 130rpx;
		height: 50rpx;
		background-color: #ffffff;
		color: #999999;
		border: 1rpx solid #999999;
		margin-top: 50rpx;
		font-size: 24rpx;
		line-height: 50rpx;
		padding: 0;
	}

	.task-info {
		width: 60%;
		height: 80rpx;
		margin-top: 30rpx;
	}

	.task-img {
		width: 50rpx;
		height: 50rpx;
		margin: 15rpx 15rpx;
	}

	.task-btn-box {
		// background-color: #2697fd;
		background-color: #f9c41f;
		border-radius: 50%;
		width: 80rpx;
		height: 80rpx;
		margin: 25rpx 30rpx;
	}

	.info-desc {
		padding: 20rpx 30rpx;
	}

	.info-title {
		margin: 20rpx 0;
	}

	.info-desc-info {
		font-size: 28rpx;
		color: #8a8a8a;
	}

	.virtual {
		margin-top: 20rpx;
	}

	.integral-btn {
		font-size: 26rpx;
		width: 200rpx;
		height: 50rpx;
		background-color: #9a9a9a;
		color: #ffffff;
		margin-top: 25rpx;
		text-align: center;
		line-height: 50rpx;
	}

	.color-int {
		background-color: #F29100;
		color: #ffffff;
		padding: 0 10rpx;
		font-size: 8px;
		border-radius: 10rpx;
		margin-right: 30rpx;
	}

	.integralInfo-no {
		height: 500rpx;
		text-align: center;
		line-height: 600rpx;
		font-size: 26rpx;
		color: #999999;
	}

	.task-type {
		font-size: 24rpx;
		// background-color: #2697fd;
		background-color: #ff8215;
		color: #ffffff;
		padding: 0 5rpx;
		border-radius: 10rpx;
		margin-left: 10rpx;
	}

	.getyzmbut {
		background-color: #19BE6B;
		color: #ffffff;
		width: 300rpx;
		height: 70rpx;
		font-size: 12px;
		margin-top: 10px;
		padding: 0;
	}

	// 充值弹窗
	.warp {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.rect {
		width: 170px;
		height: 220px;
		border-radius: 1em;
		// background-image: linear-gradient(#f9c41f, #eb4200);
		// background-color: #FFFFFF;
		background-color: #fae1be;
	}

	.gopay-top {
		width: 100%;
		padding: 20rpx 0;
		text-align: center;
	}

	.pay-logo {
		width: 180rpx;
	}

	.pay-btn {
		width: 90%;
		color: #FFFFFF;
		background-color: #fa561f;
		margin-top: 20rpx;
		font-size: 28rpx;
	}

	.exchange {
		font-size: 38rpx;
		text-align: center;
	}
</style>
