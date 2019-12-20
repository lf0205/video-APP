<template>
	<view>
		<z-custom :isBack='true'>
			<view slot='backText'>修改密码</view>
		</z-custom>
		<view>
			<form>
				<view class="cu-form-group">
					<view class="title">原密码</view>
					<input password  placeholder="6-16位密码" v-model="old_pwd" ></input>
				</view>
				<view class="cu-form-group">
					<view class="title">新密码</view>
					<input password  placeholder="6-16位密码" v-model="new_pwd"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">确认密码</view>
					<input password  placeholder="再次填写密码" v-model="re_pwd"></input>
				</view>
				
				<view class="text-right margin-top">
					<text @tap="goPage('/pages/login/forgetpwd')">忘记密码？</text>
				</view>
				
				<view class="padding flex flex-direction margin-top-xl">
					<button class="cu-btn bg-grey lg no-b-r shadow"  @tap="submit">确认修改</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
                old_pwd 	: '',
                new_pwd 	: '',
                re_pwd      : '',
			}
		},
		methods: {
			goPage(path){
				uni.navigateTo({
					url:path
				})
			},
			submit(){
				if(!thisold_pwd){
					this.$api.msg('原密码不能为空')
					return
				}

				if(!this.new_pwd || this.new_pwd.length < 6){
                    this.$api.msg('新密码不能为空和长度不能小于6位数')
                    return
				}

				if(!this.re_pwd){
				    this.$api.msg('确认密码不能为空')
					return
				}

				if(this.new_pwd !== this.re_pwd){
				    this.$api.msg('两次密码确认不一致')
					return
				}

				this.$api.post('user/changePwd' , this.pwd , (res=>{
					if(res.code == 0){
						this.$api.msg('修改成功')
					}
				}))

			}
		}
	}
</script>

<style scoped>

</style>
