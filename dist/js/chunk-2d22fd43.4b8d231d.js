(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d22fd43"],{ea4e:function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{ref:"blockAction",staticClass:"flex flex-col p-2 pr-20"},[r("label",[t._v("Type")]),r("select",{directives:[{name:"model",rawName:"v-model",value:t.$store.state.editor.current.type,expression:"$store.state.editor.current.type"}],on:{change:function(e){var r=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.$set(t.$store.state.editor.current,"type",e.target.multiple?r:r[0])}}},[r("option",{attrs:{value:"text"}},[t._v("text")]),r("option",{attrs:{value:"email"}},[t._v("email")]),r("option",{attrs:{value:"number"}},[t._v("number")])]),r("label",[t._v("Name")]),r("input",{directives:[{name:"model",rawName:"v-model",value:t.$store.state.editor.current.data.attributes.name,expression:"$store.state.editor.current.data.attributes.name"}],attrs:{type:"text"},domProps:{value:t.$store.state.editor.current.data.attributes.name},on:{input:function(e){e.target.composing||t.$set(t.$store.state.editor.current.data.attributes,"name",e.target.value)}}}),r("label",[t._v("ID")]),r("input",{directives:[{name:"model",rawName:"v-model",value:t.$store.state.editor.current.data.attributes.id,expression:"$store.state.editor.current.data.attributes.id"}],attrs:{type:"text"},domProps:{value:t.$store.state.editor.current.data.attributes.id},on:{input:function(e){e.target.composing||t.$set(t.$store.state.editor.current.data.attributes,"id",e.target.value)}}}),r("label",[t._v("Placeholder")]),r("input",{directives:[{name:"model",rawName:"v-model",value:t.$store.state.editor.current.data.attributes.placeholder,expression:"$store.state.editor.current.data.attributes.placeholder"}],attrs:{type:"text"},domProps:{value:t.$store.state.editor.current.data.attributes.placeholder},on:{input:function(e){e.target.composing||t.$set(t.$store.state.editor.current.data.attributes,"placeholder",e.target.value)}}}),r("label",[t._v("Required")]),r("input",{directives:[{name:"model",rawName:"v-model",value:t.$store.state.editor.current.data.attributes.required,expression:"$store.state.editor.current.data.attributes.required"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.$store.state.editor.current.data.attributes.required)?t._i(t.$store.state.editor.current.data.attributes.required,null)>-1:t.$store.state.editor.current.data.attributes.required},on:{change:function(e){var r=t.$store.state.editor.current.data.attributes.required,a=e.target,s=!!a.checked;if(Array.isArray(r)){var o=null,i=t._i(r,o);a.checked?i<0&&t.$set(t.$store.state.editor.current.data.attributes,"required",r.concat([o])):i>-1&&t.$set(t.$store.state.editor.current.data.attributes,"required",r.slice(0,i).concat(r.slice(i+1)))}else t.$set(t.$store.state.editor.current.data.attributes,"required",s)}}})])},s=[],o={name:"BlockInput",mounted:function(){}},i=o,u=r("2877"),n=Object(u["a"])(i,a,s,!1,null,null,null);e["default"]=n.exports}}]);