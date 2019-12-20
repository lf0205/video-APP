import Vue from 'vue'
import App from './App'
// 引入封装的common组件
import api from './common/common'

// 顶部导航
import cuCustom from './pages/components/z-custom.vue'
Vue.component('z-custom',cuCustom)

Vue.config.productionTip = false
// 讲封装的common组件绑定到Vue原型链上就可以通过this.$api.变量名 进行操作
Vue.prototype.$api = api

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
