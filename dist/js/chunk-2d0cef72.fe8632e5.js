(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0cef72"],{6266:function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.$store.state.editor.current?n("div",{staticClass:"w-56 bg-white p-1 flex flex-col"},[n("label",[e._v("Font")]),n("select",{directives:[{name:"model",rawName:"v-model",value:e.$store.state.editor.current.font,expression:"$store.state.editor.current.font"}],staticClass:"w-full",on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.$set(e.$store.state.editor.current,"font",t.target.multiple?n:n[0])}}},[n("option",{attrs:{value:""}}),n("option",{attrs:{value:"Arial"}},[e._v("sans-serif")]),n("option",{attrs:{value:"serif"}},[e._v("serif")]),n("option",{attrs:{value:"monospace"}},[e._v("monospace")]),e._l(e.fonts,(function(t){return n("option",{domProps:{value:t}},[e._v(e._s(t.replace("+"," ")))])}))],2),n("label",[e._v("Size "+e._s(e.oldFontSize))]),n("select",{directives:[{name:"model",rawName:"v-model",value:e.fontSize,expression:"fontSize"}],staticClass:"w-full",on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.fontSize=t.target.multiple?n:n[0]}}},[n("option",{attrs:{value:""}}),e._l(e.sizes,(function(t){return n("option",{domProps:{value:t}},[e._v(e._s(t.replace("text-","")))])}))],2)]):e._e()},s=[],r=(n("ac1f"),n("1276"),n("a15b"),n("4de4"),n("d81d"),n("caad"),n("2532"),n("5319"),n("deff")),a={name:"BlockFont",data:function(){return{fontSelected:"",fontSize:"",entryCss:[],oldFontSize:""}},computed:{fonts:function(){return"Alfa+Slab+One|Asap+Condensed|Abel|Alice|Alegreya|Amethysta|Archivo+Black|Barlow|Barlow+Condensed|Bungee+Inline|Expletus+Sans|Lora|Montserrat|Nunito+Sans|Oi|Open+Sans|PT+Sans|Roboto|Roboto+Condensed|Quattrocento|Raleway|Ultra|Yatra+One".split("|")},sizes:function(){return r["a"].textSize}},watch:{fontSelected:function(e){console.log(e)},fontSize:function(e){this.entryCss.push(e),this.$store.state.editor.current.css.css=this.entryCss.join(" "),this.oldFontSize=""}},mounted:function(){var e=this,t=this.$store.state.editor.current.css.css;if(t){var n=t.split(" ").filter((function(e){return e})),o=[];n.map((function(t){e.sizes.includes(t)?e.oldFontSize=t.replace("text-",""):o.push(t)})),this.entryCss=o}}},i=a,l=n("2877"),u=Object(l["a"])(i,o,s,!1,null,null,null);t["default"]=u.exports}}]);