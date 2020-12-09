<template>
	<view>
		<view style="padding: 30rpx 30rpx;">
			<view class="" style="text-align: center;margin: 20rpx 0;width: 100%;">实名认证</view>
			<view class="" style="width: 100%;">
				<u-field style="margin-bottom: 20rpx;" v-model="realParam.mobile" label="姓名" placeholder="请填写您的真实姓名">
				</u-field>
				<u-field style="margin-bottom: 20rpx;" v-model="realParam.code" label="证件" placeholder="请填写证件号码"></u-field>
				<u-button type="success" @click="realNameDto">认证</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				realParam: {
					realname: '',
					number: '',
					type: ''
				}, //实名认证info
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
