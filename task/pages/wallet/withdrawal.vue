<template>
    <view>
        <z-custom :isBack='true'>
            <view slot='backText'>提现</view>
        </z-custom>

        <view class="bg-white">
            <view class="cu-form-group solid-bottom" @tap="editAccess">
                <view class="content">
                    <text class="text-sm text-bold ">账户</text>
                </view>
                <view class="action">
                    <text class="text-grey" v-if="account.name == undefined || account.account == undefined">设置<text class="cuIcon-right"></text></text>
                    <text class="text-grey" v-else>{{account.name || ''}} {{account.account || ''}} <text class="cuIcon-right"></text></text>
                </view>
            </view>
            <view class="cu-bar">
                <view class="action">
                    <text class="text-sm text-bold">金额</text>
                </view>
            </view>
            <view class="cu-form-group solid-bottom">
                <view class="title">￥</view>
                <input placeholder="输入提现金额" class="amount" type="number" v-model="amount"></input>
            </view>
            <view class="padding-sm padding-left">
                <text class="text-xs mark">
                    最低提现金额为{{minWithdrawalAmount}}元
                    <text v-if="withdrawal_fee > 0">，每笔提现将收取{{withdrawal_fee}}%手续费</text></text>
                <text class="text-xs mark fr" @tap="selAll">余额 <text class="text-bold">￥{{balance}}</text></text>
            </view>
        </view>

        <view class="padding flex flex-direction margin-top-xl">
            <button class="cu-btn bg-grey lg no-b-r" @tap="withdraw">提现</button>
        </view>

    </view>
</template>

<script>
    export default {
        data() {
            return {
                amount: '',
                balance: 0,
                withdrawal_fee: 0,
                minWithdrawalAmount: 0, // 最低提现金额
                withdrawalAmountTimes: 0, // 提现倍率
                account: {
                    name: '',
                    account: ''
                },
            }
        },
        created(){
            this.balance = this.$api.getConfig('balance')
            const config = this.$api.getConfig('', this.$api.SYSTEM_CONFIG);
            this.withdrawal_fee = config.withdrawal_fee || 0
            this.minWithdrawalAmount = config.min_withdrawal_amount || 0
            this.withdrawalAmountTimes = config.withdrawal_amount_times || 0
        },
        onShow() {
            this.account = this.$api.getConfig('account')
        },
        methods: {
            selAll(){
                this.amount = this.balance
            },
            editAccess(){
                uni.navigateTo({
                    url: "/pages/user/edit_account"
                })
            },
            withdraw(){

                if (!this.account) {
                    this.$api.msg("请先设置提现账户")
                    return
                }

                if (this.account == 0){
                    this.$api.msg("提现金额不能为0")
                    return
                }

                if (this.amount == 0){
                    this.$api.msg("提现金额不能为0")
                    return
                }

                if (this.amount < this.minWithdrawalAmount) {
                    this.$api.msg("每笔提现金额不得少于" + this.minWithdrawalAmount + "元")
                    return
                }

                if (this.withdrawalAmountTimes !== 0 && ((this.amount * 10000) % (this.withdrawalAmountTimes * 10000)) !== 0) {
                    this.$api.msg("提现金额只能为"+this.withdrawalAmountTimes+"的整数倍")
                    return
                }

                if (this.balance < this.amount) {
                    this.$api.msg("余额不足")
                    return
                }

                this.$api.modal('确认提现'+this.amount+'元？', '', (r)=>{
                    if (r.confirm) {
                        this.$api.post('balance/withdraw' , {
                            amount	: this.amount,
                        } , (res=>{
                            if (res.code == 0) {
                                this.$api.setConfig('balance', parseInt((this.balance - this.amount) * 10000) / 10000)
                                this.$api.modal("提现申请提交成功", '', ()=>{
                                    uni.navigateBack({
                                        delta: 1
                                    });
                                })
                            }
                        }))
                    }
                })

            }
        },
    }
</script>

<style scoped lang="scss">
    .mark {
        color: #A8A8A8;
    }
    .amount{
        font-size: 50upx;
    }
</style>
