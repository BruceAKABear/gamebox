<template>
	<view class="container">
		<!-- #ifdef H5 -->
		<u-modal title="联系客服">
			<view class="" style="padding: 20rpx 20rpx;width: 100%;text-align: center;">
				<p style="text-align: center;margin: 10rpx;font-size: 30rpx;">长按识别下方二维码添加客服小姐姐！</p>
				<image style="width: 60%;" mode="widthFix" src="../../static/service.jpg"></image>
			</view>
		</u-modal>
		<view class="service-top">
			<view style="display: flex;width: 100%;margin: 0 10rpx;">
				<u-icon name="kefu-ermai" color="#55aaff" size="46"></u-icon>
				<view class="text-box">
					<view style="color: #555555;font-size: 24rpx;width: 400rpx;">在线客服：有问题，快来联系我</view>
					<u-button size="mini" class="contact-btn" type="default" @click="open">立即联系</u-button>
				</view>
			</view>
			<view style="display: flex;width: 100%;margin: 0 10rpx;">
				<u-icon name="weixin-fill" color="#19BE6B" size="46"></u-icon>
				<view class="text-box">
					<view style="color: #555555;font-size: 24rpx;width: 400rpx;">官方公众号：关注公众号 动态先知</view>
					<u-button size="mini" class="contact-btn" type="default" @click="contact">关注</u-button>
				</view>
			</view>
		</view>
		<!-- #endif -->
		<!-- app中 -->
		<!-- #ifdef APP-PLUS -->
		<view style="display: flex;justify-content: space-between;align-items: center;margin-top: 50rpx;">
			<view style="display: flex;align-items: center;">
				<u-icon name="weixin-fill" color="#19BE6B" size="46"></u-icon>
				<view style="color: #555555;font-size: 24rpx;margin-left: 10rpx;">有问题，快来联系我</view>
			</view>
			<view>
				<a href="weixin://" class="add" @click="copyWeChat(1)">添加客服</a>
			</view>
		</view>
		<view style="display: flex;justify-content: space-between;align-items: center;margin-top: 30rpx;">
			<view style="display: flex;align-items: center;">
				<u-icon name="weixin-fill" color="#19BE6B" size="46"></u-icon>
				<view style="color: #555555;font-size: 24rpx;margin-left: 10rpx;">关注公众号 动态先知</view>
			</view>
			<view>
				<a href="weixin://" class="add" @click="copyWeChat(2)">关注公众号</a>
			</view>
		</view>
		<!-- #endif -->

		<view class="service-bottom">
			<view style="padding: 30rpx 20rpx;width: 90%;">
				<p style="text-align: center;font-size: 30rpx;font-weight: 600;margin-bottom: 20rpx;">客服信息</p>
				<p style="font-size: 26rpx;font-weight: 600;margin-bottom: 15rpx;">客服在线时间：</p>
				<p style="font-size: 26rpx;color: #55aaff;margin-bottom: 15rpx;">工作日 09:00-18:00</p>
				<p style="font-size: 26rpx;font-weight: 600;margin-bottom: 15rpx;">温馨提示：</p>
				<p style="font-size: 26rpx;color: #82848A;text-indent:2em;">非在线时间，可能无法及时回复您，请先留言客服，在线后立即为您处理</p>
			</view>
			<view style="padding: 30rpx 20rpx;">
				<span style="font-size: 24rpx;color: #55aaff;">防骗提示：</span>
				<span style="font-size: 24rpx;">请注意甄别，谨防诈骗！！！</span>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#55aaff',
				},
				show: false,
				pageShow: false,
			}
		},
		methods: {
			contact() {
				window.open('https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MjM5MDE4MzU0NQ==&scene=124#wechat_redirect')
			},
			open() {
				this.show = true;
			},
			addWe() {
				this.addWeChat = true
			},
			copyWeChat(data) {
				if (data === 1) {
					uni.setClipboardData({
						data: 'XC2020525',
						success: function() {
							uni.showToast({
								title: '微信号复制成功',
								duration: 2000
							});
						}
					});
				} else if (data === 2) {
					uni.setClipboardData({
						data: '熙辰微游',
						success: function() {
							uni.showToast({
								title: '公众号复制成功',
								duration: 2000
							});
						}
					});
				}
			}
		}
	}
</script>

<style>
	.container {
		padding: 40rpx;
	}

	.text-box {
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		padding: 0 15rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.contact-btn {
		width: 150rpx;
		height: 50rpx;
		color: #55AAFF;
	}

	.add {
		display: block;
		text-decoration: none;
		width: 150rpx;
		height: 50rpx;
		color: #55AAFF;
		/* border: 1rpx solid #55AAFF; */
		font-size: 24rpx;
		margin-top: 25rpx;
	}

	.service-bottom {
		width: 100%;
		margin-top: 50rpx;
	}

	/* 充值弹窗 */
	.warp {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.rect {
		width: 150px;
		height: 160px;
		border-radius: 1em;
		background-color: #ffffff;
	}
</style>
