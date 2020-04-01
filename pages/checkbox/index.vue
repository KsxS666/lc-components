<template>
	<view class="content">
		<lc-checkbox v-model="checked">选项一</lc-checkbox>	
	</view>
</template>

<script>
	import lcCheckbox from '@/components/checkbox/lc-checkbox'
	export default {
		name: 'checkbox-demo-page',
		components: { lcCheckbox },
		data() {
			return {
				checked: true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 40rpx;
	}
</style>
