<template>
    <div v-if="slider" :class="classe" class="relative">
        <div class="flex z-modal items-center absolute bottom-0 -mb-10 mt-1 border-2 border-t-0 shadow left-0 w-full bg-white h-10">
            <m-icon icon="add" @click="addSlide" class="text-gray-600 m-2" title="Add slide"/>
            <div v-if="slider.blocks" class="flex">
                <template v-for="(slide,index) in slider.blocks">
                    <IconButton :key="'slide_' + index" 
                        class="px-2 py-0 border btn  hover:bg-blue-500 hover:text-white text-xs" :class="currentIndex===index?'btn-purple':'bg-gray-200 text-black'"  :text="'# ' + (index+1)" 
                        icon="close" 
                        @click="currentIndex=index,$store.dispatch('setCurrent',slide)" @close="slider.blocks.splice(index,1),$store.dispatch('setCurrent',null),currentIndex=slider.blocks.length-1"/>
                </template>
            </div>
        </div>
        <BlockContainer 
            :data-slider-tag="'slide ' + (currentIndex+1)"
            v-if="slider.blocks"
            :doc="slider.blocks[currentIndex]" 
            :key="'slide_' + currentIndex" 
            :level="parseInt($attrs.level)+1"/>
            
        <div class="slider-selector absolute inset-0" :class="selector" @click="$store.dispatch('setCurrent',slider)"  data-block-tag="slider">
            
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
        classe(){
            //this.block = this.slider
            let css = Object.values ( this.slider.css ).join ( ' ' )
            css += ' z-' + this.$attrs.level
            //this.editor.current && this.editor.current.id === this.$attrs.doc.id ? 
            //    css += ' border border-red-500 ' : css += ' border border-dashed hover:border-red-500'
            css += ' border-2 border-dashed border-blue-400 p-2'
            return  css
        },
        selector(){

            let cls = 'z-' + this.$attrs.level
            if ( this.editor.current && this.editor.current.id === this.$attrs.doc.id ){
                this.$attrs.doc.tag === 'document' ? 
                    cls += ' border-2 border-gray-600 ' : 
                    cls += ' border border-red-400'
            } else {
                this.$attrs.doc.tag === 'document' ? 
                    cls += ' border-2 border-transparent shadow ' :   
                    cls += ' border border-dashed border-transparent hover:border-red-400'
            }

            return cls.replace('md:hidden','')
        },
        
    },
    methods:{
        addSlide(){
            this.$store.dispatch('setCurrent',this.slider)
            let slide = new Element().createElement('Flexbox')
            this.slider.blocks.push ( slide )
            this.$store.dispatch ( 'setCurrent' , this.slider )
            //this.$store.state.editor.current.blocks.push ( slide )
        },
        setFloating(){
            let el = document.querySelector('#' + this.floatingID )
            let coords = el.getBoundingClientRect()
            this.element.coords = coords
            this.$emit ( 'selected' , this.element )
        },
        
    },
    mounted(){
        this.slider = this.$attrs.doc

    }
}
</script>

<style>
.whoobe-editor-container {
    min-height: 2rem;
}
</style>