(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d3dea"],{"5f36":function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],staticClass:"p-2",attrs:{placeholder:"search icon ...",type:"text"},domProps:{value:t.search},on:{keydown:function(e){return t.searchIcon(e)},input:function(e){e.target.composing||(t.search=e.target.value)}}}),t.icons?n("div",{staticClass:"z-modal w-1/3 h-1/4 overflow-y-auto bg-white shadow flex flex-row flex-wrap bg-white cursor-pointer"},[t._l(t.icons,(function(e){return[n("div",{staticClass:"w-auto h-8 m-2 text-center hover:bg-gray-200",on:{click:function(n){return t.setIcon(e)}}},[n("i",{staticClass:"iconify text-2xl",attrs:{"data-icon":e}})])]}))],2):t._e()])},c=[],i=n("5530"),s=n("2f62"),a={name:"BlockIconify",data:function(){return{search:"",icons:null}},computed:Object(i["a"])({},Object(s["b"])(["editor"])),methods:{searchIcon:function(t){var e=this;13===t.keyCode&&t.target.value.length>2&&(this.icons=null,this.$icons(t.target.value).then((function(t){e.icons=t.icons})))},setIcon:function(t){this.editor.current.data.icon=t,this.editor.current.content=t,this.$emit("close"),this.icons=null}}},r=a,l=n("2877"),u=Object(l["a"])(r,o,c,!1,null,null,null);e["default"]=u.exports}}]);