<template>
	<view class="datetime">
		<picker 
			mode="multiSelector" 
			:range="range" 
			range-key="text" 
			@change="change" 
			@columnchange="columnchange"
			:value="values"
			:disabled="disabled"
		>
			<view class="content" :class="{ 'placeholder': !dateStr }">
				<text>{{ dateStr ? dateStr : placeholder }}</text>
			</view>
		</picker>
	</view>
</template>

<script>
	import utils from '@/utils/tools.js'
	export default {
		name: 'LcDatepicker',
		props: {
			// 是否禁用
			disabled: {
				type: Boolean,
				default: false
			},
			// 选择器层级	1: 年份，次级逐一递增，最高5级，即分
			level: {
				type: [Number, String],
				default: 1
			},
			// 占位符
			placeholder: {
				type: String,
				default: '请选择日期时间'
			},
			// 有效日期范围的起始 YYYY-MM-dd hh:mm
			start: {
				type: String,
				default: '1970/01-01 00:00'
			},
			// 有效日期范围的结束 YYYY-MM-dd hh:mm
			end: {
				type: String,
				default: '2300-01-01 00:00'
			},
			// 默认值 YYYY-MM-dd hh:mm
			defaultValue: {
				type: String,
				default: ''
			},
			//显示格式,后续更新会使用
			format: {
				type: String,
				default: 'YYYY-MM-dd hh:mm'
			}
		},
		data() {
			return {
				range: [],
				values: [],
				dateStr: '', // 最终展示的字符串
				dtStart: null, // 有效范围开始
				dtEnd: null, // 有效范围结束
			}
		},
		mounted() {
			let start = this.start
			let end = this.end
			if(!utils.isString(this.start)) {
				console.log('开始日期需为String类型，格式为"YYYY-MM-dd hh:mm"')
				start = '1970-01-01 00:00'
			}
			if(!utils.isString(this.end)) {
				console.log('结束日期需为String类型，格式为"YYYY-MM-dd hh:mm"')
				start = '2300-01-01 00:00'
			}
			let dtStart = utils.formatDate(start).dt
			let dtEnd = utils.formatDate(end).dt
			console.log(dtStart, dtEnd)
			if(dtEnd <= dtStart) {
				dtEnd = utils.formatDate(start).dt
				dtEnd.setFullYear(dtStart.getFullYear() + 300)
				dtEnd.setDate(dtEnd.getDate() - 1)
			}
			this.dtStart = dtStart
			this.dtEnd = dtEnd
			this.setDefaultValue()
		},
		methods: {
			change(event) {
				let year, month, day, hour, minute
				const level = this.level
				let dtStr
				switch(level) {
					case 1: case '1':
						year = this.range[0][this.values[0]].number
						dtStr = `${year}`
						this.setDateStr(dtStr)
						this.$emit('change', utils.formatDate(dtStr))
					 break
					 case 2: case '2':
						year = this.range[0][this.values[0]].number // 年
						month = this.range[1][this.values[1]].number // 月
						dtStr = `${year}-${month}`
						this.setDateStr(dtStr)
						this.$emit('change', utils.formatDate(dtStr))
					 break 
					 case 3: case '3':
						year = this.range[0][this.values[0]].number // 年
						month = this.range[1][this.values[1]].number // 月
						day = this.range[2][this.values[2]].number // 日
						dtStr = `${year}-${month}-${day}`
						this.setDateStr(dtStr)
						this.$emit('change', utils.formatDate(dtStr))
					 break
					 case 4: case '4':
						year = this.range[0][this.values[0]].number // 年
						month = this.range[1][this.values[1]].number // 月
						day = this.range[2][this.values[2]].number // 日
						hour = this.range[3][this.values[3]].number // 时
						day = this.range[2][this.values[2]].number // 日
						dtStr = `${year}-${month}-${day} ${hour}`
						this.setDateStr(dtStr)
						this.$emit('change', utils.formatDate(dtStr))
					 break
					 case 5: case '5':
						year = this.range[0][this.values[0]].number // 年
						month = this.range[1][this.values[1]].number // 月
						day = this.range[2][this.values[2]].number // 日
						hour = this.range[3][this.values[3]].number // 时
						minute = this.range[4][this.values[4]].number // 分
						dtStr = `${year}-${month}-${day} ${hour}:${minute}`
						this.setDateStr(dtStr)
						this.$emit('change', utils.formatDate(dtStr))
					break
				}
				
			},
			setDefaultValue() {
				let dtDefault
				let dtStart = this.dtStart
				let dtEnd = this.dtEnd
				if(this.defaultValue) {
					dtDefault = utils.formatDate(this.defaultValue).dt
				} else {
					dtDefault = new Date()
				}
				// 如果默认日期不在有效日期范围内，设置默认日期为有效日期开始
				if(dtDefault < dtStart || dtDefault > dtEnd) {
					dtDefault = dtStart
				}
				if(this.defaultValue) this.setDateStr(dtDefault)
				
				// 默认值相关数据
				let dfYear = dtDefault.getFullYear();
				console.log(dfYear)
				let dfMonth = dtDefault.getMonth() + 1;
				let dfDay = dtDefault.getDate();
				let dfHour = dtDefault.getHours();
				let dfMinute = dtDefault.getMinutes();
				// 设置年数据
				this.setYearData();
				// 设置年这一列的value值
				let yearIndex = this.range[0].findIndex(year => dfYear === year.number)
				this.values.splice(0, 1, yearIndex >= 0 ? yearIndex : 0)
				// 设置月数据
				if(this.level == 1) return
				this.setMonthData(dfYear)
				// 设置月这一列的value值
				let monthIndex = this.range[1].findIndex(month => {
					return dfMonth == month.number
				});
				this.values.splice(1, 1, monthIndex >= 0 ? monthIndex : 0)
				// 设置日数据
				if(this.level == 2) return
				this.setDayData(dfYear, dfMonth)
				// 设置 日 这一列的 value 值
				let dayIndex = this.range[2].findIndex(day => {
					return dfDay == day.number
				}) 
				this.values.splice(2, 1, dayIndex >= 0 ? dayIndex : 0)
				
				// 设置时数据
				if(this.level == 3) return
				this.setHourData(dfYear, dfMonth, dfDay)
				// 设置 Hour 这一列的 value 值
				let hourIndex = this.range[3].findIndex(hour => {
					return dfHour == hour.number
				})
				this.values.splice(3, 1, hourIndex >=0 ? hourIndex : 0)
				
				// 设置分数据
				if(this.level == 4) return
				this.setMinuteData(dfYear, dfMonth, dfDay, dfHour)
				// 设置 Minute 这一列的 value 值
				let minuteIndex = this.range[4].findIndex(minute => {
					return dfMinute == minute.number
				})
				this.values.splice(4, 1, minuteIndex >= 0 ? minuteIndex : 0)
			},
			
			/**
			 * 设置显示的值
			 * @param {Date|String} date 日期字符串或日期对象
			 */
			setDateStr(date) {
				let dt = utils.formatDate(date)
				if(this.level == 1) {
					this.dateStr = `${dt.YYYY}`
					return;
				}
				if(this.level == 2) {
					this.dateStr = `${dt.YYYY}-${utils.pad2(dt.M)}`
					return;
				}
				if(this.level == 3) {
					this.dateStr = `${dt.YYYY}-${utils.pad2(dt.M)}-${utils.pad2(dt.D)}`
					return;
				}
				if(this.level == 4) {
					this.dateStr = `${dt.YYYY}-${utils.pad2(dt.M)}-${utils.pad2(dt.D)} ${utils.pad2(dt.h)}`
					return;
				}
				this.dateStr = `${dt.YYYY}-${utils.pad2(dt.M)}-${utils.pad2(dt.D)} ${utils.pad2(dt.h)}:${utils.pad2(dt.m)}`
			},
			// 设置年数据
			setYearData() {
				// 有效日期
				let yearStart = this.dtStart.getFullYear()
				let yearEnd = this.dtEnd.getFullYear()
				// 年
				let years = []
				for (let year = yearStart; year <= yearEnd; year++) {
					let item = {
						number: year,
						text: `${year}`,
					};
					years.push(item)
				}

				this.range.splice(0, 1, years)
			},
			/**
			 * 设置月数据
			 * @param {Number} year 年 
			 */ 
			setMonthData(year) {
				// 有效日期
				let yearStart = this.dtStart.getFullYear();
				let monthStart = this.dtStart.getMonth() + 1;
				let yearEnd = this.dtEnd.getFullYear();
				let monthEnd = this.dtEnd.getMonth() + 1;
				
				// 月
				let months = [];
				let monthStartIndex = year == yearStart ? monthStart : 1;
				let monthEndIndex = year == yearEnd ? monthEnd : 12;
				for (let month = monthStartIndex; month <= monthEndIndex; month++) {
					let item = {
						number: utils.pad2(month),
						text: `${utils.pad2(month)}`,
					};
					months.push(item);
				}
				this.range.splice(1, 1, months);
			},
			
			/**
			 * 设置日数据
			 * @param {Number} year 年 
			 * @param {Number} month 月 
			 */ 
			setDayData(year, month) {
				// 有效日期
				let yearStart = this.dtStart.getFullYear();
				let monthStart = this.dtStart.getMonth() + 1;
				let dayStart = this.dtStart.getDate();
				let yearEnd = this.dtEnd.getFullYear();
				let monthEnd = this.dtEnd.getMonth() + 1;
				let dayEnd = this.dtEnd.getDate();
				
				// 日
				let days = [];
				let dayStartIndex = year == yearStart && month == monthStart ? dayStart : 1;
				let dayEndIndex; 
				if(year == yearEnd && month == monthEnd) {
					dayEndIndex = dayEnd;
				} else {
					dayEndIndex = (new Date(year, month, 0)).getDate();
				}
				for (let day = dayStartIndex; day <= dayEndIndex; day++) {
					let item = {
						number: utils.pad2(day),
						text: `${utils.pad2(day)}`,
					};
					days.push(item);
				}
				this.range.splice(2, 1, days);
			},
			
			/**
			 * 设置时数据
			 * @param {Number} year 年 
			 * @param {Number} month 月 
			 * @param {Number} day 日 
			 */ 
			setHourData(year, month, day) {
				// 有效日期
				let yearStart = this.dtStart.getFullYear();
				let monthStart = this.dtStart.getMonth() + 1;
				let dayStart = this.dtStart.getDate();
				let hourStart = this.dtStart.getHours();
				let yearEnd = this.dtEnd.getFullYear();
				let monthEnd = this.dtEnd.getMonth() + 1;
				let dayEnd = this.dtEnd.getDate();
				let hourEnd = this.dtEnd.getHours();
				
				// 时
				let hours = [];
				let hourStartIndex = year == yearStart && month == monthStart && day == dayStart ? hourStart : 0;
				let hourEndIndex = year == yearEnd && month == monthEnd && day == dayEnd ? hourEnd : 23;
				for (let hour = hourStartIndex; hour <= hourEndIndex; hour++) {
					let item = {
						number: utils.pad2(hour),
						text: `${utils.pad2(hour)}`,
					};
					hours.push(item);
				}
				this.range.splice(3, 1, hours);
			},
			
			/**
			 * 设置分数据
			 * @param {Number} year 年 
			 * @param {Number} month 月 
			 * @param {Number} day 日
			 * @param {Number} hour 时
			 */ 
			setMinuteData(year, month, day, hour) {
				// 有效日期
				let yearStart = this.dtStart.getFullYear();
				let monthStart = this.dtStart.getMonth() + 1;
				let dayStart = this.dtStart.getDate();
				let hourStart = this.dtStart.getHours();
				let minuteStart = this.dtStart.getMinutes();
				let yearEnd = this.dtEnd.getFullYear();
				let monthEnd = this.dtEnd.getMonth() + 1;
				let dayEnd = this.dtEnd.getDate();
				let hourEnd = this.dtEnd.getHours();
				let minuteEnd = this.dtEnd.getMinutes();
				
				// 分
				let minutes = [];
				let minuteStartIndex = year == yearStart && month == monthStart && day == dayStart && hour == hourStart ? minuteStart : 0;
				let minuteEndIndex = year == yearEnd && month == monthEnd && day == dayEnd && hour == hourEnd ? minuteEnd : 59;
				for(let minute = minuteStartIndex; minute <= minuteEndIndex; minute++) {
					let item = {
						number: utils.pad2(minute),
						text: `${utils.pad2(minute)}`,
					}
					minutes.push(item);
				}
				this.range.splice(4, 1, minutes);
			},
			columnchange(event) {
				let columnIndex = event.detail.column
				let valueIndex = event.detail.value
				this.values.splice(columnIndex, 1, valueIndex)
				// 改变年要更新月数据
				if(this.level == 1) return
				if(columnIndex == 0) {
					// 当前选择的月
					let monBeforeUpdate = this.range[1][this.values[1]]
					// 更新月数据
					this.setMonthData(this.range[0][this.values[0].number])
					// 更新 Month的value
					let monthIndex = this.range[1].findIndex(month => month.number == monBeforeUpdate.number)
					this.values.splice(1, 1, monthIndex >= 0 ? monthIndex : 0)
				}
				
				// 改变年、月要更新日数据
				if(this.level == 2) return
				if(columnIndex === 0 || columnIndex === 1) {
					// 当前选择的日
					let dayBeforeUpdate = this.range[2][this.values[2]]
					// 更新日数据
					this.setDayData(this.range[0][this.values[0]].number, this.range[1][this.values[1]].number)
					// 更新Day value
					let dayIndex = this.range[2].findIndex(day => day.number == dayBeforeUpdate.number)
					this.values.splice(2, 1, dayIndex >= 0 ? dayIndex : 0)
				}
				//改变年、月、日都要更新时数据
				if(this.level == 3) return
				if(columnIndex == 0 || columnIndex == 1 || columnIndex == 2) {
					// 当前选择的时
					let hourBeforeUpdate = this.range[3][this.values[3]]
					// 更新时数据
					this.setHourData(this.range[0][this.values[0]].number, this.range[1][this.values[1]].number, this.range[2][this.values[2]].number)
					// 更新 Hour Value
					let hourIndex = this.range[3].findIndex(hour => {
						return hour.number == hourBeforeUpdate.number
					});
					this.values.splice(3, 1, hourIndex >= 0 ? hourIndex : 0)
				}
				// 当前选择的分
				if(this.level == 4) return
				let minuteBeforeUpdate = this.range[4][this.values[4]]
				// 更新分数据
				this.setMinuteData(this.range[0][this.values[0]].number, this.range[1][this.values[1]].number, this.range[2][this.values[2]].number, this.range[3][this.values[3]].number)
				// 更新 Minute Value
				let minuteIndex = this.range[4].findIndex(minute => {
					return minute.number == minuteBeforeUpdate.number
				});
				this.values.splice(4, 1, minuteIndex >= 0 ? minuteIndex : 0)
			}
		},
		watch: {
			// 默认值
			defaultValue() {
				// 设置默认值
				this.setDefaultValue();
			}
		},
	}
</script>

<style lang="scss" scoped>
	.datetime {
		font-size: 32rpx;
		.content {
			&.placeholder {
				color: $gray-6;
			}
		}
	}
</style>
