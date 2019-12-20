<template>
    <view>

        <z-custom :isBack='true'>
            <view slot='backText'>个人资料</view>
        </z-custom>

        <view class="cu-list menu">
            <view class="cu-item arrow">
                <view class="content">
                    <text class="text-black">头像</text>
                </view>
                <view class="action">
                    <image :src="userinfo.avatar" class="avatar" mode="scaleToFill"
                           @tap="uploadAvatar"></image>
                </view>
            </view>
            <view class="cu-item">
                <view class="content">
                    <text class="text-black">用户名</text>
                </view>
                <view class="action">
                    <text class="text-grey">{{userinfo.username || ''}}</text>
                </view>
            </view>
            <view class="cu-item arrow" @tap="edit" data-name="weixin" data-title="微信号">
                <view class="content">
                    <text class="text-black">微信号</text>
                </view>
                <view class="action">
                    <text class="text-grey">{{userinfo.weixin || ''}}</text>
                </view>
            </view>

            <view class="cu-item arrow">
                <view class="content">
                    <text class="text-black">地区</text>
                </view>
                <view class="action">
                    <picker mode="multiSelector" @columnchange="areaChange" :value="areaIndex" :range="areaArray" @change="queryArea">
                        <view v-if="areaIndex[2] > -1">{{areaData[areaIndex[0]].value}} {{areaData[areaIndex[0]].children[areaIndex[1]].value}} {{areaData[areaIndex[0]].children[areaIndex[1]].children[areaIndex[2]].value}}</view>
                        <view v-else>{{userinfo.area || '设置地区'}}</view>
                    </picker>
                </view>
            </view>


            <view class="cu-item arrow" @tap="goPage('/pages/user/edit_pwd')">
                <view class="content">
                    <text class="text-black">修改密码</text>
                </view>
            </view>
            <view class="cu-item arrow" @tap="goPage('/pages/user/privacy')">
                <view class="content">
                    <text class="text-black">隐私设置</text>
                </view>
            </view>
        </view>

        <view class="cu-modal" :class="{show: modalShow}">
            <view class="cu-dialog">
                <view class="cu-bar bg-white justify-end">
                    <view class="content">{{modalTitle}}</view>
                    <view class="action" @tap="hideModal">
                        <text class="cuIcon-close text-red"></text>
                    </view>
                </view>
                <view class="cu-form-group">
                    <input name="input" :placeholder="'请输入'+modalTitle" v-model="modalValue"></input>
                </view>
                <view class="cu-bar bg-white justify-end">
                    <view class="action">
                        <button class="cu-btn bg-white line-green text-gray" @tap="hideModal">取消</button>
                        <button class="cu-btn bg-black margin-left" @tap="queryModal">确定</button>
                    </view>
                </view>
            </view>
        </view>

    </view>
</template>

<script>
    import areaData from '@/common/area.js'
    export default {
        data() {
            return {
                modalShow: false,
                modalName: '',
                modalTitle: '',
                modalValue: '',
                userinfo: {},

                defaultArea: '',
                areaData: areaData,
                areaIndex: [-1, -1, -1],
                areaArray: [[],[],[]],
            };
        },
        created() {
            this.userinfo = this.$api.getConfig()

            this.defaultArea = this.userinfo.province + ' ' + this.userinfo.city + ' ' + this.userinfo.area

            this.areaData.forEach(v => {
                this.areaArray[0].push(v.value)
            })
        },
        methods: {
            goPage(path) {
                uni.navigateTo({
                    url: path
                })
            },

            areaChange(e) {
                this.areaIndex[e.detail.column] = e.detail.value

                if (e.detail.column === 0) {
                    this.areaArray[1] = [];
                    this.areaArray[2] = [];
                    this.areaData[e.detail.value].children.forEach(v => {
                        this.areaArray[1].push(v.value)
                    })
                    this.areaIndex.splice(1, 1, 0)
                    this.areaIndex.splice(2, 1, 0)
                }

                if (e.detail.column === 1 || (e.detail.column == 0 && this.areaArray[1].length === 1)) {
                    this.areaArray[2] = [];
                    this.areaData[this.areaIndex[0]].children[this.areaIndex[1]].children.forEach(v => {
                        this.areaArray[2].push(v.value)
                    })
                    this.areaIndex.splice(2, 1, 0)
                }

                this.$forceUpdate()
            },
            queryArea(e)
            {

                var data = {
                    province: areaData[this.areaIndex[0]].value,
                    city: areaData[this.areaIndex[0]].children[this.areaIndex[1]].value,
                    area: areaData[this.areaIndex[0]].children[this.areaIndex[1]].children[this.areaIndex[2]].value,
                }

                if (this.defaultArea !== data.province + ' ' + data.city + ' ' + data.area) {
                    this.$api.post('user/area', data, r => {
                        if (r.code == 0) {
                            this.$api.setConfig('province', data.province, this.$api.USER_CONFIG)
                            this.$api.setConfig('city', data.city, this.$api.USER_CONFIG)
                            this.$api.setConfig('area', data.area, this.$api.USER_CONFIG)

                            this.$api.msg('地区修改成功')
                        }
                    })
                }
            },
            uploadAvatar() { // 上传头像
                this.$api.uploadImage((path)=>{
                    this.$api.post('user/edit', {
                        name: 'avatar',
                        value: path
                    }, data => {
                        if (data.code == 0) {
                            this.userinfo.avatar = path
                            if (this.$api.setConfig('avatar', path, this.$api.USER_CONFIG)) {
                                this.$api.msg('头像修改成功')
                                return
                            }
                        }
                    })
                })
            },
            edit(e) {
                this.modalName = e.currentTarget.dataset.name
                this.modalTitle = e.currentTarget.dataset.title
                this.modalValue = this.userinfo[this.modalName] || ''
                this.modalShow = true
            },
            hideModal(e) {
                this.modalName = ''
                this.modalTitle = ''
                this.modalValue = ''
                this.modalShow = false
            },
            hidePwdModal(e) {
                this.oldPassword = ''
                this.newPassword = ''
                this.newPassword2 = ''
                this.pwdModalShow = false
            },
            queryModal(e) {
                if (this.modalValue != this.userinfo[this.modalName]) {
                    this.$api.post('user/edit', {
                        name: this.modalName,
                        value: this.modalValue
                    }, res => {
                        if (res.code == 0) {
                            this.$api.setConfig(this.modalName, this.modalValue, this.$api.USER_CONFIG)
                            this.userinfo[this.modalName] = this.modalValue
                            this.$api.msg('修改成功')
                            this.hideModal()
                        }
                    })

                }
            }
        },
    }
</script>

<style scoped lang="scss">
    .avatar{
        width: 50upx;
        height: 50upx;
    }
</style>
