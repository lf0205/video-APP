<template>
    <view class="lists-content">
        <view class="top-nav nav" :style="topStyle">
            <view class="cu-bar bg-white search top-search">
                <view class="search-form round">
                    <text class="cuIcon-search"></text>
                    <input placeholder="搜索任务" v-model="keyword" @confirm="doSearch" confirm-type="search" ></input>
                </view>
            </view>
            <scroll-view scroll-x class="bg-white text-center top-scroll" scroll-with-animation>
                <view class="cu-item" :class="index==TabCur?'text-dark text-bold':'text-gray'" v-for="(item, index) in cates" :key="index" @tap="tabSelect" :data-id="item.id">
                    {{item.title}}
                </view>
            </scroll-view>
        </view>
        <swiper class="screen-swiper " :style="contentStyle" :current="TabCur" duration="200" @change="navChange">
            <swiper-item v-for="(item,index) in cates" :key="index" :data-id="index">
                <scroll-view scroll-y="true" class="scroll-Y" :style="contentStyle" @scroll="scroll">
                    <z-swipe :cate_name='"lists-"+item.id' v-if="TabCur == index"></z-swipe>
                    <z-lists :cate_id='item.id' ref="scroll" v-if="TabCur == index"></z-lists>
                </scroll-view>
            </swiper-item>
        </swiper>
    </view>
</template>

<script>
    import zLists from '../components/z-lists.vue'
    import zSwipe from '../components/z-swipe.vue'

    export default {
        data() {
            return {
                keyword: '',
                TabCur: 0,
                cates: [],
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
            var sInfo = uni.getSystemInfoSync()
            this.pageH = sInfo.windowHeight
            let tInfo = uni.createSelectorQuery().in(this).select(".top-nav")
            tInfo.boundingClientRect((data) => {
				if (data !== null) {
					this.pageH -= data.height
				}
            }).exec()
            let bInfo = uni.createSelectorQuery().select(".foot")
            bInfo.boundingClientRect((data) => {
				if (data !== null) {
					this.pageH -= data.height
				}
            }).exec()
        },
        created() {
            this.loadData()
        },
        computed: {
            topStyle() {
                var StatusBar = this.StatusBar;
                return `padding-top:${StatusBar}px;z-index:999;left: 0;top: 0;width: 100%;background-color: #ffffff;`;
            },
            contentStyle() {
                return 'height: ' + this.pageH + 'px;';
            }
        },
        methods: {
            async loadData() {
                this.cates = [];
                this.cates = this.$api.getConfig('cate_list', this.$api.SYSTEM_CONFIG)
            },
            doSearch(){
                for (let i in this.cates) {
                    this.$refs['scroll'][i].loadData(this.keyword);
                }
            },
            tabSelect(e) {
                this.TabCur = e.currentTarget.dataset.id
            },
            navChange(e) {
                this.TabCur = e.detail.current
            },
            refresh(){
                return this.$refs.scroll[0].refresh();
            },
            scroll(e) {
                if ((e.detail.scrollHeight - e.detail.scrollTop) < (this.pageH + 100)) {
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
</style>
