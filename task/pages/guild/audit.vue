<template>
    <view>
        <z-custom :isBack='true'>
            <view slot='backText'>审核</view>
        </z-custom>
        <view class="cu-list menu-avatar">
            <view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in users"
                  :key="index"
                  @touchstart="ListTouchStart" @touchmove.stop="ListTouchMove" @touchend="ListTouchEnd"
                  :data-target="'move-box-' + index">
                <view class="cu-avatar round lg" :style="[{backgroundImage:'url('+ item.user.avatar +')'}]"></view>
                <view class="content">
                    <view class="text-grey">{{item.user.username}}</view>
                    <view class="text-gray text-sm">{{item.create_time}}</view>
                </view>
                <view class="move">
                    <view class="bg-grey" @tap.stop="pass(item.user_id, index)">通过</view>
                    <view class="bg-red" @tap.stop="refuse(item.user_id, index)">拒绝</view>
                </view>
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
        data() {
            return {
                page: 1,
                rowNum: 15,
                loading: true,
                isFinish: false,
                waitLen: 0,
                more: false,
                users: [],
                modalName: null,
                listTouchStart: 0,
                listTouchDirection: null,
            }
        },
        created() {
            this.getWaitList()
        },
        methods: {
            async getWaitList() {
                return this.$api.post('guild/wait', {page: this.page, rowNum: this.rowNum}, (res => {
                    if (res.code == 0) {
                        if (res.data && res.data.data.length < this.rowNum) {
                            this.isFinish = true
                        }
                        this.users = [...this.users, ...res.data.data]
                        this.waitLen = res.data.count
                        if (this.waitLen > 0) {
                            this.$emit("waitReview", this.waitLen)
                        }
                    }
                    this.loading = false
                }))
            },
            refresh(){
                this.loading = true
                this.page = 1
                this.users = []
                this.isFinish = false
                return this.getWaitList()
            },
            scroll() {
                if (!this.isFinish && !this.loading) {
                    this.loading = true
                    this.page += 1
                    return this.getWaitList()
                }
            },
            // ListTouch触摸开始
            ListTouchStart(e) {
                this.listTouchStart = e.touches[0].pageX
            },
            // ListTouch计算方向
            ListTouchMove(e) {
                this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 10 ? 'right' : 'left'
            },
            // ListTouch计算滚动
            ListTouchEnd(e) {
                if (this.listTouchDirection == 'left') {
                    this.modalName = e.currentTarget.dataset.target
                } else {
                    this.modalName = null
                }
                this.listTouchDirection = null
            },
            pass(uid, index) {
                return this.review(1, uid, index)
            },
            refuse(uid, index) {
                return this.review(0, uid, index)
            },
            review(status, uid, index) {
                return this.$api.post('guild/review', {status: status, user_id: uid}, (res => {
                    if (res.code == 0) {
                        this.$api.msg('成功')
                        this.waitLen--
                        this.$emit("waitReview", this.waitLen)
                        this.$emit('beforeUser', this.users[index])
                        this.users.splice(index)
                    }
                }))
            }
        }
    }
</script>

<style scoped lang="scss">
    .cu-list > .cu-item {
        transition: all .1s ease-in-out 0s;
    }
</style>
