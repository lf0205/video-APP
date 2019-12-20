<template>
	<view>
		<z-custom :isBack='true'>
			<view slot='backText'>加入公会</view>
		</z-custom>
		<view>
			<view class="bg-white padding">
				<view class="cu-steps">
					<view class="cu-item" :class="current >= 1 ? 'text-dark text-bold' : ''">
						<text class="cuIcon-title"></text> 提交信息
					</view>
					<view class="cu-item" :class="current >= 2 ? 'text-dark text-bold' : ''">
						<text class='cuIcon-title'> </text> 等待审核
					</view>
					<view class="cu-item" :class="current >= 3 ? 'text-dark text-bold' : ''">
						<text class='cuIcon-title'> </text> 完成
					</view>
				</view>
			</view>
			
			<view class="margin-top-xl" v-if="current == 1">
				<view class="cu-form-group">
					<input name="input" placeholder="请输入公会名称" class="text-center" v-model="name"></input>
				</view>
				
				<view class="padding flex flex-direction margin-top-xl">
					<button class="cu-btn bg-grey lg no-b-r shadow" @tap="doJoin">提交</button>
				</view>
			</view>
			
			<view class="margin-top-xl text-center" v-if="current == 2">
				<view class="padding text-sm bg-white">公会资料已经提交，等待审核通过</view>
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round lg" :style="'background-image:url('+guild.avatar+');'"></view>
						<view class="content">
							<view class="text-grey">{{guild.name}}</view>
						</view>
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
				name: '',
				guild:{
				    name: '',
					avatar: ''
				},
				current: 1
			}
		},
		created(){
            this.$api.post('guild/my' , {}, (res=>{
                if (res.code == 0 && res.data) {
                    this.current = 2
                    this.guild.name = res.data.name
                    this.guild.avatar = res.data.avatar
                }
            }))
		},
		methods: {
			doJoin(){
				if(this.name == '') {
					this.$api.msg("请输入公会名称")
					return;
				}
				this.$api.post('guild/check' , {name: this.name}, (g=>{
					if (g.code == 0) {
                        this.$api.modal("确定加入公会 "+this.name, '', ()=>{
                            this.$api.post('guild/join' , {id: g.data.id}, (res=>{
                                if (res.code == 0) {
                                    this.guild.name = res.data.name
                                    this.guild.avatar = res.data.avatar
                                    this.current = 2
                                    this.$api.msg("公会 " + this.name + " 申请成功，请等待审核")
                                }
                            }))
                        })
					}
				}))
				
			}
		}
	}
</script>

<style scoped lang="scss">
	page{
		background: #FFFFFF
	}
	.cu-steps .cu-item{
		font-size: 20upx
	}
	.cu-steps .cu-item [class*="cuIcon-"], .cu-steps .cu-item .num{
		font-size: 30upx
	}
</style>
