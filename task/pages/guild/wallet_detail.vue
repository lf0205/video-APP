<template>
    <view>
        <z-custom :isBack='true'>
            <view slot='backText'>账单详情</view>
        </z-custom>

        <view v-if="detail" class="dynamic lists m-b-nav bg-white">
            <view class="padding-xl flex align-center">
                <view class="flex-sub text-center">
                    <view class="padding">
                        <view class="text-red padding-bottom">{{detail.types}}</view>
                        <text class="text-sl text-bold text-black">{{formatAmount}}</text>
                    </view>
                </view>
            </view>
            <view class="padding-d introduction">
                <view class="cu-list menu" >
                    <view class="cu-item ">
                        <view class="content">
                            <text>状态</text>
                        </view>
                        <view class="action">
                            <view class="label-right">{{detail.status_label}}</view>
                        </view>
                    </view>
                </view>
            </view>
            <view v-if="detail.mark" class="padding-d introduction">
                <view class="cu-list menu" >
                    <view class="cu-item ">
                        <view class="content">
                            <text>备注</text>
                        </view>
                        <view class="action">
                            <view class="label-right">{{detail.mark}}</view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="padding-d introduction">
                <view class="cu-list menu" >
                    <view class="cu-item">
                        <view class="content">
                            <text>创建时间</text>
                        </view>
                        <view class="action">
                            <view class="label-right">{{detail.create_time}}</view>
                        </view>
                    </view>
                </view>
            </view>
            <view v-if="detail.reason" class="padding-d introduction">
                <view class="cu-list menu" >
                    <view class="cu-item ">
                        <view class="content">
                            <text>说明</text>
                        </view>
                        <view class="action">
                            <view class="label-right">{{detail.reason}}</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        onLoad : function(ops){
            this.getDetails(ops.id)
        },
        data() {
            return {
                detail : ''
            }
        },
        methods : {
            getDetails(id){
                uni.showLoading()
                this.$api.post('guild/getWalletDetails' , {'id' : id} , res => {
                    uni.hideLoading()
                    if(res.code == 0){
                        this.detail = res.data
                    }else{
                        this.$api.modal(res.msg , '' , ()=>{
                            uni.navigateBack()
                        });
                    }
                }, ()=>{
                    uni.hideLoading();
                })
            }
        },
        computed:{
            formatAmount(){
                var num = this.detail.amount;
                num = typeof num == 'string' ? parseFloat(num) : num // 判断是否是字符串如果是字符串转成数字
                num = parseFloat(num); // 转成数字
                num = num.toLocaleString(); // 转成金额显示模式
                // 判断是否有小数
                if (num.indexOf('.') === -1) {
                    num = num + '.00';
                } else {
                    num = num.split('.')[1].length < 2 ? num + '0' : num;
                }
                return num
            }
        }
    }
</script>

<style scoped>
    page {
        background-color: white;
    }
    .cu-list.menu>.cu-item{
        min-height: 10px;
    }
    .padding-d{
        padding: 8px;
    }
    .label-right{
        width: 500upx;
        color: #333333;
        text-align: right;
    }
</style>
