(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/privacy"],{"2ecd":function(e,t,n){"use strict";(function(e){n("ae7a"),n("921b");i(n("66fd"));var t=i(n("aa754"));function i(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])},"463d":function(e,t,n){"use strict";n.r(t);var i=n("e4e6"),a=n.n(i);for(var o in i)"default"!==o&&function(e){n.d(t,e,function(){return i[e]})}(o);t["default"]=a.a},aa754:function(e,t,n){"use strict";n.r(t);var i=n("c767"),a=n("463d");for(var o in a)"default"!==o&&function(e){n.d(t,e,function(){return a[e]})}(o);var u=n("2877"),c=Object(u["a"])(a["default"],i["a"],i["b"],!1,null,"3b579469",null);t["default"]=c.exports},c767:function(e,t,n){"use strict";var i=function(){var e=this,t=e.$createElement;e._self._c},a=[];n.d(t,"a",function(){return i}),n.d(t,"b",function(){return a})},e4e6:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i={name:"privacy",data:function(){return{tel:!0,wechat:!0}},created:function(){this.getPrivacy()},methods:{getPrivacy:function(){var e=this.$api.getConfig();this.tel=1==e.open_phone,this.wechat=1==e.open_weixin},tels:function(e){var t=this;this.tel=!this.tel;var n=this.tel?1:2;this.$api.post("user/edit",{name:"open_phone",value:n},function(e){0==e.code&&(t.$api.setConfig("open_phone",n),t.$api.msg("修改成功"))})},weixin:function(e){var t=this;this.wechat=!this.wechat;var n=this.wechat?1:2;this.$api.post("user/edit",{name:"open_weixin",value:n},function(e){0==e.code&&(t.$api.setConfig("open_weixin",n),t.$api.msg("修改成功"))})}}};t.default=i}},[["2ecd","common/runtime","common/vendor"]]]);