(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0eeb3880"],{"07ac":function(t,e,n){var i=n("23e7"),s=n("6f53").values;i({target:"Object",stat:!0},{values:function(t){return s(t)}})},"6f53":function(t,e,n){var i=n("83ab"),s=n("df75"),a=n("fc6a"),c=n("d1e7").f,o=function(t){return function(e){var n,o=a(e),r=s(o),l=r.length,d=0,u=[];while(l>d)n=r[d++],i&&!c.call(o,n)||u.push(t?[n,o[n]]:o[n]);return u}};t.exports={entries:o(!0),values:o(!1)}},"942f":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.$attrs.doc?n(t.semantic,{ref:t.$attrs.doc.id,tag:"component",class:t.classe,style:t.stile,attrs:{id:t.$attrs.doc.anchor?t.$attrs.doc.anchor:t.$attrs.doc.id},on:{click:t.eventClick}},[t._l(t.$attrs.doc.blocks,(function(e){return[!e.link&&e&&"container"===e.type?n("BlockContainerPreview",{key:e.id,attrs:{doc:e}}):t._e(),e.link||!e||"container"==e.type||"iconify"==e.tag||e.link?t._e():n("BlockElement",{key:e.id,attrs:{element:e}}),e.link?n("a",{attrs:{href:e.link}},[e&&"container"===e.type?n("BlockContainerPreview",{key:e.id,attrs:{doc:e}}):t._e(),e&&"container"!=e.type&&"iconify"!=e.tag?n("BlockElement",{key:e.id,attrs:{element:e}}):t._e(),"iconify"===e.tag?n("IconifyIcon",{attrs:{mode:"render",block:e}}):t._e()],1):t._e(),e.link||"iconify"!==e.tag?t._e():n("IconifyIcon",{key:e.id,ref:e.id,refInFor:!0,attrs:{mode:"render",block:e}})]}))],2):t._e()},s=[],a=(n("d3b7"),n("3ca3"),n("ddb0"),n("a15b"),n("07ac"),n("ac1f"),n("5319"),n("159b"),n("b64b"),n("56d7")),c={name:"BlockContainerPreview",data:function(){return{current:null,display:!0,floatingID:null,block:null,elementLink:!1}},components:{BlockElement:function(){return n.e("chunk-4a419d14").then(n.bind(null,"3e9c"))}},computed:{classe:function(){this.block=this.$attrs.doc;var t=Object.values(this.$attrs.doc.css).join(" ");return!this.display&&(t+=" hidden"),t},stile:function(){var t="";return this.$attrs.doc.image&&this.$attrs.doc.image.url&&(t+="background-image:url("+this.$imageURL(this.$attrs.doc.image)+")"),this.$attrs.doc.font&&(t+='font-family:"'.concat(this.$attrs.doc.font.replace("+"," "),'";')),this.$attrs.doc.style+t},semantic:function(){return this.$attrs.doc.semantic?this.$attrs.doc.semantic:"div"}},watch:{display:function(t){t&&this.$refs&&this.$animationElement(this.$attrs.doc,this.$attrs.doc.id,this.$refs)}},methods:{setLink:function(t){console.log(this.$refs[t.id][0].$el)},component:function(t){return t?t.semantic?t.semantic:t.hasOwnProperty("level")?"h"+t.level:t.element:null},eventClick:function(){this.$attrs.doc.events.click&&a["eventBus"].$emit(this.$attrs.doc.events.click)}},mounted:function(){var t=this;this.$attrs.doc.events.display&&(this.display=!1),this.$attrs.doc.events.display&&a["eventBus"].$on(this.$attrs.doc.events.display,(function(){t.display=!t.display})),this.$attrs.doc.events.hide&&a["eventBus"].$on(this.$attrs.doc.events.hide,(function(){t.display=!t.display})),this.$attrs.doc.gsap.animation&&this.$attrs.doc.gsap.duration&&this.display&&this.$animation(this.$attrs.doc,this.$attrs.doc.id,this.$refs),this.$refs[this.$attrs.doc.id].removeAttribute("doc"),this.$attrs.doc.data.alpine&&Object.keys(this.$attrs.doc.data.alpine).forEach((function(e){t.$attrs.doc.data.alpine[e]&&(console.log(e),t.$refs[t.$attrs.doc.id].setAttribute(e,t.$attrs.doc.data.alpine[e]))}))}},o=c,r=n("2877"),l=Object(r["a"])(o,i,s,!1,null,null,null);e["default"]=l.exports}}]);