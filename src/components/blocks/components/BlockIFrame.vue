<template>
    <iframe 
        :ref="el.id"
        v-if="el.content" 
        :src="el.src + el.content" 
        :class="classe" 
        :autoplay="el.hasOwnProperty('options')?el.options.autoplay:true" 
        :controls="el.hasOwnProperty('options')?el.options.controls:true"
        :loop="el.hasOwnProperty('options')?el.options.loop:true" @click="setCurrent(el),clickEvent"
        :data-element-tag="el.tag">
    </iframe>
</template>


<script>
import { mapState } from 'vuex'
var gsap
export default {
    name: 'IFrameElement',
    props: [ 'el' ],
    computed:{
        ...mapState ( [ 'editor' ] ),
        classe(){
            if ( !this.editor.current && !this.el ) {
                return
            }
            let cls = ''
            cls += this.el.css.css + ' ' + this.el.css.container
            cls += ' z-' + (parseInt(this.$attrs.level)+1)
            if ( this.editor.current && this.editor.current.id === this.el.id ){
                cls += ' shadow p-2 border-2 border-dashed border-yellow-400'
            } else {
                cls += ' p-2 border-2 border-dashed border-transparent hover:border-yellow-400'
            }
            this.editor.current && this.editor.current.id === this.el.id ?
                 cls += ' shadow' :
                 cls += ' '
            
            return cls
        }
    },
    methods:{
        setCurrent(block){
            if ( this.editor.current && this.editor.current.id === block.id ){
                this.$store.dispatch ( 'setCurrent' , null )
                //this.$refs[block.id].blur()
                return
            }

            //this.$refs[block.id].setAttribute ( 'contenteditable' , block.editable )
            this.$store.dispatch ( 'setCurrent' , block )
            this.$editorBus('floatingElement',block.id) 
            let coords = this.$refs[this.el.id].getBoundingClientRect()
            this.el.coords = coords
        },
        clickEvent(){
            this.el.events.display ?
                this.eventBus.$emit ( this.el.events.display ) : null
        },
    },
    mounted(){
        gsap = this.$animation(this.el,this.el.id,this.$refs)
    },

    beforeDestroy(){
        if ( gsap ) gsap.timeline().kill()
    }
}
</script>