<template>
	<view>
		<z-custom :isBack='true'>
			<view slot='backText' class="text-cut" style="width: 600upx">{{article.title}}</view>
		</z-custom>
		<view>
			<view class="cu-list menu-avatar">
				<view class="cu-item">
					<image class="cu-avatar round lg" :src="article.avatar"></image>
					<view class="content">
						<view class="text-grey">{{article.publisher}}</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								{{article.create_time}}
							</view>
						</view>
					</view>
				</view>
				<view class="padding bg-white data"><rich-text :nodes="article.content"></rich-text></view>
				<view class="padding bg-white data">
					<image :src="item" v-for="(item,index) in article.path" :key="index"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {

    onLoad : function(ops){
        this.getDetails(ops.id)
    },

	data() {
		return {
			article : {
				title: '详细'
			}
		}
	},
	methods: {
        getDetails(id){
            uni.showLoading();
			this.$api.post('message/detail' , {'id' : id} , (res => {
                uni.hideLoading();
				if (res.code == 0) {
                    this.article = res.data
				}
			}), ()=>{uni.hideLoading();})
		}
	}
}
</script>

<style scoped lang="scss">
	page {
		background-color: white;
	}
</style>
