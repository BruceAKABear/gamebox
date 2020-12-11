<template>
	<view style="padding: 30rpx ;">
		<u-top-tips ref="uTips" navbar-height="0"></u-top-tips>
		<u-toast ref="uToast" />
		<view class="" style="text-align: center;width: 100%;margin-top: 50rpx;">实名认证</view>
		<view class="" style="width: 100%;margin-top: 40rpx;">
			<u-field style="margin-bottom: 20rpx;" v-model="name" label="姓名" placeholder="身份证上姓名">
			</u-field>
			<u-field style="margin-bottom: 20rpx;" v-model="idNumber" label="身份证号" placeholder="身份证号码"></u-field>
			<u-button type="success" @click="doRealName">认证</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				idNumber: ''
			}
		},
		methods: {

			doRealName() {
				//身份证号校验
				if (this.$u.test.idCard(this.idNumber)) {
					this.$u.api.realNameApi({
						name: this.name,
						idNumber: this.idNumber
					}).then(res => {
						if (res.status) {
							this.$refs.uToast.show({
								title: '实名认证成功',
								type: 'success',
								isTab: true,
								url: '/pages/index/index'
							})
						}

					})

				} else {
					this.$refs.uTips.show({
						title: '身份证号不正确',
						type: 'warning',
						duration: '1500'
					})
				}

			}

		}
	}
</script>

<style>

</style>
