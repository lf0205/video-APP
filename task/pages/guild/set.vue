<template>
	<view>
		<z-custom :isBack='true'>
			<view slot='backText'>设置</view>
		</z-custom>
		
		<view class="cu-list menu">

			<view class="cu-item arrow">
				<view class="content">
					<text class="text-black">头像</text>
				</view>
				<view class="action" @tap="uploadAvatar">
					<image :src="guild.avatar" class="avatar" mode="scaleToFill"></image>
				</view>
			</view>

			<view class="cu-item arrow" @tap="modalShow = true">
				<view class="content">
					<text class="text-black">介绍</text>
				</view>
			</view>

			<view class="cu-modal" :class="{show: modalShow}">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">公会介绍</view>
						<view class="action" @tap="modalShow = false">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view class="cu-form-group">
                    <textarea v-model="desc" maxlength="255" auto-height placeholder="请输入公会介绍 最多255字"></textarea>
					</view>
					<view class="cu-bar bg-white justify-end">
						<view class="action">
							<button class="cu-btn bg-white line-green text-gray" @tap="modalShow = false">取消</button>
							<button class="cu-btn bg-black margin-left" @tap="editInfo">确定</button>
						</view>
					</view>
				</view>
			</view>
			
			<view class="cu-item arrow" @tap="goPage('/pages/guild/wallet')">
				<view class="content">
						<text class="text-black">财务</text>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
	    props:{
	        guild: {
                type: Object,
                default: {}
			}
		},
		data() {
			return {
                modalShow: false,
                desc: '',
			}
		},
		created(){
	        this.desc = this.guild.desc || ''
		},
		methods: {
			goPage(page){
				uni.navigateTo({
					url: page
				})
			},
            uploadAvatar() { // 上传头像
                this.$api.uploadImage((path)=>{
                    this.$api.post('guild/edit', {
                        name: 'avatar',
                        value: path
                    }, data => {
                        if (data.code == 0) {
                            this.$emit("editInfo", {avatar: path})
                            this.$api.msg('头像修改成功')
                        }
                    })
                })
            },
            editInfo(){
				if (this.desc.length > 255) {
				    this.$api.msg('公会介绍长度最多255个字符')
				}
                this.$api.post('guild/edit' , {name: 'desc', value : this.desc} , res=>{
                    if(res.code == 0 ){
                        this.$emit("editInfo", {desc: this.desc})
                        this.$api.msg('修改成功')
						this.modalShow = false
                    }
                })
			}
		}
	}
</script>

<style scoped lang="scss">
	page {
		background-color: white;
	}
	.avatar{
		width: 50upx;
		height: 50upx;
	}
	
	.mark{
		color: #A8A8A8;
	}
</style>
