<template>
    <div v-if="slider" :class="'z-modal z-' + $attrs.level">
        <div class="flex z-modal border border-gray-300 pb-10">
            <m-icon icon="settings" @click="$store.dispatch('setCurrent',slider)" class="icon-button"/><button @click="addSlide" class="btn bg-gray-200">Add slide</button>
            <div v-if="slider.blocks" class="flex">
                <template v-for="(slide,index) in slider.blocks">
                    <IconButton class="px-2 border btn  hover:bg-blue-500 hover:text-white text-xs" :class="currentIndex===index?'btn-purple':'bg-gray-200'"  :text="'Slide ' + (index+1)" icon="close" @click="currentIndex=index,$store.dispatch('setCurrent',slide)" @close="slider.blocks.splice(index,1),$store.dispatch('setCurrent',null),currentIndex=slider.blocks.length-1"/>
                </template>
            </div>
        </div>
        <div v-if="slider.blocks.length" :class="slider.css.container" class="w-full border-2 border-dashed border-blue-400">
            <!-- {{ slider.blocks[currentIndex]}} -->
            
                <BlockContainer 
                    :doc="slider.blocks[currentIndex]" 
                    :key="'slide_' + currentIndex" :level="parseInt($attrs.level)+1"/>
            
        
        </div>
        
    </div>
    <!-- <pre v-if="slider">
        {{ slider }}
    </pre> -->
</template>

<script>
import Element from '@/scripts/ElementsClass'
import { mapState } from 'vuex'
export default {
    name: 'BlockSlider',
    data:()=>({
        currentIndex : 0,
        slider: null
    }),
    components:{
        'BlockContainer'  : () => import ('@/components/blocks/BlockContainer.vue'),
    },
     computed:{
        ...mapState ( ['editor'] ),
    //     classe(){
    //         this.block = this.$attrs.doc
    //         let css = Object.values ( this.$attrs.doc.css ).join ( ' ' )
    //         css += ' z-' + this.$attrs.level
    //         //this.editor.current && this.editor.current.id === this.$attrs.doc.id ? 
    //         //    css += ' border border-red-500 ' : css += ' border border-dashed hover:border-red-500'
    //         this.$attrs.doc.tag === 'document' ? css += ' p-2' : null
    //         return  css
    //     },
    //     stile(){
    //         let st = ''
    //         if ( this.block.image && this.block.image.url ){
    //             st += "background-image:url(" + this.$imageURL(this.block.image) + ");"
    //         }
    //         this.block.font ? st += `font-family:"${this.block.font.replace('+',' ')}";` : null
    //         return st + this.$attrs.doc.style
    //     },
    //     selector(){

    //         let cls = 'z-' + this.$attrs.level
    //         if ( this.editor.current && this.editor.current.id === this.$attrs.doc.id ){
    //             this.$attrs.doc.tag === 'document' ? 
    //                 cls += ' border-2 border-gray-600 ' : 
    //                 cls += ' border border-red-400'
    //         } else {
    //             this.$attrs.doc.tag === 'document' ? 
    //                 cls += ' border-2 border-transparent shadow ' :   
    //                 cls += ' border border-dashed border-transparent hover:border-red-400'
    //         }

    //         return cls.replace('md:hidden','')
    //     },
        
    },
    methods:{
        addSlide(){
            this.$store.dispatch('setCurrent',this.slider)
            let slide = new Element().createElement('Flexbox')
            this.slider.blocks.push ( slide )
            this.$store.dispatch ( 'setCurrent' , this.slider )
            //this.$store.state.editor.current.blocks.push ( slide )
        }
        // classeElement(block){
        //     let cl = block.css.css.replace('hidden','')
        //     return cl
        // },
        // component(block){
        //     if ( !block ) return null
        //     return block.hasOwnProperty('level') ? 'h' + block.level : block.element
        // },
        // setCurrent(block){
        //     let sel = document.getElementById('elementSelector')
        //     sel.classList = ''
        //     // this.$editorBus('floatingElement',block.id) 
        //     // let coords = this.$refs[this.block.id].getBoundingClientRect()
        //     this.editor.current && this.editor.current.id === block.id ?
        //         this.$store.dispatch ( 'setCurrent' , null ) :
        //             this.$store.dispatch ( 'setCurrent' , block )
        //     this.editor.current && this.editor.current.id === block.id ?                    
        //         this.$editorBus('floatingElement',block.id) : null 
        //     this.editor.current && !this.editor.current.image ?
        //         this.editor.current.image = { url: this.editor.current.image } : null
        // },
        // setFloating(element){
        //     this.floatingID = element.id
        //     let floating = document.querySelector('.block-floating')
        //     floating.style.left = element.coords.x
        //     floating.style.top = element.coords.y
        // },
        // float(){
        //     this.floatingID = this.$attrs.doc.id
        // },
        // nofloat(){
        //    this.floatingID = null
        // },
        // floating(){
        //     return this.editor.current ?
        //             this.editor.current.id == this.$attrs.doc.id ? 'opacity-100' :
        //                 this.floatingID === this.$attrs.doc.id ? 'opacity-0' : 'opacity-0' : 'opacity-0'
                        
        // }
    },
    mounted(){
        this.slider = this.$attrs.doc
        // editorBus.$on ('linkBlock',()=>{
        //     this.elementLink =! this.elementLink
        // })
        // var drake = dragula({
        //     isContainer: function (el) {
        //         return el.classList.contains('dragula-container');
        //     },
        //     accepts: function (el, target, source, sibling) {
        //         if ( target.id === source.id ) return false
        //         if ( el.getAttribute('type') != 'element') return false
        //         //if ( el.getAttribute('type') === 'element' ) return false
        //         return true; // elements can be dropped in any of the `containers` by default
        //     },
        //     move: function ( el, source, handle, sibling) {
        //         if ( el.getAttribute('type') === 'container' ) return false
        //         return true
        //     }
        // });
        // let vm = this
        // drake.on ( 'drop' , (el,target,source,sibling) => {

        //     if ( this.editor.current ){
        //         let blockTarget = jp.query ( this.editor.document , '$..blocks[?(@.id=="' + target.id + '")]' )
        //         let obj = Object.assign({},this.editor.current)
        //         //this.$store.dispatch ( 'setCurrent' , null )
        //         let blockSource = jp.query ( this.editor.document , '$..blocks[?(@.id=="' + source.id + '")]' )
        //         this.$removeNode ( obj.id )
        //         this.$store.dispatch ( 'setCurrent' , null )                
        //         //this.$store.dispatch ( 'document' , { document , ...obj } )
        //         blockTarget[0].blocks.push ( obj )
        //         return
        //     }
        // })
    }
}
</script>

<style>
.whoobe-editor-container {
    min-height: 2rem;
}
</style>