(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c0294"],{4134:function(t,e,i){"use strict";i.r(e);var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"flex flex-col p-4 items-center"},[i("div",{staticClass:"relative w-full"},[i("input",{staticClass:"absolute top-0 left-0 right-0 bottom-0 opacity-0",attrs:{type:"file",accept:"*.json"},on:{change:function(e){t.loadTextFromFile(e),t.loading=!0}}}),i("button",{staticClass:"btn-blue w-full warning"},[t._v("Select File")])]),i("input",{directives:[{name:"model",rawName:"v-model",value:t.kitURL,expression:"kitURL"}],staticClass:"w-full my-2",attrs:{type:"text",placeholder:"Kit URL"},domProps:{value:t.kitURL},on:{input:function(e){e.target.composing||(t.kitURL=e.target.value)}}}),i("button",{staticClass:"btn-blue w-full my-2",on:{click:function(e){return t.fetchURL()}}},[t._v("Import from URL")]),t.loading?i("m-icon",{staticClass:"animate-spin text-4xl",attrs:{icon:"bubble_chart"}}):t._e()],1)},s=[],a=(i("d3b7"),i("56d7")),n={name:"ImportFile",data:function(){return{loading:!1,kitURL:"http://localhost:8080/"}},methods:{fetchURL:function(){var t=this;if(this.kitURL)try{fetch(this.kitURL).then((function(t){return t.json()})).then((function(e){t.$store.dispatch("add_uikit",e),t.$store.dispatch("library",e),t.$dialogBus("closeDialog")}))}catch(e){console.log(e)}},loadTextFromFile:function(t){var e=this;this.loading=!0;var i=t.target.files[0],o=new FileReader;o.onload=function(t){e.loading=!0;var i=t.target.result;try{if(i=JSON.parse(i),"page"===e.$attrs.options.mode){if(!i.hasOwnProperty("json"))return void a["eventBus"].$emit("error","File selected is a block and not a valid page.");delete i.id,i.id=0,e.$store.dispatch("setPage",i),e.$store.dispatch("document",i.json.blocks),e.loading=!1}"kit"===e.$attrs.options.mode?(e.$store.dispatch("add_uikit",i),e.$store.dispatch("library",i)):e.$store.state.editor.current&&(i.hasOwnProperty("json")&&(i=i.json.blocks),e.$store.state.editor.current.blocks.push(i),e.$store.dispatch("setCurrent",i),e.loading=!1),e.loading=!1,e.$emit("close"),a["eventBus"].$emit("notification","File imported correctly")}catch(o){console.log(o),e.loading=!1,a["eventBus"].$emit("error","File not supported")}},o.readAsText(i)}}},l=n,r=i("2877"),c=Object(r["a"])(l,o,s,!1,null,null,null);e["default"]=c.exports}}]);