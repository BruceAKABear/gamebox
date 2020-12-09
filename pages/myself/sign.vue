<template>
	<view class="all">
		<view>
			<!-- 显示年月 -->
			<view style="text-align: center;margin-top: 20rpx;">{{cur_year || "--"}} 年 {{cur_month || "--"}} 月</view>
			<!-- 显示星期 -->
			<view class="week" v-if="langType=='ch'">
				<view v-for="(item,index) in weeks_ch" :key="index">{{item}}</view>
			</view>
			<view class="week" v-else>
				<view v-for="(item,index) in weeks_en" :key="index">{{item}}</view>
			</view>
			<view class="myDateTable">
				<view v-for="(item,j) in days" :key="j" class='dateCell'>
					<view v-if="item.date==undefined||item.date == null" class='cell'>
						<text :decode="true">&nbsp;&nbsp;</text>
					</view>
					<view v-else>
						<!-- 已签到日期 -->
						<view v-if="item.isSign == true" class='cell greenColor bgWhite  '>
							<text>{{item.date}}</text>
						</view>
						<!-- 漏签 -->
						<view @click="clickSignUp(item.date,0)" class="cell redColor bgGray" v-else-if="cur_year<toYear||(cur_year==toYear&&cur_month<toMonth)||(cur_year==toYear&&cur_month==toMonth&&item.date<today)">
							<!-- 小程序不兼容这个 v-else-if="(new Date(cur_year+'-'+cur_month+'-'+item.date))<(new Date())"> -->
							<text>{{item.date}}</text>
						</view>
						<!-- 今日未签到-->
						<view @click="clickSignUp(item.date,1)" class="cell whiteColor bgBlue" v-else-if="item.date==today&&cur_month==toMonth&&cur_year==toYear">
							<text>签到</text>
						</view>
						<!-- 当前日期之后 -->
						<view class="whiteColor cell" v-else>
							<text>{{item.date}}</text>
						</view>
					</view>

				</view>
			</view>
			<view class="">
				<view style="text-align: center;margin: 20rpx 0;">本月可补签x次</view>
				<view class="TipArea">注：每日首充即可领取一张补签卡，仅限本月使用有效，次月无效。每日仅可使用一张补签卡</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				days: [],
				SignUp: [],
				cur_year: 0, //当前选的年
				cur_month: 0, //当前选的月
				today: parseInt(new Date().getDate()), //本日
				toMonth: parseInt(new Date().getMonth() + 1), //本月
				toYear: parseInt(new Date().getFullYear()), //本年
				weeks_ch: ['日', '一', '二', '三', '四', '五', '六'],
				weeks_en: ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'],
				background: {
					backgroundColor: '#55aaff',
				},
				isSignCheck: false, //查询签到状态
			};
		},
		props: {
			sendYear: {
				type: Number,
				default: new Date().getFullYear()
			},
			sendMonth: {
				type: Number,
				default: new Date().getMonth() + 1
			},
			dataSource: { //已签到的数据源
				type: Array,
				default: () => {
					return []
				}
			},
			langType: { //只是示例一个翻译而已，要想所有都翻译自己可以再加加
				type: String,
				default: "ch"
			},
		},
		created() {
			this.cur_year = this.sendYear;
			this.cur_month = this.sendMonth;
			this.SignUp = this.dataSource;

			this.calculateEmptyGrids(this.cur_year, this.cur_month);
			this.calculateDays(this.cur_year, this.cur_month);
			this.onJudgeSign();
		},
		watch: {
			dataSource: 'onResChange',
		},
		onShow() {
			this.getPointsStatus()
			console.log('onshow', this.days);
		},
		methods: {
			// 获取当月共多少天
			getThisMonthDays(year, month) {
				return new Date(year, month, 0).getDate()
			},
			// 获取当月第一天星期几
			getFirstDayOfWeek(year, month) {
				return new Date(Date.UTC(year, month - 1, 1)).getDay();
			},
			// 计算当月1号前空了几个格子，把它填充在days数组的前面
			calculateEmptyGrids(year, month) {
				//计算每个月时要清零
				this.days = [];
				const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
				if (firstDayOfWeek > 0) {
					for (let i = 0; i < firstDayOfWeek; i++) {
						var obj = {
							date: null,
							isSign: false
						}
						this.days.push(obj);
					}
				}
			},

			// 绘制当月天数占的格子，并把它放到days数组中
			calculateDays(year, month) {

				const thisMonthDays = this.getThisMonthDays(year, month);
				// this.columnsLen=Math.ceil(thisMonthDays/7);
				// console.log(this.columnsLen);
				for (let i = 1; i <= thisMonthDays; i++) {
					var obj = {
						date: i,
						isSign: false
					}
					this.days.push(obj);
				}
				// console.log(this.days);

			},

			onResChange(newD, oldD) {
				this.SignUp = newD;
				this.onJudgeSign();
			},
			//匹配判断当月与当月哪些日子签到打卡
			onJudgeSign() {
				var signs = this.SignUp;
				var daysArr = this.days;
				for (var i = 0; i < signs.length; i++) {
					// #ifdef H5
					var current = new Date(signs[i].replace(/-/g, "/"));
					// #endif
					var year = current.getFullYear();
					var month = current.getMonth() + 1;
					var day = current.getDate();
					day = parseInt(day);
					for (var j = 0; j < daysArr.length; j++) {
						//年月日相同则打卡成功   						
						if (year == this.cur_year && month == this.cur_month && daysArr[j].date == day) {
							//&& signs[i].isSign == "今日已打卡"
							// console.log(daysArr[j].date, day);
							// daysArr[j].isSign = true;

							if (this.isSignCheck) {
								// uni.showToast({
								// 	title: '已签到',
								// 	duration: 2000
								// });
								console.log('已签到')
								// daysArr[j].isSign = true;
								this.days[j].isSign = true;
								this.isSignCheck = true
								console.log(this.days);

							} else {
								this.$u.api.getPoints({
									type: 1
								}).then(res => {
									console.log('签到获得积分', res)
									// console.log(this.days);
									// uni.navigateBack();
									daysArr[j].isSign = true;
									this.isSignCheck = true
								})

							}

							console.log('isSignCheck', this.isSignCheck)
						}
					}
				}
				this.days = daysArr;
			},

			clickSignUp(date, type) { //type=0补签，type=1当日签到		

				var str = "签到";
				if (type == 0) { //如果不需要补签功能直接在这阻止不执行后面的代码就行。
					str = "补签";
				}
				uni.showToast({
					title: str + "成功" + date + "号",
					icon: 'success',
					duration: 2000
				});

				// if (this.isSignCheck) {
				// 	console.log(this.days);
				// 	uni.showToast({
				// 		title: '已签到',
				// 		duration: 2000
				// 	});
				// } else {
				// 	this.$u.api.getPoints({
				// 		type: 1
				// 	}).then(res => {
				// 		var str = "签到";
				// 		if (type == 0) { //如果不需要补签功能直接在这阻止不执行后面的代码就行。
				// 			str = "补签";
				// 		}
				// 		uni.showToast({
				// 			title: str + "成功" + date + "号",
				// 			icon: 'success',
				// 			duration: 2000
				// 		});
				// 		console.log('签到获得积分', res)
				// 		// console.log(this.days);
				// 		// uni.navigateBack();
				// 	})

				// }


				this.SignUp.push(this.cur_year + "-" + this.cur_month + "-" + date); //自动加假数据，写了接口就不用了

				console.log('SignUp', this.SignUp);
				// this.$forceUpdate();

				// this.$emit('clickChange', this.cur_year + "-" + this.cur_month + "-" + date); //传给调用模板页面

				//refresh
				this.onJudgeSign();

			},
			// 当天签到状态
			getPointsStatus() {
				this.$u.api.checkPointsStatus({}).then(res => {
					this.isSignCheck = res.data.checkIn
					if (res.data.checkIn) {
						this.days.isSign = true
					}
					console.log('签到状态:', res.data.checkIn)
				})
			},
			// getPoints(data) {
			// 	if (data === 1) {
			// 		console.log(data)
			// 		if (this.isSignCheck) {
			// 			uni.showToast({
			// 				title: '已签到',
			// 				duration: 2000
			// 			});
			// 		} else {
			// 			this.$u.api.getPoints({
			// 				type: data
			// 			}).then(res => {
			// 				uni.showToast({
			// 					title: '签到成功',
			// 					duration: 2000
			// 				});
			// 				console.log('签到获得积分', res)
			// 				uni.navigateBack(); 
			// 			})

			// 		}
			// 	}
			// },
		}
	}
