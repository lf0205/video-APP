
    <template>
        <view>
            <z-custom :isBack='true'>
                <view slot='backText'>隐私设置</view>
            </z-custom>

            <view class="cu-list menu">
                <view class="cu-item">
                    <view class="content">
                        <text class="text-black">公开手机</text>
                    </view>
                    <view class="action">
                        <view class="text-grey">
                            <switch @change="tels" :class="tel ? 'checked' : ''" :checked="tel ? true : false" v-model="tel"></switch>
                        </view>
                    </view>
                </view>
                <view class="cu-item">
                    <view class="content">
                        <text class="text-black">公开微信</text>
                    </view>
                    <view class="action">
                        <view class="text-grey">
                            <switch @change="weixin" :class="wechat ? 'checked' : ''" :checked="wechat ? true : false" v-model="wechat"></switch>
                        </view>
                    </view>
                </view>
            </view>

        </view>
    </template>

    <script>
        export default {
            name: "privacy",
            data() {
                return {
                    tel     : true,
                    wechat  : true,
                }
            },
            created() {
                this.getPrivacy()
            },
            methods: {
                getPrivacy(){
                    var userinfo = this.$api.getConfig()
                    this.tel    = userinfo.open_phone == 1 ? true : false
                    this.wechat = userinfo.open_weixin == 1 ? true : false
                },
                tels(e){
                    this.tel    = !this.tel;
                    var status  = this.tel ? 1 : 2;
                    this.$api.post('user/edit' , {name:'open_phone' , value: status} , (res=>{
                        if (res.code == 0) {
                            this.$api.setConfig('open_phone', status)
                            this.$api.msg('修改成功')
                        }
                    }))
                },
                weixin(e){
                    this.wechat = !this.wechat;
                    var status  = this.wechat ? 1 : 2;
                    this.$api.post('user/edit' , {name:'open_weixin' , value: status} , (res=>{
                        if (res.code == 0) {
                            this.$api.setConfig('open_weixin', status)
                            this.$api.msg('修改成功')
                        }
                    }))
                }
            }
        }
    </script>

    <style scoped>

    </style>
