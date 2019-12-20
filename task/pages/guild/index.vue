<template>
    <view>
        <z-custom :isBack='true'>
            <view slot='backText'>公会</view>
        </z-custom>

        <view class="nav-top">
            <view class="cu-list menu-avatar">
                <view class="cu-item">
                    <view class="cu-avatar round lg" :style="'background-image:url('+guild.avatar+');'"></view>
                    <view class="content">
                        <view class="text-grey">{{guild.name}}</view>
                    </view>
                </view>
                <view class="padding text-sm bg-white">{{guild.desc}}</view>
            </view>

            <view class="cu-bar bg-white margin-top">
                <view class="action">公告</view>
                <view class="action" v-if="role > 1">
                    <navigator url="/pages/message/create?name=guild" hover-class="none">
                        <text class="cuIcon-add"></text>
                        <text class="text-xs">发布</text>
                    </navigator>
                </view>
            </view>
        </view>

        <view class="message-data">
            <scroll-view scroll-y="true" class="scroll-Y" :style="contentStyle" @scroll="scroll">
                <message :name="name" :del="role > 1" @del="delMsg" ref="scroll"></message>
            </scroll-view>
        </view>

    </view>
</template>

<script>
    import message from '../components/z-message'
    export default {
        data() {
            return {
                name: 'guild',
                more: false,
            }
        },
        props: {
            role: {
                type: Number
            },
            guild: {
                type: Object
            }
        },
        mounted() {
            var sInfo = uni.getSystemInfoSync()
            this.pageH = sInfo.windowHeight

            let bInfo = uni.createSelectorQuery().select(".foot")
            bInfo.boundingClientRect((data) => {
                this.pageH -= data.height
            }).exec()

            let tInfo = uni.createSelectorQuery().in(this).select(".nav-top")
            tInfo.boundingClientRect((data) => {
                this.pageH -= data.height
            }).exec()
        },
        computed: {
            contentStyle() {
                return 'height: ' + this.pageH + 'px;';
            },
        },
        methods:{
            delMsg(id){
                this.$api.modal('确认删除文章？', '', (r)=>{
                    if (r.confirm) {
                        this.$api.post('message/del' , {id: id} , (res => {
							console.log(res)
                            if(res.code == 0) {
                                this.$refs.scroll.refresh();
                                this.$api.msg('删除成功')
                            }
                        }))
                    }
                })

            }
        },
        components: {
            message,
        },
    }
</script>

<style scoped lang="scss">
    page {
        background: #FFFFFF
    }

    .message-data {
        margin-bottom: 100upx;
        padding-top: 30upx;
        background-color: #FbFbFb;
    }

    .btnFixed {
        position: fixed;
        bottom: 10%;
        right: 5%;
        z-index: 1000;
        view {
            background-color: #00C3C5;
            padding: 20upx;
            border-radius: 50%;
            color: white;
            margin: 25upx 10upx;
            // text[class*="cuIcon-"] {
            // 	font-size: 40upx;
            // }
        }
    }
</style>
