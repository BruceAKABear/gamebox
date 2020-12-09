<template>
	<view class="content">
		<view class="head-box">
			<image class="head-img" :src="userInfo.avatar"></image>
			<view class="head-title">点击修改头像</view>
		</view>
		<view class="personal-box">
			<view class="personal-list">
				<view class="personal-list-name">昵称</view>
				<view style="display: flex;justify-content: space-evenly;">
					<view class="personal-list-info" v-model="username">{{userInfo.userName}}</view>
					<u-icon name="arrow-right" color="#c8c8c8" size="28"></u-icon>
				</view>
			</view>
			<view class="personal-list">
				<view class="personal-list-name">手机</view>
				<view style="display: flex;">
					<view class="personal-list-info">{{phone}}</view>
					<u-icon name="arrow-right" color="#c8c8c8" size="28"></u-icon>
				</view>
			</view>
			<view class="personal-list">
				<view class="personal-list-name">实名认证</view>
				<view class="" style="display: flex;" @click="gorealName">
					<view class="personal-list-info">{{realName}}</view>
					<u-icon name="arrow-right" color="#c8c8c8" size="28"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getUserToken,
		saveUserInfo,
		getUserInfo
	} from '../../utils/cs.js';
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#ffffff',
				},
				userInfo: {
					avatar: '', //头像
					phone: '', //手机号
					userName: '', //用户名
					realnamed: false
				},
				username: '',
				phone: '',
				realName: '', //实名认证状态
			}
		},
		onShow() {
			this.getInfo()
		},
		methods: {
			getInfo() {
				this.userInfo = getUserInfo()
				this.phone = this.userInfo.phone.replace(/([0-9]{3})([0-9]{4})([0-9]{4})/, "$1****$3")
				console.log('用户信息', this.userInfo)
				console.log('手机号码', this.phone)
				if (!this.userInfo.realnamed) {
					this.realName = '立即认证'
				} else {
					this.realName = '已认证'
				}
				if (this.userInfo.phone === '') {
					this.phone = '暂未绑定手机号'
				}
			},
			upfile() {
				let _this = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					success: (res) => {
						console.log(res.tempFilePaths[0]);
						uni.uploadFile({
							url: baseURL + '/api/Common/upload',
							filePath: res.tempFilePaths[0],
							name: 'file',
							formData: {
								userToken: getUserToken('userToken'),
							},
							success: (uploadFileRes) => {
								let data = JSON.parse(uploadFileRes.data)
								if (data.code == 1) {
									this.my_avatar = data.data.url;
								}
							}
						});
					}
				});
			},
			gorealName() {
				if (!this.userInfo.realnamed) {
					// uni.navigateTo({
					// 	url:''
					// })
					console.log('去认证')
				}
			}
		}
	}
</script>

<style>
	page {
		background-color: #f3f6fa;
	}

	.head-box {
		width: 100%;
		text-align: center;
		padding: 50rpx 0;
		background-color: #ffffff;
		margin-bottom: 20rpx;
	}

	.head-img {
		width: 120rpx;
		height: 130rpx;
		border-radius: 50%;
	}

	.head-title {
		color: #999999;
		font-size: 24rpx;
	}

	.personal-box {
		background-color: #ffffff;
	}

	.personal-list {
		display: flex;
		justify-content: space-between;
		border-bottom: 1rpx solid #e9ecf3;
		padding: 25rpx 20rpx;
	}

	.personal-list:last-child {
		border: 0;
	}

	.personal-list-name {
		font-size: 28rpx;
		font-weight: bold;
		color: #606266;
	}

	.personal-list-info {
		margin-right: 10rpx;
		font-size: 28rpx;
		color: #999999;
	}

	/* 
	.content {
		padding: 10rpx 10rpx;
	}

	.head-box {
		background-color: #ffffff;
		height: 120rpx;
		padding: 10rpx 20rpx;
		display: flex;
		justify-content: space-between;
	}

	.head-img {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		margin-top: 10rpx;
	}

	.personal {
		background-color: #e1e2e5;
		font-size: 26rpx;
		padding: 20rpx 20rpx;
		color: #999999;
	}

	.personal-box {
		background-color: #ffffff;
	}

	.personal-list {
		display: flex;
		justify-content: space-between;
		border-bottom: 1rpx solid #DCDFE6;
		padding: 20rpx 20rpx;
	}

	.personal-list-name {
		font-size: 28rpx;
		font-weight: bold;
		color: #606266;
	}

	.personal-list-info {
		margin-right: 10rpx;
		font-size: 28rpx;
		color: #999999;
	} */
</style>
