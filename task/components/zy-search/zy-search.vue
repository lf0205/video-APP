<template name="zy-search">
	<view>
		<view class="searchBox">
			<!-- 搜索 -->
			<view class="search">
				<!-- 搜索LG -->
				<image src="../../static/images/recommend/sousuo_icon.png" mode="aspectFit" class="voice-icon"></image>
				
				<!-- 搜索框 -->
				<template v-if="isFocus">
					<input maxlength="20" focus type="text" value="" confirm-type="search" @input="searchStart()" placeholder="请输入关键词搜索" v-model.trim="searchText"/>
				</template>
				<template v-else>
					<input maxlength="20" type="text" value="" confirm-type="search" @input="searchStart()" placeholder="请输入关键词搜索" v-model.trim="searchText"/>
				</template>
				
				<!-- 删除搜搜信息 -->
				<image src="../../static/images/search/shanchu_icon.png" mode="aspectFit" @click="delhistory()" class="search-icon"></image>
			</view>
			<text @tap="goBack()" class="cancel">取消</text>
		</view>
	</view>
	
</template>

<script>
	export default{
		name:"zy-search",
		props:{
			isFocus:{	//是否自动获取焦点
				type: Boolean,
				default: false
			},
			theme:{	//选择块级显示还是圆形显示
				type: String,
				default: 'block'
			}
		},
		data() {
			return {
				searchText:'',//搜索关键词
			};
		},
		methods: {
			searchStart(){	//触发搜索
				
			},
			delhistory () {		//清空搜索信息
				this.searchText = ''
			},
			goBack(){
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.searchBox{
		padding: 40upx 0 10upx 0;
		justify-content: space-around;
		display: flex;
		align-items: center;
	}
	.search{
		width: 604upx;
		height: 64upx;
		position: relative;
		background: rgb(58,58,68);
		border-radius: 4upx;
		display: flex;
		align-items: center;
		input{
			width: 90%;
			padding-left: 56upx;
			background-color: none;
			line-height: 64upx;
			font-size: 28upx;
			text-align: center;
			color: rgb(255,255,255);
		}
		.voice-icon{
			width: 56upx;
			height: 56upx;
			padding: 16upx 10upx;
			position: absolute;
			left:0upx;
			top: 4upx;
			z-index: 10;
		}
		.search-icon{
			width: 64upx;
			height: 64upx;
			padding: 16upx 10upx;
			position: absolute;
			right: 0;
			top: -2upx;
			z-index: 10;
		}
	}
	.cancel{
		color: rgb(236,63,110);
		font-size: 28upx;
		margin: 10upx;
	}
	.s-block{
		margin-top: 30upx;
		.header{
			font-size: 32upx;
			padding: 30upx;
			position: relative;
			image{
				width: 36upx;
				height: 36upx;
				padding: 10upx;
				position: absolute;
				right: 40upx;
				top: 24upx;
			}
		}
		.list{
			display: flex;
			flex-wrap: wrap;
			view{
				width: 50%;
				color: #8A8A8A;
				font-size: 28upx;
				box-sizing: border-box;
				text-align: center;
				padding: 20upx 0;
				border-top: 2upx solid #FFF;
    			border-left: 2upx solid #FFF;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				background-color: #F7F7F7;
			}
		}
	}
	.s-circle{
		margin-top: 30upx;
		.header{
			font-size: 32upx;
			padding: 30upx;
			border-bottom: 2upx solid #F9F9F9;
			position: relative;
			image{
				width: 36upx;
				height: 36upx;
				padding: 10upx;
				position: absolute;
				right: 40upx;
				top: 24upx;
			}
		}
		.list{
			display: flex;
			flex-wrap: wrap;
			padding: 0 30upx 20upx;
			view{
				padding: 8upx 30upx;
				margin: 20upx 30upx 0 0;
				font-size: 28upx;
				color: #8A8A8A;
				background-color: #F7F7F7;
				box-sizing: border-box;
				text-align: center;
				border-radius: 20upx;
			}
		}
	}
	.wanted-block{
		margin-top: 30upx;
		.header{
			font-size: 32upx;
			padding: 30upx;
		}
		.list{
			display: flex;
			flex-wrap: wrap;
			view{
				width: 50%;
				color: #8A8A8A;
				font-size: 28upx;
				box-sizing: border-box;
				text-align: center;
				padding: 20upx 0;
				border-top: 2upx solid #FFF;
				border-left: 2upx solid #FFF;
				background-color: #F7F7F7;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
	}
	.wanted-circle{
		margin-top: 30upx;
		.header{
			font-size: 32upx;
			padding: 30upx;
		}
		.list{
			display: flex;
			flex-wrap: wrap;
			padding: 0 30upx 20upx;
			view{
				padding: 8upx 30upx;
				margin: 20upx 30upx 0 0;
				font-size: 28upx;
				color: #8A8A8A;
				background-color: #F7F7F7;
				box-sizing: border-box;
				text-align: center;
				border-radius: 20upx;
			}
		}
	}
</style>
