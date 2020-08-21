<template>
	<view>
		<slot></slot>
	</view>
</template>

<script>
	import { findComponentsDownward } from '../../utils/assist.js';
	export default {
		name: 'LcCheckboxGroup',
		props: {
			value: {
				type: Array,
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
				this.childrens = findComponentsDownward(this, 'LcCheckbox')
				if(this.childrens) {
					const { value } = this
					console.log(this.childrens)
					this.childrens.forEach(child => {
						child.model = value
						if(update) {
							child.currentValue2 = value.indexOf(child.label) >= 0
						}
					})
	
				}
			},
			change(data) {
				console.log(data)
				this.currentValue = data
				this.$emit('input', data)
				this.$emit('on-change', data)
			}
		},
		watch: {
		    value () {
		        this.updateModel(true);
		    }
		}
	}
</script>

<style>
</style>
