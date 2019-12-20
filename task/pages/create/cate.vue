<template>
	<view class="cate" :style="topStyle">
		<view class="cu-list grid col-3 no-border">
			<view class="cu-item" v-for="(c, k) in cates" :key="k" @tap="create(c.id)">
				<view class="text-center">
					<image :src="c.image" mode="aspectFill" class="cate-logo"></image>
				</view>
				<text>{{c.title}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
                cates: [],
			}
		},
		created() {
			const config = this.$api.getConfig('', this.$api.SYSTEM_CONFIG);
			console.log("数据包",config);
            this.cates = config.cate_list || []
			this.cates.shift()
        },
        computed: {
            topStyle() {
                var StatusBar = this.StatusBar;
				console.log(this.StatusBar);
                return `padding-top:${StatusBar}px;`;
            },
        },
		methods: {
			create(id){
                uni.navigateTo({
                    url: '/pages/create/create?id='+id
                })
			}
		}
	}
</script>

<style scoped lang="scss">
	.cu-list.grid{
		background-color: #f1f1f1;
	}
	.cate-logo{
		width: 100upx;
		height: 100upx;
		display: inline-table;
	}
</style>
