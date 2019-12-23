<template>
    <swiper v-if="cateSwipe.length" class="screen-swiper" :autoplay="true" :interval="5000" :duration="300" :circular="true">
        <swiper-item v-for="(item,index) in cateSwipe" :key="index">
            <image :src="item.image" mode="aspectFill"></image>
        </swiper-item>
    </swiper>
</template>

<script>
    export default {
        props: {
            cate_name: {
                type: [String],
                default: null
            },
        },
        data() {
            return {
                cateSwipe: [],
            }
        },
        created() {
            this.loadData()
        },
        methods: {
            async loadData() {
                return this.$api.post('advert/slider' , {
                    cate_name : this.cate_name
                } , (res=>{
                    this.cateSwipe = res.data
					// console.log(res.data)
                }))
            },
        }
    }
</script>

<style scoped>
    .card-swiper uni-swiper-item{
        width: 100% !important;
        left: 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0;
        overflow: initial;
    }
</style>
