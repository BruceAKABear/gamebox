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
					<view class="personal-list-info">{{userInfo.userName}}</view>
					<u-icon name="arrow-right" color="#c8c8c8" size="28"></u-icon>
				</view>
			</view>
			<view class="personal-list">
				<view class="personal-list-name">手机</view>
				<view style="display: flex;">
					<view class="personal-list-info">{{userInfo.phone}}</view>
					<u-icon name="arrow-right" color="#c8c8c8" size="28"></u-icon>
				</view>
			</view>
			<view class="personal-list">
				<view class="personal-list-name">实名认证</view>
				<view class="" style="display: flex;" @click="goRealName">
					<view class="personal-list-info">{{userInfo.realnamed?'已实名':'去实名'}}</view>
					<u-icon name="arrow-right" color="#c8c8c8" size="28"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {}
			}
		},
		onShow() {
			this.getUserInfo()
		},
		methods: {
			getUserInfo() {
				this.$u.api.getInfo().then(res => {
					if (res.status) {
						this.userInfo = res.data
						this.userInfo.phone = this.userInfo.phone.replace(/([0-9]{3})([0-9]{4})([0-9]{4})/, "$1****$3")
					}
				})
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
			goRealName() {
				if (!this.userInfo.realnamed) {
					//未实名，跳转实名页
					uni.navigateTo({
						url: '../myself/realname'
					})
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
		background-color: #19be6b;
		margin-bottom: 20rpx;
	}

	.head-img {
		width: 130rpx;
		height: 130rpx;
		border-radius: 50%;
	}

	.head-title {
		color: #FFFFFF;
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
