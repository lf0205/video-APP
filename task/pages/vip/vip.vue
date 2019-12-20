<template>
    <view>
        <z-custom :isBack='true' :bgColor="'bg-black'">
            <view slot='backText'>
                <text style="color: #ffffff;">会员中心</text>
            </view>
        </z-custom>

        <view class="topbg bg-black">
            <view class="vip-sel">
                <swiper class="card-swiper " :indicator-dots="false" :circular="false" @change="cardSwiper" :current="currentIndex">
                    <swiper-item v-for="(item,index) in config" :key="index" :class="'vip_' + currentIndex == index ? 'cur' : ''">
                        <view class="swiper-item bg-img bg-mask flex align-center" :style="'background-image: url(/static/images/vip/'+index+'.png);'">
                            <view class="padding-xl text-white">
                                <view class="padding-xs">
                                    <text class="text-xxl text-bold">{{item.name}}</text>
                                    <text v-if="'vip_'+currentVip == index && currentVipExpired" class="text-xs margin-left-xs">{{currentVipExpired}} 到期</text>
                                </view>
                                <view class="padding-xs">
                                    <text>{{item.mark}}</text>
                                </view>
                            </view>
                            <view class='cu-tag badge current-vip' v-if="'vip_' + currentVip == index">当前</view>
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
                <view v-for="(item,index) in config" :key="index" :style="'vip_'+currentIndex==index?'':'display:none'">
                    <view class="grid col-3">
                        <view class="padding-sm">
                            <view class="padding radius text-center shadow-blur">
                                <view class="cuIcon-upstagefill"></view>
                                <view class="margin-top-sm"><text>招商奖\n{{rewardInvestment[currentIndex]}}%</text></view>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="padding-left">
                    <text class="text-xs">* 加入公会后才能获得招商奖励</text>
                </view>
            </view>
        </view>

        <view class="bg-white">
            <view class="cu-bar">
                <view class='action'>
                    <view class="cuIcon-upstagefill margin-right"></view> 特权
                </view>
            </view>
            <view class="solid-top">
                <view v-for="(item,index) in config" :key="index" :style="'vip_'+ currentIndex == index ? '' : 'display:none'">
                    <view class="grid col-3">
                        <view class="padding-sm">
                            <view class="padding radius text-center shadow-blur">
                                <view style="font-size: 60upx;" class="cuIcon-formfill"></view>
                                <view class="margin-top-sm">
                                    <text>每日发布\n{{item.apply < 0 ? '无限' : item.apply}}</text>
                                </view>
                            </view>
                        </view>
                        <view class="padding-sm">
                            <view class="padding radius text-center shadow-blur">
                                <view style="font-size: 60upx;" class="cuIcon-timefill"></view>
                                <view class="margin-top-sm">
                                    <text>每日接单\n{{item.issue < 0 ? '无限' : item.issue}}</text>
                                </view>
                            </view>
                        </view>
                    </view>
                    <view class="margin-top-xl">
                        <view class="padding flex flex-direction" v-if="item.price && (currentVip == 0 || currentVip == currentIndex)">
                            <button class="cu-btn bg-black margin-tb-sm lg" v-for="(p, m) in item.price" :key="p"
                                    @tap="doApply" :data-time="m">{{label}}{{m}} ( {{p}} 元)
                            </button>
                        </view>
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
                currentVip: 0,
                currentIndex: 0,
                currentVipExpired: '',
                rewardInvestment: [],
                config: []
            }
        },
        created() {
            this.initVip()
            this.currentVipExpired = this.$api.getConfig('vip_expired')
            this.currentIndex = this.currentVip
            this.rewardInvestment = this.$api.getConfig('reward_investment', this.$api.SYSTEM_CONFIG)

            var vips = this.$api.getConfig('vip', this.$api.SYSTEM_CONFIG)
			console.log("获取到的vip数据",vips)
            for (let k in vips) {
                if (!vips[k].price) {
                    vips[k].price = 0
                } else {
                    if (typeof vips[k].price === 'string') {
                        vips[k].price = JSON.parse(vips[k].price);
                    }
                }
            }
            this.config = vips
        },
        computed:{
            label(){
                return this.currentVip > 0 ? '续费' : '开通'
            }
        },
        methods: {
            initVip(){
                this.currentVip = this.$api.getConfig('vip')
				
				console.log("当前的vip等级",this.$api.getConfig('vip'));
            },
            doApply(e) {
                this.$api.post('user/vip', {
                    time: e.currentTarget.dataset.time,
                    vip: this.currentIndex,
                }, (res => {
					console.log("成功",res);
                    if (res.code == 0) {
                        if (res.data.paid == false) {
                            this.$api.msg("正在前往支付")
                            this.$api.payment(res.data.orderInfo, (res)=>{
                                this.$api.setConfig('vip', this.currentIndex, this.$api.USER_CONFIG)
								console.log(this.currentIndex);
								console.log(this.$api.USER_CONFIG);
								console.log(this.initVip());
                                this.initVip()
                                this.$api.modal('支付成功')
                            }, (err)=>{
                                this.$api.msg('支付失败')
                            })
                        } else { //无需支付
                            this.$api.setConfig('vip', this.currentIndex, this.$api.USER_CONFIG)
                            // 支付成功调用初始Vip方法，改变所买的vip等级
							this.initVip()
                            this.$api.modal('支付成功')
                        }
                    }
                }))
            },
            cardSwiper(e) {
                this.currentIndex = e.detail.current
            }
        }
    }
</script>

<style scoped lang="scss">
    .topbg {
        width: 100%;
        padding-bottom: 0upx;
        .vip-sel {
            .current-vip {
                border-radius: 0;
                padding: 20upx 10upx;
                top: 0;
                right: 0;
            }
        }
    }
</style>
