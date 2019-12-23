<template>
	<view class="user-content">、
		<!-- 个人用户展示 -->
		<view class="user text-center">
			<view class="info">
				<image :src="userinfo.avatar" class='avatar round' style="display: inline-block;"></image>
				<view class="margin-top-sm">
					<text>{{userinfo.username}}</text>
				</view>
				<view class="margin-top-sm">
					<navigator url="/pages/vip/vip" hover-class="none">
						<text class='text-xs cuIcon-vip user-tag solid bg-gradual-orange '> {{vip_name}}</text>
					</navigator>
				</view>
				<view class="margin-top-sm">
					<navigator url="/pages/level/level" hover-class="none">
						<text class='text-xs cuIcon-medalfill solid user-tag bg-gradual-green '> {{level_name}}</text>
					</navigator>
				</view>
			</view>
		</view>
		<!-- 发布时间详情 -->
		<view>
			<view class="cu-list grid col-3 no-border">
				<view class="cu-item">
					<navigator url="/pages/vip/vip" hover-class="none">
						<text>{{vip_issue}} / 天\n可发布</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator url="/pages/vip/vip" hover-class="none">
						<text>{{vip_apply}} / 天\n可申请</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator url="/pages/wallet/wallet" hover-class="none">
						<text>￥{{userinfo.balance}}\n余额</text>
					</navigator>
				</view>
			</view>
		</view>
		<view class="handles">
			<!-- 任务管理 -->
			<view class='margin-top-xs'>
				<view class="cu-bar bg-white">
					<view class="action">
						<text class=" text-bold text-black">任务管理</text>
					</view>
				</view>

				<view class="cu-list grid col-3 no-border">
					<view class="cu-item">
						<navigator url="/pages/order/all" hover-class="none">
							<text class="cuIcon-newshotfill"></text>
							<text>我的订单</text>
						</navigator>
					</view>
					<view class="cu-item">
						<navigator url="/pages/order/all?status=1" hover-class="none">
							<text class="cuIcon-timefill"></text>
							<text>工作中</text>
						</navigator>
					</view>
					<view class="cu-item">
						<navigator url="/pages/order/all?status=2" hover-class="none">
							<text class="cuIcon-squarecheckfill"></text>
							<text>待审核</text>
						</navigator>
					</view>
					<view class="cu-item">
						<navigator url="/pages/release/all" hover-class="none">
							<text class="cuIcon-formfill"></text>
							<text>我的发布</text>
						</navigator>
					</view>
					<view class="cu-item">
						<navigator url="/pages/release/all?status=1" hover-class="none">
							<text class="cuIcon-sponsorfill"></text>
							<text>待支付</text>
						</navigator>
					</view>
					<view class="cu-item">
						<navigator url="/pages/order/all?mine=1&status=2" hover-class="none">
							<text class="cuIcon-roundcheckfill"></text>
							<text>待确认</text>
						</navigator>
					</view>
				</view>
			</view>
			<!-- 全部功能 -->
			<view class='margin-top-xs'>
				<view class="cu-bar bg-white">
					<view class="action">
						<text class=" text-bold text-black">全部功能</text>
					</view>
				</view>
				<view class="cu-list grid col-4 no-border">
					<view class="cu-item">
						<navigator url="/pages/message/message" hover-class="none">
							<text class="cuIcon-messagefill"></text>
							<text>消息</text>
						</navigator>
					</view>
					<view class="cu-item">
						<navigator url="/pages/user/set" hover-class="none">
							<text class="cuIcon-peoplefill"></text>
							<text>设置</text>
						</navigator>
					</view>
					<view class="cu-item">
						<navigator url="/pages/user/invite" hover-class="none">
							<text class="cuIcon-qrcode"></text>
							<text>邀请有礼</text>
						</navigator>
					</view>
					<view class="cu-item">
						<navigator url="/pages/user/help" hover-class="none">
							<text class="cuIcon-servicefill"></text>
							<text>帮助中心</text>
						</navigator>
					</view>
				</view>
			</view>
			<!-- 链接 -->
			<view class='margin-top-xs'>
				<view class="cu-bar bg-white">
					<view class="action">
						<text class=" text-bold text-black">跳转</text>
					</view>
				</view>
				<view class="cu-list grid col-4 no-border">
					<view class="cu-item">
						<navigator url="/pages/video/video" hover-class="none">
							<text class="cuIcon-messagefill"></text>
							<text>发布</text>
						</navigator>
					</view>
					<view class="cu-item">
						<navigator url="/pages/personal/personal" hover-class="none">
							<text class="cuIcon-messagefill"></text>
							<text>个人中心</text>
						</navigator>
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
                userinfo: {},
                level_name: '',
                vip_name: '',
                vip_apply: 0,
                vip_issue: 0,
                StatusBar: this.StatusBar,
                CustomBar: this.CustomBar
            }
        },
        created(){
            this.initUser()
        },
        methods:{
            initUser(){
                this.userinfo = this.$api.getConfig()
				var config = this.$api.getConfig('', this.$api.SYSTEM_CONFIG)
                this.vip_name = config.vip['vip_'+this.userinfo.vip].name;
                this.vip_apply = config.vip['vip_'+this.userinfo.vip].apply;
                this.vip_issue = config.vip['vip_'+this.userinfo.vip].issue;
                this.level_name = config.level['level_'+this.userinfo.level].name;
            },
			
        }
    }
</script>

<style lang="scss" scoped>
	.user-content{
		padding-bottom: 150upx;
	}

	@keyframes user-bg {
		0% {
			background-position: 0 0;
		}
		100% {
			background-position: 100% 0;
		}
	}

	.user{
		background: linear-gradient(45deg, #d7d2cc 0%, #304352 100%);
		animation: user-bg 10s infinite linear alternate;
		background-size: 200% 100%;
		background-position: 0 0;
		width: 100%;
		height: 530upx;
		color: #D2F7FE;
		.user-bar{
			position: absolute;
			width: 100%;
			background: rgba( 255, 255, 255, 0);
			color: #D2F7FE;
		}
		.info{
			padding-top: 150upx;
			.avatar{
				width: 150upx;
				height: 150upx;
			}
			.user-tag{
				border-radius: 30upx;
				padding: 5upx 15upx;
				&::before{
					margin-right: 8upx;
				}
			}
		}
	}
	.cu-list.grid>.cu-item text{
		color: #333333;
		font-size: 25upx;
	}
	.handles{
		.cu-list.grid>.cu-item text:first-child{
			font-size: 35upx;
		}
	}
</style>
