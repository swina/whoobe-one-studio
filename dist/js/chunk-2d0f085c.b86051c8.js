(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0f085c"],{"9d72":function(t,e,r){"use strict";r.r(e);var s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("ul",[t._l(Object.keys(t.$attrs.root),(function(e){return[r("li",{staticClass:"list-none my-2 cursor-pointer",attrs:{title:"Click to get dependencies"},on:{click:function(r){return t.requestPackage(e)}}},[r("span",{staticClass:"pr-2 bg-indigo-400 py-2 px-2 text-black rounded-tl rounded-bl"},[t._v(t._s(e))]),t.$attrs.root[e].hasOwnProperty("dependencies")?r("span",{staticClass:"bg-blue-200 px-2 py-2 text-black rounded-tr rounded-br"},[t._v(t._s(t.$attrs.root[e].version))]):r("span",{staticClass:"bg-blue-200 px-2 py-2 text-black rounded-tr rounded-br"},[t._v(t._s(t.$attrs.root[e]))]),t.$attrs.root[e].hasOwnProperty("dependencies")&&t.$attrs.root[e].dependencies?r("PackageTemplateTree",{attrs:{root:t.$attrs.root[e].dependencies,name:t.$attrs.name}}):t._e()],1)]}))],2)])},n=[],a=(r("b0c0"),{name:"PackageTemplateTree",methods:{requestPackage:function(t){this.$attrs.root[t].hasOwnProperty("version")?this.$emit("search",t,this.$attrs.root[t].version,this.$attrs.name):this.$emit("search",t,this.$attrs.root[t],this.$attrs.name)}}}),o=a,i=r("2877"),c=Object(i["a"])(o,s,n,!1,null,null,null);e["default"]=c.exports}}]);