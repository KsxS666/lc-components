<template>
	<view :class="['checkbox-all-area', {'disabled':disabled}]" @click="handleClick">
		<view class="checkbox_inner">
			<view :class="['checkbox_input', {'is_checked':value}]"></view>
			<view class="checkbox_label"><slot></slot></view>
		</view>

	</view>
</template>

<script>
	export default {
		name: 'lc-checkbox',
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
			}
		},
		data() {
			return {
				currentValue: this.value
			}
		},
		methods: {
			handleClick() {
				if(this.disabled) return
				this.$emit('input', !this.value)
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
					background-color: #408CDA;
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
			opacity: .3
		}
	}
</style>
