<template>
    <component :is="semantic" v-if="$attrs.doc" :ref="$attrs.doc.id" :class="classe" class="" :style="stile" :id="$attrs.doc.id"  @click="eventClick">
        <!-- :id="$attrs.doc.anchor ? $attrs.doc.anchor : $attrs.doc.id" -->
        <template v-for="block in $attrs.doc.blocks">
            <BlockContainerPreview v-if="!block.link && block && block.type === 'container'" :doc="block" :key="block.id"/>

            <BlockElement :id="block.id" v-if="!block.link && block && block.type != 'container' && block.type != 'slider' && block.tag !='iconify' && !block.link" :element="block" :key="block.id"/>
            
            <SliderPreview :id="block.id" v-if="block.type === 'slider'" :slider="block"/>
            <a v-if="block.link" :href="block.link">
                <BlockContainerPreview v-if="block && block.type === 'container'" :doc="block" :key="block.id"/>

                <BlockElement :id="block.id" v-if="block && block.type != 'container'&& block.type != 'slider' && block.tag !='iconify'" :element="block" :key="block.id"/>
                <IconifyIcon v-if="block.tag === 'iconify'" mode="render" :block="block"/>
            </a>
            
            <IconifyIcon :id="block.id" :ref="block.id" :key="block.id" v-if="!block.link && block.tag === 'iconify'" mode="render" :block="block"/>
            
        </template>
    </component>
</template>

<script>
import { eventBus } from '@/main'
import AlloyFinger from 'alloyfinger'
export default {
    name: 'BlockContainerPreview',
    data:()=>({
        current: null,
        display: true,
        floatingID: null,
        block: null,
        elementLink: false
    }),
    components:{
        'BlockElement'  : () => import ('@/components/blocks/preview/BlockElement.vue'),
        'SliderPreview'        : () => import ('@/components/blocks/preview/BlockSlider.vue')
    },
    computed:{
        classe(){
            this.block = this.$attrs.doc
            let cls = Object.values ( this.$attrs.doc.css ).join ( ' ' )
            this.display ? null : cls += ' hidden'
            return cls
        },
        stile(){
            let st = ''
            this.$attrs.doc.image && this.$attrs.doc.image.url ? st += 'background-image:url(' + this.$imageURL(this.$attrs.doc.image) + ')' : null
            this.$attrs.doc.font ? st += `font-family:"${this.$attrs.doc.font.replace('+',' ')}";` : null
            return this.$attrs.doc.style + st
        },
        semantic(){
            return this.$attrs.doc.semantic ? this.$attrs.doc.semantic : 'div'
        }
    },
    watch:{
        display(v){
            if ( v ) {
                if ( this.$refs ){
                    this.$animationElement ( this.$attrs.doc , this.$attrs.doc.id , this.$refs )
                }
            }
        }
    },
    methods:{
        setLink(block){
            console.log ( this.$refs[block.id][0].$el )
            // if ( block.events.click ){
            //     this.$refs[block.id][0].$el.setAttribute ( 'x-on:click' , block.events.click + ',alert("clicked")' )
            // }
        },
        component(block){
            if ( !block ) return null
            if ( block.semantic ) return block.semantic
            return block.hasOwnProperty('level') ? 'h' + block.level : block.element
        },
        eventClick(){
            this.$attrs.doc.events.click ?
                eventBus.$emit ( this.$attrs.doc.events.click ) : null
        }
    },
    mounted(){
        
        this.$attrs.doc.events.display ?
            this.display = false : null

        this.$attrs.doc.events.display ?
            eventBus.$on ( this.$attrs.doc.events.display , () => {
                this.display =! this.display
            }) : null
        
        this.$attrs.doc.events.hide ?
            eventBus.$on ( this.$attrs.doc.events.hide , () => {
                this.display =! this.display
            }) : null
        this.$attrs.doc.gsap.animation && this.$attrs.doc.gsap.duration && this.display ?
            this.$animation(this.$attrs.doc,this.$attrs.doc.id,this.$refs) : null
        
        this.$refs[this.$attrs.doc.id].removeAttribute('doc')

        if ( this.$attrs.doc.data.hasOwnProperty('attributes') ){
            Object.keys(this.$attrs.doc.data.attributes).forEach( attribute => {
                this.$refs[this.$attrs.doc.id].setAttribute ( attribute , this.$attrs.doc.data.attributes[attribute] )
            })
        }

        if ( this.$attrs.doc.data.alpine ){
            Object.keys( this.$attrs.doc.data.alpine ).forEach ( attr => {
                
                if ( this.$attrs.doc.data.alpine[attr] ){
                    console.log ( attr )
                    this.$refs[this.$attrs.doc.id].setAttribute( attr , this.$attrs.doc.data.alpine [ attr ])
                }
            })
        }
        
    }
}
</script>

