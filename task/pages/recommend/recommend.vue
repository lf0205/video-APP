<template>
	<!-- <view class="videoBox">
		<view class="video">
			<image src="../../static/images/recommend/bg.png" mode=""></image>
		</view>
		<view class="videoUserInfo">
			<view class="videoUserImg">
				<image class="userImg" src="../../static/images/recommend/touxiang.png"></image>
				<view>
					<image src="../../static/images/recommend/dianzan_icon_nor.png"></image>
					<text>{{Fabulous}}</text>
				</view>
				<view>
					<image src="../../static/images/recommend/pinglun_icon.png"></image>
					<text>{{info}}</text>
				</view>
				<view>
					<image src="../../static/images/recommend/fenxiang_icon.png"></image>
					<text>{{share}}</text>
				</view>
			</view>
			<view class="videoUserContent">
		
			</view>
		</view>
		<view class="cu-bar tabbar  shadow foot text-black">
		    <view class="action" v-for="(v, i) in tabBar" :key="i" @tap="navChange(v.name)">
		        <view :class="v.icon"></view>
		        {{v.title}}
		    </view>
		</view>
	</view> -->
	<view class="page" :style="{ height: height }">
		<z-custom :isBack='true'>
			<view slot='content'>{{title}}</view>
			<view slot='right'>
				<image class="search" src="../../static/images/recommend/sousuo_icon.png"></image>
			</view>
		</z-custom>
		<view class="swiperBox">
			<swiper
				class="swiper"
				:vertical="true"
				@change="changeCurrent"
				:current="index">
				<swiper-item v-for="(item, idx) in videoList" :key="idx" class="swiper-item">
						<view v-if="Math.abs(index-idx)<=1" class="video-box">
							<!-- 视频 -->
							<chunlei-video controls class="video" :src="item.src"  :height="height" :width="width" :play="item.flag" v-if="Math.abs(index-idx)<=1" :gDuration="item.duration" :initialTime="item.initialTime" @pause="pauseVideo" :objectFit="item.objectFit"
							>
							</chunlei-video>
							
							<!-- 底部信息 -->
							<view class="cover-view-left">
								<view class="left-view">
									<!-- #ifdef APP-PLUS-NVUE -->
									<text class="left-text">@{{item.at}}</text>
									<!-- #endif -->
									<!-- #ifndef APP-PLUS-NVUE -->
									<view class="left-text">@{{item.at}}</view>
									<!-- #endif -->
								</view>
								<view class="left-view">
									<!-- #ifdef APP-PLUS-NVUE -->
									<text class="left-text">{{item.content}}</text>
									<!-- #endif -->
									<!-- #ifndef APP-PLUS-NVUE -->
									<view class="left-text">{{item.content}}</view>
									<!-- #endif -->
								</view>
							</view>
							
							<!-- 右边图标信息 -->
							<view class="cover-view-right">
								<view class="auther" @tap="follow()">
									<image :src="item.avater" class="avater img" @click.stop="tapAvater"></image>
									<!-- #ifdef APP-PLUS-NVUE -->
									<text class="right-text-avater">+</text>
									<text class="right-text"></text>
									<!-- #endif -->
									<!-- #ifndef APP-PLUS-NVUE -->
									<view class="right-text-avater">+</view>
									<view class="right-text"></view>
									<!-- #endif -->
								</view>
								<view class="aixinclick" @tap="spot()">
									<image :src="item.check?'../../static/aixinRed.png':'../../static/aixin.png'" class="img" @click.stop="tapLove"></image>
									
									<!-- #ifdef APP-PLUS-NVUE -->
									<text class="right-text">{{item.like}}</text>
									<!-- #endif -->
									<!-- #ifndef APP-PLUS-NVUE -->
									<view class="right-text">{{item.like}}</view>
									<!-- #endif -->
								</view>
								
								<view class="info" @tap="info()">
									<image src="../../static/xiaoxi.png" class="img" @click.stop="tapMsg"></image>
									<!-- #ifdef APP-PLUS-NVUE -->
									<text class="right-text">{{item.comment}}</text>
									<!-- #endif -->
									<!-- #ifndef APP-PLUS-NVUE -->
									<view class="right-text">{{item.comment}}</view>
									<!-- #endif -->
								</view>
								
								<view class="share" @tap="share()">
									<image src="../../static/share-fill.png" class="img" @click.stop="tapShare"></image>
									
									<!-- #ifdef APP-PLUS-NVUE -->
									<text class="right-text">分享</text>
									<!-- #endif -->
									<!-- #ifndef APP-PLUS-NVUE -->
									<view class="right-text">分享</view>
									<!-- #endif -->
								</view>
							</view>
						</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	// export default {
	// 	data() {
	// 		return {
	// 			title:"推荐",
	// 			tabBar:[
	// 				{
	// 				    name: 'index',
	// 				    title: '首页',
	// 				    icon: 'cuIcon-home'
	// 				},
	// 				{
	// 				    name: 'cate',
	// 				    title: '发布',
	// 				    icon: 'cuIcon-add'
	// 				},
	// 				{
	// 				    name: 'user',
	// 				    title: '我的',
	// 				    icon: 'cuIcon-my'
	// 				}
	// 			],
	// 			Fabulous:'0',
	// 			info:'评论',
	// 			share:"分享"
	// 		}
	// 	},
	// 	methods:{
	// 		navChange(url){
	// 			console.log(url);
	// 			uni.reLaunch({
	// 				url:"../home?name="+url
	// 			})
	// 		}
	// 	}
	// }
	import chunleiVideo from '../../components/chunlei-video/chunlei-video.vue'
	export default { 
		components:{
			chunleiVideo
		},
	    data() {
	        return {
				title:"推荐",
				sysheight:0,
				videoList:[
					{
						src:'https://dcloud-img.oss-cn-hangzhou.aliyuncs.com/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126.mp4',
						content:'为什么要选择uni-app？',
						flag:false,
						check:false,
						like:'10w',
						comment:'1045',
						avater:'../../static/logo.png',
						initialTime:0,
						at:'Dcloud',
						duration:841,
						objectFit:'fill'
					},
					{
						src:'http://baobab.kaiyanapp.com/api/v1/playUrl?vid=129764&resourceType=video&editionType=default&source=aliyun&playUrlType=url_oss',
						content:'广告有反转：危机感十足！一辆车都比你靠谱',
						flag:false,
						check:true,
						like:'7w',
						comment:'1045',
						avater:'http://img.kaiyanapp.com/e44ed5fcfa424ba35761ce5f1339bc16.jpeg?imageMogr2/quality/60/format/jpg',
						initialTime:0,
						at:'欧美广告精选',
						duration:149
					},
					{
						src:'http://baobab.kaiyanapp.com/api/v1/playUrl?vid=164016&resourceType=video&editionType=default&source=aliyun&playUrlType=url_oss',
						content:'无辣不欢，你没见过小龙虾的大场面',
						flag:false,
						check:false,
						like:'7w',
						comment:'1045',
						avater:'http://img.kaiyanapp.com/7af2bb1bc134fb1115d48f05e9d317f0.jpeg?imageMogr2/quality/60/format/jpg',
						initialTime:0,
						at:'世界美食荟萃',
						duration:1162
					},
				],
				height:'667px',
				index:0,
				width:'',
				oldIndex:0
			}
	    },
		created(){
			//#ifdef APP-PLUS
			plus.screen.lockOrientation("portrait-primary")
			//#endif
			this.sysheight = uni.getSystemInfoSync().windowHeight
			this.height = `${this.sysheight}px` 
			let width = uni.getSystemInfoSync().windowWidth 
			this.width = `${width}px` 
		},
		async mounted() {
			setTimeout(() =>{
				this.videoPlay(this.index)
			}, 200);
			await this.pushVideoList()
			
		},
		onHide(){
			for (let item of this.videoList) {
				item.flag = false
			}
		},
	    methods: {
			changeCurrent(e){
				this.index = e.detail.current;
				for (let item of this.videoList) {
					item.flag = false
				}
				this.videoList[this.index].flag = !this.videoList[this.index].flag
			},
			pushVideoList(){
				let promise = new Promise((resolve,reject)=>{
					uni.request({
						url: 'https://api.apiopen.top/videoRecommend?id=127397',
						success: (res) => {
							let videoGroup = []
							for (let item of res.data.result) {
								if(item.type == 'videoSmallCard'){
									videoGroup.push({
										src:item.data.playUrl,
										content:item.data.title,
										flag:false,
										check:false,
										like:'7w',
										comment:'1045',
										at:item.data.author.name,
										avater:item.data.author.icon,
										initialTime:0,
										duration:item.data.duration
									})
								}
							}
							this.videoList = [...this.videoList,...videoGroup]
							this.videoList = [...this.videoList,...videoGroup]
							this.videoList = [...this.videoList,...videoGroup]
							resolve()
						}
					})
				}) 
				return promise
			},
			tapLove(){
				this.videoList[this.index].check = !this.videoList[this.index].check
				this.videoList = [...this.videoList]
				
			},
			tapAvater(){
				uni.showToast({
					icon:'none',
					title:`点击索引为${this.index}的头像`
				})
			},
			tapMsg(){
				uni.showToast({
					icon:'none',
					title:`查看索引为${this.index}的评论`
				})
			},
			tapShare(){
				uni.showToast({
					icon:'none',
					title:`分享索引为${this.index}的视频`
				})
			},
			videoPlay(index){
				let promise = new Promise((resolve,reject)=>{
					resolve()
				})
				promise.then(res=>{
					this.videoList[index].flag = !this.videoList[index].flag
				})
			},
			pauseVideo(val){
				if(typeof this.videoList[this.oldIndex].initialTime !='undefined') this.videoList[this.oldIndex].initialTime = val
			},
			clickVideo(){
				this.videoList[this.index].flag = !this.videoList[this.index].flag
			},
			follow(){
				console.log("关注")
			},
			spot(){
				console.log("点赞");
			},
			info(){
				console.log("信息");
			},
			share(){
				console.log("分享");
			}
		},
		watch:{
			index(newVal,oldVal){
				this.oldIndex = oldVal
			}
		}
	}
