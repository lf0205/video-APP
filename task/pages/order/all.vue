<template>
    <view class="lists-content">
        <view class="top-nav nav">
            <z-custom :isBack='true'>
                <view slot='backText' class="text-cut">{{mine ? '申请' : '我的'}}订单</view>
            </z-custom>
            <scroll-view scroll-x class="bg-white text-center top-scroll" scroll-with-animation>
                <view class="cu-item" v-for="(item, index) in items" :class="index==TabCur?'text-dark text-bold':'text-gray'" :key="index" @tap="tabSelect" :data-id="index">
                    {{item.label}}
                </view>
            </scroll-view>
        </view>
        <swiper class="screen-swiper" :style="contentStyle" :current="TabCur" duration="200" @change="navChange">
            <swiper-item v-for="(item,index) in items" :key="index" :data-id="index">
                <scroll-view scroll-y="true" class="scroll-Y" :style="contentStyle" @scroll="scroll">
                    <z-swipe v-if="TabCur == index" :cate_name='"order-banner"'></z-swipe>
                    <z-order v-if="TabCur == index" :status="item.status" :mine="mine" ref="scroll"></z-order>
                </scroll-view>
            </swiper-item>
        </swiper>
    </view>
</template>

<script>
    import zOrder from '../components/z-order.vue'
    import zSwipe from '../components/z-swipe.vue'
    export default {
        onLoad(option){
            if(option.status){
                this.status = this.TabCur = option.status;
            }
            this.mine = option.mine ? true : false;
        },
        data() {
            return {
                refresh: false,
                order : [],
                TabCur: 0,
                pageH: 0,
                more: false,
                mine: false,
                StatusBar: this.StatusBar || 0,
                items : [],
                status: 0,
            }
        },
        components: {
            'z-order': zOrder,
            'z-swipe': zSwipe
        },
        mounted() {
            this.refresh = true
            this.items = this.$api.getConfig('order_status', this.$api.SYSTEM_CONFIG)
            var sInfo = uni.getSystemInfoSync()
            this.pageH = sInfo.windowHeight
            let tInfo = uni.createSelectorQuery().in(this).select(".top-nav")
            tInfo.boundingClientRect((data) => {
                this.pageH -= data.height
            }).exec()
        },
        onShow(){
            if (this.refresh) {
                this.$refs['scroll'][this.TabCur].refresh();
            }
        },
        computed: {
            topStyle() {
                var StatusBar = this.StatusBar;
                return `padding-top:${StatusBar}px;z-index:999;left: 0;top: 0;width: 100%;background-color: #ffffff;`;
            },
            contentStyle() {
                return 'height: '+ this.pageH +'px;';
            },
        },
        methods: {
            tabSelect(e) {
                this.TabCur = e.currentTarget.dataset.id;
            },
            navChange(e){
                this.TabCur = e.detail.current
            },
            changeSearch(event){
                this.searchText = event.target.value
            },
            scroll(e){
                if (e.detail.scrollHeight - e.detail.scrollTop < this.pageH + 100) {
                    if (this.more == false) {
                        this.more = true
                        this.$refs['scroll'][0].next();
                    }
                }else{
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
