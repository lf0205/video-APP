<template>
	<view class="">
		<view class="personalBox">
			<text class="myTitle">{{title}}</text>
			<view class="myInfo">
				<image :src="userInfo.avater" mode=""></image>
				<text class="myName">@{{userInfo.at}}</text>
				<!-- <text class="myId">ID号: {{userInfo.phone}}</text> -->
				<view class="myData">
					<view>
						<text>{{userInfo.like}}</text>
						<text class="myDataTitle">获赞</text>
					</view>
					<view>
						<text>{{userInfo.comment}}</text>
						<text class="myDataTitle">关注</text>
					</view>
					<view>
						<text>{{userInfo.duration}}</text>
						<text class="myDataTitle">粉丝</text>
					</view>
				</view>
			</view>
			<view class="myDatas">
				<!-- 导航栏 -->
				<scroll-view scroll-x class="bg-white nav">
					<view class="flex text-center">
						<view class="cu-item flex-sub" :class="index==TabCur?'text-orange cur':''" v-for="(item,index) in datas" :key="index" @tap="tabSelect" :data-id="index">
							{{item}}
						</view>
					</view>
				</scroll-view>
				<!-- 导航栏信息 -->
				<!-- <view v-for="(item,index) in datas" :key="index" v-if="index==TabCur" class="navInfo">
					<view v-if="item == '作品' ">
						<works></works>
					</view>
					<view v-else-if="item == '动态'">
						<dynamic></dynamic>
					</view>
					<view v-else>
						<like></like>
					</view>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	// import works from './works'
	// import dynamic from './dynamic'
	// import like from './like'
	export default {
		data() {
			return {
				title:"个人中心",
				userInfo:{},
				Fabulous:0,
				follow:0,
				Fans:0,
				datas:["作品","动态","喜欢"],
				TabCur: 0
			}
		},
		onLoad(option) {
			console.log(option.data);
			// const item = JSON.parse(decodeURIComponent(option.data));
			// console.log(item);
			// this.userInfo = item
			// console.log(this.userInfo);
		},
		methods:{
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
		},
		components: {
			uniNoticeBar,
			// works,
			// dynamic,
			// like
		}
	}
</script>

<style lang="scss" scoped>
	.personalBox{
		overflow: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
		background: rgb(21,23,35);
		padding-top: 68upx;
		.myTitle{
			color: rgb(255,255,255);
			font-size: 34px;
			margin-bottom: 98upx;
		}
		.myInfo{
			width: 702upx;
			height: 269upx;
			background: rgb(58,58,68);
			border-radius: 12upx;
			display: flex;
			flex-direction: column;
			align-items: center;
			position: relative;
			image{
				position: absolute;
				top: -50%;
				margin-top: 70upx;
				width: 140upx;
				height: 140upx;
				border-radius: 50%;
				border: 2upx solid #999999;
			}
			.myName{
				margin-top: 80upx;
				color: rgb(255,255,255);
				font-size: 40upx;
			}
			.myId{
				color: rgb(255,255,255);
				font-size: 30upx;
			}
			.myData{
				width: 100%;
				height: 96upx;
				display: flex;
				color: rgb(255,255,255);
				font-size: 32upx;
				align-items: center;
				justify-content: space-around;
				view{
					padding-top: 20upx;
					width: 100%;
					height: 100%;
					display: flex;
					flex-direction: column;
					align-items: center;
					text{
						color: rgb(255,255,255);
						font-size: 32upx;
					}
					.myDataTitle{
						color: rgb(153,153,153);
						font-size: 22upx;
					}
				}
			}
		}
		.myDatas{
			border-top: 1px solid rgb(43,45,57);
			flex: 1;
			overflow-y: auto;
			width: 100%;
			margin-top: 22upx;
			position: relative;
			.nav{
				height: 90upx;
				position: fixed;
				background: rgb(21,23,35);
				z-index: 999;
			}
			.navInfo{
				margin-top: 90upx;
			}
		}
	}
</style>
