<template>
	<view class="index-content">
		<view class="index-top" :style="topStyle">
			<!-- 顶部 -->
			<view :style="barStyle"></view>
			<!-- 头部轮播 -->
			<view>
				<swiper class="card-swiper" :circular="true" :autoplay="true" :interval="5000" :duration="500" @change="cardSwiper" indicator-color="#8799a3" indicator-active-color="#0081ff">
					<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
						<view class="swiper-item" @tap="  (item)">
							<image :src="item.image" mode="aspectFill"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<!-- 首页菜单栏 -->
		<view class="cu-list grid col-4 no-border">
			<view class="cu-item" v-for="(item,index) in homeMenuList" :key="index" v-if="item.url && item.icon">
				<!-- 使用navigator传递动态的url，根据url跳转到不同的页面 -->
				<navigator :url="item.url" hover-class="none">
					<view class="text-center">
						<image :src="item.icon" mode="aspectFill" class="menu-lists"></image>
					</view>
					<text>{{item.name}}</text>
				</navigator>
			</view>
		</view>
		<!-- 首页推荐栏 -->
		<view class='solid-top'>
			<view class="cu-bar bg-white">
				<navigator class="recommend" url="/pages/recommend/recommend">
					<view class="action">
						<text class="cuIcon-hotfill text-green"></text>
						<text class="text-sm text-bold">推荐</text>
					</view>	
				</navigator>
			</view>
			<!-- 首页推荐列表 -->
			<z-lists :hot="true" ref="scroll"></z-lists>
		</view>
	</view>
</template>

<script>
	import zLists from '../components/z-lists.vue'
	export default {
		components: {
			'z-lists': zLists,
		},
		data() {
			return {
				searchText: '',
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				cardCur: 0,
				towerStart: 0,
				titleNViewBackground: '', // 背景色
                bg_color: '',
				swiperList: [],
				direction: '',
                homeMenuList: [],
				modalName: null
			};
		},
		computed: {
			barStyle() {
				var StatusBar= this.StatusBar
				var bg_color = this.titleNViewBackground
				return `position:fixed;height:${StatusBar}px;z-index:999;left: 0;top: 0;width: 100%;background-color: ${bg_color};color: #333333;`;
			},
			// 顶部轮播背景色
			topStyle() {
				var StatusBar= this.StatusBar
				var titleNViewBackground = this.titleNViewBackground || this.bg_color
				return `padding-top:${StatusBar}px;background-color:${titleNViewBackground}`;
			}
		},
		created() {
			// 页面初始化完成后调用方法，显示数据
            this.homeMenuList = this.$api.getConfig('home', this.$api.SYSTEM_CONFIG);
			this.loadData();//背景色
            this.getSwiperList();//轮播图显示
		},
		methods: {
			// 获取首页顶部轮播
			getSwiperList () {
				this.$api.post('advert/slider' , {
					cate_name : 'home-top-banner'
				} , (res=>{
					this.swiperList = res.data
					// console.log("轮播数据",res.data);
					if(res.data.length > 0) {
						this.bg_color 	= this.swiperList[this.cardCur].bg_color
					}
				}))
			},
			async loadData() {
				this.titleNViewBackground = this.bg_color
			},
			// 自定义事件，轮播发生变化时可改变对应页面的背景色
			cardSwiper(e) {
				console.log(e);
				this.cardCur = e.detail.current
				this.titleNViewBackground = this.swiperList[this.cardCur].bg_color;
			},
            // 页面跳转(还未实现)
			goUrl(info){
				uni.navigateTo({
					url: info.url
				})
			},
			// 刷新
            refresh(){
				// console.log(this.$refs.scroll)
                return this.$refs.scroll.refresh();
            },
            scroll(){
                return this.$refs.scroll.next();
            }
			// jump(){
			// 	uni.navigateTo({
			// 		url:"./recommend/recommend"
			// 	})
			// }
		}
	};
</script>

<style scoped lang="scss">
	.index-content{
		padding-bottom: 150upx;
	}
	.card-swiper uni-swiper-item{
		padding: 18px 0px 18px;
	}
	.menu-lists{
		width: 100upx;
		height: 100upx;
		display: inline-table;
	}
	.recommend{
		height: 100%;
		width: 100%;
		display: flex;
	}
</style>
