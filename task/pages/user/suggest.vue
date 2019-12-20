<template>
    <view>
        <z-custom :isBack='true'>
            <view slot='backText'>意见反馈</view>
        </z-custom>

        <view>
            <view class="cu-form-group form-content">
                <textarea maxlength="500" auto-height class="contentData" v-model="content" placeholder="（最多500字）请输入您的详细问题，用户投诉、订单投诉、系统问题等。"></textarea>
            </view>
            <view class="padding flex flex-direction margin-top-xl">
                <button class="cu-btn bg-grey lg no-b-r shadow"  @tap="submit">提交</button>
            </view>
        </view>

    </view>
</template>

<script>
    export default {
        data() {
            return {
                content: '',
            }
        },
        methods: {
            submit(){
                if (this.content.length < 10) {
                    this.$api.msg('问题不能少于10个字符')
                    return;
                }

                this.$api.post('suggest/suggest' , {
                    content : this.content
                } , (res=>{
                    if (res.code == 0) {
                        this.$api.modal('提交成功，感谢提交您的宝贵意见', '', ()=>{
                            uni.navigateBack()
                        })
                    }
                }))
            }
        }
    }
</script>

<style scoped lang="scss">
    .contentData{
        min-height: 200upx;
    }
</style>
