<template>
	<view class="videoBox">
		<!-- <view class="videoHeader">
			<image @tap="goBack()" src="../../static/images/release/fanhui_icon.png" mode=""></image>
			<text>{{title}}</text>
		</view> -->
		<z-custom :isBack='true'>
			<view slot='content'>{{title}}</view>
		</z-custom>
		
		<uni-notice-bar speed=50 color="#fff" show-icon="true" background-color="rgb(58,58,68)" scrollable="true" single="true" :text="text"></uni-notice-bar>
		
		<form>
			<view class="extract">
				<text>{{extract}}</text>
				<textarea v-model="val" placeholder="提取方法:1、去各大视频APP平台复制视频链接,2、再粘贴到这里,点击'提取视频'即可。"/>
			</view>
			<button @click="submits()" form-type="submit">{{extract}}</button>
			<view class="upload">
				<text @tap="uploadVideo">{{uploadVideos}}</text>
			</view>
		</form>
		
		<view class="videoInfo">
			<text>{{videoInfo1}}</text>
			<text>{{videoInfo2}}</text>
		</view>
		<view class="videoJump">
			<navigator url="/pages/recommend/recommend">
				<image src="../../static/images/release/wodezuopin.png" mode=""></image>
			</navigator>
		</view>
	</view>
</template>

<script>
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	export default {
	    components: {uniNoticeBar},
		data() {
			return {
				val:"",
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
			},
			goBack(){
				history.back(-1)
			},
			submits(){
				if(this.val == ""){
					this.$api.msg("请先粘贴链接")
				}else{
					console.log(this.val);
					this.$api.msg("抓取视频链接错误")	
				}
			}
			
		}
	}
</script>

<style scoped lang="scss">
	.videoBox{
		background: rgb(21,23,35);
		height: 100%!important;
		width: 100%;
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
			navigator{
				image{
					width: 110upx;
					height: 110upx;
				}
			}
		}
	}
</style>
