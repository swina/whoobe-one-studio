(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e64d3"],{"97ba":function(t,e,s){"use strict";s.r(e);var o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{ref:"blockColor",staticClass:"w-64 flex flex-col w-full justify-center items-center shadow",attrs:{id:"blockColor"}},[s("div",{staticClass:"flex justify-center items-center w-64 py-2 cursor-pointer"},[s("div",{staticClass:"flex flex-col items-center justify-center"},[t._v(" Foreground "),s("span",{staticClass:"w-8 h-8 rounded-full border mr-2",class:t.frontColor.replace("text-","bg-"),on:{click:function(e){t.palette=!0,t.hover=!1}}})]),s("div",{staticClass:"flex flex-col items-center justify-center"},[t._v(" Over "),s("span",{staticClass:"w-8 h-8 rounded-full border ml-2",class:t.hoverColor.replace("hover:","").replace("text-","bg-"),on:{click:function(e){t.palette=!0,t.hover=!0}}})])]),t.palette?s("div",{staticClass:"absolute -mt-40"},[s("palette",{staticClass:"-mt-40",attrs:{context:t.context,css:t.hover?t.hoverColor:t.frontColor},on:{color:t.setColorNew,close:function(e){t.palette=!t.palette}}})],1):t._e()])},r=[],l=s("2909"),n=(s("d3b7"),s("3ca3"),s("ddb0"),s("ac1f"),s("5319"),s("1276"),s("a15b"),s("6062"),s("159b"),s("caad"),s("2532"),s("deff")),c={name:"BlockFloatingPalette",data:function(){return{allCss:"",twClass:"",currentColor:"",opened:!0,frontColor:"",hoverColor:"",palette:!1,hover:!1}},components:{TextColor:function(){return s.e("chunk-2d0b59d7").then(s.bind(null,"1a3d"))},BackgroundColor:function(){return s.e("chunk-2d216da6").then(s.bind(null,"c3dd"))}},computed:{colors:function(){return n["a"][this.$attrs.options.context]},context:function(){return"bgcolor"===this.$attrs.options.context?"bg-":"text-"}},methods:{setColorNew:function(t,e){this.palette=!1,e&&(t+="-"+e),this.hover?(this.allCss=this.allCss.replace(this.hoverColor," hover:"+this.context+t+" "),this.hoverColor="hover:"+this.context+t):(this.allCss=this.allCss.replace(this.frontColor," "+this.context+t+" "),this.frontColor=this.context+t),this.$store.state.editor.current.css.css=this.$clean(this.allCss)}},watch:{},mounted:function(){var t=this,e=this.$store.state.editor.current.css.css.split(" ");if(this.$store.state.editor.current.css.css=Object(l["a"])(new Set(e)).join(" "),this.twClass=this.$store.state.editor.current.css.css,this.allCss=this.twClass,this.twClass&&this.twClass.length){var s=this.allCss.split(" ");s.forEach((function(e){t.colors.forEach((function(s){e.includes(s)&&(e.indexOf("hover")>-1?(t.currentColor=e,t.hoverColor=e):(t.currentColor=e,t.frontColor=e))}))}))}}},i=c,a=s("2877"),h=Object(a["a"])(i,o,r,!1,null,null,null);e["default"]=h.exports}}]);