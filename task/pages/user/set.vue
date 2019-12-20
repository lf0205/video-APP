<template>
	<view>

		<z-custom :isBack='true'>
			<view slot='backText'>设置</view>
		</z-custom>

		<view class="cu-list menu">
			<view class="cu-item arrow" @tap="goPage('/pages/user/info')">
				<view class="content">
					<text class="text-black">个人资料</text>
				</view>
				<view class="action">
					<text class="text-grey"></text>
				</view>
			</view>
			<view class="cu-item arrow" @tap="goPage('/pages/user/edit_phone')">
				<view class="content">
					<text class="text-black">手机号码</text>
				</view>
				<view class="action">
					<text class="text-grey">{{userinfo.phone}}</text>
				</view>
			</view>
			<view class="cu-item" :class="userinfo.verified != 1 ? 'arrow' : ''" @tap="userinfo.verified != 1 ? goPage('/pages/user/edit_access') : ''">
				<view class="content">
					<text class="text-black">实名认证</text>
				</view>
				<view class="action">
					<text class="text-grey">{{validate}}</text>
				</view>
			</view>
			<view class="cu-item arrow" @tap="goPage('/pages/user/edit_account')">
				<view class="content">
					<text class="text-black">提现账户</text>
				</view>
			</view>
		</view>
		<view></view>
		<view class="cu-list menu margin-top-xs" >
			<view class="cu-item arrow" @tap="goPage('/pages/user/about')">
				<view class="content">
					<text class="text-black">关于我们</text>
				</view>
			</view>
			<view class="cu-item arrow" @tap="goPage('/pages/user/suggest')">
				<view class="content">
					<text class="text-black">意见反馈</text>
				</view>
			</view>
			<view v-if="version" class="cu-item arrow" @tap="upgrade">
				<view class="content">
					<text class="text-black">软件更新</text>
				</view>
				<view class="action">
					<text class="text-grey">{{version}}</text>
				</view>
			</view>
		</view>

		<view class="bg-white margin-top">
			<view class="padding flex flex-direction text-center"  @tap="logout">
				退出登录
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				version: '',
                userinfo: {},
			};
		},
        onShow(){
            this.userinfo = this.$api.getConfig()
            // #ifdef APP-PLUS
            this.version = plus.runtime.version
            // #endif
        },
		methods: {
			goPage(page) {
				uni.navigateTo({
					url: page
				})
			},
            logout()
			{
			    this.$api.logout()
			},
            upgrade(){
                this.$api.initUpgrade((res)=>{
                    if (!res.data) {
                        this.$api.msg('当前已经是最新版本')
					}
                })
			}
		},
		computed:{
			validate(){
			    if (this.userinfo.verified == 1) {
			        return "已认证"
				} else if (this.userinfo.verified == 0){
                    return '审核中'
				}else{
                    return this.userinfo.verified
				}
			}
		}
	}
</script>

<style scoped lang="scss">
</style>
