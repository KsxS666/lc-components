<template>
	<view class="content">
		<view>单独使用</view>
		<view>
			<view class="mgb24">
				<lc-radio v-model="radio" label="1" @change="bindSingleChange">选项一</lc-radio>
			</view>
			<view class="mgb24">
				<lc-radio v-model="radio" label="2" @change="bindSingleChange">选项二</lc-radio>
			</view>
			<view>选中值：{{radio}}</view>
		</view>	
		<view>组合使用</view>
		<view>
			<lc-radio-group v-model="radios" @change="bindGroupChange">
				<view class="mgb24">
					<lc-radio :label="1">选项一</lc-radio>
				</view>
				<view class="mgb24">
					<lc-radio :label="2">选项二</lc-radio>
				</view>
				<view class="mgb24">
					<lc-radio :label="3">选项三</lc-radio>
				</view>

			</lc-radio-group>
			<view>选中值：{{radios}}</view>
		</view>
	</view>
</template>

<script>
	import LcRadioGroup from '@/components/radio/lc-radio-group.vue'
	import LcRadio from '@/components/radio/lc-radio.vue'
	export default {
		name: 'radio-demo-page',
		components: { LcRadioGroup, LcRadio },
		data() {
			return {
				radio: '1',
				radios: 3
			}
		},
		methods: {
			bindSingleChange(label) {
				console.log(label)
			},
			bindGroupChange(label) {
				console.log(label)
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
