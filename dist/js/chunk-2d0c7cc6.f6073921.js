(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c7cc6"],{"51c7":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"flex flex-col p-4 items-center"},[a("input",{staticClass:"absolute top-0 left-0 right-0 bottom-0 opacity-0",attrs:{type:"file",accept:"*.json"},on:{change:t.loadTextFromFile}}),a("button",{staticClass:"w-full warning"},[t._v("Select File")]),t.loading?a("m-icon",{staticClass:"animate-spin text-4xl",attrs:{icon:"bubble_chart"}}):t._e()],1)},l=[],i=(a("56d7"),{name:"ImportDatabase",data:function(){return{loading:!1}},methods:{loadTextFromFile:function(t){var e=t.target.files[0];this.$importDB(e)}}}),s=i,c=a("2877"),o=Object(c["a"])(s,n,l,!1,null,null,null);e["default"]=o.exports}}]);