<template>
	<view>
		<z-custom :isBack='true'>
			<view slot='backText'>消息中心</view>
		</z-custom>
		<message name="user"></message>
	</view>
</template>

<script>
import message from '../components/z-message'
export default {
	data() {
		return {

		}
	},
	components:{
		message
	},
	methods: {}
}
</script>

<style scoped lang="scss">
</style>
