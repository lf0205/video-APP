<template>
    <view>
        <z-custom :isBack='true'>
            <view slot='backText'>任务订单</view>
        </z-custom>

        <view class="m-b-nav" v-if="detail.id > 0">
            <view class="cu-item shadow">
                <view class="cu-list menu-avatar">
                    <view class="cu-item" @tap="goDetail">
                        <view class="cu-avatar radius lg" :style="'background-image:url('+detail.cate.image+');'"></view>
                        <view class="content flex-sub">
                            <view>
                                <view class="text-bold text-sm text-cut" style="width: 500upx">{{detail.title}}</view>
                                <text class="text-right text-sm" :class="'status_'+detail.status">
                                    {{detail.status_label}}
                                </text>
                            </view>
                        </view>
                    </view>
                    <view class="cu-list menu ">
                        <view class="cu-item">
                            <view class="content">
                                <image :src="detail.user.avatar" class="radius" mode="aspectFit"></image>
                                <text class="text-grey text-sm">{{detail.user.username}}</text>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="text-content margin-top-xs">
                    <view class="cu-bar bg-white solid-bottom">
                        <view class="action">
                            <text class="text-bold">任务简介</text>
                        </view>
                    </view>
                    <view class="bg-white introduction padding-top padding-bottom">
                        <view class="cu-list menu">
                            <view class="cu-item ">
                                <view class="content">
                                    <text class="text-black">任务金额</text>
                                </view>
                                <view class="action">
                                    <text class="text-bold">{{detail.income}} 元 / 单</text>
                                </view>
                            </view>
                        </view>
                        <view class="cu-list menu">
                            <view class="cu-item ">
                                <view class="content">
                                    <text class="text-black">申请时间</text>
                                </view>
                                <view class="action">
                                    <text class="text-grey">{{detail.create_time}}</text>
                                </view>
                            </view>
                        </view>
                        <view class="cu-list menu" v-if="(userinfo.username === detail.user.username && (detail.status == 1 || detail.status == 7)) || (detail.status == 3 && userinfo.username === detail.listsuser.username)">
                            <view class="cu-item ">
                                <view class="content">
                                    <text class="text-black">有效时间</text>
                                </view>
                                <view class="action">
                                    <text class="text-red text-bold">{{detail.valid_time}}\n超过有效期自动{{detail.status == 3 ? '确认' : '取消'}}</text>
                                </view>
                            </view>
                        </view>
                        <view class="cu-list menu" v-if="detail.status != 1 && detail.status != 0 && detail.status != 3 && detail.status != 7">
                            <view class="cu-item ">
                                <view class="content">
                                    <text class="text-black">结束时间</text>
                                </view>
                                <view class="action">
                                    <text class="text-grey">{{detail.update_time}}</text>
                                </view>
                            </view>
                        </view>
                        <view class="cu-list menu" v-if="detail.status == 5 || detail.status == 7">
                            <view class="cu-item ">
                                <view class="content">
                                    <text class="text-black">审核说明</text>
                                </view>
                                <view class="action">
                                    <text :class="detail.status == 7 ? 'text-red' : 'text-grey'">{{detail.reason}}</text>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="text-content margin-top-xs" v-if="contact.phone !='' || contact.weixin !=''">
                    <view class="cu-bar bg-white solid-bottom">
                        <view class="action">
                            <text class="text-bold">联系方式</text>
                        </view>
                    </view>
                    <view class="bg-white introduction padding-top padding-bottom">
                        <view class="cu-list menu" v-if="contact.phone">
                            <view class="cu-item">
                                <view class="content">
                                    <text class="text-black">手机号码</text>
                                </view>
                                <view class="action">
                                    <text @tap="callPhone(contact.phone)">{{contact.phone}}</text>
                                </view>
                            </view>
                        </view>
                        <view class="cu-list menu" v-if="contact.weixin">
                            <view class="cu-item">
                                <view class="content">
                                    <text class="text-black">微信号</text>
                                </view>
                                <view class="action">
                                    <text @tap="callWx(contact.weixin)">{{contact.weixin}}</text>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>

                <view class="text-content margin-top-xs">
                    <view class="cu-bar bg-white solid-bottom">
                        <view class="action">
                            <text class="text-bold">描述</text>
                        </view>
                    </view>
                    <view class="bg-white padding">{{detail.lists.content}}</view>
                </view>
                <view class="text-content margin-top-xs " v-if="detail.lists.step">
                    <view class="cu-bar bg-white solid-bottom">
                        <view class="action">
                            <text class="text-bold">步骤</text>
                        </view>
                    </view>
                    <view class="bg-white padding-lg" v-for="(v, k) in detail.lists.step" :key="k">
                        <view>
                            <text class="text-bold">第{{k+1}}步</text>
                            <text class="fr text-xs" @tap="copyStr" :data-str="v.mark">复制步骤</text>
                        </view>
                        <view class="padding">
                            <text>{{v.mark}}</text>
                            <view class="grid grid-square flex-sub" :class="'col-' + (v.check ? 2 : 1)">
                                <view class="bg-img" v-if="v.img">
                                    <image v-if="v.img" :src="v.img" :data-src="v.img" @tap="showImg"
                                           mode="aspectFit"></image>
                                </view>
                                <view class="solids" v-if="v.check">
                                    <image v-if="detail.material.step[k]" :src="detail.material.step[k]"
                                           :data-src="detail.material.step[k]" @tap="showImg" mode="widthFix"></image>

                                    <view v-if="detail.material.step[k] && userinfo.username == detail.user.username && (detail.status == 1 || detail.status == 7)"
                                          class="cu-tag">
                                        <text @tap.stop="delStepImg" :data-id="k"
                                              class='cuIcon-close text-white'></text>
                                    </view>

                                    <text v-if="!detail.material.step[k] && userinfo.username == detail.user.username && (detail.status == 1 || detail.status == 7) "
                                          @tap="addStepImg" :data-id="k" class='cuIcon-cameraadd'>
                                        <text class="text-xs"></text>
                                    </text>
                                </view>
                            </view>
                        </view>
                    </view>
                    <view class="cu-form-group form-content padding-bottom-lg">
                        <text v-if="detail.status != 1 && detail.status != 7">{{detail.material.mark}}</text>
                        <textarea :maxlength="100" v-else v-model="detail.material.mark" auto-height
                                  placeholder="任务说明"></textarea>
                    </view>
                </view>
            </view>
            <view class="cu-bar bg-white tabbar border cu-bar foot"
                  v-if="(detail.status == 1 || detail.status == 7) && userinfo.username === detail.user.username">
                <view class="btn-group">
                    <button class="cu-btn bg-cyan no-b-r shadow-blur lg bar-w" @tap="closeLists">取消任务</button>
                    <button v-if="detail.lists.browse == 0" class="cu-btn bg-grey no-b-r shadow-blur lg bar-w"
                            @tap="submitOrder">{{detail.status == 1 ? '提交任务' : '重新提交'}}
                    </button>
                    <button v-if="detail.lists.browse == 1" class="cu-btn bg-grey no-b-r shadow-blur lg bar-w"
                            @tap="browse">前往浏览
                    </button>
                </view>
            </view>
            <view class="cu-bar bg-white tabbar border cu-bar foot"
                  v-if="detail.status == 3 && userinfo.username === detail.listsuser.username">
                <view class="btn-group">
                    <button class="cu-btn bg-grey no-b-r shadow-blur lg bar-w" @tap="check">审核</button>
                </view>
            </view>
        </view>

        <view class="cu-modal" :class="{show: checkShow}">
            <view class="cu-dialog">
                <view class="cu-bar bg-white justify-end">
                    <view class="content">审核</view>
                    <view class="action" @tap="checkShow = false">
                        <text class="cuIcon-close text-red"></text>
                    </view>
                </view>
                <view class="cu-form-group">
                    <view class="title">通过</view>
                    <switch @change="checkStatus = !checkStatus" :class="checkStatus?'checked':''"
                            :checked="checkStatus ? true : false"></switch>
                </view>
                <view class="cu-form-group">
                    <view class="title">说明</view>
                    <textarea v-model="checkReason" maxlength="1000" class="text-right" auto-height
                              placeholder="请输入说明"></textarea>
                </view>
                <view class="cu-bar bg-white justify-end">
                    <view class="action">
                        <button class="cu-btn bg-white line-green text-gray" @tap="checkShow = false">取消</button>
                        <button class="cu-btn bg-black margin-left" @tap="queryCheck">确定</button>
                    </view>
                </view>
            </view>
        </view>

    </view>
