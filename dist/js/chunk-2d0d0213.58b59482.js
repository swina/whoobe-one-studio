(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d0213"],{6751:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{class:"flex flex-col mr-2 "},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.selected,expression:"selected"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.selected)?t._i(t.selected,null)>-1:t.selected},on:{change:function(e){var s=t.selected,i=e.target,c=!!i.checked;if(Array.isArray(s)){var n=null,r=t._i(s,n);i.checked?r<0&&(t.selected=s.concat([n])):r>-1&&(t.selected=s.slice(0,r).concat(s.slice(r+1)))}else t.selected=c}}}),t._v(" "+t._s(t.$attrs.title||t.$attrs.attr)+" ")])},c=[],n=(s("ac1f"),s("1276"),s("159b"),s("deff")),r={data:function(){return{selected:""}},computed:{options:function(){return n["a"][this.$attrs.attr]}},props:["css"],watch:{selected:function(t){t?(this.$emit("input",this.$attrs.prefix?this.$attrs.prefix+this.options[0]:this.options[0]),this.$emit("css",this.$attrs.prefix?this.$attrs.prefix+this.options[0]:this.options[0])):(this.$emit("input",""),this.$emit("css",""))}},mounted:function(){var t=this;if(this.css.length){var e=this.css.split(" ");e.forEach((function(e){if(t.options.indexOf(e)>-1)return t.selected=!0,t.$emit("input",e),void t.$emit("css",e)}))}}},a=r,o=s("2877"),l=Object(o["a"])(a,i,c,!1,null,null,null);e["default"]=l.exports}}]);