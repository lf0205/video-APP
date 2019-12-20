<template>
	<view class="children">
		<z-custom :isBack='true'>
			<view slot='backText'>推荐记录</view>
		</z-custom>

		<view class="cu-list menu-avatar">
			<view class="cu-item" v-for="(item,index) in users" :key="index">
				<view class="cu-avatar round lg" :style="[{backgroundImage:'url('+ item.avatar +')'}]"></view>
				<view class="content">
					<view class="text-grey">{{item.username}}</view>
					<view class="text-gray text-sm">{{item.create_time}}</view>
				</view>
			</view>
		</view>
		<view class="padding">
			<view class="cu-load load-cuIcon loading" v-if="loading"></view>
			<view class="text-center load" v-if="!loading && !isFinish" @tap="scroll">点击加载更多</view>
			<view class="text-center load" v-if="!loading && isFinish">没有啦~</view>
		</view>
	</view>
</template>

<script>
    export default {
        data() {
            return {
                users: [],
                page: 1,
                rowNum: 15,
                loading: true,
                isFinish: false,
				wh: 0,
            }
        },
        created() {
            var sInfo = uni.getSystemInfoSync()
            this.wh = sInfo.windowHeight
            this.getUsersList()
        },
        onPageScroll(detail){
            if (!this.isFinish && !this.loading) {
                var view = uni.createSelectorQuery().select(".children");
                view.boundingClientRect(data => {
                    if (data.height <= (detail.scrollTop + this.wh + 100)) {
                        this.scroll();
                    }
                }).exec();
            }
		},
        methods: {
            async getUsersList(){
                this.$api.post('user/children' , {page: this.page , rowNum: this.rowNum}, ( res => {
                    if(res.code == 0){
                        if (!res.data || res.data.length < this.rowNum) {
                            this.isFinish = true
                        }
                        this.users = [...this.users, ...res.data]
                    }
                    this.loading = false

                } ))
            },
            scroll(){
				this.loading = true
				this.page += 1
				this.getUsersList()
            },
        }
    }
</script>

<style scoped lang="scss">
	.cu-list>.cu-item {
		transition: all .1s ease-in-out 0s;
	}
</style>
