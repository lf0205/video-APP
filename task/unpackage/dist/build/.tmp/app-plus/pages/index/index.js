(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"218b":function(t,n,e){"use strict";e.r(n);var r=e("6f34"),i=e("6c5f");for(var o in i)"default"!==o&&function(t){e.d(n,t,function(){return i[t]})}(o);e("d1dd");var a=e("2877"),u=Object(a["a"])(i["default"],r["a"],r["b"],!1,null,"2411457f",null);n["default"]=u.exports},"649f":function(t,n,e){"use strict";(function(t){e("ae7a"),e("921b");r(e("66fd"));var n=r(e("218b"));function r(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("6e42")["createPage"])},"6c5f":function(t,n,e){"use strict";e.r(n);var r=e("ffa3"),i=e.n(r);for(var o in r)"default"!==o&&function(t){e.d(n,t,function(){return r[t]})}(o);n["default"]=i.a},"6f34":function(t,n,e){"use strict";var r=function(){var t=this,n=t.$createElement;t._self._c},i=[];e.d(n,"a",function(){return r}),e.d(n,"b",function(){return i})},d1dd:function(t,n,e){"use strict";var r=e("e6f5"),i=e.n(r);i.a},e6f5:function(t,n,e){},ffa3:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=i(e("a34a"));function i(t){return t&&t.__esModule?t:{default:t}}function o(t,n,e,r,i,o,a){try{var u=t[o](a),c=u.value}catch(s){return void e(s)}u.done?n(c):Promise.resolve(c).then(r,i)}function a(t){return function(){var n=this,e=arguments;return new Promise(function(r,i){var a=t.apply(n,e);function u(t){o(a,r,i,u,c,"next",t)}function c(t){o(a,r,i,u,c,"throw",t)}u(void 0)})}}var u=function(){return Promise.all([e.e("common/vendor"),e.e("pages/components/z-lists")]).then(e.bind(null,"7a50"))},c={components:{"z-lists":u},data:function(){return{searchText:"",StatusBar:this.StatusBar,CustomBar:this.CustomBar,cardCur:0,towerStart:0,titleNViewBackground:"",bg_color:"",swiperList:[],direction:"",homeMenuList:[],modalName:null}},computed:{barStyle:function(){var t=this.StatusBar,n=this.titleNViewBackground;return"position:fixed;height:".concat(t,"px;z-index:999;left: 0;top: 0;width: 100%;background-color: ").concat(n,";color: #333333;")},topStyle:function(){var t=this.StatusBar,n=this.titleNViewBackground||this.bg_color;return"padding-top:".concat(t,"px;background-color:").concat(n)}},created:function(){this.homeMenuList=this.$api.getConfig("home",this.$api.SYSTEM_CONFIG),this.loadData(),this.getSwiperList()},methods:{getSwiperList:function(){var t=this;this.$api.post("advert/slider",{cate_name:"home-top-banner"},function(n){t.swiperList=n.data,n.data.length>0&&(t.bg_color=t.swiperList[t.cardCur].bg_color)})},loadData:function(){var t=a(r.default.mark(function t(){return r.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:this.titleNViewBackground=this.bg_color;case 1:case"end":return t.stop()}},t,this)}));function n(){return t.apply(this,arguments)}return n}(),cardSwiper:function(t){this.cardCur=t.detail.current,this.titleNViewBackground=this.swiperList[this.cardCur].bg_color},goUrl:function(n){t.navigateTo({url:n.url})},refresh:function(){return this.$refs.scroll.refresh()},scroll:function(){return this.$refs.scroll.next()}}};n.default=c}).call(this,e("6e42")["default"])}},[["649f","common/runtime","common/vendor"]]]);