(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/h5/browse"],{"03f6":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{backState:!0,interval:null,title:"",time:60,page:""}},onLoad:function(e){var n=this;this.page=decodeURIComponent(e.p),this.title=e.t?e.t:this.page,this.time=e.s;var i=this.$mp.page.$getAppWebview();setTimeout(function(){var e=i.children()[0],a=n.CustomBar,o=t.getSystemInfoSync(),r=o.windowHeight-a;e.setStyle({top:n.CustomBar,height:r})},500)},onShow:function(){this.start()},onHide:function(){this.end()},onBackPress:function(t){var e=this;return this.end(),this.backState&&this.$api.modal("你的任务还没有完成，关闭页面将不能获取到收益，确认关闭？","",function(t){t.confirm?e.closeAll():t.cancel&&e.start()}),this.backState},mounted:function(){this.start()},methods:{start:function(){var t=this;null===this.interval&&(this.interval=setInterval(function(){t.time<=0&&(t.end(),t.done()),t.time--},1e3))},end:function(){null!==this.interval&&(clearInterval(this.interval),this.interval=null)},done:function(){if(this.time<1){var t=getCurrentPages(),e=t[t.length-2];e.$vm.done(),this.closeAll()}},closeAll:function(){this.backState=!1;var e=getCurrentPages(),n=e[e.length-1],i=n.$getAppWebview(),a=i.children();0===a.length?t.navigateBack():(a[0].close(),setTimeout(function(){t.navigateBack()},80))}}};e.default=n}).call(this,n("6e42")["default"])},"44fe":function(t,e,n){"use strict";(function(t){n("ae7a"),n("921b");i(n("66fd"));var e=i(n("e8ee"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"7bb0":function(t,e,n){"use strict";n.r(e);var i=n("03f6"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);e["default"]=a.a},"934c":function(t,e,n){},b61a:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=(t._self._c,{progress:!1});t.$mp.data=Object.assign({},{$root:{a0:n}})},a=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return a})},e49d:function(t,e,n){"use strict";var i=n("934c"),a=n.n(i);a.a},e8ee:function(t,e,n){"use strict";n.r(e);var i=n("b61a"),a=n("7bb0");for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);n("e49d");var r=n("2877"),s=Object(r["a"])(a["default"],i["a"],i["b"],!1,null,"2005757a",null);e["default"]=s.exports}},[["44fe","common/runtime","common/vendor"]]]);