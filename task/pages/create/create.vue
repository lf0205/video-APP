<template>
	<view class="create" style="background-image: url('/static/images/createbg.gif')">
		<view class="form-data">
			<form>
				<!-- 任务介绍 -->
				<view class="cu-form-group form-content">
					<textarea :maxlength="maxLenContent" auto-height class="contentData" v-model="content" placeholder="任务介绍"></textarea>
					<text class="remaining">剩余{{contentLeftLen}}字</text>
				</view>
				<!-- 任务标题 -->
				<view class="cu-form-group">
					<view class="title">任务标题</view>
					<input name="input" placeholder="输入标题" v-model="title"></input>
				</view>
				<!-- 浏览任务 -->
				<view class="cu-form-group">
					<view class="title">浏览任务</view>
					<switch @change="browse = !browse" :class="browse ? 'checked' : ''" :checked="browse?true:false" v-model="browse"></switch>
				</view>
				<!-- 开启浏览任务的操作 -->
				<view v-if="browse" class="cu-form-group">
					<view class="title">重复申请</view>
					<picker @change="repeatChange" :range="repeat_times" range-key="label">
						<view class="picker">
							<view class="text-left">{{repeat_times[repeatIndex].label}}</view>
						</view>
					</picker>
				</view>
				<view v-if="browse" class="cu-form-group">
					<view class="title">地址</view>
					<input name="input" placeholder="访问地址" v-model="url"></input>
				</view>
				<view v-if="browse" class="cu-form-group">
					<view class="title">时长</view>
					<picker @change="browseTimeChange" :range="browse_times">
						<view class="picker">
							<view v-if="time" class="text-left">{{time}} 秒</view>
							<view v-else class="text-left text-gray">请选择浏览时长</view>
						</view>
					</picker>
				</view>
				<view v-else><!-- 关闭浏览任务的操作 -->
					<view class="cu-bar bg-white margin-top-sm">
						<view class="action">
							<text class="cuIcon-titles text-orange"></text> 操作步骤
						</view>
					</view>
					<view v-for="(v, k) in step" :key="k">
						<view class="cu-bar bg-white margin-top-sm text-xs">
							<view class="action text-black text-bold">
								<text class="cuIcon-close margin-right text-red" @tap="delStep" :data-id="k"></text>
								第{{k+1}}步</view>
							<view class="action">需要审核图片
								<switch class="margin-left-xs" :class="v.check ? 'checked' : ''" :checked="v.check" @change="stepCheck" :data-id="k"></switch>
							</view>
						</view>
						<view class="cu-form-group">
							<view class="grid grid-square flex-sub col-3">
								<view class="grid grid-square flex-sub padding">
									<textarea auto-height minlength="3" class="stepData" maxlength="100" @input="stepMark" :value="v.mark" :data-id="k" placeholder="步骤说明"></textarea>
								</view>
								<view class="bg-img" v-if="v.img">
									<image :src="v.img" mode="aspectFit"></image>
									<view class="cu-tag" >
										<text @tap.stop="delStepImg" :data-id="k" class='cuIcon-close text-white'></text>
									</view>
								</view>
								<view class="solids" v-else>
									<text @tap="stepImg" :data-id="k" class='cuIcon-cameraadd'><text class="text-xs">参考图</text></text>
								</view>
							</view>
						</view>
					</view>
					<!-- 关闭浏览任务的添加步骤 -->
					<view class="cu-bar margin-top-sm text-xs">
						<view class="action"></view>
						<view class="action" @tap="addStep" ><text class="cuIcon-add"></text>添加步骤</view>
						<view class="action"></view>
					</view>
				</view>

				<view class="cu-form-group">
					<view class="title">单价</view>
					<input name="input" 
					:placeholder="'每单任务的价格' + (browse ? 
					(minBrowsePrice ?'(最低'+minBrowsePrice+'元)':'') : 
					(minUnitPrice ?'(最低'+minUnitPrice+'元)':''))" 
					type="number" v-model="money"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">数量</view>
					<input name="input" placeholder="发布数量" type="number" v-model="number"></input>
				</view>
				<!-- 判断如果有单价和数量,合计才会显示 -->
				<view v-if="number && money" class="padding flex flex-direction">
					<view class="cu-form-group">
						<view class="title">合计</view>{{number * money}} 元
					</view>
					<button class="cu-btn bg-grey lg no-b-r shadow margin-top" @tap="submitContent">立即提交</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
                minNumber: 1, // 最低数量
                priceTimes: 0, // 最低倍数
                minUnitPrice : 0, // 每笔最低价格
                minBrowsePrice : 0, // 浏览任务最低价格
				content  : '',
				imgLimit : 2,
				maxLenContent: 700,//限制字数
				contentLeftLen: 0,//默认字数
                cate_id  : '',//接收传过来的参数
                browse   : false,
                browse_times : [],
                browse_task : [],
                url  	 : '',//地址
                repeat   : 0,
                repeatIndex  : 0,
                repeat_times : [],
                time  	 : '',
                step     : [],
				title	 : '',//任务标题
				money	 : '',//单价
				number	 : '',//发布数量
			}
		},
		onLoad(op) {
		    this.cate_id = op.id
		},
		created() {
			this.contentLeftLen = this.maxLenContent
            const config = this.$api.getConfig('', this.$api.SYSTEM_CONFIG);
			console.log(config);
            this.priceTimes = config.releases_price_times || 0
            this.minNumber = config.min_releases_number || 1
            this.minUnitPrice = config.min_releases_price || 0
            this.repeat_times = config.task_repeat || []
            this.browse_task = config.browse_task_config || {}
            this.browse_times = Object.keys(this.browse_task)
        },
		watch: {
			// 监听content的值,获取到字数的数量
            content(val) {
                this.content = val;
                this.contentLeftLen = this.maxLenContent - this.content.length;
			},
			// 监听秒数值
            time(val) {
                this.time = val
                this.minBrowsePrice = this.browse_task[this.time];
            }
		},
		methods: {
		    addStep(){
		        if (this.step.length >= 5) {
		            this.$api.msg('任务最多5步');
		            return
				}
                this.step.push({
                    check :false,
                    mark  : '',
                    img   : ''
                })
			},
            repeatChange(e){
                this.repeatIndex = e.detail.value
                this.repeat = this.repeat_times[e.detail.value].time
			},
            browseTimeChange(e){
                this.time = this.browse_times[e.detail.value]
            },
			delStep(e){
				this.step.splice(e.target.dataset.id, 1)
			},
            stepCheck(e)
            {
				this.step[e.target.dataset.id].check = e.target.value
            },
            stepMark(e)
            {
                this.step[e.target.dataset.id].mark = e.target.value
            },
            stepImg(e) {
                this.$api.uploadImage((path)=>{
                    this.step[e.target.dataset.id].img = path
                }, this.imgLimit)
			},
            delStepImg(e) {
                this.step[e.target.dataset.id].img = ''
			},
			// 提交任务操作
            submitContent() {
                if (!this.content) {
                    this.$api.msg("请输入任务介绍")
                    return
                }
                if (this.content.length < 10) {
                    this.$api.msg("内容最低10个字")
                    return
                }
                // if (!this.cate_id) {
                //     this.$api.msg("请选择类型")
                //     return
                // }
                if (!this.title) {
                    this.$api.msg("请输入标题")
                    return
                }
                if (!this.money) {
                    this.$api.msg("请输入金额")
                    return
                }
                if (!this.number) {
                    this.$api.msg("请输入单量")
                    return
                }

                let minPrice = this.browse ? this.minBrowsePrice : this.minUnitPrice
                if (this.money < minPrice) {
                    this.$api.msg("每笔发布金额不得少于" +minPrice+ "元")
                    return
                }

                if (this.priceTimes !== 0 && ((this.money * 10000) % (this.priceTimes * 10000)) !== 0) {
                    this.$api.msg("发布金额必须是"+this.priceTimes+"的整数倍")
                    return
                }
                if (this.number % 1 !== 0) {
                    this.$api.msg("发布数量不能为小数")
                    return
				}
                if (this.number < this.minNumber) {
                    this.$api.msg("发布数量最低"+this.minNumber+"份")
                    return
                }

                if (this.browse) {
                    if (!this.url || !this.$api.isUrl(this.url)) {
                        this.$api.msg("请填写正确的浏览网址")
                        return
					}
                    this.step = [];
				}else{
                    this.repeat = 0;
					if (this.step.length == 0) {
                        this.$api.msg("请添加操作步骤")
                        return
					}
				}
				
								//文本															标题			success
                this.$api.modal('禁止发布黄赌毒以及涉政等一切法律锁禁止的内容，如有发现将直接封停账户', '确认发布', (r)=> {
					console.log(r);
                    if (r.confirm) {
                        this.$api.post('lists/demand', {
                            title: this.title,
                            cate_id: this.cate_id,
                            money: this.money,
                            number: this.number,
                            step: this.step,
                            browse: this.browse ? 1 : 0,
                            time: this.time,
                            url: this.url,
                            repeat: this.repeat,
                            content: this.content
                        }, (res => {
                            if (res.code == 0) {
                                uni.navigateTo({
                                    url: '/pages/detail/detail?id=' + res.data
                                })
                            }
                        }))
                    }
                })
			}
		}
	}
</script>

<style scoped lang="scss">
	.cu-modal{
		background: none;
		padding-top: 100upx;
		padding-bottom: 100upx;
		.cu-dialog{
			box-shadow: 0upx 0upx 50upx #333333;
		}
	}
	.create{
		background-repeat:no-repeat;
		background-position:top center;
		background-size:100% 500upx;
		padding-bottom: 50upx;
		padding-top: 500upx;
		.form-data{
			z-index: 9;
			width: 680upx;
			padding: 35upx;
			margin-left: 35upx;
			margin-top: -150upx;
			background-color: #FFFFFF;
			border-radius: 10upx;
			.contentData{
				min-height: 200upx;
			}
			.stepData{
				min-height: 200upx;
			}
			.form-content{
				border: 1px solid #eee;
				position: relative;
				.remaining{
					color: #1CBBB4;
					position: absolute;
					right: 10upx;
					bottom: 10upx;
				}
				&+.cu-form-group{
					border-top: none;
				}
			}
		}
	}

</style>
