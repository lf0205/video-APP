(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/components/z-custom"],{"252b":function(t,e,a){"use strict";a.r(e);var n=a("ea38"),u=a.n(n);for(var r in n)"default"!==r&&function(t){a.d(e,t,function(){return n[t]})}(r);e["default"]=u.a},"29f3":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c},u=[];a.d(e,"a",function(){return n}),a.d(e,"b",function(){return u})},"532c":function(t,e,a){"use strict";a.r(e);var n=a("29f3"),u=a("252b");for(var r in u)"default"!==r&&function(t){a.d(e,t,function(){return u[t]})}(r);var o=a("2877"),i=Object(o["a"])(u["default"],n["a"],n["b"],!1,null,null,null);e["default"]=i.exports},ea38:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{StatusBar:this.StatusBar,CustomBar:this.CustomBar}},name:"z-custom",computed:{style:function(){var t=this.StatusBar,e=this.CustomBar,a=this.bgImage,n="height:".concat(e,"px;padding-top:").concat(t,"px;");return this.bgImage&&(n="".concat(n,"background-image:url(").concat(a,");")),n}},props:{bgColor:{type:String,default:"bg-white"},isBack:{type:[Boolean,String],default:!0},bgImage:{type:String,default:""},fixed:{type:Boolean,default:!0}},methods:{BackPage:function(){if(!this.isBack)return!1;if(getCurrentPages().length<2&&"undefined"!==typeof __wxConfig){var e="/"+__wxConfig.pages[0];return t.redirectTo({url:e})}t.navigateBack({delta:1})}}};e.default=a}).call(this,a("6e42")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/components/z-custom-create-component',
    {
        'pages/components/z-custom-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("532c"))
        })
    },
    [['pages/components/z-custom-create-component']]
]);                
