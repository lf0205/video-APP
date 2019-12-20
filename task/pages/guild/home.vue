<template>
    <view>
        <swiper class="screen-swiper " :style="'height: '+wh+'px'" @touchstart="TouchStart" @touchend="TouchEnd"
                :current="pageCur" duration="200" :duration="duration" @change="navChange">
            <swiper-item :class="pageCur == 0 ? 'cur' : ''">
                <scroll-view scroll-y="true" class="scroll-Y" :style="'height: '+wh+'px'" @scroll="scroll"
                             data-index="indexPage">
                    <mescroll-uni :down="{auto: false, inOffsetRate: 0.5, outOffsetRate: 0.4}" :up="{use:false}" @down="downCallback">
                        <index ref='indexPage' :guild="guild" :role="role"></index>
                    </mescroll-uni>
                </scroll-view>
            </swiper-item>
            <swiper-item :class="pageCur == 1 ? 'cur' : ''">
                <scroll-view scroll-y="true" class="scroll-Y" :style="'height: '+wh+'px'" @scroll="scroll"
                             data-index="users">
                    <users ref='users'></users>
                </scroll-view>
            </swiper-item>
            <swiper-item v-if="role > 1" :class="pageCur == 2 ? 'cur' : ''">
                <scroll-view scroll-y="true" class="scroll-Y" :style="'height: '+wh+'px'" @scroll="scroll"
                             data-index="audit">
                    <audit ref='audit' @waitReview="waitReview" @beforeUser='beforeUser'></audit>
                </scroll-view>
            </swiper-item>
            <swiper-item v-if="role > 1" :class="pageCur == 3 ? 'cur' : ''">
                <scroll-view scroll-y="true" class="scroll-Y">
                    <set :guild="guild" @editInfo="editInfo"></set>
                </scroll-view>
            </swiper-item>
        </swiper>

        <view class="cu-bar tabbar bg-white foot text-black">
            <view class="action" @tap="pageCur = 0">
                <view class="cuIcon-cu-image">
                    <text :class="pageCur==0 ? 'cuIcon-homefill' : 'cuIcon-home'"></text>
                </view>公会
            </view>
            <view @tap="pageCur = 1" class="action">
                <view class="cuIcon-cu-image">
                    <text :class="pageCur==1 ? 'cuIcon-friendfill' : 'cuIcon-friend'"></text>
                </view>会员
            </view>
            <view v-if="role > 1" class="action" @tap="pageCur = 2">
                <view class="cuIcon-cu-image">
                    <text :class="pageCur==2 ? 'cuIcon-squarecheckfill' : 'cuIcon-squarecheck'"></text>
                    <view class="cu-tag badge" v-if="waitReviewLen > 0">{{waitReviewLen}}</view>
                </view>审核
            </view>
            <view class="action" v-if="role > 1" @tap="pageCur = 3">
                <view class="cuIcon-cu-image">
                    <text :class="pageCur==3 ? 'cuIcon-settingsfill' : 'cuIcon-settings'"></text>
                </view>设置
            </view>
            <view class="action" v-if="role != 9" @tap="layout = true">
                <view class="cuIcon-cu-image">
                    <text class="cuIcon-exit"></text>
                </view>
            </view>
        </view>

        <view class="cu-modal" :class="layout ? 'show' : ''">
            <view class="cu-dialog">
                <view class="padding-xl">
                    <text>退出公会之后将不能享受公会的所有福利\n确认退出公会！</text>
                </view>
                <view class="cu-bar bg-white">
                    <view class="action margin-0 flex-sub" @tap="layout = false">取消</view>
                    <view class="action margin-0 flex-sub text-green solid-left" @tap="layoutGuild">确定</view>
                </view>
            </view>
        </view>

    </view>
</template>

<script>

    import index from './index'
    import users from './users'
    import set from './set'
    import audit from './audit'
    import MescrollUni from "@/pages/components/mescroll-uni/mescroll-uni.vue"

    export default {
        data() {
            return {
                duration: 0,
                waitReviewLen: 0,
                pageCur: 0,
                title: '',
                wh: 0,
                role: 1,
                type: String,
                default: 'index',
                layout: false,
                more: false,
                guild: {},
            }
        },
        components: {
            index,
            set,
            audit,
            users,
            MescrollUni,
        },
        created() {
            var sInfo = uni.getSystemInfoSync()
            this.wh = sInfo.windowHeight
            this.guildInfo()
        },
        onPullDownRefresh() {
            switch (this.pageCur) {
                case 0:
                    this.guildInfo()
                    break;
                case 1:
                    this.$refs.users.refresh();
                    break
                case 2:
                    this.$refs.audit.refresh();
                    break
                case 3:
                    break
            }
            setTimeout(() => {
                this.$api.msg('更新完成')
                uni.stopPullDownRefresh();
            }, 150);
        },
        methods: {
            async downCallback(scroll) {
                await (() => {
                    switch (this.pageCur) {
                        case 0:
                            this.guildInfo()
                            break;
                        case 1:
                            this.$refs.users.refresh();
                            break
                        case 2:
                            this.$refs.audit.refresh();
                            break
                        case 3:
                            break
                    }
                })()
                this.$api.msg('更新完成')
                setTimeout(() => {
                    scroll.endSuccess();
                }, 500)
            },
            TouchStart() {
                this.duration = 200
            },
            TouchEnd() {
                setTimeout(() => {
                    this.duration = 0
                }, 200)
            },
            guildInfo() {
                this.$api.post('guild/info', '', (res => {
                    if (res.code == 0) {
                        this.guild = res.data.info
                        this.role = res.data.my.role * 1
                    }
                }))
            },
            layoutGuild() {
                this.layout = false
                this.$api.post('guild/logout', {}, (res => {
                    if (res.code == 0) {
                        this.$api.msg('退出成功')
                        this.$api.logoutGuild()
                    }
                }))
            },
            editInfo(info = {}) {
                for (let i in info) {
                    if (this.guild[i]) {
                        this.guild[i] = info[i]
                    }
                }
            },
            waitReview(num) {
                this.waitReviewLen = num
            },
            beforeUser(user) {
                this.$refs.users.beforeUser(user);
            },
            navChange(e) {
                this.pageCur = e.detail.current
            },
            scroll(e) {
                if (e.detail.scrollHeight - e.detail.scrollTop < this.wh + 100) {
                    if (this.more == false) {
                        this.more = true
                        this.$refs[e.target.dataset.index].scroll();
                    }
                } else {
                    this.more = false
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    page {
        background: #FFFFFF
    }

    .cu-dialog {
        background-color: #FFFFFF;
    }
</style>
