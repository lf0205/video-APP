<template>
	<view>
		<z-custom :isBack='true'>
			<view slot='backText'>实名认证</view>
		</z-custom>
		<view>
			<form>
				<view class="cu-form-group">
					<view class="title">姓&nbsp;&nbsp;&nbsp;&nbsp;名</view>
					<input name="input" placeholder="请输入真实姓名" :disabled="!checkVerified()" v-model="name"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">身份证</view>
					<input name="input" placeholder="请输入身份证号码" :disabled="!checkVerified()" maxlength="18" v-model="card"></input>
				</view>
				<view class="cu-bar bg-white margin-top-sm">
					<view class="action">
						身份证正反面上传
					</view>
					<view class="action">
			0			{{imgLen}}/{{imgLimit}}
					</view>
				</view>
				<view class="cu-form-group">
					<view class="grid grid-square flex-sub" :class="['col-' + imgLimit]">
						<view class="bg-img" v-for="(item,index) in img" :key="index">
							<image :src="item" mode="scaleToFill"></image>
							<view class="cu-tag bg-red" v-if="checkVerified()">
								<text @tap.stop="delImg" :data-index="index" class='cuIcon-close'></text>
							</view>
						</view>
						<view class="solids" @tap="chooseImage" v-if="imgLen < imgLimit">
							<text class='cuIcon-cameraadd'>
								<text class="text-sm" v-if="imgLen < 2">身份证正反面</text>
							</text>
						</view>
					</view>
				</view>

				<view class="mark padding text-xs text-cyan">
					<text>
						<text class="cuIcon-title"></text> 一个身份证只能认证一个账户\n
						<text class="cuIcon-title"></text> 实名认证之后才能进行发布、申请任务
					</text>
				</view>
				<view class="padding flex flex-direction margin-top" v-if="verified != 1">
					<button class="cu-btn bg-grey lg no-b-r shadow" @tap="submit" v-if="verified != 0">提交</button>
					<view class="text-center" v-if="verified == 0">审核中</view>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
                verified: 0,
                imgLimit: 2,
				name: '',
				card: '',
                img  : [],
			}
		},
		created(){
            var identity = this.$api.getConfig('identity');
            this.name = identity.name
			this.card = identity.card
			this.img = identity.img || []
            this.verified = this.$api.getConfig('verified');
            if (this.checkVerified()) {
                this.$api.msg(this.verified)
            }
		},
		computed:{
		    imgLen(){
		        return this.img ? this.img.length : 0
			}
		},
		methods: {
            submit () {
                if (!this.checkVerified()) {
                    this.$api.msg('当前状态不能操作')
                    return;
                }

                if(!this.name){
                    this.$api.msg('请输入真实姓名')
					return
				}
				if(!this.card){
				    this.$api.msg('请输入身份证号码')
					return
				}
                if(!this.$api.isCard(this.card)){
                    this.$api.msg('请输入正确格式的身份证号')
                    return
                }
                if(this.imgLen !== 2){
                    this.$api.msg('请上传身份证正反面上传')
                    return
                }
				this.$api.post('user/access' , {
				    name: this.name,//姓名
					card: this.card,//身份证
					img : this.img//身份证正反照片
				} , (res => {
					// 若返回状态code为0，说明提交成功
				    if(res.code == 0){
				        this.$api.msg()
                        this.$api.setConfig({
                            verified: 0,
                            access : this.user
						}, '', this.$api.USER_CONFIG)
						this.$api.modal('实名认证提交成功，等待后台审核！', '', ()=>{uni.navigateBack()})
					}
				}))
			},
            chooseImage() {
                if (!this.checkVerified()) {
                    this.$api.msg('当前状态不能操作')
                    return;
                }

                if (this.imgLen >= 2) {
                    this.$api.msg('只能上传两张图片')
                    return
				}

                this.$api.uploadImage((path)=>{
                    try{
                        this.img.push(path)
					}catch (e) {
                    }
                }, this.imgLimit - this.imgLen)
            },
            delImg(e){
                if (!this.checkVerified()) {
                    this.$api.msg('当前状态不能操作')
					return;
                }
				this.img.splice(e.target.dataset.index , 1)
            },
			checkVerified(){
                return this.verified != 0 && this.verified != 1
			}
		}
	}
</script>

<style scoped>

</style>
