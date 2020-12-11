<template>
	<!-- 打卡日历页面 -->
	<view class='all'>
		<view class="bar">
			<!-- 显示年月 -->
			<view class="date">{{cur_year || "--"}} 年 {{cur_month || "--"}} 月</view>
		</view>
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
		<view class="TipArea">
			<view style="text-align: center;">
				<text style="color: #C8C9CC;">Tip:</text>
				<view style="margin-top: 20rpx;">
					<text style="font-size: 25rpx;color: #C0C0C0;">每天打卡积累积分，兑换更多礼包</text>
					<view class="impTip" style="font-size: 20rpx;">未签到日期，可以通过游戏内充值自动获取补签卡完成补签！</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				langType: 'ch',
				days: [], //本月所有天数，自动计算出来的
				checkInArray: [], // 已经签到的日期数组
				SignUp: [], //已经签到的日期数组
				cur_year: 0, //当前选的年
				cur_month: 0, //当前选的月
				today: parseInt(new Date().getDate()), //本日
				toMonth: parseInt(new Date().getMonth() + 1), //本月
				toYear: parseInt(new Date().getFullYear()), //本年
				weeks_ch: ['日', '一', '二', '三', '四', '五', '六'],
				weeks_en: ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'],
				dataSource: []
			};
		},
		onShow() {
			//点前年
			this.cur_year = new Date().getFullYear()
			//点前月
			this.cur_month = new Date().getMonth() + 1
			//计算空的格子
			this.calculateEmptyGrids(this.cur_year, this.cur_month);
			//计算空天
			this.calculateDays(this.cur_year, this.cur_month);
			//获取已经签到的日期集合
			this.getAllCheckIn()
		},
		methods: {
			/**
			 * 查询已经签到的日期
			 */
			getAllCheckIn() {
				this.$u.api.getByMonth().then(res => {
					this.checkInArray = res.data
					//计算哪些日期已经签到
					this.onJudgeSign();
				})
			},



			/**
			 * 计算当前月有多少天
			 * 
			 * @param {Object} year
			 * @param {Object} month
			 */
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

			/**
			 * 计算当月所有天数
			 * @param {Object} year
			 * @param {Object} month
			 */
			calculateDays(year, month) {
				const thisMonthDays = this.getThisMonthDays(year, month)
				// this.columnsLen=Math.ceil(thisMonthDays/7);
				// console.log(this.columnsLen);
				for (let i = 1; i <= thisMonthDays; i++) {
					var obj = {
						date: i,
						isSign: false
					}
					this.days.push(obj)
				}
			},

			onResChange(newD, oldD) {
				this.SignUp = newD;
				this.onJudgeSign();
			},
			/**
			 * 判断哪些已经打过卡
			 */
			onJudgeSign() {
				var signs = this.checkInArray;
				var daysArr = this.days;
				for (var i = 0; i < signs.length; i++) {
					const current = signs[i].date;
					let yearmonthdayarray = current.split('-')
					var year = yearmonthdayarray[0]
					var month = yearmonthdayarray[1]
					var day = yearmonthdayarray[2]
					day = parseInt(day);
					for (var j = 0; j < daysArr.length; j++) {
						//年月日相同则打卡成功   						
						if (year == this.cur_year && month == this.cur_month && daysArr[j].date == day) { //&& signs[i].isSign == "今日已打卡"
							// console.log(daysArr[j].date, day);
							daysArr[j].isSign = true;
						}
					}
				}
				this.days = daysArr;
			},

			// 切换控制年月，上一个月，下一个月
			handleCalendar(type) {
				const cur_year = parseInt(this.cur_year);
				const cur_month = parseInt(this.cur_month);
				var newMonth;
				var newYear = cur_year;
				if (type === 0) { //上个月
					newMonth = cur_month - 1;
					if (newMonth < 1) {
						newYear = cur_year - 1;
						newMonth = 12;
					}
				} else {
					newMonth = cur_month + 1;
					if (newMonth > 12) {
						newYear = cur_year + 1;
						newMonth = 1;
					}
				}
				this.calculateEmptyGrids(newYear, newMonth);
				this.calculateDays(newYear, newMonth);

				this.cur_year = newYear;
				this.cur_month = newMonth;

				this.SignUp = []; //先清空
				this.$emit('dateChange', this.cur_year + "-" + this.cur_month); //传给调用模板页面去拿新数据				
			},

			/**
			 * 点击签到
			 * @param {Object} date
			 * @param {Object} type 0补签，1当日签到
			 */
			clickSignUp(date, type) {
				var str = "签到";
				if (type == 0) {
					str = "补签";
				}
				//
				this.$u.api.doCheckIn({
					date: this.cur_year + "-" + this.cur_month + "-" + date
				}).then(res => {
					if (res.status) {
						//请求新数据
						this.getAllCheckIn()
						//保存
						uni.showToast({
							title: str + "成功" + date + "号",
							icon: 'success',
							duration: 1500,
							mask: true
						})
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none',
							duration: 1500,
							mask: true
						})
					}
				})
			}
		}
	}
</script>

<style>
	.all {
		padding-top: 50rpx;

	}

	.all .bar {
		display: flex;
		flex-direction: row;
		justify-content: center;
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
		font-size: 14rpx;
		background-color: #4b95e6;
	}

	.redColor {
		color: #ff0000;
	}

	.TipArea {
		word-break: break-all;
		word-wrap: break-word;
		font-size: 28rpx;
		padding-top: 50rpx;
		display: flex;
		justify-content: center;
	}

	.impTip {
		display: inline-block;
		color: #ff0000;
	}
</style>
