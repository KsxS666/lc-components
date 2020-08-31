<template>
	<view>
		<slot></slot>
	</view>
</template>

<script>
	import { findComponentsDownward } from '../../utils/assist.js'
	export default {
		name: 'LcRadioGroup',
		props: {
			value: {
				type: [String, Number, Boolean],
				default() {
					return []
				}
			}
		},
		data() {
			return {
				currentValue: this.value,
				childrens: []
			}
		},
		mounted() {
			this.updateModel(true)
		},
		methods: {
			updateModel(update) {
				this.childrens = findComponentsDownward(this, 'LcRadio')
				if(this.childrens) {
					const { value } = this
					// console.log(this.childrens)
					this.childrens.forEach(child => {
						if(update) {
							child.currentValue2 = child.label === this.value
						}
					})
	
				}
			},
			change(label) {
				this.$emit('input', label)
				this.$emit('change', label)
			}
		},
		watch: {
			value(newVal) {
				this.updateModel(true)
			}
		}
	}
</script>

<style>
</style>
