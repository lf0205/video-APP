<template>
    <view>
        <view class="cu-card dynamic lists">
            <view class="cu-item shadow" v-for="(item,index) in lists" :key="index">
                <navigator :url="'/pages/order/detail?id=' + item.id " hover-class="none">
                    <view class="cu-list menu-avatar">
                        <view class="cu-item">
                            <view class="cu-avatar radius lg" :style="'background-image:url('+item.image+');'"></view>
                            <view class="content flex-sub">
                                <view>
                                    <view class="text-bold text-sm text-cut" style="width: 450upx">{{item.title}}</view>
                                    <text class="text-right text-sm status-label" :class="'status_'+item.status">{{item.status_label}}</text>
                                </view>
                                <view class='text-sm'></view>
                                <view class="text-gray text-sm flex justify-between">
                                    <view class="padding-xs">
                                        <view class='cu-tag bg-gradual-red cuIcon-hotfill' v-if="item.hot == 1"></view>
                                    </view>
                                </view>
                            </view>
                        </view>
                        <view class="text-content margin-top-sm padding-lr">
                            <view>任务金额： <text class="text-red text-bold">{{item.income}} 元</text></view>
                            <view>申请时间： <text class="text-grey">{{item.create_time}}</text></view>
                        </view>
                        <view class="cu-list menu ">
                            <view class="cu-item">
                                <view class="content">
                                    <image :src="item.user.avatar" class="radius" mode="aspectFit"></image>
                                    <text class="text-grey text-sm">{{item.user.username}}</text>
                                </view>
                            </view>
                        </view>
                    </view>
                </navigator>
            </view>
        </view>
        <view class="padding">
            <view class="cu-load load-cuIcon loading" v-if="loading"></view>
            <view class="text-center load" v-if="!loading && !isFinish" @tap="next">点击加载更多</view>
            <view class="text-center load" v-if="!loading && isFinish">没有啦~</view>
        </view>
    </view>
</template>

<script>
    export default {
        name: 'z-order',
        props: {
            mine: {
                type: Boolean,
                default: null
            },
            status: {
                type: [String, Number],
                default: null
            },
            more: { // 自动加载更多
                type: Boolean,
                default: true
            },
        },
        data() {
            return {
                page: 1,
                rowNum: 15,
                loading: true,
                isFinish: false,
                lists: []
            }
        },
        created() {
            this.loadData()
        },
        methods: {
            refresh(){
                this.loading = true
                this.page = 1
                this.lists = []
                this.isFinish = false
                this.loadData()
            },
            next(){
                if (!this.isFinish && !this.loading) {
                    this.loading = true
                    this.page += 1
                    this.loadData()
                }
            },
            loadData() {
                var where = {}
                if (this.status !== null) {
                    where.status = this.status
                }

                if (this.mine !== null) {
                    where.mine = this.mine ? 1 : 0
                }

                this.$api.post('order/getOrder', {where: where, page: this.page, row_num: this.rowNum}, res => {
                    if(res.code == 0) {
                        if (res.data.length < this.rowNum) {
                            this.isFinish = true
                        }
                        this.lists = [...this.lists, ...res.data]
                    }
                    this.loading = false
                })
            },
        }
    }
</script>

<style scoped lang="scss">
    .cu-item{
        .status-label{
            width: 80upx;
        }
        .cu-tag{
            padding: 20upx;
        }
        .status_1{
            color: #fa5459;
        }
        .status_3{
            color: #c2b847;
        }
        .status_5{
            color: grey;
        }
        .status_7{
            color: red;
        }
        .status_9{
            color: #c4c4c4;
        }
    }
    .load{
        line-height: 3em;
    }
</style>