</template>

<script>
    export default {
        data() {
            return {
                contact: {
                    phone: '',
                    weixin: '',
                },
                loaded: false,
                checkShow: false,
                checkStatus: true,
                checkReason: '',
                userinfo: {},
                modelImg: '',
                detail: {
                    id: 0,
                    status: 0,
                    title: '',
                    stock: '',
                    price: '',
                    content: '',
                    create_time: '',
                    update_time: '',
                    material: {}
                },
            }
        },
        created() {
            this.userinfo = this.$api.getConfig()
        },
        methods: {
            async onLoad(option) {
                this.loaded = true;
                this.initData(option.id)
            },
            addStepImg(e) {
                this.$api.uploadImage((path) => {
                    this.detail.material.step.splice(e.target.dataset.id, 1, path)
                })
            },
            copyStr(e) {
                uni.setClipboardData({data: e.target.dataset.str});
            },
            formatDate(now) {
                var year = now.getFullYear();  //取得4位数的年份
                var month = now.getMonth() + 1;  //取得日期中的月份，其中0表示1月，11表示12月
                var date = now.getDate();      //返回日期月份中的天数（1到31）
                var hour = now.getHours();     //返回日期中的小时数（0到23）
                var minute = now.getMinutes(); //返回日期中的分钟数（0到59）
                var second = now.getSeconds(); //返回日期中的秒数（0到59）
                return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
            },
            callPhone(phone) {
                uni.setClipboardData({data: phone});
                uni.makePhoneCall({
                    phoneNumber: phone
                });
            },
            callWx(weixin) {
                uni.setClipboardData({data: weixin});
                let _this = this;
                setTimeout(() => {
                    if (plus.os.name == 'Android') {
                        plus.runtime.launchApplication(
                            {
                                pname: 'com.tencent.mm'
                            },
                            function (e) {
                            }
                        );
                    } else if (plus.os.name == 'iOS') {
                        plus.runtime.launchApplication({action: 'weixin://'}, function (e) {
                        });
                    }
                }, 1500)
            },
            done() {
                if (this.detail.status != 1) {
                    return;
                }
                let pages = getCurrentPages();
                let prevPage = pages[pages.length - 1];
                if (prevPage.$vm.time < 1) {
                    this.$api.post('order/submitTask', {
                        id: this.detail.id,
                    }, (res => {
                        if (res.code == 0) {
                            this.initData(this.detail.id)
                            this.$api.msg('任务完成')
                        }
                    }))
                }
            },
            showImg(e) {
                this.$api.previewImage([e.target.dataset.src]);
            },
            delStepImg(e) {
                this.detail.material.step.splice(e.target.dataset.id, 1, '')
            },
            initData(id) {
                uni.showLoading()
                this.$api.post('order/detail', {
                    id: id
                }, res => {
                    uni.hideLoading();
                    if (res.code == 0) {
                        if (!res.data.material) {
                            res.data.material = {
                                mark: '',
                                step: []
                            };
                            for (let i in res.data.lists.step) {
                                if (res.data.lists.step[i].check) {
                                    res.data.material.step[i] = ''
                                }
                            }
                        }
                        this.detail = res.data

                        if (this.userinfo.username === this.detail.listsuser.username) { // 发布者状态
                            this.contact.phone = this.detail.user.phone
                            this.contact.weixin = this.detail.user.weixin
                        } else { // 申请者状态
                            this.contact.phone = this.detail.listsuser.phone
                            this.contact.weixin = this.detail.listsuser.weixin
                        }
                    }
                }, () => {
                    uni.hideLoading();
                })
            },
            goDetail() {
                uni.navigateTo({
                    url: '/pages/detail/detail?id=' + this.detail.lists_id
                })
            },
            check() {
                this.checkShow = true
            },
            queryCheck() {
                this.checkShow = false
                this.$api.post('order/check', {
                    id: this.detail.id,
                    status: this.checkStatus ? 1 : 0,
                    reason: this.checkReason,
                }, (res => {
                    if (res.code == 0) {
                        this.$api.modal("审核成功", '', () => {
                            uni.navigateBack()
                        })
                    }
                }))
            },
            closeLists() {
                this.$api.modal('确认取消任务？', '', (r) => {
                    if (r.confirm) {
                        this.$api.post('order/delete', {
                            id: this.detail.id
                        }, res => {
                            if (res.code == 0) {
                                uni.navigateBack()
                            }
                        })
                    }
                })
            },
            submitOrder() {
                for (let i in this.detail.material.step) {
                    if (!this.detail.material.step[i]) {
                        this.$api.msg('请上传第' + (i * 1 + 1) + '步截图')
                        return;
                    }
                }
                this.$api.modal("确认提交任务？", '', (r) => {
                    if (r.confirm) {
                        this.$api.post('order/submitTask', {
                            id: this.detail.id,
                            material: this.detail.material,
                        }, (res => {
                            if (res.code == 0) {
                                this.$api.modal('提交成功', '', () => {
                                    uni.navigateBack()
                                })
                            }
                        }))
                    }
                })

            },
            browse() {
                if (this.detail.lists.browse != 1) {
                    this.$api.msg('当前任务不是浏览任务！')
                    return
                }
                uni.navigateTo({
                    url: '/pages/h5/browse?t=' + this.detail.title + '&s=' + this.detail.lists.time + '&p=' + encodeURIComponent(this.detail.lists.url)
                })
            },
        }
    }
</script>

<style scoped lang="scss">
    .status_1, .status_3 {
        color: #ffe728;
    }

    .status_5 {
        color: grey;
    }

    .status_7 {
        color: red;
    }

    .status_9 {
        color: #c4c4c4;
    }

    .introduction {
        .cu-list.menu > .cu-item {
            min-height: 40upx
        }
        .cu-list.menu > .cu-item .content, .cu-list.menu > .cu-item .action {
            font-size: 28upx;
        }
    }

    .bar-w {
        width: 80%;
    }
</style>
