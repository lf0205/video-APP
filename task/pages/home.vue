<template>
    <view class='home-contents'>
		<!-- 组件页面显示容器 -->
        <mescroll-uni :down="{auto: false, inOffsetRate: 0.5, outOffsetRate: 0.4, fps: 10000}" :up="{use:false}" @down="downCallback">
            <swiper class="screen-swiper " :style="'height: '+wh+'px'" @touchstart="TouchStart" @touchend="TouchEnd" :current="currentPage" :duration="duration" @change="navChange">
                <swiper-item :class="pageCur=='index' ? 'cur' : ''">
                    <scroll-view scroll-y="true" :style="'height: '+wh+'px'" class="scroll-Y" @scroll="scroll">
                        <index ref='scroll'></index>
                    </scroll-view>
                </swiper-item>
                <swiper-item :class="pageCur=='lists' ? 'cur' : ''">
                    <scroll-view scroll-y="true" class="scroll-Y">
                        <lists ref="listsPage"></lists>
                    </scroll-view>
                </swiper-item>
                <swiper-item :class="pageCur=='cate' ? 'cur' : ''">
                    <scroll-view scroll-y="true" class="scroll-Y" :style="'height: '+wh+'px'">
                        <cate></cate>
                    </scroll-view>
                </swiper-item>
                <swiper-item :class="pageCur=='guild' ? 'cur' : ''">
                    <scroll-view scroll-y="true" class="scroll-Y">
                        <guild ref="guildPage"></guild>
                    </scroll-view>
                </swiper-item>
                <swiper-item :class="pageCur=='user' ? 'cur' : ''">
                    <scroll-view scroll-y="true" class="scroll-Y" :style="'height: '+wh+'px'">
                        <user ref="userPage"></user>
                    </scroll-view>
                </swiper-item>
            </swiper>
        </mescroll-uni>
        <!-- 底部tabBer显示容器 -->
		<view class="cu-bar tabbar bg-white shadow foot text-black">
            <view class="action" v-for="(v, i) in navs" :key="i" @tap="navChange" :data-cur="v.name" :class="v.name == 'cate' ? 'add-action' : ''">
                <view v-if="v.name != 'cate'" :class="pageCur==v.name ? v.iconfill : v.icon"></view>
                <button v-else class="cu-btn cuIcon-add shadow" :class="pageCur=='cate' ? 'bg-black' : ''"></button>
                {{v.title}}
            </view>
        </view>
		<!-- <view class="loginTips">
			<text>{{loginTitle}}</text>
			<view class="loginInfo">
				<text>{{loginInfo1}}</text>
				<text>{{loginInfo2}}</text>
				<text>{{loginInfo3}},<text>{{auther}}</text></text>
			</view>
			<button>{{buttonInfo}}{{loginTime}}</button>
		</view> -->
    </view>
</template>

