<template>
    <view>
		<!-- 首页推荐列表详情页 -->
		<!-- 头部 -->
        <z-custom :isBack='true'>
            <view slot='backText'>任务</view>
        </z-custom>
		
        <view class="lists m-b-nav" v-if="detail.id > 0">
            <view class="cu-item shadow">
                <view class="cu-list menu-avatar">
					<!-- 头部图片及信息 -->
                    <view class="cu-item">
						<!-- 头部左边图片 -->
                        <view class="cu-avatar radius lg"
                              :style="'background-image:url('+detail.cate.image+');'"></view>
						<!-- 头部右边信息 -->
                        <view class="content flex-sub">
                            <view class='text-bold text-xl text-cut'>{{detail.title}}</view>
                            <view v-if="detail.status == 7" class='text-bold text-red text-cut'>被关闭 {{detail.reason}}</view>
                            <view class="text-gray text-sm flex justify-between">
                                <view class="padding-xs">
                                    <view class='cu-tag bg-gradual-red cuIcon-hotfill' v-if="detail.hot == 1"></view>
                                    <view class='cu-tag bg-gradual-green cuIcon-timefill'
                                          v-if="detail.browse == 1"></view>
                                    <view class='cu-tag bg-gradual-blue cuIcon-noticefill'
                                          v-if="detail.stock < 6"></view>
                                    <view class='cu-tag bg-green cuIcon-refresh' v-if="detail.repeat > 0"></view>
                                </view>
                            </view>
                        </view>
                        <view v-if="detail.applied" class='cu-tag line-cyan applyed'>已申请</view>
                    </view>
					<!-- 头部用户头像及名称 -->
                    <view class="cu-list menu ">
                        <view class="cu-item">
                            <view class="content">
                                <image :src="detail.user.avatar" class="radius" mode="aspectFit"></image>
                                <text class="text-grey">{{detail.user.username}}</text>
                            </view>
                        </view>
                    </view>
                </view>
				<!-- 简介 -->
                <view class="text-content margin-top-xs">
                    <view class="cu-bar bg-white solid-bottom">
                        <view class="action">
                            <text class="text-bold">简介</text>
                        </view>
                    </view>
                    <view class="bg-white padding introduction  padding-top padding-bottom">
                        <view class="cu-list menu">
                            <view class="cu-item ">
                                <view class="content">
                                    <text class="text-black">剩余名额</text>
                                </view>
                                <view class="action">
                                    <text class="text-bold text-red">{{detail.stock}}</text>
                                </view>
                            </view>
                        </view>
                        <view class="cu-list menu">
                            <view class="cu-item ">
                                <view class="content">
                                    <text class="text-black">任务收益</text>
                                </view>
                                <view class="action">
                                    <text class="text-bold text-red">{{detail.income}} 元</text>
                                </view>
                            </view>
                        </view>
                        <view class="cu-list menu" v-if="repeat_time">
                            <view class="cu-item ">
                                <view class="content">
                                    <text class="text-black">重复申请</text>
                                </view>
                                <view class="action">
                                    <text class="text-grey">{{repeat_time}}</text>
                                </view>
                            </view>
                        </view>
                        <view class="cu-list menu">
                            <view class="cu-item ">
                                <view class="content">
                                    <text class="text-black">发布时间</text>
                                </view>
                                <view class="action">
                                    <text class="text-grey">{{detail.create_time}}</text>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
                <!-- 描述 -->
				<view class="text-content margin-top-xs">
                    <view class="cu-bar bg-white solid-bottom">
                        <view class="action">
                            <text class="text-bold">描述</text>
                        </view>
                    </view>
                    <view class="bg-white padding">{{detail.content}}</view>
                </view>
                <!-- 步骤 -->
				<view class="text-content margin-top-xs" v-if="detail.step">
                    <view class="cu-bar bg-white solid-bottom">
                        <view class="action">
                            <text class="text-bold">步骤</text>
                        </view>
                    </view>
                    <view class="bg-white padding-lg" v-for="(v, k) in detail.step" :key="k">
                        <view>
                            <text class="text-bold">第{{k+1}}步</text>
                        </view>
                        <view class="padding">
                            {{v.mark}}
                            <image v-if="v.img" :src="v.img" :data-src="v.img" @tap="showImg" mode="aspectFit"></image>
                        </view>
                    </view>
                </view>
            </view>
			<!-- 底部报名 -->
            <view class="cu-bar bg-white tabbar border cu-bar foot" v-if="!detail.applied && detail.user.username !== userinfo.username">
                <view class="btn-group">
                    <button class="cu-btn bg-grey no-b-r shadow-blur lg bar-w" @tap="join">立即报名</button>
                </view>
            </view>
            <!-- 立即支付 -->
			<view class="cu-bar bg-white tabbar border cu-bar foot"
                  v-if="detail.status == 0 && detail.user.username === userinfo.username">
                <view class="btn-group">
                    <button class="cu-btn bg-grey no-b-r shadow-blur lg bar-w" @tap="doPay">立即支付</button>
                </view>
            </view>
            <!-- 查看记录 -->
			<view class="cu-bar bg-white tabbar border cu-bar foot"
                  v-if="detail.status > 0 && detail.status < 7 && detail.user.username === userinfo.username">
                <view class="btn-group">
                    <button class="cu-btn bg-grey no-b-r shadow-blur lg bar-w" @tap="goOrders">查看记录</button>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                userinfo: {},
                repeat_time: '',
                detail: {
                    id: 0,
                    title: '',
                    stock: '',
                    price: '',
                    content: '',
                    create_time: '',
                    cate: {
                        title: '',
                        image: '',
                    },
                    user: {
                        username: '',
                        avatar: ''
                    }
                }
            }
        },
        created() {
            this.userinfo = this.$api.getConfig()
			console.log("获取用户信息",this.$api.getConfig());
        },
        methods: {
            showImg(e) {
				// 创建方法预览图片
                this.$api.previewImage([e.target.dataset.src]);
            },
            join() {
                var verified = this.$api.getConfig('verified')
				console.log(this.$api.getConfig('verified'));
                if (verified != 1) {
                    this.$api.modal("请先完成实名认证", '', (r) => {
                        if (r.confirm) {
                            uni.navigateTo({
                                url: '/pages/user/edit_access'
                            })
                        }
                    })
                    return
                }
                var area = this.$api.getConfig('area')
                if (area == '') {
                    this.$api.modal("请先完善个人资料", '', (r) => {
                        if (r.confirm) {
                            uni.navigateTo({
                                url: '/pages/user/info'
                            })
                        }
                    })
                    return
                }
                uni.showLoading({
                    title: '申请中'
                });
                this.$api.post('lists/join', {
                    id: this.detail.id
                }, res => {
                    uni.hideLoading();
                    if (res.code == 0) {
                        this.$api.modal("任务申请成功", '', () => {
                            uni.redirectTo({
                                url: '/pages/order/detail?id=' + res.data
                            })
                        })
                    }
                }, () => {
                    uni.hideLoading();
                })
            },
            initDetail(id){
                uni.showLoading()
                this.$api.post('lists/detail', {
                    id: id
                }, res => {
                    uni.hideLoading();
                    if (res.code == 0) {
                        this.detail = res.data
                        if (this.detail.repeat > 0 && this.detail.repeat_left_time) {
                            this.repeat_time = isNaN(this.detail.repeat_left_time) ? this.detail.repeat_left_time : this.formatSeconds(this.detail.repeat_left_time)
                        }
                    } else {
                        this.$api.modal(res.msg, '', () => {
                            uni.navigateBack()
                        })
                    }
                }, () => {
                    uni.hideLoading();
                })
            },
            async onLoad(option) {
                this.initDetail(option.id)
            },
            goOrders() {
                uni.navigateTo({
                    url: '/pages/order/all?mine=1'
                })
            },
            formatSeconds(value) {
                var theTime = parseInt(value);// 秒
                var middle = 0;// 分
                var hour = 0;// 小时
                if (theTime > 60) {
                    middle = parseInt(theTime / 60);
                    theTime = parseInt(theTime % 60);
                    if (middle > 60) {
                        hour = parseInt(middle / 60);
                        middle = parseInt(middle % 60);
                    }
                }
                var result = "";

                if (theTime > 0) {
                    result = "" + parseInt(theTime) + "秒";
                }

                if (middle > 0) {
                    result = "" + parseInt(middle) + "分" + result;
                }
                if (hour > 0) {
                    result = "" + parseInt(hour) + "小时" + result;
                }
                return result;
            },
            doPay() {
                this.$api.post('lists/pay', {
                    id: this.detail.id,
                }, (res => {
                    if (res.code == 0) {
                        if (res.data.paid == false) {
                            this.$api.msg("正在前往支付")
                            this.$api.payment(res.data.orderInfo, (res) => {
                                this.initDetail(this.detail.id)
                                this.$api.modal('支付成功')
                            }, (err) => {
                                this.$api.msg('支付失败')
                            })
                        } else { //无需支付
                            this.$api.modal('支付成功')
                        }
                    }
                }))
            },
        }
    }
</script>

<style scoped lang="scss">
    .lists {
        .introduction {
            .cu-list.menu > .cu-item {
                min-height: 40upx
            }
            .cu-list.menu > .cu-item .content, .cu-list.menu > .cu-item .action {
                font-size: 28upx;
            }
        }
        .bar-w {
            width: 80%;
        }
        .applyed {
            font-size: 20upx;
            transform: rotate(-45deg);
        }
    }
</style>
