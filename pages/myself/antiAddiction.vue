<template>
	<view class="container">
		<!-- <u-navbar title="防沉迷系统说明" :background="background" titleColor="#ffffff" back-icon-color="#ffffff"></u-navbar> -->
		<view class="content" style="padding: 50rpx 30rpx;">
			<h2 style="text-align: center;margin-bottom:30rpx;color: #555555;">防沉迷系统</h2>
			<p style="text-indent:2em;font-size: 32rpx;color: #808080;margin-bottom:30rpx;">防沉迷系统，是根据政府《网络游戏防沉迷系统开发标准》及其相关要求开发实施，自2007年7月16日起已正式实施。旨在解决未成年人沉迷网络游戏的现状，让未成年人无法依赖长时间的在线来获得游戏内个人能力的增长，报偿值的增加，有效控制未成年人使用者的在线时间，改变不利于未成年人身心健康的不良游戏习惯。</p>
			<h3 style="margin-bottom:30rpx;color: #606266;">一、防沉迷系统设计目的</h3>
			<p style="text-indent:2em;font-size: 32rpx;color: #808080;margin-bottom:30rpx;"> 防止未成年人过度游戏，倡导健康游戏习惯，保护未成年人的合法权益；帮助法定监护人了解其监护对象是否参与此网络游戏、是否受到防沉迷系统的保护等情况；在实现上述目的的同时，兼顾成年玩家自主支配其游戏时间的合法权益。</p>
			<h3 style="margin-bottom:30rpx;color: #606266;">二、实名认证系统与防沉迷系统的关系</h3>
			<p style="text-indent:2em;font-size: 32rpx;color: #808080;margin-bottom:30rpx;">实名认证系统用于收集玩家的身份证号及姓名，并以此作为判断玩家是否需要受到防沉迷系统保护的重要依据。</p>
			<p style="text-indent:2em;font-size: 32rpx;color: #808080;margin-bottom:30rpx;">实名信息显示为不满18周岁的用户，将被初步判定为未成年人，纳入防沉迷状态。其实名信息于成年后用户自行至实名认证提交至公安机关进行验证。</p>
			<p style="text-indent:2em;font-size: 32rpx;color: #808080;margin-bottom:30rpx;">实名信息显示为已满18周岁的用户，将被初步判定为成年人。其实名信息在等待公安部门验证前将被处于非防沉迷状态，如果通过公安部门的实名验证，则正式进入非防沉迷状态。如失败，则被纳入防沉迷状态。在注册后任何时间用户都可自行至实名认证提交实名信息至公安机关进行验证。</p>
			<p style="text-indent:2em;font-size: 32rpx;color: #808080;margin-bottom:30rpx;">实名信息验证成功的帐号不纳入防沉迷系统。相反，认证失败的帐号将被纳入防沉迷系统。</p>
			<h3 style="margin-bottom:30rpx;color: #606266;">三、防沉迷系统的具体内容和执行方法</h3>
			<p style="text-indent:2em;font-size: 32rpx;color: #808080;margin-bottom:30rpx;">（一）确定健康游戏时间标准</p>
			<p style="text-indent:2em;font-size: 32rpx;color: #808080;margin-bottom:30rpx;">1、定义使用者累计3小时以内的游戏时间为“健康”游戏时间。</p>
			<p style="text-indent:2em;font-size: 32rpx;color: #808080;margin-bottom:30rpx;">2、定义使用者在累计游戏3小时之后，再持续下去的2小时游戏时间为“疲劳”游戏时间。</p>
			<p style="text-indent:2em;font-size: 32rpx;color: #808080;margin-bottom:30rpx;">3、定义使用者累计游戏时间超过5小时为“不健康”游戏时间。</p>
			<p style="text-indent:2em;font-size: 32rpx;color: #808080;margin-bottom:30rpx;">（二）促进使用者养成健康的游戏习惯</p>
			<p style="text-indent:2em;font-size: 32rpx;color: #808080;margin-bottom:30rpx;">为保障使用者适度使用并有足够的休息时间，对游戏的间隔时间和收益进行限制和引导的处理办法：</p>
			<p style="text-indent:2em;font-size: 32rpx;color: #808080;margin-bottom:30rpx;">1、根据以上考虑，不同累计在线时间的游戏收益处理如下：累计在线时间在3小时以内，游戏收益为正常；3-5小时内，收益降为正常值的50%；5小时以上，收益降为0。</p>
			<p style="text-indent:2em;font-size: 32rpx;color: #808080;margin-bottom:30rpx;">2、由于不同的游戏有不同范畴，因此对于当前角色扮演类的网络游戏，建议定义为“游戏收益=游戏中获得的经验值＋获得的虚拟物品”。收益为50%，则指获得经验值减半，虚拟物品减半。收益为0，则指无法获得经验值，无法获得虚拟物品。</p>
			<p style="text-indent:2em;font-size: 32rpx;color: #808080;margin-bottom:30rpx;">3、定义使用者在累计游戏3小时之后，再持续下去的2小时游戏时间为“疲劳”游戏时间。</p>
			<p style="text-indent:2em;font-size: 32rpx;color: #808080;margin-bottom:30rpx;">4、定义使用者累计游戏时间超过5小时为“不健康”游戏时间。</p>
			<p style="text-indent:2em;font-size: 32rpx;color: #808080;margin-bottom:30rpx;">（三）初始化累计时间</p>
			<p style="text-indent:2em;font-size: 32rpx;color: #808080;margin-bottom:30rpx;">由于使用者上下线的行为比较复杂，会出现以下多种情况，因此限时与提示的实现方法如下：</p>
			<p style="text-indent:2em;font-size: 32rpx;color: #808080;margin-bottom:30rpx;">1、使用者在线后，其持续在线时间将累计计算，称为“累计在线时间”。</p>
			<p style="text-indent:2em;font-size: 32rpx;color: #808080;margin-bottom:30rpx;">2、使用者下线后，其不在线时间也将累计计算，称为“累计下线时间”。</p>
			<p style="text-indent:2em;font-size: 32rpx;color: #808080;margin-bottom:30rpx;">3、使用者累计在线时间在3小时以内的，游戏收益正常。每累计在线时间满1小时，应提醒一次：“您累计在线时间已满1小时。”至累计在线时间满3小时时，应提醒：“您累计在线时间已满3小时，请您下线休息，做适当身体活动。”如果累计在线时间超过3小时进入第4－5小时，在开始进入时就应做出警示：“您已经进入疲劳游戏时间，您的游戏收益将降为正常值的50%，请您尽快下线休息，做适当身体活动。”此后，应每30分钟警示一次。</p>
			<p style="text-indent:2em;font-size: 32rpx;color: #808080;margin-bottom:30rpx;">4、如果累计在线时间超过5小时进入第6小时，在开始进入时就应做出警示：“您已进入不健康游戏时间，请您立即下线休息。如不下线，您的身体健康将受到损害，您的收益已降为零。”此后，应每15分钟警示一次。</p>
			<p style="text-indent:2em;font-size: 32rpx;color: #808080;margin-bottom:30rpx;">5、受防沉迷系统限制的用户，当下线时间超过5小时时，累计游戏时间初始化为0。初始化后进入游戏就会开始重新计算累计游戏时间。</p>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#55aaff',
				}
			}
		},
		methods: {

		}
	}
</script>

<style>
	page {
		background-color: #f3f6fa;
	}
</style>
