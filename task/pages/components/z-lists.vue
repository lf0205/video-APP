<template>
    <view>
        <view class="cu-card dynamic lists">
            <view class="cu-item shadow" v-for="(item,index) in lists" :key="index">
				<!-- 首页推荐列表 -->
                <navigator :url="'/pages/detail/detail?id=' + item.id " hover-class="none">
                    <view class="cu-list menu-avatar">
                        <view class="cu-item">
                            <view class="cu-avatar radius lg" :style="'background-image:url('+item.cate.image+');'"></view>
                            <view class="content flex-sub">
                                <view class='text-bold text-xl text-cut'>{{item.title}}</view>
                                <view v-if="item.status == 7" class='text-bold text-red text-cut'>被关闭</view>
                                <view class="text-gray text-sm flex justify-between">
                                    <view class="padding-xs tags">
                                        <view class='cu-tag bg-gradual-red cuIcon-hotfill' v-if="item.hot == 1"></view>
                                        <view class='cu-tag bg-gradual-green cuIcon-timefill' v-if="item.browse == 1"></view>
                                        <view class='cu-tag bg-gradual-blue cuIcon-noticefill' v-if="item.stock < 6"></view>
                                        <view class='cu-tag bg-green cuIcon-refresh' v-if="item.repeat > 1"></view>
                                    </view>
                                </view>
                            </view>
                            <view v-if="item.applied" class='cu-tag line-cyan applyed'>已申请</view>
                        </view>
                        <view class="text-content margin-top-sm padding-lr">
                            <view>任务收益：
                                <text class="text-red text-bold">{{item.income}} 元</text>
                            </view>
                            <view>剩余名额：
                                <text class="text-red text-bold">{{item.stock}}</text>
                            </view>
                            <view>发布时间：
                                <text class="text-grey">{{item.create_time}}</text>
                            </view>
                        </view>
                        <view class="cu-list menu ">
                            <view class="cu-item">
                                <view class="content">
                                    <image :src="item.user.avatar" class="radius" mode="aspectFit"></image>
                                    <text class="text-grey text-sm">{{item.user.username}}</text>
                                </view>
                            </view>
                        </view>
                    </view>
                </navigator>
            </view>
        </view>
		<!-- 首页推荐列表底部 -->
        <view class="padding dynamic">
            <view class="cu-load load-cuIcon loading" v-if="loading"></view>
            <view class="text-center load" v-if="!loading && isFinish">没有啦~</view>
        </view>
    </view>
</template>

<script>
    export default {
        name: 'z-lists',
        props: {
            user_id: {
                type: [Number, String],
                default: null
            },
            cate_id: {
                type: [Number, String],
                default: null
            },
            hot: {
                type: Boolean,
                default: null
            },
            status: {
                type: [Number, String],
                default: null
            },
            more: { // 自动加载更多
                type: Boolean,
                default: true
            },
        },
        data() {
            return {
                page: 1,
                rowNum: 15,
                loading: true,//加载
                isFinish: false,//是否完成
                lists: [],
            }
        },
        created() {
			// 保存获取系统信息同步接口
            const sinfo = uni.getSystemInfoSync();
			// console.log("获取对应手机的型号信息",sinfo);
			// 保存可使用的窗口高度
            this.wh = sinfo.windowHeight
            this.loadData()
			// console.log("Promise",this.loadData());
        },
        methods: {
			// 刷新操作
            refresh() {
                this.loading = true
                this.page = 1
                this.isFinish = false
				console.log("刷新后执行",this.loadData('', true));
                return this.loadData('', true)
            },
			// 新发布
            next() {
                if (!this.isFinish && !this.loading) {
                    this.loading = true
                    this.page += 1
					console.log(this.loadData())
                    return this.loadData()
                }
            },
            async loadData(keyword = '', refresh = false) {
                var where = {}
                if (keyword) { // 关键字搜索
                    this.page = 1
                    this.loading = true
                    this.isFinish = false
                    this.lists = []
                    where.keyword = keyword
                }

                if (this.cate_id !== null) {
                    where.cate_id = this.cate_id
                }

                if (this.user_id !== null) {
                    where.user_id = this.user_id
                }

                if (this.status !== null) {
                    where.status = this.status
                }

                if (typeof this.hot === "boolean") {
                    where.hot = this.hot ? 1 : 0
                }

                return this.$api.post('lists/index', {where: where, page: this.page, row_num: this.rowNum}, res => {
					console.log("更新获取的数据",res);
					// 判断成功后
                    if (res.code == 0) {
						// 判断数据长度小于默认长度，设置完成
                        if (res.data.length < this.rowNum) {
                            this.isFinish = true
                        }
						// 判断刷新成功，把数据设为空
                        if (refresh) {
                            this.lists = []
                        }
						// 解构赋值保存数据
                        this.lists = [...this.lists, ...res.data]
                    }
					
                    this.loading = false
                })
            },
        }
    }
</script>

<style scoped lang="scss">
    .cu-item {
        .tags {
            .cu-tag {
                padding: 20upx;
            }
        }
        .applyed {
            font-size: 20upx;
            transform: rotate(-45deg);
        }
    }

    .load {
        line-height: 3em;
    }
</style>
