<template>
	<view class="content">
		<view>单独使用</view>
		<view>
			<view>
				<lc-checkbox v-model="checked">选项一</lc-checkbox>
				<view>{{checked}}</view>
			</view>	
		</view>
		<view>组合使用</view>
		<view>
			<lc-checkbox-group v-model="multiple" @change="bindCheckboxGroupChange">
				<block v-for="(item, index) in testOptions" :key="index">
					<view class="mgb24">
						<lc-checkbox :label="item.sValue">{{item.sName}}</lc-checkbox>
					</view>
				</block>
			</lc-checkbox-group>
		</view>
		<button @click="bindSubmit" plain>提交</button>
	</view>
</template>

<script>
	import LcCheckbox from '@/components/checkbox/lc-checkbox'
	import LcCheckboxGroup from '@/components/checkbox/lc-checkbox-group'
	export default {
		name: 'checkbox-demo-page',
		components: { LcCheckbox, LcCheckboxGroup },
		data() {
			return {
				checked: true,
				multiple: ['1', '3'],
				testOptions: [{
					sName: 'aaa',
					sValue: '1'
				}, {
					sName: 'bbb',
					sValue: '2'
				},{
					sName: 'ccc',
					sValue: '3'
				},{
					sName: 'ddd',
					sValue: '4'
				},{
					sName: 'eee',
					sValue: '5'
				}]
			}
		},
		methods: {
			bindSubmit() {
				uni.showToast({
					title: `选中项：${this.multiple.join(', ')}`
				})
				console.log(this.testOptions.filter(ele => this.multiple.includes(ele.sValue)))
			},
			bindCheckboxGroupChange(data) {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mgb24 { margin-bottom: 24rpx; }
	.content {
		padding: 40rpx;
		line-height: 100rpx;
		color: #333333;
	}
</style>
