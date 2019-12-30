<template name="zy-search">
	<view class="searchs">
		<inputSearch :dataSource="dataSource" @select="handleChange" placeholder="请输入商品名称" />
	</view>
	
</template>

<script>
	import inputSearch from "../../components/p-inputSearch/inputSearch.vue"
	export default{
		components:{
			inputSearch
		},
		data() {
			return {
				dataSource: [{
						id: 1,
						name: '请叫我女神1',
						titImg:'../../static/images/search/touxiang.png',
						userInfo:"二火锅我不想去吃并不咋的，我来告哈黑娃老火锅",
						imgUrl:"../../static/images/search/phonto.png",
						like:'666',
						likeImg:'../../static/images/search/dianzan_icon.png',
						islike:false,
						comment:'评论',
						commentImg:"../../static/images/search/pinglun_icon.png",
						share:'分享',
						shareImg:"../../static/images/search/fenxiang_icon.png"
					},
					{
						id: 2,
						name: '请叫我女神2',
						titImg:'../../static/images/search/touxiang.png',
						userInfo:"二火锅我不想去吃并不咋的，我来告哈黑娃老火锅",
						imgUrl:"../../static/images/search/phonto.png",
						like:'666',
						likeImg:'../../static/images/search/dianzan_icon.png',
						islike:false,
						comment:'评论',
						commentImg:"../../static/images/search/pinglun_icon.png",
						share:'分享',
						shareImg:"../../static/images/search/fenxiang_icon.png"
					},
					{
						id: 3,
						name: '请叫我女神3',
						titImg:'../../static/images/search/touxiang.png',
						userInfo:"二火锅我不想去吃并不咋的，我来告哈黑娃老火锅",
						imgUrl:"../../static/images/search/phonto.png",
						like:'666',
						likeImg:'../../static/images/search/dianzan_icon.png',
						islike:false,
						comment:'评论',
						commentImg:"../../static/images/search/pinglun_icon.png",
						share:'分享',
						shareImg:"../../static/images/search/fenxiang_icon.png"
					},
					{
						id: 4,
						name: '请叫我女神4',
						titImg:'../../static/images/search/touxiang.png',
						userInfo:"二火锅我不想去吃并不咋的，我来告哈黑娃老火锅",
						imgUrl:"../../static/images/search/phonto.png",
						like:'666',
						likeImg:'../../static/images/search/dianzan_icon.png',
						islike:false,
						comment:'评论',
						commentImg:"../../static/images/search/pinglun_icon.png",
						share:'分享',
						shareImg:"../../static/images/search/fenxiang_icon.png"
					},
					{
						id: 5,
						name: '请叫我女神5',
						titImg:'../../static/images/search/touxiang.png',
						userInfo:"二火锅我不想去吃并不咋的，我来告哈黑娃老火锅",
						imgUrl:"../../static/images/search/phonto.png",
						like:'666',
						likeImg:'../../static/images/search/dianzan_icon.png',
						comment:'评论',
						islike:false,
						commentImg:"../../static/images/search/pinglun_icon.png",
						share:'分享',
						shareImg:"../../static/images/search/fenxiang_icon.png"
					},
					{
						id: 6,
						name: '偶买噶6',
						titImg:'../../static/images/search/touxiang.png',
						userInfo:"二火锅我不想去吃并不咋的，我来告哈偶买噶老火锅",
						imgUrl:"../../static/images/search/phonto.png",
						like:'666',
						likeImg:'../../static/images/search/dianzan_icon.png',
						islike:false,
						comment:'评论',
						commentImg:"../../static/images/search/pinglun_icon.png",
						share:'分享',
						shareImg:"../../static/images/search/fenxiang_icon.png"
					},
					{
						id: 7,
						name: '偶买噶7',
						titImg:'../../static/images/search/touxiang.png',
						userInfo:"二火锅我不想去吃并不咋的，我来告哈偶买噶老火锅",
						imgUrl:"../../static/images/search/phonto.png",
						like:'666',
						likeImg:'../../static/images/search/dianzan_icon.png',
						islike:false,
						comment:'评论',
						commentImg:"../../static/images/search/pinglun_icon.png",
						share:'分享',
						shareImg:"../../static/images/search/fenxiang_icon.png"
					},
					{
						id: 8,
						name: '偶买噶8',
						titImg:'../../static/images/search/touxiang.png',
						userInfo:"二火锅我不想去吃并不咋的，我来告哈偶买噶老火锅",
						imgUrl:"../../static/images/search/phonto.png",
						like:'666',
						likeImg:'../../static/images/search/dianzan_icon.png',
						islike:false,
						comment:'评论',
						commentImg:"../../static/images/search/pinglun_icon.png",
						share:'分享',
						shareImg:"../../static/images/search/fenxiang_icon.png"
					},
					{
						id: 9,
						name: '偶买噶9',
						titImg:'../../static/images/search/touxiang.png',
						userInfo:"二火锅我不想去吃并不咋的，我来告哈偶买噶老火锅",
						imgUrl:"../../static/images/search/phonto.png",
						like:'666',
						likeImg:'../../static/images/search/dianzan_icon.png',
						islike:false,
						comment:'评论',
						commentImg:"../../static/images/search/pinglun_icon.png",
						share:'分享',
						shareImg:"../../static/images/search/fenxiang_icon.png"
					},
					{
						id: 10,
						name: '偶买噶10',
						titImg:'../../static/images/search/touxiang.png',
						userInfo:"二火锅我不想去吃并不咋的，我来告哈偶买噶老火锅",
						imgUrl:"../../static/images/search/phonto.png",
						like:'666',
						likeImg:'../../static/images/search/dianzan_icon.png',
						islike:false,
						comment:'评论',
						commentImg:"../../static/images/search/pinglun_icon.png",
						share:'分享',
						shareImg:"../../static/images/search/fenxiang_icon.png"
					}
				],
			};
		},
		methods: {
			handleChange(data) {
				console.log(data)
			}
		}
	}
</script>

<style lang="less" scoped>
	.searchs{
		height: 100%;
		width: 100%;
		background: #151723;
	}
</style>
