(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{1771:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=o(e("66fd"));function o(t){return t&&t.__esModule?t:{default:t}}var r={onLaunch:function(){this.init()},methods:{init:function(){t.getSystemInfo({success:function(t){u.default.prototype.StatusBar=t.statusBarHeight,"android"==t.platform?u.default.prototype.CustomBar=t.statusBarHeight+50:u.default.prototype.CustomBar=t.statusBarHeight+45}}),this.$api.initUpgrade(),this.$api.initSystem(),this.$api.initUser()}},onShow:function(){},onHide:function(){}};n.default=r}).call(this,e("6e42")["default"])},"303f":function(t,n,e){"use strict";e.r(n);var u=e("4723");for(var o in u)"default"!==o&&function(t){e.d(n,t,function(){return u[t]})}(o);e("495d");var r,a,i=e("2877"),f=Object(i["a"])(u["default"],r,a,!1,null,null,null);n["default"]=f.exports},3588:function(t,n,e){"use strict";(function(t){e("ae7a"),e("921b");var n=r(e("66fd")),u=r(e("303f")),o=r(e("0084"));function r(t){return t&&t.__esModule?t:{default:t}}function a(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{},u=Object.keys(e);"function"===typeof Object.getOwnPropertySymbols&&(u=u.concat(Object.getOwnPropertySymbols(e).filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),u.forEach(function(n){i(t,n,e[n])})}return t}function i(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}var f=function(){return e.e("pages/components/z-custom").then(e.bind(null,"532c"))};n.default.component("z-custom",f),n.default.config.productionTip=!1,n.default.prototype.$api=o.default,u.default.mpType="app";var c=new n.default(a({},u.default));t(c).$mount()}).call(this,e("6e42")["createApp"])},4723:function(t,n,e){"use strict";e.r(n);var u=e("1771"),o=e.n(u);for(var r in u)"default"!==r&&function(t){e.d(n,t,function(){return u[t]})}(r);n["default"]=o.a},"495d":function(t,n,e){"use strict";var u=e("d0f2"),o=e.n(u);o.a},d0f2:function(t,n,e){}},[["3588","common/runtime","common/vendor"]]]);