<template>
	<view>
		<z-custom :isBack='true'>
			<view slot='backText'>忘记密码</view>
		</z-custom>
		<view>
			<form>
				<view class="cu-form-group">
					<view class="title">手机号码</view>
					<input placeholder="请输入手机号码" v-model="pwd.phone"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">新&nbsp;&nbsp;密&nbsp;&nbsp;码</view>
					<input password  placeholder="6-16位密码" v-model="pwd.password"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">确认密码</view>
					<input password  placeholder="再次填写密码" v-model="pwd.re_password"></input>
				</view>
			
				<view class="margin-top-sm">
					<view class="cu-form-group">
						<view class="title">验证码</view>
						<input placeholder="输入验证码" name="input" v-model="pwd.code"></input>
						<text class="mark" :class="sending ? 'text-grey' : 'text-dark'" @tap="sendCode">{{sendMsg}}</text>
					</view>
				</view>

				<view class="padding flex flex-direction margin-top-xl">
					<button class="cu-btn bg-grey lg no-b-r shadow"  @tap="submit">提交</button>
				</view>

			</form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sending: false,
				sendMsg: "获取验证码",
				pwd : {
					code 		: '',
					phone 		: '',
					password 	: '',
					re_password : '',
				}

			}
		},
		methods: {

			submit(){
				if (!this.pwd.phone) {
					this.$api.msg("请输入手机号码")
					return
				}

				if(!this.$api.isPhone(this.pwd.phone)){
				    this.$api.msg("手机格式不正确")
					return
				}

				if (this.pwd.password.length < 6) {
					this.$api.msg("密码长度不能小于6位数")
					return
				}

				if (this.pwd.password !== this.pwd.re_password) {
					this.$api.msg("两次密码输入不一致")
					return
				}

				if (!this.pwd.code) {
					this.$api.msg("请输入验证码")
					return
				}

				this.$api.post('user/findPwd' , this.pwd , (res=>{
					if(res.code == 0){
						this.$api.msg('修改成功')
					}
				}))

			},

            sendCode(){
                if (!this.pwd.phone) {
                    this.$api.msg("请输入手机号码")
                    return
                }
                if(!this.$api.isPhone(this.pwd.phone)){
                    this.$api.msg('手机格式不正确')
					return
                }
                
				if(this.sending) {
					return false
				}
				this.sending = true
				this.sendMsg = "发送中..."
			
				this.$api.post('user/getCode' , {phone: this.pwd.phone} , (res => {
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
		}
	}
</script>

<style scoped>

</style>
