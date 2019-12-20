<template>
	<view class="login">

		<view class="bg-img">
			<image src="../../static/images/login/LoginHeader.png" mode="widthFix"></image>
		</view>
		<view class="form-data">
			<view class="bg-white form-list">
				<view class="margin-tb-sm text-xxl text-bold">注册</view>
				<form>
					<view class="cu-form-group">
						<view class="title">用户名</view>
						<input placeholder="请输入用户名" v-model="register.username"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">手机号</view>
						<input placeholder="请输入11位手机号" maxlength="11" v-model="register.phone"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">密&nbsp;&nbsp;&nbsp;码</view>
						<input password placeholder="6-16位密码" v-model="register.password"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">推荐人</view>
						<input placeholder="(选填) 请输入推荐码" v-model="register.p_id"></input>
					</view>
					
					<view class="margin-top-sm">
						<view class="cu-form-group">
							<view class="title">验证码</view>
							<input placeholder="输入验证码" name="input" v-model="register.code"></input>
							<text class="mark" :class="sending ? 'text-grey' : 'text-dark'" @tap="sendCode">{{sendMsg}}</text>
						</view>
					</view>
				</form>
			</view>

			<view class="padding margin-top-xl">
				<button class="cu-btn line-green lg no-b-r shadow margin-right" style="width: 30%;" @tap="goLogin">登陆</button>
				<button class="cu-btn bg-gradual-orange lg no-b-r shadow " style="width: 60%;" @tap="login">立即注册</button>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sending: false,
				sendMsg: "获取验证码",
				register: {
					username : '', // 用户名
					phone	 : '', //手机
					password : '', //密码
					p_id	 : '', //邀请人
					code	 : '', //验证码
				}
			};
		},
		methods: {
			login(){
				if(this.register.username == '' || this.register.phone == ''){
					this.$api.msg('请输入手机号码和密码')
					return;
				}

				if (!this.$api.isPhone(this.register.phone))
				{
					this.$api.msg('手机号码格式错误')
					return;
				}

				if (this.register.password.length < 6)
				{
					this.$api.msg('密码长度不能小于6位')
					return;
				}
				if (this.register.code == ''){
					this.$api.msg('请输入短信验证码')
					return
				}

				this.$api.post('user/register', this.register, (res)=>{
					if(res.code == 0){
					    const back = ()=>{
                            uni.navigateBack()
                        }
                        this.$api.modal("注册成功", '', back, back)
					}
				})

			},
			goLogin(path){
				uni.navigateBack()
			},
			sendCode(){
			    if(!this.$api.isPhone(this.register.phone)){
					this.$api.msg('手机格式不正确')
				}
				
				if(this.sending) {
					return false
				}
				this.sending = true
				this.sendMsg = "发送中..."
				
				this.$api.post('user/getCode' , {phone: this.register.phone} , (res => {
					if(res.code == 0){
						this.$api.msg("发送成功")
						var time = 60
						var w = setInterval(()=>{
							if (time == 0) {
								this.sending = false
								this.sendMsg = "获取验证码"
								clearInterval(w)
							}else{
								time--
                                this.sendMsg = time + "秒后重发"
							}
						}, 1000)
					}else{
						this.sending = false
					}
				}))
				
				
			},
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
