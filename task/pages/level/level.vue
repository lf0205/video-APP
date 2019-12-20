<template>
	<view>
		<z-custom :isBack='true' :bgColor="'bg-black'">
			<view slot='backText'><text style="color: #ffffff;">等级</text></view>
		</z-custom>
		
		<view class="topbg bg-black">
			<view class="level-sel">
				<swiper class="card-swiper " :indicator-dots="false" :circular="false" @change="cardSwiper" :current="currentIndex">
					<swiper-item v-for="(item,index) in config" :key="index" :class="'level_'+currentIndex == index?'cur':''">
						<view class="swiper-item bg-img bg-mask flex align-center" :style="'background-image: url(/static/images/level/'+index+'.png);'">
							<view class="padding-xl text-white">
								<view class="padding-xs">
									<text class="text-xxl text-bold">{{item.name}}</text>
								</view>
								<view class="padding-xs">
									<text v-if="index != 'level_0'"><text class="cuIcon-title"> </text>完成实名认证\n</text>
									<text v-if="item.upgrade_recommend"><text class="cuIcon-title"> </text>推荐{{item.upgrade_recommend}}个会员注册并完成一次任务</text>
								</view>
							</view>
							<view class='cu-tag badge current-level' v-if="'level_'+currentLevel == index">当前</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>

		<view class="bg-white">
			<view class="cu-bar">
				<view class='action'><view class="cuIcon-upstagefill margin-right"></view>收益</view>
			</view>
			<view class="solid-top">
				<view  v-for="(item,index) in config" :key="index" :style="'level_'+currentIndex==index?'':'display:none'">
					<view class="grid col-3">
						<view class="padding-sm">
							<view class="padding radius text-center shadow-blur">
								<view class="cuIcon-upstagefill"></view>
								<view class="margin-top-sm"><text>推荐奖\n{{reward[currentIndex]}}%</text></view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="bg-white margin-top-xs">
			<view class="cu-bar">
				<view class='action'><view class="cuIcon-upstagefill margin-right"></view>排行榜</view>
			</view>
			<view class="solid-top">
				<view class="grid col-3">
					<view class="padding-sm" v-if="ranking.length > 1">
						<view class="padding text-white margin-top-xl radius text-center shadow-blur bg-green">
							<view>第<text class="text-bold margin-lr-xs text-lg">2</text>名</view>
							<view class="margin-tb-sm">
								<view class="cu-avatar round" :style="'background-image:url('+ ranking[1].avatar +')'"></view>
							</view>
							<view>{{ranking[1].username}}</view>
							<view>人数：{{ranking[1].num}}</view>
						</view>
					</view>
					<view class="padding-sm" v-if="ranking.length > 0">
						<view class="padding text-white radius text-center shadow-blur bg-yellow">
							<view>第<text class="text-bold margin-lr-xs text-lg">1</text>名</view>
							<view class="margin-tb-sm">
								<view class="cu-avatar round" :style="'background-image:url('+ ranking[0].avatar +')'"></view>
							</view>
							<view>{{ranking[0].username}}</view>
							<view>人数：{{ranking[0].num}}</view>
						</view>
					</view>
					<view class="padding-sm" v-if="ranking.length > 2">
						<view class="padding text-white margin-top-xl radius text-center shadow-blur bg-olive">
							<view>第<text class="text-bold margin-lr-xs text-lg">3</text>名</view>
							<view class="margin-tb-sm">
								<view class="cu-avatar round" :style="'background-image:url('+ ranking[2].avatar +')'"></view>
							</view>
							<view>{{ranking[2].username}}</view>
							<view>人数：{{ranking[2].num}}</view>
						</view>
					</view>
				</view>

				<view v-if="ranking.length > 3" class="cu-list menu-avatar">
					<view class="cu-item" v-for="(item,index) of ranking.slice(3)" :key="index">
						<view class="cu-avatar round" :style="[{backgroundImage:'url('+ item.avatar +')'}]"></view>
						<view class="content">
							<view class="text-grey">{{item.username}}</view>
							<view class="text-gray text-sm">人数：{{item.num}}</view>
						</view>
						<view class="action"><text>第 {{index + 4}} 名</text></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentLevel: 0,
				currentIndex: 0,
                config: [],
                reward: [],
				ranking: [],
			}
		},
        created() {
            this.currentLevel = this.$api.getConfig('level')
            this.currentIndex = this.currentLevel

            var levels = this.$api.getConfig('level', this.$api.SYSTEM_CONFIG)
            this.reward = this.$api.getConfig('reward_parent_level', this.$api.SYSTEM_CONFIG)
            this.config = levels

            this.$api.post('user/ranking' , {} , (res=>{
                if (res.code == 0) {
                    this.ranking = res.data
				}
            }))
        },
		methods: {
			cardSwiper(e) {
				this.currentIndex = e.detail.current
			}
		}
	}
</script>

<style scoped lang="scss">
	.topbg{
		width: 100%;
		padding-bottom: 0upx;
		.level-sel{
			.current-level{
				border-radius: 0;
				padding: 20upx 10upx;
				top: 0;
				right: 0;
			}
		}
	}
</style>