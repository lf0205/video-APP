<template>
    <view>
        <z-custom :isBack='true'>
            <view slot='backText' class="text-cut" style="width: 550upx">{{title}}</view>
            <view style="width: 200upx" slot='right'>
                <text v-if="time < 0" class="cuIcon-close" @tap="closeAll"></text>
                <text v-else>剩余{{time}}秒</text>
            </view>
        </z-custom>
        <view>
            <web-view :webview-styles="{progress: false}" :src="page"></web-view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                backState : true,
                interval: null,
                title: '',
                time : 60,
                page: '',
            }
        },
        onLoad(option) {
            this.page  = decodeURIComponent(option.p)
            this.title = option.t ? option.t : this.page
            this.time  = option.s
            // #ifdef APP-PLUS
            var currentWV = this.$mp.page.$getAppWebview()
            setTimeout(() => {
                let wv = currentWV.children()[0]
                var tH = this.CustomBar
                var sInfo = uni.getSystemInfoSync()
                var pH = sInfo.windowHeight - tH
                wv.setStyle({top:this.CustomBar, height: pH})
            }, 500);
            // #endif
        },
        onShow(){
            this.start()
        },
        onHide(){
            this.end()
        },
        onBackPress(options){
            this.end()
            if (this.backState) {
                this.$api.modal('你的任务还没有完成，关闭页面将不能获取到收益，确认关闭？', '', (res)=>{
                    if (res.confirm) {
                        this.closeAll()
                    } else if (res.cancel) {
                        this.start()
                    }
                })
            }
            return this.backState;
        },
        mounted(){
            this.start()
        },
        methods: {
            start(){
                if (this.interval === null) {
                    this.interval = setInterval(() => {
                        if (this.time <= 0) {
                            this.end()
                            this.done()
                        }
                        this.time--;
                    }, 1000)
                }
            },
            end(){
                if (null !== this.interval) {
                    clearInterval(this.interval)
                    this.interval = null
                }
            },
            done(){
                if (this.time < 1) {
                    let pages = getCurrentPages();
                    let prevPage = pages[pages.length - 2];
                    prevPage.$vm.done(); // 修改上一页的完成状态
                    this.closeAll()
                }
            },
            closeAll() {
                this.backState = false
                // #ifdef APP-PLUS
                let pages = getCurrentPages()
                let page = pages[pages.length - 1];
                let currentPages = page.$getAppWebview()
                let children = currentPages.children()
				if(children.length===0){  
				   uni.navigateBack()
				}else{  
				   children[0].close()  
				  setTimeout(()=>{  
				    uni.navigateBack()  
				  },80)
				}
                // #endif
                // #ifdef H5
                uni.navigateBack()
                // #endif
            }
        }
    }
</script>

<style scoped lang="scss">
    .close-modal{
        z-index: 999;
    }
</style>
