(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0ac18c"],{"17a1":function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"w-screen bg-bluegray-200 shadow z-highest h-10 flex items-center fixed bottom-0 px-2"},[n("m-icon",{attrs:{icon:"menu",css:"icon-button",title:"Main menu"},on:{click:t.confirmClose}}),n("div",{staticClass:"border-r h-10 mx-1"}),n("m-icon",{attrs:{icon:"auto_fix_high",css:"icon-button",title:"Create empty page"},on:{click:function(e){return t.$editorBus("createPage","page")}}}),n("div",{staticClass:"border-r h-10 mx-1"}),n("m-icon",{attrs:{icon:"laptop",css:"icon-button",title:"Laptop  preview"},on:{click:function(e){return t.$editorBus("preview","fullscreen")}}}),n("m-icon",{attrs:{icon:"tablet",css:"icon-button",title:"Tablet Preview"},on:{click:function(e){return t.$editorBus("preview","tablet")}}}),n("m-icon",{attrs:{icon:"smartphone",css:"icon-button",title:"Smartphone Preview"},on:{click:function(e){return t.$editorBus("preview","smartphone")}}}),n("div",{staticClass:"border-r h-10 mx-1"}),n("m-icon",{attrs:{icon:"save",css:"icon-button",title:"Save Page"},on:{click:function(e){return t.$savePage()}}}),n("m-icon",{attrs:{icon:"file_copy",css:"icon-button",title:"Save as"},on:{click:function(e){return t.saveAs()}}}),n("m-icon",{attrs:{icon:"download",css:"icon-button",title:"Import document"},on:{click:function(e){return t.$editorBus("importPage","page")}}}),n("m-icon",{attrs:{icon:"upload",css:"icon-button",title:"Export Page"},on:{click:function(e){return t.$exportDocument()}}}),n("m-icon",{attrs:{icon:"delete",css:"icon-button",title:"Delete Page"},on:{click:function(e){return t.$deletePage()}}}),n("m-icon",{attrs:{icon:"health_and_safety",css:"icon-button",title:"Backup Database"},on:{click:function(e){return t.$saveDB()}}}),n("div",{staticClass:"border-r h-10 mx-1"}),t.message?n("div",{staticClass:"absolute right-0 bg-blue-400 text-white h-full px-2 flex justify-center items-center animate-pulse"},[n("m-icon",{attrs:{icon:"notifications"}}),n("span",{},[t._v(t._s(t.message))])],1):t._e(),n("div",{staticClass:"border-r h-10 mx-1"}),n("m-icon",{attrs:{icon:"highlight_alt"}}),t.editor.current?n("div",{staticClass:"px-2"},[t.editor.component?n("span",{staticClass:"font-bold cursor-pointer",attrs:{title:"Block settings"},on:{click:function(e){return t.$dialogBus("settingsComponent")}}},[t._v(t._s(t.editor.component.name))]):t._e(),t._v(" - "+t._s(t.editor.current.semantic)+" "+t._s(t.editor.current.element)+" "+t._s(t.editor.current.tag)+" #"+t._s(t.editor.current.id)+" "),t.editor.current.coords?n("span",[t._v(" [ w:"+t._s(parseInt(t.editor.current.coords.width))+" x h:"+t._s(parseInt(t.editor.current.coords.height))+" ] - x:"+t._s(parseInt(t.editor.current.coords.x))+" - y:"+t._s(parseInt(t.editor.current.coords.y))+" ")]):t._e()]):t._e(),n("div",{staticClass:"border-r h-10 mx-1"})],1)},i=[],s=n("5530"),c=(n("d3b7"),n("3ca3"),n("ddb0"),n("b0c0"),n("2f62")),r=n("56d7"),a={name:"EditorFooter",data:function(){return{newcss:"",message:""}},components:{EditorSidebarTabs:function(){return n.e("chunk-2d2077c4").then(n.bind(null,"a175"))}},computed:Object(s["a"])({},Object(c["b"])(["editor"])),methods:{confirmClose:function(){r["modalBus"].$emit("confirm")},saveAs:function(){this.editor.page.name=this.editor.page.name+" COPY",this.editor.page.id=0,r["modalBus"].$emit("blockSettings")}},mounted:function(){var t=this;r["editorBus"].$on("editorMessage",(function(e){t.message=e,window.setTimeout((function(){t.message=""}),4e3)}))}},u=a,d=n("2877"),l=Object(d["a"])(u,o,i,!1,null,null,null);e["default"]=l.exports}}]);