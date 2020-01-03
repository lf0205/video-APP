<script>
	import Vue from 'vue'
	export default {
		onLaunch: function() {
		    this.init()
		},
        methods:{
		    init(){
                uni.getSystemInfo({
                    success: function(e) {
                        // #ifndef MP
                        Vue.prototype.StatusBar = e.statusBarHeight;
                        if (e.platform == 'android') {
                            Vue.prototype.CustomBar = e.statusBarHeight + 50;
                        } else {
                            Vue.prototype.CustomBar = e.statusBarHeight + 45;
                        };
                        // #endif

                        // #ifdef MP-WEIXIN
                        Vue.prototype.StatusBar = e.statusBarHeight;
                        let custom = wx.getMenuButtonBoundingClientRect();
                        Vue.prototype.Custom = custom;
                        Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
                        // #endif

                        // #ifdef MP-ALIPAY
                        Vue.prototype.StatusBar = e.statusBarHeight;
                        Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
                        // #endif
                    }
                })
                this.$api.initUpgrade()
                this.$api.initSystem()
                this.$api.initUser()
            },
        },
		onShow: function() {},
		onHide: function() {}
	}
</script>

<style>
	@import "static/colorui/main.css";
	@import "static/colorui/icon.css";
	@import url("http://at.alicdn.com/t/font_1593747_s5cthqtfgbq.css");
	
	page{
		height: 100%;
		background-color:#151723;
	}
	.no-b-r{
		border-radius: 0;
	}
	.bg-default{
		background-color: #00C3C5;
		color: #F4FEFF;
	}
	
	.m-b-nav{
		margin-bottom: 100upx;
	}
	.m-b-nav-lg{
		margin-bottom: 110upx;
	}
	.top-bar-back{
		font-size: 36upx;
		font-weight: bold;
		color: #000000;
	}
	.bg-dark{
		background-color: #000000;
		color: #F4FEFF;
	}
	.text-dark{
		color: #000000;
	}
</style>
