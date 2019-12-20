<template>
	<view>
		<z-custom :isBack='true'>
			<view slot='backText'>修改手机号码</view>
		</z-custom>
		<view>
			<form>
				<view class="cu-form-group">
					<view class="title">手机号码</view>
					<input name="input" placeholder="请输入新手机号码" v-model="user.phone"></input>
				</view>

				<view class="margin-top-sm">
					<view class="cu-form-group">
						<view class="title">验证码</view>
						<input placeholder="输入验证码" name="input" v-model="user.phone"></input>
						<text class="mark" :class="sending ? 'text-grey' : 'text-dark'" @tap="sendCode">{{sendMsg}}</text>
					</view>
				</view>
				<view class="padding flex flex-direction margin-top-xl">
					<button class="cu-btn bg-grey lg no-b-r shadow" @tap="submit">提交</button>
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
				user : {
                    phone : '',
                    code  : ''
				}
			}
		},
		methods: {

		    submit(){
                if(!this.user.phone){
					this.$api.msg("请输入手机号码")
					return
				}

				if(!this.$api.isPhone(this.user.phone)){
				    this.$api.msg("请输入正确的手机号码")
					return
				}

				if(!this.user.code){
				    this.$api.msg("请输入短信验证码")
					return
				}

                this.$api.post('user/changeMobile' , this.user , (res => {
                    if(res.code == 0){
                        this.$api.msg('修改成功')
                    }
                }))

			},

            sendCode(){
                if (!this.user.phone) {
                    this.$api.msg("请输入手机号码")
                    return
                }
                if(!this.$api.isPhone(this.user.phone)){
                    this.$api.msg('手机格式不正确')
                    return
                }
			
				if(this.sending) {
					return false
				}
				this.sending = true
				this.sendMsg = "发送中..."
			
				this.$api.post('user/getCode' , {phone: this.user.phone} , (res => {
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
				
			}

		}
	}
</script>

<style scoped>

</style>
