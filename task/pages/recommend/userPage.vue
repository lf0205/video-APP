<template>
	<view class="userPageBox">
		<z-custom :isBack='true'>
		    <!-- <image class="headerShare" slot='right' src="../../static/images/recommend/fenxiang_icon.png"></image> -->
			<view slot='right' class="headerShare iconfont icon-fenxiang"></view>
		</z-custom>
		<view class="personalBox">
			<view class="myInfo">
				<image :src="userInfo.avater"></image>
				<text class="myName">@{{userInfo.at}}</text>
				<view class="myData" ref="btn">
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
				<view v-for="(item,index) in datas" :key="index" v-if="index==TabCur" class="navInfo">
					<view v-if="item == '作品' ">
						<works></works>
					</view>
					<view v-else-if="item == '动态'">
						<dynamic></dynamic>
					</view>
					<view v-else>
						<like></like>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	import works from './works'
	import dynamic from './dynamic'
	import like from './like'
	export default {
		data() {
			return {
				id:null,
				userInfo:{},
				Fabulous:0,
				follow:0,
				Fans:0,
				datas:["作品","动态","喜欢"],
				TabCur: 0,
				scrollTo:-36
			}
		},
		onLoad(option) {
			// 解码传过来的对象数据
			var item = JSON.parse(decodeURIComponent(JSON.stringify(option)))
			this.userInfo = JSON.parse(item.data)
			this.id = item.id
		},
		methods:{
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
			}
		},
		components: {
			uniNoticeBar,
			works,
			dynamic,
			like
		},
		mounted() {
			// console.log(this.$refs.btn.$el.getBoundingClientRect())
		}
	}
</script>

<style lang="scss" scoped>
	.userPageBox{
		overflow: hidden;
	}
	z-custom{
		
	}
	.headerShare{
		font-size: 48upx;
	}
	.personalBox{
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
		background: rgb(21,23,35);
		padding-top: 168upx;
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
			width: 100%;
			margin-top: 22upx;
			position: relative;
			.nav{
				height: 90upx;
				background: rgb(21,23,35);
				z-index: 999;
			}
			.navInfo{
				
			}
		}
	}
</style>
