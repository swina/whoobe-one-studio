(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2077c4"],{a175:function(t,i,n){"use strict";n.r(i);var o=function(){var t=this,i=t.$createElement,n=t._self._c||i;return t.$store.state.editor.current?n("div",{staticClass:"pl-1"},[n("m-icon",{staticClass:"icon-button ml-0 mb-1",class:"elements"===t.iconTab?"bg-indigo-500 text-white":null,attrs:{icon:"add",title:"Add element"},on:{click:function(i){return t.sidebar("elements")}}}),n("m-icon",{staticClass:"icon-button ml-0 mb-1",class:"customize"===t.iconTab?"bg-indigo-500 text-white":null,attrs:{icon:"brush",title:"Customize"},on:{click:function(i){return t.sidebar("customize")}}}),n("m-icon",{staticClass:"icon-button ml-0 mb-1",class:"css"===t.iconTab?"bg-indigo-500 text-white":null,attrs:{icon:"code",title:"CSS & Style"},on:{click:function(i){return t.sidebar("css")}}}),n("m-icon",{staticClass:"icon-button ml-0 mb-1",class:"wizard"===t.iconTab?"bg-indigo-500 text-white":null,attrs:{icon:"auto_fix_high",title:"One click template"},on:{click:function(i){return t.sidebar("wizard")}}}),n("m-icon",{staticClass:"icon-button ml-0 mb-1",class:"library"===t.iconTab?"bg-indigo-500 text-white":null,attrs:{icon:"widgets",title:"Library"},on:{click:function(i){return t.$dialogBus("pages","block")}}}),n("m-icon",{staticClass:"icon-button ml-0 mb-1",class:"animation"===t.iconTab?"bg-indigo-500 text-white":null,attrs:{icon:"motion_photos_auto",title:"Animation"},on:{click:function(i){return t.sidebar("animation")}}}),n("m-icon",{staticClass:"icon-button ml-0 mb-1",class:"events"===t.iconTab?"bg-indigo-500 text-white":null,attrs:{icon:"ads_click",title:"Events"},on:{click:function(i){return t.sidebar("events")}}}),n("IconifyIcon",{staticClass:"text-xl icon-button ml-0 mb-1 cursor-pointer",attrs:{icon:"simple-icons:alpinedotjs",title:"Alpine JS",mode:"editor"},on:{click:function(i){return t.sidebar("alpine")}}}),n("m-icon",{staticClass:"icon-button ml-0 mb-1",class:"plugins"===t.iconTab?"bg-indigo-500 text-white":null,attrs:{icon:"extension",title:"plugins"},on:{click:function(i){return t.sidebar("plugins")}}}),n("m-icon",{staticClass:"icon-button ml-0 mb-1",class:"settings"===t.iconTab?"bg-indigo-500 text-white":null,attrs:{icon:"settings",title:"Settings"},on:{click:function(i){return t.sidebar("settings")}}}),n("m-icon",{staticClass:"icon-button ml-0 mb-1",class:"info"===t.iconTab?"bg-indigo-500 text-white":null,attrs:{icon:"account_tree",title:"Element Tree"},on:{click:function(i){return t.sidebar("tree")}}})],1):t._e()},s=[],e=n("56d7"),c={name:"EditorSidebarTabs",data:function(){return{iconTab:"elements",extend:!1}},computed:{},methods:{isTab:function(t){return t===this.iconTab||this.$attrs.tab&&this.$attrs.tab===this.iconTab?"bg-indigo-500 text-white":"hover:bg-gray-200"},sidebar:function(t){this.iconTab=t,e["eventBus"].$emit("sidebar",t)}},mounted:function(){var t=this;e["editorBus"].$on("customizeBlock",(function(){t.sidebar("customize")})),e["editorBus"].$on("addBlock",(function(){t.sidebar("elements")})),e["editorBus"].$on("cssBlock",(function(){t.sidebar("css")})),e["editorBus"].$on("animationBlock",(function(){t.sidebar("animation")})),this.$attrs.tab&&(this.iconTab=this.$attrs.tab)}},a=c,l=n("2877"),r=Object(l["a"])(a,o,s,!1,null,null,null);i["default"]=r.exports}}]);