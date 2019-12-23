<template>
	<view class="videoBox">
		<view class="videoHeader">
			<image @tap="goBack()" src="../../static/images/release/fanhui_icon.png" mode=""></image>
			<text>{{title}}</text>
		</view>
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
	uni-page-body{
		height: 100%;
		background: rgb(21,23,35);
	}
	.videoBox{
		.videoHeader{
			height: 100upx;
			width: 100%;
			padding:0 5%;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			image{
				position: absolute;
				left: 5%;
				width: 30upx;
				height: 50upx;
			}
			text{
				font-size: 40upx;
				color: #FFFFFF;
			}
		}
		.NoticeBar{
			height: 80upx;
			background: rgb(58,58,68);
			display: flex;
			align-items: center;
			justify-content:center;
			image{
				width: 68upx;
				height: 34upx;
				margin-right: 10upx;
			}
			text{
				color: rgb(218,218,218);
				font-size: 22upx;
			}
		}
		background: #000000;
		height: 100%!important;
		width: 100%;
		form{
			margin-bottom:100upx;
			position: relative;
			display: inline-block;
			width: 90%;
			padding: 0 5%;
			.extract{
				width: 100%;
				text{
					color: #fff;
					font-size: 36upx;
					padding: 5% 0;
					display: inline-block;
				}
				textarea{
					width: 100%;
					border-radius: 20upx;
					background-color:rgb(58,58,68);
					padding: 3%;
					color: rgb(153,153,153);
				}
			}
			button{
				margin: 5% 0;
				border-radius: 50upx;
				background:  rgb(252,62,90);
				color: #FFFFFF;
			}
			.upload{
				display: inline-block;
				text-decoration: underline;
				color: rgba(207,183,57,1);
				width: 100%;
				display: flex;
				justify-content: center;
			}
		}
		.videoInfo{
			padding: 0 5%;
			display: flex;
			flex-direction: column;
			text{
				color: #fff;
			}
		}
		.videoJump{
			position: fixed;
			right: 50upx;
			bottom: 100upx;
			image{
				width: 110upx;
				height: 110upx;
			}
		}
	}
</style>
