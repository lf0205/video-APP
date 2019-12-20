<template>
    <view>
        <z-custom :isBack='true'>
            <view slot='backText'>帮助中心</view>
        </z-custom>

        <message :name="name" ref="scroll"></message>
    </view>
</template>

<script>
    import message from '../components/z-message'
    export default {
        data() {
            return {
                name: 'help',
            }
        },
        components:{
            message
        },
        methods: {
            scroll(e){
                if (e.detail.scrollHeight - e.detail.scrollTop < this.pageH + 100) {
                    if (this.more == false) {
                        this.more = true
                        this.$refs['scroll'][0].next();
                    }
                }else{
                    this.more = false
                }
            }
        }
    }
</script>

<style scoped lang="scss">
</style>
