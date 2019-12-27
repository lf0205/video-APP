<template>
	<view class="input-group">
		<view class="box">
			<view class="input-search">
				<image class="input-logo" src="../../static/images/recommend/sousuo_icon.png" mode=""></image>
				<input :placeholder="placeholder" @input="search"  v-model="name" />
				<!-- @blur="hideList()" -->
				<image @click="delhistory()" class="input-clear" src="../../static/images/search/shanchu_icon.png" mode=""></image>
			</view>
			<text @click="goBack()" class='cancel'>取消</text>
		</view>
		
		<view class="ul">								<!-- @tap="select(item)" -->
			<view class="li" v-for="(item,index) in list" :key="index" >
				<!-- {{item.name}} -->
				<view class="li-user">
					<image :src="item.titImg" mode=""></image>
					<text>{{item.name}}</text>
				</view>
				<text class="li-info">{{item.userInfo}}</text>
				<image class="li-Img" :src="item.imgUrl" mode=""></image>
				<view class="li-datas">
					<view>
						<image :src="item.likeImg" mode=""></image>
						<text>{{item.like}}</text>
					</view>
					<view>
						<image :src="item.commentImg" mode=""></image>
						<text>{{item.comment}}</text>
					</view>
					<view>
						<image :src="item.shareImg" mode=""></image>
						<text>{{item.share}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			placeholder: String, //默认提示
			searchKey: String, //模糊搜索的key值
			dataSource: {
				type: Array,
				default: function() { //数据源
					return [];
				}
			}
		},
		data() {
			return {
				list: [],//循环数据
				name: '',//用户输入值
				backName: ''
			};
		},
		destroyed() {
			clearTimeout(this.t);
		},
		methods: {
			search(e) {
				console.log("用户输入的内容",e.detail.value);
				let val = e.detail.value;
				let {
					dataSource
				} = this;
				let arr = [];
				for (let i = 0; i < dataSource.length; i++) {
					if (dataSource[i].name.indexOf(val) !== -1) {
						arr.push(dataSource[i]);
					}
				}
				console.log(arr)
				if (!val) {
					this.list = [];
				} else {
					this.list = arr;
				}

			},
			select(item) {//搜索出来的列表
				this.backName = item.name;
				console.log(this.backName);
				this.list = [];
				this.$emit('select', item);
			},
			hideList() {
				this.list = [];
				this.t = setTimeout(() => {
					this.name = this.backName;
				}, 0);
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


<style lang="scss">
	.input-group {
		position: relative;
		.box{
			position: fixed;
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			padding: 80upx 32upx 20upx 20upx;
			border-bottom: 1px solid #2b2d39;
			background: #151723;
			z-index: 999;
			.input-search{
				width: 604upx;
				position: relative;
				.input-logo{
					position: absolute;
					left: 20upx;
					top: 50%;
					margin-top: -14upx;
					width: 28upx;
					height: 28upx;
				}
				.input-clear{
					position: absolute;
					right: 20upx;
					top: 50%;
					margin-top: -15upx;
					width: 30upx;
					height: 30upx;
				}
				input {
					height: 64upx;
					padding:0 50upx 0 64upx;
					font-size: 28upx;
					background: rgb(58,58,68);
					border-radius: 4upx;
					color: rgb(255,255,255);
				}
			}
			.cancel{
				color: rgb(236,63,110);
				font-size: 28upx;
			}
		}
		

		.ul {
			flex: 1;
			padding-top: 200upx;
			width: 100%;
			background: #151723;
			.li {
				border-bottom: 1upx solid #2b2d39;
				padding-left: 20upx;
				line-height: 60upx;
				color: rgb(255,255,255);
				margin-bottom: 20upx;
				.li-user{
					display: flex;
					margin-bottom: 20upx;
					image{
						margin-right: 20upx;
						width: 60upx;
						height: 60upx;
					}
					text{
						font-size: 28upx;
						color: rgb(255,255,255);
					}
				}
				.li-info{
					color: rgb(255,255,255);
					font-size: 28upx;
				}
				.li-Img{
					border-radius: 10upx;
					margin-top: 10upx;
					width: 530upx;
					height: 850upx;
				}
				.li-datas{
					margin-bottom: 30upx;
					display: flex;
					align-items: center;
					view{
						margin-right: 40upx;
						display: flex;
						align-items: center;
						image{
							width: 40upx;
							height: 37upx;
							margin-right: 10upx;
						}
						text{
							font-size: 24upx;
							color: rgb(255,255,255);
						}
					}
				}
			}
			view{
				color: rgb(255,255,255);
			}
		}
	}
</style>
