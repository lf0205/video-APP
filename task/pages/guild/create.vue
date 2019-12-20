<template>
    <view>
        <z-custom :isBack='true'>
            <view slot='backText'>创建公会</view>
        </z-custom>
        <view>
            <view class="bg-white padding">
                <view class="cu-steps">
                    <view class="cu-item" :class="current >= 1 ? 'text-dark text-bold' : ''">
                        <text class="cuIcon-title"></text>
                        提交信息
                    </view>
                    <!-- <view class="cu-item" :class="current >= 2 ? 'text-dark text-bold' : ''">
                        <text class='cuIcon-title'> </text> 等待审核
                    </view> -->
                    <view class="cu-item" :class="current >= 3 ? 'text-dark text-bold' : ''">
                        <text class='cuIcon-title'></text>
                        创建完成
                    </view>
                </view>
            </view>
            <view class="margin-top-xl" v-if="current == 1">
                <view class="cu-form-group">
                    <input placeholder="请输入公会名称" class="text-center" name="input" @input="changeName"></input>
                </view>
                <view></view>
                <view class="cu-form-group">
                    <textarea @input="changeDesc" maxlength="255" class="desc" auto-height
                              placeholder="请输入公会介绍 最多255字"></textarea>
                </view>
                <view class="padding flex flex-direction margin-top-xl">
                    <button class="cu-btn bg-grey lg no-b-r shadow" @tap="create">提交</button>
                </view>
                <view class="text-center">
                    <text class="text-xs text-grey">每个人仅能创建或加入一个公会</text>
                </view>
            </view>
            <view class="margin-top-xl" v-if="current == 2">
                <view class="text-center">公会资料已经提交，等待后台审核通过</view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                name: '',
                desc: '',
                current: 1
            }
        },
        methods: {
            create() {
                if (!this.name || !this.desc) {
                    this.$api.msg("请将公会信息填写完整")
                    return
                }
                this.$api.post('guild/create', {
                    name: this.name,
                    desc: this.desc
                }, (res => {
                    if (res.code == 0) {
                        this.$api.setConfig(res.data, '', this.$api.USER_CONFIG)
                        this.$api.modal("公会 " + this.name + " 创建成功", '', () => {
                            uni.navigateTo({
                                url: "/pages/guild/home"
                            })
                        })
                    }
                }))
            },
            changeName(event) {
                this.name = event.target.value
            },
            changeDesc(event) {
                this.desc = event.target.value
            }
        }
    }
</script>

<style scoped lang="scss">
    page {
        background: #FFFFFF
    }

    .cu-steps .cu-item {
        font-size: 20upx
    }

    .cu-steps .cu-item [class*="cuIcon-"], .cu-steps .cu-item .num {
        font-size: 30upx
    }

    .desc {
        min-height: 150upx;
        border: 1px solid #eee;
        padding: 20upx;
    }
</style>
