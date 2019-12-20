<template>
	<view>
		<view class="cu-card article" v-for="(item,index) in messageList" :key="index">
			<view class="padding-top mark-time text-center text-sm">{{item.create_time}}</view>
			<view class="cu-item shadow padding-lr padding-bottom-xs">
				<text class="del-msg cuIcon-close" v-if="del" @tap="delMsg(item.id)"></text>
				<!--<view @tap="goPage(item.id)">-->
					<view class="desc margin-m">
						<view class="text-bold"> {{item.title}}</view>
						<view class="margin-top text-sm"> <rich-text :nodes="item.content"></rich-text></view>
						<view class="margin-top grid grid-square flex-sub col-3" :class="'col-3'">
							<view class="bg-img" v-for="(val,index) in item.path" :key="index" @tap="showImg(val)">
								<image :src="val" mode="aspectFit"></image>
							</view>
						</view>
					</view>
				<!--</view>-->
			</view>
		</view>
		<view class="padding">
			<view class="cu-load load-cuIcon loading" v-if="loading"></view>
			<view class="text-center load" v-if="!loading && isFinish">没有啦~</view>
		</view>
	</view>
</template>

<script>
	export default {
        props: {
            name: String,
            del: {
                type: Boolean,
				default: false
			}
        },
		data() {
			return {
			    page: 1,
                rowNum: 15,
                loading: true,
                isFinish: false,
				messageList : [],
			}
		},
        created() {
            this.loadData()
        },
		methods: {
            refresh(){
                this.page = 1
                this.loading = true
                this.isFinish = false
                return this.loadData(true)
            },
            next(){
                if (!this.isFinish && !this.loading) {
                    this.loading = true
                    this.page += 1
                    this.loadData()
                }
            },
			delMsg(id){
                this.$emit("del", id)
			},
            async loadData(refresh = false){
				this.$api.post('message/getMessage' , {where: {name: this.name},  page: this.page, row_num: this.rowNum} , (res => {
					console.log(res.data)
					if(res.code == 0){
                        if (res.data.length < this.rowNum) {
                            this.isFinish = true
                        }
                        if (refresh) {
                            this.messageList = []
						}
                        this.messageList = [...this.messageList, ...res.data]
					}
                    this.loading = false
				}))
			},
            goPage(id){
                uni.navigateTo({
                    url:"/pages/message/detail?id="+id
                })
			},
            showImg(val) {
                this.$api.previewImage([val]);
            }

		}
	}
</script>


<style scoped lang="scss">
	.article{
		position: relative;
		.del-msg{
			position: absolute;
			right: 35upx;
			top: 75upx;
		}
	}
	.cu-card>.cu-item{
		margin-top: 10upx
	}
	.margin-m{
		margin-top: 10upx
	}
	.mark-time{
		color: #A8A8A8;
	}
</style>