</script>

<style>
	page {
		height: 100%;
		width: 100%;
	}

	.all .bar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin: 30rpx 20rpx;
		padding: 10rpx;
	}

	.bar .barbtn {
		height: 30px;
		line-height: 30px;
		font-size: 12px;
	}

	.all .week {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 20rpx;
		padding-left: 40rpx;
		padding-right: 40rpx;
		margin: 20rpx;
		border-radius: 10px;
		background-color: #fff;
	}

	.myDateTable {
		margin: 2.5vw;
		padding: 2vw;
		border-radius: 10px;
		background: linear-gradient(#74AADA, #94db98);
	}

	.myDateTable .dateCell {
		width: 11vw;
		padding: 1vw;
		display: inline-block;
		text-align: center;
		font-size: 16px;
	}

	.dateCell .cell {
		display: flex;
		border-radius: 50%;
		height: 11vw;
		justify-content: center;
		align-items: center;
	}


	.whiteColor {
		color: #fff;
	}

	.greenColor {
		color: #01b90b;
		font-weight: bold;
	}

	.bgWhite {
		background-color: #fff;
	}

	.bgGray {
		background-color: rgba(255, 255, 255, 0.42);
	}

	.bgBlue {
		font-size: 14px;
		background-color: #4b95e6;
	}

	.redColor {
		color: #ff0000;
	}

	.TipArea {
		word-break: break-all;
		word-wrap: break-word;
		text-indent: 2em;
		font-size: 14px;
		padding: 10px;
	}

	.impTip {
		display: inline-block;
		color: #ff0000;
	}
</style>
