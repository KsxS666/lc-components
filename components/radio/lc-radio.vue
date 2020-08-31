<template>
	<view :class="['radio-all-area', {'disabled':disabled}]" @click="handleClick">
		<view class="radio_inner">
			<block v-if="!group">
				<view :class="['radio_input', { 'is_checked': currentValue, 'disabled': disabled }]"></view>
			</block>
			<block v-else>
				<view :class="['radio_input', { 'is_checked': currentValue2, 'disabled': disabled }]"></view>
			</block>
			<view class="radio_label"><slot></slot></view>
		</view>
	</view>
</template>

<script>
	import { findComponentUpward } from '../../utils/assist.js'
	export default {
		name: 'LcRadio',
		props: {
			value: {
				type: [String, Number],
				default: ''
			},
			disabled: {
				type: Boolean,
				default: false
			},
			label: {
			    type: [String, Number, Boolean]
			}
		},
		data() {
			return {
				currentValue: this.value,
				currentValue2: false,
				model: [],
				group: false,
				parent: null
			}
		},
		mounted() {
			this.parent = findComponentUpward(this, 'LcRadioGroup')
			console.log(this.parent)
			if(this.parent) this.group = true
			if(this.group) this.parent.updateModel(true)
			else this.updateModel()
		},
		methods: {
			handleClick() {
				if(this.disabled) return
				const value = this.label
				if(!this.group) {
					this.$emit('input', value)
					this.$emit('change', value)
				} else {
					this.parent.change(this.label)
				}
			},
			updateModel() {
				this.currentValue = this.value === this.label
			}
		},
		watch: {
			value(newVal) {
				this.updateModel()
			}
		}
	}
</script>

<style lang="scss">
	.radio-all-area {
		.radio_inner {
			display: flex;
			line-height: 1.5;
			.radio_input {
				position: relative;
				margin-right: 20rpx;	
				background-color: #ffffff;
				border-color: red;
				position: relative;
				width: 40rpx;
				height: 40rpx;
				border: 2rpx solid #dcdfe6;
				border-radius: 8rpx;
				transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.4);
				&::after {
					box-sizing: content-box;
					content: "";
					border: 4rpx solid #f3f3f3;
					border-left: 0;
					border-top: 0;
					height: 20rpx;
					left: 16rpx;
					position: absolute;
					top: 4rpx;
					transform: rotate(45deg) scaleY(1);
					width: 8rpx;
					transition: transform .15s ease-in;
					transform-origin: center;
				}
				&.is_checked {
					background-color: $cnd-blue-5;
					border-color: #408CDA;
					&::after {
						transform: rotate(45deg) scaleY(1);
					}
				}
			}
			.radio_label {
				font-size: 32rpx;
			}
		}
		&.disabled {
			opacity: .3;
		}
	}
</style>