<script>
	// 引入的主要显示组件，上拉加载下拉刷新
    import index from './index/index'
    import lists from './lists/lists'
    import cate from './create/cate'
    import guild from './guild/guild'
    import user from './user/user'
    import MescrollUni from "@/pages/components/mescroll-uni/mescroll-uni.vue"

    export default {
        data() {
            return {
                wh: 0,
                duration: 0,
				// 自定义底部数据
                navs: [
                    {
                        name: 'index',
                        title: '首页',
                        icon: 'cuIcon-home',
                        iconfill: 'cuIcon-homefill'
                    },
                    {
                        name: 'lists',
                        title: '大厅',
                        icon: 'cuIcon-tag',
                        iconfill: 'cuIcon-tagfill'
                    },
                    {
                        name: 'cate',
                        title: '发布',
                        icon: 'cuIcon-add',
                    },
                    {
                        name: 'guild',
                        title: '公会',
                        icon: 'cuIcon-group',
                        iconfill: 'cuIcon-group_fill'
                    },
                    {
                        name: 'user',
                        title: '我的',
                        icon: 'cuIcon-my',
                        iconfill: 'cuIcon-myfill'
                    },
                ],
                more: false,
				// 默认选中组件
                pageCur: 'index',
				loginTitle:"测试声明",
				loginInfo1:"平台只能上传积极、好看、优质视频；分享客户喜欢的，才能吸引顾客找你。",
				loginInfo2:"禁止过度营销，画质劣质，虚假宣传，色情暴力，诱导分享。",
				loginInfo3:"视频质量差会被删除",
				loginInfo:"多次违规账号会查封！",
				auther:"测试视频法务部 宣",
				buttonInfo:"我已阅读并承诺遵守",
				loginTime:15
            }
        },
		// 项目启动时，执行操作
        onShow() {
			
            if (this.$refs.userPage) {
                this.$refs.userPage.initUser();
                this.$refs.guildPage.initGuild();
            }
        },
        methods: {
            async downCallback(scroll = null) {
                await (() => {
                    switch (this.pageCur) {
                        case 'index':
                            return this.$refs.scroll.refresh();
                            break;
                        case 'lists':
                            return this.$refs.listsPage.refresh();
                            break;
                        case 'cate':
                            break;
                        case 'guild':
                            return this.$api.initUser(()=>{
                                return this.$refs.guildPage.initGuild();
                            })
                            break;
                        case 'user':
                            return this.$api.initUser(()=>{
                                this.$refs.userPage.initUser();
                            })
                            break
                    }
                })()
                if (scroll) {
                    this.$api.msg('更新完成')
                    setTimeout(()=>{
                        scroll.endSuccess();
                    }, 500)
                }
            },
            TouchStart(){
                this.duration = 200
            },
            TouchEnd(){
                setTimeout(()=>{
                    this.duration = 0
                }, 200)
            },
            getIndex(name) {
                let navs = this.navs
                for (let i = 0; i < navs.length; i++) {
                    if (navs[i].name == name) {
                        return i
                    }
                }
                return 0
            },
            navChange(e) {
                if (e.currentTarget.dataset.cur === 'cate') {
                    if(!this.cateList()) {
                        return false
                    }
                }
                if (e.type == 'change') {
                    this.pageCur = this.navs[e.detail.current].name
                } else {
                    this.pageCur = e.currentTarget.dataset.cur
                }
            },
            scroll(e) {
                if (e.detail.scrollHeight - e.detail.scrollTop < this.wh + 100) {
                    if (this.more == false) {
                        this.more = true
                        this.$refs.scroll.scroll();
                    }
                } else {
                    this.more = false
                }
            },
            cateList(){
                var verified = this.$api.getConfig('verified')
                if (verified != 1) {
                    this.$api.modal("请先完成实名认证才能发布任务", '', (r)=>{
                        if (r.confirm) {
                            uni.navigateTo({
                                url: '/pages/user/edit_access'
                            })
                        }
                    })
                    return false
                }

                var area = this.$api.getConfig('area')
                if (area == '') {
                    this.$api.modal("请先完善个人资料", '', (r) => {
                        if (r.confirm) {
                            uni.navigateTo({
                                url: '/pages/user/info'
                            })
                        }
                    })
                    return
                }
                return true
            },
			loginTips(){
				
			}
		},
        created() {
			// 获取当前设备信息
            var sInfo = uni.getSystemInfoSync()
			console.log('获取当前设备',sInfo);
            this.wh = sInfo.windowHeight
        },
        computed: {
            currentPage() {
                return this.getIndex(this.pageCur)
            }
        },
        watch: {
            pageCur(newCur, oldCur) {
                // #ifdef APP-PLUS
                var color = '#ffffff'
                if (newCur === 'lists' || newCur === 'cate') {
                    color = '#000000'
                }
                uni.setNavigationBarColor({
                    backgroundColor: color,
                    frontColor: color,
                })
                // #endif
                // this.downCallback()
            }
        },
        components: {
            index,
            cate,
            lists,
            guild,
            user,
            MescrollUni,
        }
    }
</script>

<style scoped lang="scss">
    page {
        background-color: #f7f7f7;
    }
    .home-contents {
        overflow: hidden;
    }
    uni-swiper .uni-swiper-wrapper, uni-swiper-item {
        overflow: auto;
    }
	// .loginTips{
	// 	position: absolute;
	// 	top: 50%;
	// 	left: 50%;
	// 	transform: translate(-50%,-50%);
	// 	z-index: 999;
	// 	background: #FFFFFF;
	// 	padding: 0 10%;
	// 	width: 100%;
	// 	height:500rpx;
	// 	border-radius: 10rpx;
	// 	display: flex;
	// 	flex-direction: column;
	// 	justify-content:space-around;
	// 	align-items: center;
	// 	.loginInfo{
	// 		display: flex;
	// 		flex-direction: column;
	// 	}
	// }
</style>
