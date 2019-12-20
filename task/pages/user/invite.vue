<template>
    <view>
        <z-custom :isBack='true'>
            <view slot='backText' class="text-cut">邀请有礼</view>
            <view slot='right'>
                <navigator url="/pages/user/children" hover-class="none">邀请记录</navigator>
            </view>
        </z-custom>
        <image :src="codePath" :style="style" @tap="showImg"></image>
    </view>
</template>

<script>
    export default {
        data () {
            return {
                isShowPhoto:true,
                codePath: '',
                pageH: 0,
                pageW: 0,
            }
        },
        mounted () {
            this.getShareCode()
            var sInfo = uni.getSystemInfoSync()

            this.pageW = sInfo.windowWidth
            this.pageH = sInfo.windowHeight - 50
        },
        computed: {
            style() {
                return 'height: ' + this.pageH + 'px; width: ' + this.pageW + 'px';
            }
        },
        methods: {
            // 获取邀请码
            getShareCode () {
                uni.showLoading({
                    title: '生成中'
                });
                this.$api.post('user/invite' , {} , res=>{
                    uni.hideLoading();
                    if(res.code == 0){
                        this.codePath = res.data
                    }
                }, ()=>{uni.hideLoading();})
            },
            showImg() {
                this.$api.previewImage([this.codePath]);
            }
        }
    }
</script>

<style scoped>
</style>
