(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-01fe0e75"],{"129f":function(t,e){t.exports=Object.is||function(t,e){return t===e?0!==t||1/t===1/e:t!=t&&e!=e}},"841c":function(t,e,i){"use strict";var s=i("d784"),a=i("825a"),n=i("1d80"),r=i("129f"),o=i("577e"),c=i("14c3");s("search",(function(t,e,i){return[function(e){var i=n(this),s=void 0==e?void 0:e[t];return void 0!==s?s.call(e,i):new RegExp(e)[t](o(i))},function(t){var s=a(this),n=o(t),l=i(e,s,n);if(l.done)return l.value;var u=s.lastIndex;r(u,0)||(s.lastIndex=0);var h=c(s,n);return r(s.lastIndex,u)||(s.lastIndex=u),null===h?-1:h.index}]}))},bc42:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.pages?i("div",{staticClass:"absolute inset-0 mt-10 bg-white"},[i("div",{staticClass:"py-2 mb-2 bg-gray-200 w-screen z-modal hidden md:flex md:flex-row items-center"},[i("label",[t._v("Category")]),i("select",{directives:[{name:"model",rawName:"v-model",value:t.category,expression:"category"}],staticClass:"capitalize bg-white rounded",on:{change:function(e){var i=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.category=e.target.multiple?i:i[0]}}},[i("option",{attrs:{value:"",selected:""}},[t._v("All")]),t._l(t.categories,(function(e){return i("option",{staticClass:"px-1 py-1",domProps:{value:e}},[t._v(t._s(e))])}))],2),i("label",[t._v("Search")]),i("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],attrs:{type:"text"},domProps:{value:t.search},on:{keydown:function(e){return t.searchPages(e)},input:function(e){e.target.composing||(t.search=e.target.value)}}})]),i("transition",{attrs:{name:"fade"}},[i("div",{staticClass:"w-full h-full pb-20 flex flex-row flex-wrap p-2 px-8 items-start justify-center cursor-pointer overflow-y-auto"},[t._l(t.pages,(function(e,s){return[i("div",{key:s+t.skip,staticClass:"relative shadow mx-2 my-1 w-40 h-50 rounded border-t-8 border-gray-500",attrs:{title:e.name},on:{click:function(i){return t.addBlock(e)}}},[i("div",{staticClass:"flex flex-col items-center justify-center",attrs:{title:e.name}},[e.image?i("img",{staticClass:"w-40 h-40 w-full object-contain",attrs:{src:t.imagePage(e)}}):t._e()]),i("div",{staticClass:"w-full absolute bottom-0 p-1 bg-gray-200 text-black mt-1 truncate"},[t._v(t._s(e.name))])])]}))],2)]),t.filter?t._e():i("div",{staticClass:"absolute mt-20 left-0 top-0 w-20 h-screen flex flex-col items-start justify-center"},[i("m-icon",{staticClass:"-mt-20 text-6xl",attrs:{icon:"chevron_left"},on:{click:function(e){t.skip>0&&(t.skip=t.skip-t.limit)}}})],1),t.filter?t._e():i("div",{staticClass:"absolute mt-20 right-0 top-0 w-20 h-screen flex flex-col items-end justify-center"},[i("m-icon",{staticClass:"-mt-20 text-6xl",attrs:{icon:"chevron_right"},on:{click:function(e){t.skip+t.limit<t.total&&(t.skip=t.skip+t.limit)}}})],1)],1):t._e()},a=[],n=(i("4e82"),i("ac1f"),i("841c"),i("4de4"),i("56d7")),r={name:"PagesGallery",data:function(){return{limit:6,skip:0,search:"",dataset:null,pages:null,total:0,preview:null,currentImage:null,category:"",filter:!1}},computed:{categories:function(){return this.$store.state.editor.settings.categories.sort()}},watch:{category:function(t){var e=this;this.skip=0,this.$getPages(this.category.toLowerCase(),this.limit,this.skip).then((function(t){e.pages=t}))},skip:function(t){var e=this;this.$getPages(this.category.toLowerCase(),this.limit,this.skip).then((function(t){e.pages=t}))}},methods:{getImageInfo:function(t){var e=this.$imageInfo(t),i=e.naturalWidth/e.naturalHeight;return i<1?"object-cover object-top h-60":i>2?"h-20 object-contain":"h-80 object-contain"},imagePage:function(t){return t.image?t.image:"no-image.png"},addBlock:function(t){var e=t.json.blocks.blocks[0];console.log(e),this.$store.state.editor.current?this.$store.state.editor.current.blocks.push(e):this.$store.state.editor.document.blocks.push(e),this.$emit("close")},previewPage:function(t){window.localStorage.setItem("whoobe-preview",JSON.stringify(t)),this.$dialogBus("pagePreview","fullscreen")},getPages:function(){var t=this;this.$getPages(this.category,this.limit,this.skip).then((function(e){t.pages=e}))},searchPages:function(t){var e=this;13===t.keyCode&&(this.search?this.$searchPages(this.search).then((function(t){e.pages=t,e.total=e.pages.length,e.filter=!0})):(this.skip=0,this.filter=!1,this.getPages()))},importDB:function(){var t=window.confirm("Importing will be overwrite the current database. Continue?");t&&n["dialogBus"].$emit("importDatabase","common/ImportDatabase.vue")}},mounted:function(){var t=this;this.$dbCount().then((function(e){t.total=e})),this.$getPages(this.category,this.limit,this.skip).then((function(e){t.pages=e}))}},o=r,c=i("2877"),l=Object(c["a"])(o,s,a,!1,null,null,null);e["default"]=l.exports}}]);