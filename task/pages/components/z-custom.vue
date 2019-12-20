<template>
	<view>
		<view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
			<view class="cu-bar" :style="style" :class="[ bgImage != '' ? 'none-bg text-white bg-img':'', fixed ? 'fixed' : '', bgColor ]">
				<view class="action" @tap="BackPage">
					<text class="cuIcon-back_android text-bold" v-if="isBack"></text>
					<view class="top-bar-back">
						<slot name="backText"></slot>
					</view>
				</view>
				<view class="content" :style="[{top:StatusBar + 'px'}]">
					<slot name="content"></slot>
				</view>
				<view class="margin-right-sm text-dark">
					<slot name="right"></slot>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar
			};
		},
		name: 'z-custom',
		computed: {
			style() {
				var StatusBar= this.StatusBar;
				var CustomBar= this.CustomBar;
				var bgImage = this.bgImage;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				if (this.bgImage) {
					style = `${style}background-image:url(${bgImage});`;
				}
				return style
			}
		},
		props: {
			bgColor: {
				type: String,
				default: 'bg-white'
			},
			isBack: {
				type: [Boolean, String],
				default: true
			},
			bgImage: {
				type: String,
				default: ''
			},
			fixed: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			BackPage() {
			    if (!this.isBack) {
			        return false;
				}
				// getCerrentPages获取当前页面栈
				if (getCurrentPages().length < 2 && 'undefined' !== typeof __wxConfig) {
					let url = '/' + __wxConfig.pages[0]
					return uni.redirectTo({url})
				}
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style>

</style>
