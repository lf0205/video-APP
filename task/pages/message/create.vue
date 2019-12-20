<template>
	<view>
		<z-custom :isBack='true'>
			<view slot='backText'>发布公告</view>
		</z-custom>

		<view>
			<view class="cu-form-group">
				<input placeholder="请输入标题" name="input" v-model="title"></input>
			</view>
			<view class="cu-form-group form-content">
				<textarea :maxlength="contentLimit" style='min-height: 300upx;padding: 20upx;' auto-height v-model="content" placeholder="请输入内容 最多600字"></textarea>
				<text class="remaining">剩余{{leftLen}}字</text>
			</view>
			<view class="cu-bar bg-white margin-top-sm">
				<view class="action">素材上传</view>
				<view class="action">{{imgList.length}}/{{imgLimit}}</view>
			</view>
			<view class="cu-form-group">
				<view class="grid grid-square flex-sub" :class="['col-' + imgLimit]">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" :data-url="imgList[index]">
						<image :src="item" mode="aspectFit"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="chooseImage" v-if="imgList.length < imgLimit">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			<view class="padding flex flex-direction margin-top-xl">
				<button class="cu-btn bg-grey lg no-b-r shadow" @tap="submitForm">提交</button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: '',
			content: '',
			contentLen: 0,
            contentLimit: 600,
			imgLimit: 3,
			imgList: [],
			name : '',
		}
	},
	computed:{
	    leftLen(){
	        return this.contentLimit - this.contentLen
		}
	},
	onLoad(o){
	    this.name = o.name
	},
    watch: {
        content(val) {
            this.content = val;
            this.contentLen = this.content.length;
        },
    },
	methods: {
        submitForm(){
			if(!this.title){
			    this.$api.msg('请输入标题')
				return
			}
			if (this.contentLen < 10 || this.contentLen > this.contentLimit) {
                this.$api.msg('内容长度为10-' + (this.contentLimit) + '字符')
                return
			}
			this.$api.post('message/deliver' , {
			    name	: this.name,
			    title	: this.title,
				content	: this.content,
                imgList	: this.imgList,
			} , (res => {
			    if(res.code == 0){
                    this.$api.modal('发布成功', '', ()=>{uni.navigateBack()})
				}
			}))
		},
        chooseImage() {
            this.$api.uploadImage((path)=>{
                this.imgList = this.imgList.concat(path)
            }, this.imgLimit)
        },
        DelImg(e){
			var index = e.target.dataset.index
			var that  = this
			var images= that.imgList
			images.splice(index , 1)
			that.imgList = images
		}
	}
}
</script>

<style scoped lang="scss">
	.form-content{
		position: relative;
		.remaining{
			color: #1CBBB4;
			position: absolute;
			right: 10upx;
			bottom: 10upx;
		}
	}
</style>
