<template>
	<view>
		<z-custom :isBack='true'>
			<view slot='backText'>余额</view>
			<view slot='right'>
				<navigator url="/pages/wallet/withdrawal_list" hover-class="none">明细</navigator>
			</view>
		</z-custom>
		<view class="margin-top-xl">
			<view class="padding-xs flex align-center">
				<view class="flex-sub text-center">
					<view class="padding">
						<text class="text-xl">￥</text><text class="text-xsl text-bold">{{balance}}</text>
						<view class="mark padding"><text class="cuIcon-info margin-right-xs"></text> 余额只能用于提现</view>
					</view>
				</view>
			</view>
			<navigator url="/pages/wallet/withdrawal" hover-class="none">
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
                balance: '0.0000'
			}
		},
        onShow() {
            this.setBalance()
        },
		methods: {
		    setBalance() {
                this.balance = this.returnFloat(this.$api.getConfig('balance') * 1)
			},
            returnFloat(value) {
                var value=Math.round(parseFloat(value)*10000)/10000;
                var xsd=value.toString().split(".");
                if(xsd.length==1){
                    value=value.toString()+".0000";
                    return value;
                }
                if(xsd.length>1){
                    if(xsd[1].length < 4){
                        value = value.toString() + (xsd[1].length == 2 ? '00' : (xsd[1].length == 3 ? '0':'000')).toString()
                    }
                    return value;
                }
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
		font-size: 23upx;
	}
</style>
