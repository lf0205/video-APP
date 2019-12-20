<template>
	<view>
		<z-custom :isBack='true'>
			<view slot='backText'>余额</view>
			<view slot='right'>
				<navigator url="/pages/guild/withdrawal_list" hover-class="none">明细</navigator>
			</view>
		</z-custom>

		<view class="margin-top-xl">
			<view class="padding-xs flex align-center">
				<view class="flex-sub text-center">
					<view class="padding">
						<text class="text-xxl">￥</text><text class="text-xsl text-bold">{{balance}}</text>
					</view>
				</view>
			</view>

			<navigator v-if="role == 9" :url="'/pages/guild/withdrawal?balance='+balance" hover-class="none">
				<view class="padding flex flex-direction margin-top-xl">
					<button class="cu-btn bg-grey lg no-b-r shadow">提现</button>
				</view>
			</navigator>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
                balance: '0.0000',
				role : 0,
			}
		},
		onShow(){
            this.role = this.role ? this.role : this.$api.getConfig('guild_user_role')
            if(this.role != 9 && this.role != 5) {
                this.$api.modal('您没有操作权限' , '' , ()=>{
                    uni.navigateBack()
				})
            }else{
                this.getBalance()
			}
		},
		methods: {
            getBalance(){
                this.$api.post('guild/getGuildWallet' , {} , res=>{
                    if(res.code == 0 ){
                        this.balance = res.data.balance || 0
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

	.mark{
		color: #A8A8A8;
	}
</style>
