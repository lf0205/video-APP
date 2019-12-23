<template>
	<view class="videoBox">
		<!-- 头部导航条 -->
		<!-- <view class="videoHeader">
			<image class="go" @tap="goBack()" src="../../static/images/release/fanhui_icon.png" mode=""></image>
			<view>
				<text>{{title}}</text>
			</view>
			
		</view> -->
		<z-custom :isBack='true'>
			<view slot='content'>{{title}}</view>
			<view slot='right'>
				<image class="search" src="../../static/images/recommend/sousuo_icon.png"></image>
			</view>
		</z-custom>
		<!-- 视频播放页面 -->
		<view class="video">
			<image src="../../static/images/recommend/bg.png" mode=""></image>
		</view>
		<!-- <view class="tabBar">
			<view v-for="(item,index) in tabBar" :key="index">
				<view class="">
					<text :class="item.icon"></text>
					<text>{{item.title}}</text>
				</view>
			</view>
		</view> -->
		<!-- 底部TabBar -->
		<view class="cu-bar tabbar  shadow foot text-black">
		    <view class="action" v-for="(v, i) in tabBar" :key="i" @tap="navChange(v.name)">
		        <view :class="v.icon"></view>
		        {{v.title}}
		    </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:"推荐",
				tabBar:[
					{
					    name: 'index',
					    title: '首页',
					    icon: 'cuIcon-home'
					},
					{
					    name: 'cate',
					    title: '发布',
					    icon: 'cuIcon-add'
					},
					{
					    name: 'user',
					    title: '我的',
					    icon: 'cuIcon-my'
					}
				]
			}
		},
		methods:{
			goBack(){
				history.back(-1)
			},
			navChange(url){
				console.log(url);
				uni.reLaunch({
					url:"../home?name="+url
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	z-custom{
		position: relative;
	}
	.search{
		position: absolute;
		bottom: 30upx;
		right: 5%;
		width: 44upx;
		height: 44upx;
	}
	uni-page-body{
		height: 100%;
		background: rgb(21,23,35);
	}
	.videoBox{
		background: #000000;
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
			.go{
				position: absolute;
				left: 5%;
				width: 30upx;
				height: 50upx;
			}
			view{
				font-size: 40upx;
				color: #FFFFFF;
				// position: relative;
				.title{}
				.Underline{
					width: 40upx;
					height: 4upx;
					background: #FFFFFF;
					position: absolute;
				}
			}
		}
	}
	.video{
		margin-top: 58upx;
		width: 100%;
		height: 1000upx;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.tabBar{
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 98upx;
		background: rgb(21,23,35);
		display: flex;
		align-items: center;
		view{
			flex: 1;
			display: flex;
			width: 100%;
			height: 100%;
			align-items: center;
			flex-direction: column;
			justify-content: center;
		}
	}
	.cu-bar{
		background: rgb(21,23,35);
		color: rgb(153,153,153);
	}
</style>
