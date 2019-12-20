<template>
	<view class="login">
		<view class="bg-img">
			<image src="../../static/images/login/LoginHeader.png" mode="widthFix"></image>
		</view>
		<view class="form-data">
			<view class="bg-white form-list">
				<view class="margin-tb-sm text-xxl text-bold">登录</view>
				<form>
					<view class="cu-form-group solid-bottom">
						<input name="input" maxlength="11" placeholder="请输入手机号" v-model="user.phone"></input>
						<text class="cuIcon-people text-gray"></text>
					</view>
					<view class="cu-form-group solid-bottom">
						<input name="input" placeholder="请输入密码" password v-model="user.password"></input>
						<text class="cuIcon-lock text-gray"></text>
					</view>
					<view class="cu-form-group"  style="width: 100%;text-align: right;">
						<text class="text-grey fl" @tap="navToPage('/pages/login/register')">注册</text>
						<text class="text-grey fr" @tap="navToPage('/pages/login/forgetpwd')">忘记密码？</text>
					</view>
				</form>
			</view>

			<view class="padding flex flex-direction margin-top-xl">
				<button class="cu-btn bg-gradual-orange lg no-b-r shadow" @tap="login">提交</button>
			</view>

			<view class="other-login" v-if="false">
				<view class="other-title text-center text-gray padding">─── 第三方登录 ───</view>
				<view class="flex justify-center">
					<view class="margin">
						<image class="login-img" src="../../static/images/login/wechat.png" mode="aspectFill"></image>
					</view>
					<view class="margin">
						<image class="login-img" src="../../static/images/login/qq.png" mode="aspectFill"></image>
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
				user: {
					phone: '',
					password: '',
				}
			};
		},
		methods: {
			login(){
                if (this.user.phone == '' || this.user.password == '')
				{
					this.$api.msg('请输入手机号码和密码')
					return;
				}

				if (!this.$api.isPhone(this.user.phone))
				{
					this.$api.msg('手机号码格式错误')
					return;
				}

				if (this.user.password.length < 6)
				{
					this.$api.msg('密码错误')
					return;
				}

				this.$api.post('user/login', this.user, (res)=>{
					if (res.code === 0) {
						if (this.$api.login(res.data)){
                            uni.redirectTo({
                                url: '/pages/home'
                            })
						}
					}
				})
			},
			navToPage(path){
				uni.navigateTo({
					url:path
				})
			}
		},
	}
</script>

<style scoped lang="scss">
	.bg-img image{
		background-color: rgba(255,255,255, 0);
		width: 100%;
	}

	.form-data{
		position: absolute;
		width: 650upx;
		margin-left: 50upx;
		top: 400upx;
		z-index: 9;
		.form-list{
			&>view{
				padding-bottom: 50upx;
			}
			padding: 35upx;
		}
	}
	.cu-form-group{
		padding: 0;
		input{
			font-size: 25upx;
		}
	}
	.cu-form-group+.cu-form-group{
		border: none;
	}

	.other-login{
		width: 100%;
		margin-top: 150upx;
		.login-img{
			width: 70upx;
			height: 70upx
		}
	}
</style>
