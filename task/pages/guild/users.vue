<template>
	<view>
		<z-custom :isBack='true'>
			<view slot='backText'>会员</view>
		</z-custom>

		<view class="cu-list menu-avatar">
			<view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in users" :key="index"
				  @touchstart="ListTouchStart" @touchmove.stop="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index" :data-role="item.role">
				<view class="cu-avatar round lg" :style="[{backgroundImage:'url('+ item.user.avatar +')'}]"></view>
				<view class="content">
					<view class="text-grey">{{item.user.username}}</view>
					<view class="text-gray text-sm">{{item.create_time}}</view>
				</view>
				<view class="padding">
					<view class='cu-tag bg-gradual-green radius sm' v-if="item.role == 9">会长</view>
					<view class='cu-tag bg-grey radius sm' v-if="item.role == 5">管理员</view>
				</view>
				<view class="move">
					<view class="bg-grey" v-if="role == 9" @tap.stop="manage(item, index)">{{item.role == 1 ? '设置管理' : '取消管理'}}</view>
					<view class="bg-red" @tap.stop="kick(item.user_id, index)">踢出</view>
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
			users: [],
			modalName: null,
			listTouchStart: 0,
			listTouchDirection: null,
			page: 1,
            rowNum: 15,
            loading: true,
            isFinish: false,
            role: 1,
		}
	},
	created() {
	    this.role = this.$api.getConfig('guild_user_role')
		this.getUsersList()
	},
	methods: {
		async getUsersList(){
            return this.$api.post('guild/users' , {page: this.page , rowNum: this.rowNum}, ( res => {
                if(res.code == 0){
                    if (!res.data || res.data.length < this.rowNum) {
                        this.isFinish = true
                    }
                    this.users = [...this.users, ...res.data]
                }
                this.loading = false

			} ))
		},
        refresh(){
            this.loading = true
            this.page = 1
            this.users = []
            this.isFinish = false
            return this.getUsersList()
        },
        scroll(){
            if (!this.isFinish && !this.loading) {
                this.loading = true
                this.page += 1
                return this.getUsersList()
            }
        },
		// ListTouch触摸开始
		ListTouchStart(e) {
			if(this.role > 1 && (e.currentTarget.dataset.role == 1 || (this.role == 9 && e.currentTarget.dataset.role == 5))) {
                this.listTouchStart = e.touches[0].pageX
			}
		},
		// ListTouch计算方向
		ListTouchMove(e) {
			if(this.role > 1 && (e.currentTarget.dataset.role == 1  || (this.role == 9 && e.currentTarget.dataset.role == 5))) {
                this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			}
		},
		// ListTouch计算滚动
		ListTouchEnd(e) {
			if(this.role > 1 && (e.currentTarget.dataset.role == 1 || (this.role == 9 && e.currentTarget.dataset.role == 5))) {
                if (this.listTouchDirection == 'left') {
                    this.modalName = e.currentTarget.dataset.target
                } else {
                    this.modalName = null
                }
                this.listTouchDirection = null
			}
		},
        beforeUser(user){
            this.users = [...this.users, user]
		},
        manage(item, index) {
            this.$api.post('guild/manage', {user_id: item.user_id}, (res => {
                if (res.code == 0) {
                    this.users[index].role = item.role == 1 ? 5 : 1
                    this.$api.msg('设置成功')
                }
            }))
        },
        kick(uid, index) {
            this.$api.post('guild/kick', {user_id: uid}, (res => {
                if (res.code == 0) {
                    this.$api.msg('踢出公会成功')
                    this.waitLen--
                    this.users.splice(index)
                }
            }))
        },
	}
}
</script>

<style scoped lang="scss">
	.cu-list>.cu-item {
		transition: all .1s ease-in-out 0s;
	}
</style>
