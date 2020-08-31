<template>
	<view>
		<lc-date-picker :level="3" start="2000" end="2200"></lc-date-picker>
	</view>
</template>

<script>
	import LcDatePicker from '@/components/datepicker/lc-datepicker.vue'
	export default {
		name: 'DatePickerDemoPage',
		components: { LcDatePicker },
		data() {
			return {
				
			}
		}
	}
</script>

<style>
</style>
