<template>
	<view class="likeBox">
		<view class="imgBox" v-for="(item,index) in data" :key="index">
			<image :src="item.url"></image>
			<view>
				<image src="../../static/images/main/bofang_icon.png"></image>
				<text>{{item.Num}}</text>
			</view>
		</view>
		<view v-if='data.length > 0' class="likeFooter">没有更多数据</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:[
					{url:"../../static/images/main/photo_01.png",Num:2},
					{url:"../../static/images/main/photo_02.png",Num:2},
					{url:"../../static/images/main/photo_03.png",Num:2},
					{url:"../../static/images/main/photo_04.png",Num:2},
					{url:"../../static/images/main/photo_05.png",Num:2},
					{url:"../../static/images/main/photo_06.png",Num:2}
				]
			}
		},
	}
</script>

<style lang="scss" scoped>
	.likeBox{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		.imgBox{
			position: relative;
			height: 330upx;
			width: 250upx;
			image{
				width: 100%;
				height: 100%;
			}
			view{
				position: absolute;
				left: 16upx;
				bottom: 20upx;
				color: rgb(255,255,255);
				display: flex;
				image{
					width: 26upx;
					height: 30upx;
					margin-right: 10upx;
				}
			}
		}
		.likeFooter{
			width: 100%;
			text-align: center;
			margin: 20upx 0;
			color: #FFFFFF;
		}
	}
</style>
