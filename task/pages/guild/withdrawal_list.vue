<template>
    <view>
        <z-custom :isBack='true'>
            <view slot='backText'>资金明细</view>
        </z-custom>

        <view class="cu-card dynamic lists">
            <view class="cu-item shadow" v-for="(item,index) in lists" :key="index">
                <view class="margin-top-xs">
                    <view class="cu-list menu" >
                        <view class="cu-item" @tap="goPage(item.id)">
                            <view class="content">
                                <view class="font-26">{{item.mark}}</view>
                                <view class="font-24">{{item.types}}</view>
                                <view class="text-cyan font-22">{{item.create_time}}</view>
                            </view>
                            <view class="action text-right">
                                <view class="text-bold font-32">{{formatAmount(item.amount)}}</view>
                                <view v-if="item.status != 1" class="text-cyan font-22">{{item.status_label}}</view>
                            </view>
                        </view>
                    </view>
                </view>
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
        name: "withdrawal_list",
        data() {
            return {
                page: 1,
                rowNum: 15,
                loading: true,
                isFinish: false,
                lists: []
            }
        },
        created(){
            this.loadData()
        },
        methods: {
            next(){
                if (!this.isFinish && !this.loading) {
                    this.loading = true
                    this.page += 1
                    this.loadData()
                }
            },
            formatAmount(num){
                var value=Math.round(parseFloat(num)*10000)/10000;
                var xsd=value.toString().split(".");
                if(xsd.length==1){
                    value=value.toString()+".0000";
                    return value;
                }
                if(xsd.length>1){
                    if(xsd[1].length < 4){
                        value = value.toString() + (xsd[1].length == 2 ? '00' : (xsd[1].length == 3 ? '0':'000')).toString()
                    }
                    return value;
                }
            },
            loadData(){
                this.$api.post('guild/getWallerList', {page: this.page, row_num: this.rowNum}, res => {
                    if(res.code == 0) {
                        if (res.data.length < this.rowNum) {
                            this.isFinish = true
                        }
                        this.lists = [...this.lists, ...res.data]
                    }
                    this.loading = false
                })
            },
            goPage(id){
                uni.navigateTo({
                    url:"/pages/guild/wallet_detail?id="+id
                })
            }
        }
    }
</script>

<style scoped>
    .font-32{
        font-size: 32upx;
    }
    .font-26{
        font-size: 26upx;
    }
    .font-24{
        font-size: 24upx;
    }
    .font-22{
        font-size: 22upx;
    }
</style>
