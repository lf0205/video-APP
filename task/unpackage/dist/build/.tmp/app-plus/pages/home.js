(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/home"],{"03e4":function(t,e,n){"use strict";var i=n("c635"),r=n.n(i);r.a},"218b":function(t,e,n){"use strict";n.r(e);var i=n("6f34"),r=n("6c5f");for(var u in r)"default"!==u&&function(t){n.d(e,t,function(){return r[t]})}(u);n("d1dd");var a=n("2877"),o=Object(a["a"])(r["default"],i["a"],i["b"],!1,null,"2411457f",null);e["default"]=o.exports},"2b6d":function(t,e,n){"use strict";var i=n("3982"),r=n.n(i);r.a},3982:function(t,e,n){},4337:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement;t._self._c},r=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return r})},"46e5":function(t,e,n){},4902:function(t,e,n){"use strict";var i=n("46e5"),r=n.n(i);r.a},5211:function(t,e,n){"use strict";var i=n("5359"),r=n.n(i);r.a},5359:function(t,e,n){},"54fc":function(t,e,n){"use strict";n.r(e);var i=n("cc07"),r=n.n(i);for(var u in i)"default"!==u&&function(t){n.d(e,t,function(){return i[t]})}(u);e["default"]=r.a},6063:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement;t._self._c},r=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return r})},"6c5f":function(t,e,n){"use strict";n.r(e);var i=n("ffa3"),r=n.n(i);for(var u in i)"default"!==u&&function(t){n.d(e,t,function(){return i[t]})}(u);e["default"]=r.a},"6f34":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement;t._self._c},r=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return r})},7434:function(t,e,n){"use strict";n.r(e);var i=n("4337"),r=n("b663");for(var u in r)"default"!==u&&function(t){n.d(e,t,function(){return r[t]})}(u);n("4902");var a=n("2877"),o=Object(a["a"])(r["default"],i["a"],i["b"],!1,null,"24c47e11",null);e["default"]=o.exports},"78cf":function(t,e,n){"use strict";n.r(e);var i=n("d622"),r=n.n(i);for(var u in i)"default"!==u&&function(t){n.d(e,t,function(){return i[t]})}(u);e["default"]=r.a},8900:function(t,e,n){"use strict";n.r(e);var i=n("6063"),r=n("78cf");for(var u in r)"default"!==u&&function(t){n.d(e,t,function(){return r[t]})}(u);n("5211");var a=n("2877"),o=Object(a["a"])(r["default"],i["a"],i["b"],!1,null,"587e8f89",null);e["default"]=o.exports},"8f90":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{cates:[]}},created:function(){var t=this.$api.getConfig("",this.$api.SYSTEM_CONFIG);this.cates=t.cate_list||[],this.cates.shift()},computed:{topStyle:function(){var t=this.StatusBar;return"padding-top:".concat(t,"px;")}},methods:{create:function(e){t.navigateTo({url:"/pages/create/create?id="+e})}}};e.default=n}).call(this,n("6e42")["default"])},"9abd":function(t,e,n){"use strict";n.r(e);var i=n("aafe"),r=n("f421");for(var u in r)"default"!==u&&function(t){n.d(e,t,function(){return r[t]})}(u);n("2b6d");var a=n("2877"),o=Object(a["a"])(r["default"],i["a"],i["b"],!1,null,"6fa17b2c",null);e["default"]=o.exports},aafe:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=(t._self._c,{auto:!1,inOffsetRate:.5,outOffsetRate:.4,fps:1e4}),i={use:!1};t.$mp.data=Object.assign({},{$root:{a0:n,a1:i}})},r=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return r})},b663:function(t,e,n){"use strict";n.r(e);var i=n("8f90"),r=n.n(i);for(var u in i)"default"!==u&&function(t){n.d(e,t,function(){return i[t]})}(u);e["default"]=r.a},b830:function(t,e,n){"use strict";n.r(e);var i=n("f195"),r=n("54fc");for(var u in r)"default"!==u&&function(t){n.d(e,t,function(){return r[t]})}(u);n("03e4");var a=n("2877"),o=Object(a["a"])(r["default"],i["a"],i["b"],!1,null,"845f4938",null);e["default"]=o.exports},c635:function(t,e,n){},cc07:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{userinfo:{},level_name:"",vip_name:"",vip_apply:0,vip_issue:0,StatusBar:this.StatusBar,CustomBar:this.CustomBar}},created:function(){this.initUser()},methods:{initUser:function(){this.userinfo=this.$api.getConfig();var t=this.$api.getConfig("",this.$api.SYSTEM_CONFIG);this.vip_name=t.vip["vip_"+this.userinfo.vip].name,this.vip_apply=t.vip["vip_"+this.userinfo.vip].apply,this.vip_issue=t.vip["vip_"+this.userinfo.vip].issue,this.level_name=t.level["level_"+this.userinfo.level].name}}};e.default=i},d1dd:function(t,e,n){"use strict";var i=n("e6f5"),r=n.n(i);r.a},d622:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{guild_mark:"",isJoin:!1,createGuild:!1,info:"",name:""}},created:function(){this.initGuild()},methods:{initGuild:function(){var t=this.$api.getConfig();this.isJoin=t.guild_id>0&&0!=t.guild_user_status,this.createGuild=t.guild_auth>0,this.guild_mark=this.$api.getConfig("guild_home_mark",this.$api.SYSTEM_CONFIG)},goPage:function(e){t.navigateTo({url:e})}}};e.default=n}).call(this,n("6e42")["default"])},d9d7:function(t,e,n){"use strict";(function(t){n("ae7a"),n("921b");i(n("66fd"));var e=i(n("9abd"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},e6f5:function(t,e,n){},f195:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement;t._self._c},r=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return r})},f421:function(t,e,n){"use strict";n.r(e);var i=n("fe7e"),r=n.n(i);for(var u in i)"default"!==u&&function(t){n.d(e,t,function(){return i[t]})}(u);e["default"]=r.a},fe7e:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=c(n("a34a")),r=c(n("218b")),u=c(n("7434")),a=c(n("8900")),o=c(n("b830"));function c(t){return t&&t.__esModule?t:{default:t}}function s(t,e,n,i,r,u,a){try{var o=t[u](a),c=o.value}catch(s){return void n(s)}o.done?e(c):Promise.resolve(c).then(i,r)}function f(t){return function(){var e=this,n=arguments;return new Promise(function(i,r){var u=t.apply(e,n);function a(t){s(u,i,r,a,o,"next",t)}function o(t){s(u,i,r,a,o,"throw",t)}a(void 0)})}}var l=function(){return n.e("pages/lists/lists").then(n.bind(null,"59aa"))},d=function(){return Promise.all([n.e("common/vendor"),n.e("pages/components/mescroll-uni/mescroll-uni")]).then(n.bind(null,"843a"))},h={data:function(){return{wh:0,duration:0,navs:[{name:"index",title:"首页",icon:"cuIcon-home",iconfill:"cuIcon-homefill"},{name:"lists",title:"大厅",icon:"cuIcon-tag",iconfill:"cuIcon-tagfill"},{name:"cate",title:"发布",icon:"cuIcon-add"},{name:"guild",title:"公会",icon:"cuIcon-group",iconfill:"cuIcon-group_fill"},{name:"user",title:"我的",icon:"cuIcon-my",iconfill:"cuIcon-myfill"}],more:!1,pageCur:"index"}},onShow:function(){this.$refs.userPage&&(this.$refs.userPage.initUser(),this.$refs.guildPage.initGuild())},methods:{downCallback:function(){var t=f(i.default.mark(function t(){var e,n=this,r=arguments;return i.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e=r.length>0&&void 0!==r[0]?r[0]:null,t.next=3,function(){switch(n.pageCur){case"index":return n.$refs.scroll.refresh();case"lists":return n.$refs.listsPage.refresh();case"cate":break;case"guild":return n.$api.initUser(function(){return n.$refs.guildPage.initGuild()});case"user":return n.$api.initUser(function(){n.$refs.userPage.initUser()})}}();case 3:e&&(this.$api.msg("更新完成"),setTimeout(function(){e.endSuccess()},500));case 4:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),TouchStart:function(){this.duration=200},TouchEnd:function(){var t=this;setTimeout(function(){t.duration=0},200)},getIndex:function(t){for(var e=this.navs,n=0;n<e.length;n++)if(e[n].name==t)return n;return 0},navChange:function(t){if("cate"===t.currentTarget.dataset.cur&&!this.cateList())return!1;"change"==t.type?this.pageCur=this.navs[t.detail.current].name:this.pageCur=t.currentTarget.dataset.cur},scroll:function(t){t.detail.scrollHeight-t.detail.scrollTop<this.wh+100?0==this.more&&(this.more=!0,this.$refs.scroll.scroll()):this.more=!1},cateList:function(){var e=this.$api.getConfig("verified");return 1==e||(this.$api.modal("请先完成实名认证才能发布任务","",function(e){e.confirm&&t.navigateTo({url:"/pages/user/edit_access"})}),!1)}},created:function(){var e=t.getSystemInfoSync();this.wh=e.windowHeight},computed:{currentPage:function(){return this.getIndex(this.pageCur)}},watch:{pageCur:function(e,n){var i="#ffffff";"lists"!==e&&"cate"!==e||(i="#000000"),t.setNavigationBarColor({backgroundColor:i,frontColor:i})}},components:{index:r.default,cate:u.default,lists:l,guild:a.default,user:o.default,MescrollUni:d}};e.default=h}).call(this,n("6e42")["default"])},ffa3:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=r(n("a34a"));function r(t){return t&&t.__esModule?t:{default:t}}function u(t,e,n,i,r,u,a){try{var o=t[u](a),c=o.value}catch(s){return void n(s)}o.done?e(c):Promise.resolve(c).then(i,r)}function a(t){return function(){var e=this,n=arguments;return new Promise(function(i,r){var a=t.apply(e,n);function o(t){u(a,i,r,o,c,"next",t)}function c(t){u(a,i,r,o,c,"throw",t)}o(void 0)})}}var o=function(){return Promise.all([n.e("common/vendor"),n.e("pages/components/z-lists")]).then(n.bind(null,"7a50"))},c={components:{"z-lists":o},data:function(){return{searchText:"",StatusBar:this.StatusBar,CustomBar:this.CustomBar,cardCur:0,towerStart:0,titleNViewBackground:"",bg_color:"",swiperList:[],direction:"",homeMenuList:[],modalName:null}},computed:{barStyle:function(){var t=this.StatusBar,e=this.titleNViewBackground;return"position:fixed;height:".concat(t,"px;z-index:999;left: 0;top: 0;width: 100%;background-color: ").concat(e,";color: #333333;")},topStyle:function(){var t=this.StatusBar,e=this.titleNViewBackground||this.bg_color;return"padding-top:".concat(t,"px;background-color:").concat(e)}},created:function(){this.homeMenuList=this.$api.getConfig("home",this.$api.SYSTEM_CONFIG),this.loadData(),this.getSwiperList()},methods:{getSwiperList:function(){var t=this;this.$api.post("advert/slider",{cate_name:"home-top-banner"},function(e){t.swiperList=e.data,e.data.length>0&&(t.bg_color=t.swiperList[t.cardCur].bg_color)})},loadData:function(){var t=a(i.default.mark(function t(){return i.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:this.titleNViewBackground=this.bg_color;case 1:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),cardSwiper:function(t){this.cardCur=t.detail.current,this.titleNViewBackground=this.swiperList[this.cardCur].bg_color},goUrl:function(e){t.navigateTo({url:e.url})},refresh:function(){return this.$refs.scroll.refresh()},scroll:function(){return this.$refs.scroll.next()}}};e.default=c}).call(this,n("6e42")["default"])}},[["d9d7","common/runtime","common/vendor"]]]);