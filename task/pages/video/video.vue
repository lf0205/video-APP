<template>
	<view class="videoBox">
		<!-- <z-custom class="videoHeader" :isBack='true'>
		    <view slot='backText'>制作视频</view>
		</z-custom> -->
		<view class="videoHeader">
			<image @tap="goBack()" src="../../static/images/release/fanhui_icon.png" mode=""></image>
			<text>{{title}}</text>
		</view>
		<!-- <uni-notice-bar background-color="rgb(58,58,68)" show-icon="true" :text="text"></uni-notice-bar> -->
		<view class="">
			
		</view>
		<form>
			<view class="extract">
				<text>{{extract}}</text>
				<textarea value="" placeholder='提取方法:
	1、去各大视频APP平台复制视频链接,
	2、再粘贴到这里,点击"提取视频"即可。' />
			</view>
			<button form-type="submit">{{extract}}</button>
			<view class="upload">
				<text @tap="uploadVideo">{{uploadVideos}}</text>
			</view>
		</form>
		<view class="videoInfo">
			<text>{{videoInfo1}}</text>
			<text>{{videoInfo2}}</text>
		</view>
		<view class="videoJump">
			<image src="../../static/images/release/wodezuopin.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	export default {
	    components: {uniNoticeBar},
		data() {
			return {
				title:"制作视频",
				text: "温馨提示： 只能上传积极、好看、优质视频；分享客户喜欢的，才能吸引客户找你。 视频质量差会被删除，多次违规账号会被查封！",
				extract:"提取视频",
				uploadVideos:"上传本地视频",
				videoInfo1:"1、免费用户不支持自主上传视频",
				videoInfo2:"2、VIP用户可上传3分钟视频（不超过20M）"
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
			}
		}
	}
</script>

<style scoped lang="scss">
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
				}
				::placeholder{
					line-height: 10upx;
					color: red;
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
		}
		.videoJump{
			position: fixed;
			right: 50upx;
			bottom: 100upx;
			image{
				width: 100upx;
				height: 100upx;
			}
		}
	}
</style>
