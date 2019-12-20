<template>
    <view class="lists-content">
        <view class="top-nav nav">
            <z-custom :isBack='true'>
                <view slot='backText'>我的发布</view>
                <view slot='right' @tap="goOrders">申请订单</view>
            </z-custom>
            <scroll-view scroll-x class="bg-white text-center top-scroll" scroll-with-animation>
                <view class="cu-item" v-for="(item, index) in items" :class="index==TabCur?'text-dark text-bold':'text-gray'" :key="index" @tap="tabSelect" :data-id="index">
                    {{item.label}}
                </view>
            </scroll-view>
        </view>

        <swiper class="screen-swiper" :style="contentStyle" :current="TabCur" duration="200" @change="navChange">
            <swiper-item v-for="(item,index) in items" :key="index" :data-id="item.status">
                <scroll-view scroll-y="true" class="scroll-Y" :style="contentStyle" @scroll="scroll">
                    <z-swipe v-if="TabCur == index" :cate_name='"release-banner"'></z-swipe>
                    <z-lists v-if="TabCur == index" :status='item.status' :user_id="0" ref="scroll"></z-lists>
                </scroll-view>
            </swiper-item>
        </swiper>
    </view>
</template>

<script>
    import zLists from '../components/z-lists.vue'
    import zSwipe from '../components/z-swipe.vue'

    export default {
        onLoad(option){
            if(option.status){
                this.status = this.TabCur = option.status;
            }
        },
        data() {
            return {
                refresh: false,
                keyword: '',
                TabCur: 0,
                items: [],
                footH: 0,
                pageH: 0,
                more: false,
                StatusBar: this.StatusBar || 0,
            }
        },
        components: {
            'z-lists': zLists,
            'z-swipe': zSwipe
        },
        mounted() {
            this.refresh = true
            var sInfo = uni.getSystemInfoSync()
            this.pageH = sInfo.windowHeight
            let tInfo = uni.createSelectorQuery().in(this).select(".top-nav")
            tInfo.boundingClientRect((data) => {
                this.pageH -= data.height
            }).exec()
        },
        created() {
            this.items = this.$api.getConfig('release', this.$api.SYSTEM_CONFIG)
        },
        onShow() {
            if (this.refresh) {
                this.$refs.scroll[0].refresh();
            }
        },
        computed: {
            contentStyle() {
                return 'height: ' + this.pageH + 'px;';
            }
        },
        methods: {
            tabSelect(e) {
                this.TabCur = e.currentTarget.dataset.id
            },
            navChange(e) {
                this.TabCur = e.detail.current
            },
            goOrders() {
                uni.navigateTo({
                    url: '/pages/order/all?mine=1'
                })
            },
            scroll(e) {
                if (e.detail.scrollHeight - e.detail.scrollTop < this.pageH + 100) {
                    if (this.more == false) {
                        this.more = true
                        this.$refs.scroll[0].next();
                    }
                } else {
                    this.more = false
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .top-nav {
        z-index: 999;
        left: 0;
        top: 0;
        width: 100%;
        background-color: #ffffff;
    }
    .top-scroll{
        min-height: 50px
    }
    .card-swiper uni-swiper-item{
        width: 100% !important;
        left: 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0;
        overflow: initial;
    }
</style>
