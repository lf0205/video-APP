<template>
	<view class="">
		<z-custom :isBack='true'>
			<view slot='content'>{{title}}</view>
		</z-custom>
		<view class="awardInfo">
			<image class='authorImg' :src="data.avater" mode=""></image>
			<text class="autherName">{{data.at}}</text>
			<view class="userAward">
				<text v-for="(item,index) in money" :key='index'>
					￥<text class="awardMoney">{{item}}</text>
				</text>
			</view>
			<view class="otherMoney">其他金额</view>
			<view class="tipsInfo">
				<text>温馨提示：</text>
				<text>1、您的赞赏金额将全部由作者获得，鼓励作者创作，平台不参与抽成。</text>
				<text>2、您的历史赞赏详情可在<text class='myAward'>我的奖金</text>中查看。</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				data:{},
				title:"打赏",
				money:['0.88','1.88','6.66','8.88','66.66','88.88']
			}
		},
		onLoad(options) {
			console.log(options);
			var data = JSON.parse(decodeURIComponent(JSON.stringify(options.data)));
			this.data = JSON.parse(data)
			console.log(this.data);
		}
	}
</script>

<style lang="scss" scoped>
	.awardInfo{
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.authorImg{
		width: 150upx;
		height: 150upx;
		margin: 50upx 0;
		border-radius: 50%;
		border: 1px solid #000;
	}
	.autherName{
		color: #FFFFFF;
		font-size: 38upx;
		margin: 0 0 100upx;
	}
	.userAward{
		width: 100%;
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		text{
			width: 25%;
			background: #fffedf;
			margin: 10upx 0;
			text-align: center;
			color: red;
			border: 1px solid red;
			border-radius: 10upx;
			padding:20upx 0;
			.awardMoney{
				font-size: 50upx;
				border: none;
			}
		}
	}
	.otherMoney{
		margin: 50upx 0;
		color: #edf1e2;
		font-size: 30upx;
	}
	.tipsInfo{
		padding:0 20upx;
		color: #868992;
		display: flex;
		flex-direction: column;
		text{
			.myAward{
				color: red;
			}
		}
	}
</style>
