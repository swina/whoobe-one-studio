(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d20fee5"],{b672:function(t,e,r){"use strict";r.r(e);var s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"w-full"},[t._v(" Columns "),r("select",{directives:[{name:"model",rawName:"v-model",value:t.cols,expression:"cols"}],staticClass:"h-8 w-16",on:{change:function(e){var r=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.cols=e.target.multiple?r:r[0]}}},t._l(6,(function(e){return r("option",{domProps:{value:e}},[t._v(t._s(e))])})),0),r("div",{staticClass:"grid",class:"grid-cols-"+t.cols},[t._l(t.colSpans[t.cols],(function(e){return[t._l(e,(function(s){return[r("div",{staticClass:"flex m-1 border border-dashed border-gray-500 bg-bluegray-100 items-center justify-center cursor-pointer",class:"col-span-"+s,attrs:{title:e},on:{click:function(r){return t.createGrid(s,e)}}},[t._v(" "+t._s(s)+" ")])]}))]}))],2)])},n=[],o=r("d9b4"),l={name:"GridHelper",data:function(){return{n:1,cols:3,colSpans:{1:[[1]],2:[[1,1]],3:[[1,1,1],[1,2],[2,1]],4:[[1,1,1,1],[2,2],[1,3],[1,1,2],[1,2,1],[2,1,1],[3,1]],5:[[1,1,1,1,1],[1,1,1,2],[1,1,3],[1,4],[1,1,2,1],[1,2,1,1],[1,3,1],[2,1,1,1],[3,1,1],[3,2],[4,1]],6:[[1,1,1,1,1,1],[1,1,1,1,2],[1,1,1,3],[1,1,4],[1,5],[1,1,1,2,1],[1,1,2,1,1],[1,1,3,1],[1,2,1,1,1],[1,3,1,1],[1,4,1],[2,1,1,1,1],[3,1,1,1],[4,1,1],[5,1]]}}},computed:{gridLayout:function(){return this.colSpans[this.cols]}},methods:{createGrid:function(t,e){for(var r=(new o["a"]).Grid().Cols(this.cols),s=0;s<e.length;s++){var n=(new o["a"]).Flexbox({direction:"row",colspan:e[s]}).setIcon("highlight_alt");r.blocks.push(n)}this.$store.state.editor.current.blocks.push(r),this.$emit("close")}}},c=l,a=r("2877"),i=Object(a["a"])(c,s,n,!1,null,null,null);e["default"]=i.exports}}]);