(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2077ff"],{a192:function(t,s,o){"use strict";o.r(s);var e=function(){var t=this,s=t.$createElement,o=t._self._c||s;return o("div",{staticClass:"flex flex-col"},[o("div",{staticClass:"mr-2"},[o("span",{staticClass:"capitalize"},[t._v(t._s(t.attr))]),o("div",{class:"mb-1 w-8 h-8 border-2 rounded-full "+t.color.front.replace(t.context,"bg-"),on:{click:function(s){t.palette=!t.palette,t.is_over=!1}}})]),t.palette?o("Palette",{on:{color:t.setColor,close:function(s){t.palette=!t.palette}}}):t._e()],1)},l=[],r=(o("ac1f"),o("1276"),o("159b"),o("5319"),o("deff")),n={name:"TailwindBgGradient",data:function(){return{allCss:null,palette:!1,is_over:!1,color:{front:"",over:""},color_over:""}},props:["css","attr"],computed:{colors:function(){return r["a"][this.attr]},context:function(){return this.attr+"-"}},methods:{setColor:function(t,s){var o=this.context;t?(o+=s?t+"-"+s:t,this.color.front=o):this.color.front="",this.$emit("input",this.color.front+" "),this.$emit("css",this.color.front+" "),this.palette=!1}},mounted:function(){var t=this;if(this.css&&this.css.length){this.allCss=this.css;var s=this.allCss.split(" ");s.forEach((function(s){0===s.indexOf(t.attr)&&(t.color.front=s.replace(t.attr,"bg"),t.allCss=t.allCss.replace(s,""))}))}}},a=n,c=o("2877"),i=Object(c["a"])(a,e,l,!1,null,null,null);s["default"]=i.exports}}]);