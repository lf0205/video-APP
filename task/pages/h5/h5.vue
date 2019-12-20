<template>
    <view>
        <z-custom :isBack='true'>
            <view slot='backText' class="text-cut" style="width: 600upx">{{title}}</view>
            <view slot='right'><text class="cuIcon-close" @tap="back"></text></view>
        </z-custom>
        <view>
            <web-view v-if="page" :webview-styles="{progress: false}" :src="page"></web-view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                title: '',
                page: '',
            }
        },
        onLoad(option) {
            this.page  = decodeURIComponent(option.p)
            this.title = option.t ? option.t : this.page
            if (!this.page) {
                this.$api.modal('页面不存在', '', ()=>{
                    uni.navigateBack()
                })
                return ''
            }
            // #ifdef APP-PLUS
            var currentWV = this.$mp.page.$getAppWebview()
            setTimeout(() => {
                let wv = currentWV.children()[0]
                var tH = this.CustomBar
                var sInfo = uni.getSystemInfoSync()
                var pH = sInfo.windowHeight - tH
                wv.setStyle({top:this.CustomBar, height: pH})
            }, 100);
            // #endif
        },
        methods: {
            back() {
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
            }
        }
    }
</script>

<style scoped lang="scss">
</style>
