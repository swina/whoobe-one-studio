<template>
    <div :class="classe" type="container" class="relative dragula-container cursor-pointer p-1" :style="stile" :id="$attrs.doc.id" :ref="$attrs.doc.id">
        {{ $attrs.doc.blocks.length ? null : $attrs.doc.element }}
        <template v-for="block in $attrs.doc.blocks">
            <BlockContainer 
                v-if="block.type === 'container' || block.tag ==='container' || block.tag === 'blocks'" :doc="block" :key="block.id" :level="parseInt($attrs.level)+1"/>
            <Slider v-if="block.type === 'slider'" :doc="block" :level="parseInt($attrs.level)+1"/>
            <BlockElement v-if="block && block.type != 'slider' && block.type != 'container' && block.tag != 'iconify' && block.tag != 'container'" :element="block" :key="block.id" :level="parseInt($attrs.level)+1" @selected="setFloating"/>
            <IconifyIcon v-if="block.tag==='iconify'" :class="classeElement(block)" :block="block" @selected="setFloating"/>
        </template>
        <!-- <span v-if="!$attrs.doc.blocks.length"> {{ $attrs.doc.tag }} </span> -->
        <div class="block-selector absolute inset-0" :class="selector" @click="setCurrent($attrs.doc)" @mouseenter="float()" @mouseleave="nofloat()" :data-block-tag="$attrs.doc.semantic||$attrs.doc.tag">
            
        </div>
        <!-- <div id="elementSelector" class="hidden absolute inset-0"></div> -->
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { eventBus , editorBus } from '@/main'
import dragula from 'dragula'
import jp from 'jsonpath'
export default {
    name: 'BlockContainer',
    data:()=>({
        current: null,
        floatingID: null,
        block: null,
        elementLink: false
    }),
    components:{
        'BlockElement'  : () => import ('@/components/blocks/BlockElement.vue'),
        'BlockLink'     : () => import ('@/components/blocks/components/BlockLink.vue')
    },
    computed:{
        ...mapState ( ['editor'] ),
        classe(){
            this.block = this.$attrs.doc
            let css = Object.values ( this.$attrs.doc.css ).join ( ' ' )
            css += ' z-' + this.$attrs.level
            this.$attrs.doc.tag === 'document' ? css += ' p-2' : null
            css = css.replace ( 'modal' , '')
            return  css
        },
        stile(){
            let st = ''
            if ( this.block.image && this.block.image.url ){
                st += "background-image:url(" + this.$imageURL(this.block.image) + ");"
            }
            this.block.font ? st += `font-family:"${this.block.font.replace('+',' ')}";` : null
            return st + this.$attrs.doc.style
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
        classeElement(block){
            let cl = block.css.css.replace('hidden','')
            cl.replace ( 'modal' , '')
            return cl
        },
        component(block){
            if ( !block ) return null
            return block.hasOwnProperty('level') ? 'h' + block.level : block.element
        },
        setCurrent(block){
            //let sel = document.getElementById('elementSelector')
            //sel.classList = ''
            // this.$editorBus('floatingElement',block.id) 
            // let coords = this.$refs[this.block.id].getBoundingClientRect()
            this.editor.current && this.editor.current.id === block.id ?
                this.$store.dispatch ( 'setCurrent' , null ) :
                    this.$store.dispatch ( 'setCurrent' , block )
            this.editor.current && this.editor.current.id === block.id ?                    
                this.$editorBus('floatingElement',block.id) : null 
            this.editor.current && !this.editor.current.image ?
                this.editor.current.image = { url: this.editor.current.image } : null
        },
        setFloating(element){
            this.floatingID = element.id
            let floating = document.querySelector('.block-floating')
            floating.style.left = element.coords.x
            floating.style.top = element.coords.y
        },
        float(){
            this.floatingID = this.$attrs.doc.id
        },
        nofloat(){
           this.floatingID = null
        },
        floating(){
            return this.editor.current ?
                    this.editor.current.id == this.$attrs.doc.id ? 'opacity-100' :
                        this.floatingID === this.$attrs.doc.id ? 'opacity-0' : 'opacity-0' : 'opacity-0'
                        
        }
    },
    mounted(){
        editorBus.$on ('linkBlock',()=>{
            this.elementLink =! this.elementLink
        })
        var drake = dragula({
            isContainer: function (el) {
                return el.classList.contains('dragula-container');
            },
            accepts: function (el, target, source, sibling) {
                if ( target.id === source.id ) return false
                if ( el.getAttribute('type') != 'element') return false
                //if ( el.getAttribute('type') === 'element' ) return false
                return true; // elements can be dropped in any of the `containers` by default
            },
            move: function ( el, source, handle, sibling) {
                if ( el.getAttribute('type') === 'container' ) return false
                return true
            }
        });
        let vm = this
        drake.on ( 'drop' , (el,target,source,sibling) => {

            if ( this.editor.current ){
                let blockTarget = jp.query ( this.editor.document , '$..blocks[?(@.id=="' + target.id + '")]' )
                let obj = Object.assign({},this.editor.current)
                //this.$store.dispatch ( 'setCurrent' , null )
                let blockSource = jp.query ( this.editor.document , '$..blocks[?(@.id=="' + source.id + '")]' )
                this.$removeNode ( obj.id )
                this.$store.dispatch ( 'setCurrent' , null )                
                //this.$store.dispatch ( 'document' , { document , ...obj } )
                blockTarget[0].blocks.push ( obj )
                return
            }
        })
    }
}
</script>

<style>
.whoobe-editor-container {
    min-height: 2rem;
}
</style>