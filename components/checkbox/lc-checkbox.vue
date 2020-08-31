<template>
	<view :class="['checkbox-all-area', {'disabled':disabled}]" @click="handleClick">
		<view class="checkbox_inner">
			<block v-if="!group">
				<view :class="['checkbox_input', { 'is_checked': currentValue, 'disabled': disabled }]"></view>
			</block>
			<block v-else>
				<view :class="['checkbox_input', { 'is_checked': currentValue2, 'disabled': disabled }]"></view>
			</block>
			<view class="checkbox_label"><slot></slot></view>
		</view>
	</view>
</template>

<script>
	 import { findComponentUpward } from '../../utils/assist.js'
	export default {
		name: 'LcCheckbox',
		props: {
			value: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			},
			trueValue: {
				type: [String, Number, Boolean],        
				default: true,
			},      
			falseValue: {
				type: [String, Number, Boolean],        
				default: false,
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
			this.parent = findComponentUpward(this, 'LcCheckboxGroup')
			console.log(this.parent)
			if(this.parent) this.group = true
			if(this.group) this.parent.updateModel(true)
			else this.updateModel()
		},
		methods: {
			handleClick() {
				if(this.disabled) return
				const checked = this.value
				this.currentValue = checked
				const value = checked ? this.falseValue : this.trueValue
				if(this.group) {
					if(!this.currentValue2) {
						this.model.push(this.label)
						this.currentValue2 = true
					} else {
						this.model.splice(this.model.findIndex(ele => ele === this.label), 1)
						this.currentValue2 = false
					}
					console.log(this.model)
					this.parent.change(this.model)
				} else {
					this.$emit('input', value)
					this.$emit('change', value)
				}
			},
			updateModel() {
				this.currentValue = this.value === this.trueValue
			}
		},
		watch: {
			value(newVal) {
				if (newVal === this.trueValue || newVal === this.falseValue) {
				    this.updateModel()
				} else {
				    throw 'Value should be trueValue or falseValue.'
				}
			}
		}
	}

</script>

<style lang="scss" scoped>
	.checkbox-all-area {
		.checkbox_inner {
			display: flex;
			line-height: 1.5;
			.checkbox_input {
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
					transition: transform .15s ease-in .05s;
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
			.checkbox_label {
				font-size: 32rpx;
			}
		}
		&.disabled {
			opacity: .3;
		}
	}
</style>