</script>

<style scoped lang="scss">
	.page{
		position: relative;
	}
	z-custom{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1;
		height: 45upx;
	}
	.search{
		width: 44upx;
		height: 44upx;
	}
	.swiperBox{
		// margin-top: 45upx;
		flex: 1;
	}
	.swiper{
		// flex: 1;
		height: 100%;
		background-color: #000;
	}
	.swiper-item {
	    flex: 1;
	}
	.video {
		flex: 1;
	}
	.video-box{
		flex: 1;
	}
	.cover-view-center{
		position: absolute;
		justify-content: center;
		align-items: center;
		opacity: 0.1;
		z-index: 999;
	}
	.cover-view-left{
		position: absolute;
		margin-left: 10upx;
		width: 500upx;
		bottom: 120upx;
		z-index: 9999;
		font-size: 16px;
		color: #FFFFFF;
		/* #ifndef APP-PLUS */
		white-space: pre-wrap;
		text-overflow:ellipsis;
		overflow:hidden;
		/* #endif */
	}
	.left-view{
		margin-bottom: 20upx;
	}
	.left-text{
		font-size: 16px;
		color: #FFFFFF;
	}
	.avater{
		border-radius: 50upx;
		border-color: #fff;
		border-style: solid;
		border-width: 2px;
	}
	
	.cover-view-right{
		position: absolute;
		bottom: 160upx;
		right: 20upx;
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		z-index: 9999;
	}
	
	.right-text-avater{
		position: absolute;
		font-size: 14px;
		top: 80upx;
		left: 30upx;
		height: 40upx;
		width: 40upx;
		background-color: #DD524D;
		color: #FFFFFF;
		border-radius: 50%;
		text-align: center;
		line-height: 40upx;
		z-index: 999;
	}
	.avater-icon{
		height: 40upx;
		width: 40upx;
		
		color: #fff;
		background-color: #DD524D;
		border-radius: 50%;
		position: absolute;
		left: 30upx;
		top:-20upx;
	}
	.auther,.aixinclick,.info,.share{
		margin-bottom: 40upx;
	}
	.right-text{
		text-align: center;
		font-size: 14px;
		color: #FFFFFF;
		height: 20px;
	}
	.img{
		height: 100upx;
		width: 100upx;
		opacity: 0.9;
	}
	.page{
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		flex: 1; 
	}
</style>
