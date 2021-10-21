<template>
    <div v-if="editor.elements" class="relative">

      <template v-for="group in editor.elements">
        <div :key="group.label" class="capitalize flex items-center cursor-pointer hover:bg-gray-500 hover:text-white p-2 text-gray-700 text-base" :class="gr===group.label?'bg-bluegray-300 text-gray-200':''" @click="gr===group.label?gr=null:gr=group.label">
          {{ group.label }}
          <m-icon class="absolute right-0 m-1" :icon="gr===group.label?'expand_less':'expand_more'"/>
        </div>
        
        <div v-if="gr===group.label" class="flex flex-row flex-wrap justify-center cursor-pointer p-2">
          <template v-for="element in group.elements">
              <div :key="element.name" class="bg-white m-1 hover:bg-gray-100 flex flex-col items-center h-16 w-16 ml-01 text-xs justify-center text-center  text-gray-500 rounded hover:text-purple-600 shadow" @click="createElement(element)">
                <m-icon css="material-icons text-3xl" :icon="element.icon"/>
                {{ element.name }}
              </div>
          </template> 
        </div>
        
      
      </template>
      <div key="snippets" class="capitalize cursor-pointer items-center flex p-2 text-gray-700 text-base" :class="gr==='snippets'?'bg-bluegray-300 text-gray-200':''" @click="gr==='snippets'?gr=null:gr='snippets'">
          Snippets
          <m-icon class="absolute right-0 m-1" :icon="gr==='snippets'?'expand_less':'expand_more'"/>
      </div>
      <div v-if="gr==='snippets'" class="relative w-full cursor-pointer">
        <BlockLibrary/>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { editorBus } from '@/main'
import Element from '@/scripts/ElementsClass'
export default {
    name: 'BlockElements',
    components: {
      'BlockLibrary' : () => import ( '@/components/blocks/components/BlockLibrary.vue')
    },
    data:()=>({
        gr: '',
        el: null
    }),
    computed:{
        ...mapState ( ['editor'] )
    },
    methods:{
      createElement(el){
        if ( !this.editor.current ) return
        let element = new Element().createElement(el.name).setIcon(el.icon)
        this.editor.current.blocks.push ( element )
        this.$store.dispatch ( 'setCurrent' , element )
        if ( element.helper ){
            this.$dialogBus ( 'editorHelper' , { content: element.helper , title: element.element.toUpperCase() , width: element.dialog } )
        }
      }
    }
    // mounted(){
    //   //create element
    //     editorBus.$on ( 'createElement' , (el) => {
    //         if ( !this.editor.current ) return
    //         this.el = new Element().createElement(el.name).setIcon(el.icon)
    //         if ( this.el.helper ){
    //             this.$dialogBus ( 'editorHelper' , { content: this.el.helper , title: this.el.element.toUpperCase() , width: this.el.dialog })
    //         } else {
    //             console.log ( this.editor.current , this.el )
    //             this.editor.current.blocks.push ( this.el ) 
    //             this.$store.dispatch ( 'setCurrent' , this.el )
    //         }
    //         this.$editorBus('editorMessage','Created ' + this.el.element)
    //     })
    // }
}
</script>