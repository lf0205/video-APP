<template>
	<view class="personalBox">
		<z-custom :isBack='false'>
			<view slot='content'>{{title}}</view>
		</z-custom>
	</view>
</template>

<script>
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	export default {
	    components: {uniNoticeBar},
		data() {
			return {
				title:"个人中心"
			}
		},
		methods:{
			uploadVideo(){
				uni.chooseVideo({
					count: 1,
					sourceType: ['camera', 'album'],
					success: function (res) {
						self.src = res.tempFilePath;
						console.log(res);
					}
				});
			},
			goBack(){
				history.back(-1)
			}
			
		}
	}
</script>

<style scoped lang="scss">
	.personalBox{
		z-custom{
			background: #000000;
		}
	}
</style>
