<template>
    <view class="guild">
        <view>
            <view class="bg-img">
                <image src="/static/images/guildbg.jpg" mode="widthFix"></image>
            </view>
            <view class="cu-list menu-avatar">
                <rich-text :nodes="guild_mark"></rich-text>
            </view>
            <view class="padding flex flex-direction margin-top-xl">
                <button v-if="isJoin" class="cu-btn bg-grey lg no-b-r shadow" @tap="goPage('/pages/guild/home')">我的公会</button>
                <button v-if="!isJoin" class="cu-btn bg-grey lg no-b-r shadow" @tap="goPage('/pages/guild/join')">立即加入</button>
                <button v-if="!isJoin && createGuild" class="cu-btn lg no-b-r shadow margin-top"
                        @tap="goPage('/pages/guild/create')">创建公会
                </button>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                guild_mark: '',
                isJoin: false,
                createGuild: false,
                info: '',
                name: '',
            }
        },
        created() {
            this.initGuild()
        },
        methods: {
            initGuild(){
                const user = this.$api.getConfig()
                this.isJoin = user.guild_id > 0 && user.guild_user_status != 0
                this.createGuild = user.guild_auth > 0
                this.guild_mark = this.$api.getConfig('guild_home_mark', this.$api.SYSTEM_CONFIG)
            },
            goPage(page) {
                uni.navigateTo({
                    url: page
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .guild {
        widows: 100%;
        height: 100vh;
        background-color: #FFFFFF;
        .bg-img image {
            width: 750upx;
            height: 600upx;
        }
        .doIndex {
            position: fixed;
            width: 100%;
            color: white;
            top: 50%;
            z-index: 1024;
        }
    }
</style>
