<template>
    <view>
        <z-custom :isBack='true'>
            <view slot='backText'>关于我们</view>
        </z-custom>
        <view v-if="this.about">
            <view class="cu-list menu-avatar">
                <view class="padding bg-white data"><rich-text :nodes="about.content"></rich-text></view>
                <view class="padding cu-items">
                    <view class="text-grey">{{about.create_time}}</view>
                </view>
            </view>
        </view>
        <view class="padding">
            <view class="text-center load">暂时没有相关信息哟~</view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                about: '', //关于我们
            };
        },
        mounted () {
            this.aboutUs();
        },
        methods: {
            aboutUs () {
                this.$api.post('message/about' , { name : 'about' } , (res=>{
                    if(res.code == 0){
                        this.about = res.data
                    }
                }))
            },
        }
    }
</script>

<style scoped lang="scss">

    page {
        background-color: white;
    }
    .cu-items{
        position: relative;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        margin-right: 10px;
        height: 70px;
        background-color: #ffffff;
        -webkit-box-pack: end;
        -webkit-justify-content: flex-end;
        -ms-flex-pack: end;
        justify-content: flex-end;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
    }
</style>
