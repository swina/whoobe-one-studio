(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d229202"],{dbb0:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.editor.elements?r("div",{staticClass:"relative"},[e._l(e.editor.elements,(function(t){return[r("div",{key:t.label,staticClass:"capitalize cursor-pointer p-2 text-gray-700 text-base",class:e.gr===t.label?"bg-bluegray-300 text-gray-200":"",on:{click:function(r){e.gr===t.label?e.gr=null:e.gr=t.label}}},[e._v(" "+e._s(t.label)+" "),r("m-icon",{staticClass:"absolute right-0 m-1",attrs:{icon:e.gr===t.label?"expand_less":"expand_more"}})],1),e.gr===t.label?r("div",{staticClass:"flex flex-row flex-wrap justify-center cursor-pointer p-2"},[e._l(t.elements,(function(t){return[r("div",{key:t.name,staticClass:"bg-gray-100 m-1 hover:bg-gray-300 flex flex-col items-center h-16 w-16 ml-01 text-xs justify-center text-center  text-gray-500 rounded hover:text-indigo-500 shadow",on:{click:function(r){return e.createElement(t)}}},[r("m-icon",{attrs:{css:"material-icons text-3xl",icon:t.icon}}),e._v(" "+e._s(t.name)+" ")],1)]}))],2):e._e()]}))],2):e._e()},l=[],a=r("5530"),s=(r("b0c0"),r("2f62")),i=(r("56d7"),r("d9b4")),c={name:"BlockElements",data:function(){return{gr:"",el:null}},computed:Object(a["a"])({},Object(s["b"])(["editor"])),methods:{createElement:function(e){if(this.editor.current){var t=(new i["a"]).createElement(e.name).setIcon(e.icon);this.editor.current.blocks.push(t),this.$store.dispatch("setCurrent",t),t.helper&&this.$dialogBus("editorHelper",{content:t.helper,title:t.element.toUpperCase(),width:t.dialog})}}}},o=c,u=r("2877"),d=Object(u["a"])(o,n,l,!1,null,null,null);t["default"]=d.exports}}]);