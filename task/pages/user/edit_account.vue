<template>
    <view>
        <z-custom :isBack='true'>
            <view slot='backText'>修改账户</view>
        </z-custom>
        <view>
            <view>
                <view class="cu-bar bg-white">
                    <view class="action">
                        <text class="text-sm text-bold">收款人(支付宝收款账户)</text>
                    </view>
                </view>
                <view class="cu-form-group">
                    <view class="title">姓&nbsp;&nbsp;&nbsp;&nbsp;名</view>
                    <input placeholder="请输入真实名称" name="input" v-model="name"></input>
                </view>
                <view class="cu-form-group">
                    <view class="title">账&nbsp;&nbsp;&nbsp;&nbsp;号</view>
                    <input placeholder="请输入支付宝账户" name="input" v-model="account"></input>
                </view>
            </view>

            <view class="margin-top-sm">
                <view class="cu-form-group">
                    <view class="title">验证码</view>
                    <input placeholder="输入验证码" name="input" v-model="code"></input>
                    <text class="mark" :class="sending ? 'text-grey' : 'text-dark'" @tap="sendCode">{{sendMsg}}</text>
                </view>
            </view>

            <view class="padding flex flex-direction margin-top-xl">
                <button class="cu-btn bg-grey lg no-b-r shadow" @tap="submit">提交</button>
            </view>

        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                sending: false,
                sendMsg: "获取验证码",
                code: '',
                name: '',
                account: ''
            }
        },
        created() {
            const acc = this.$api.getConfig('account')
            this.name = acc.name
            this.account = acc.account
        },
        methods: {
            submit() {
                if (!this.name) {
                    this.$api.msg("请输入真实名称")
                    return
                }

                if (!this.account) {
                    this.$api.msg("请输入支付宝账户")
                    return
                }

                if (!this.code) {
                    this.$api.msg("请输入短信验证码")
                    return
                }

                this.$api.post('user/edit_account', {
                    code: this.code,
                    name: this.name,
                    account: this.account
                }, (res => {
                    if (res.code == 0) {
                        this.$api.setConfig('account', {
                            name: this.name,
                            account: this.account,
                        })
                        this.$api.msg('修改成功')
                    }
                }))

            },
            sendCode() {
                if (this.sending) {
                    return false
                }
                this.sending = true
                this.sendMsg = "发送中..."

                const phone = this.$api.getConfig('phone')

                this.$api.post('user/getCode', {phone: phone}, (res => {
                    if (res.code == 0) {
                        this.$api.msg("发送成功")
                        var time = 60
                        var w = setInterval(() => {
                            if (time == 0) {
                                this.sending = false
                                this.sendMsg = "获取验证码"
                                clearInterval(w)
                            } else {
                                time--
                                this.sendMsg = time + "秒后重发"
                            }
                        }, 1000)
                    } else {
                        this.sending = false
                    }
                }))
            },
        }
    }
</script>

<style scoped>

</style>
