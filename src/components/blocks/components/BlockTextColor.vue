<template>
    <div ref="blockColor" class="absolute z-modal w-64 -mt-20 flex flex-col justify-center items-center shadow">
        <div class="bg-gray-200 w-full p-1" @click="$emit('close')">
            <span v-if="$attrs.options.context==='textcolor'">Text Color</span>
            <span v-else>Fill Color</span>
        </div>
        <text-color v-if="$store.state.editor.current" 
            :attr="$attrs.options.context" 
            @css="setColor" 
            :css="allCss" 
            :front="frontColor" 
            :hover="hoverColor"/>
        <!-- <background-color v-if="$store.state.editor.current && $attrs.options.context==='bgcolor'" 
            :attr="$attrs.options.context" 
            @css="setColor" 
            :css="allCss" 
            :front="frontColor" 
            :hover="hoverColor"/> -->
        <!-- <m-icon icon="keyboard_return" class="absolute right-0 mr-2 h-6 w-6 bg-indigo-500 text-white p-1 rounded ml-1" @click="saveColor"/>
        <div class="clear-both">{{ opened }}</div> -->
    </div>
</template>

<script>
import classes from '@/scripts/tw.classes'
export default {
    name: 'BlockFloatingPalette',
    data:()=>({
        allCss: '',
        twClass: '',
        currentColor: '',
        opened: true,
        frontColor: '',
        hoverColor: ''
    }),
    components: {
        'TextColor' : () => import ( '@/components/blocks/tailwind/controls/tailwind.color.vue'),
        'BackgroundColor' : () => import (  '@/components/blocks/tailwind/controls/tailwind.bgcolor.vue' )
    },
    computed:{
         colors(){
            return classes[this.$attrs.options.context]
        },
    },
    methods:{
        setColor(color){
                this.allCss = this.allCss.replace ( this.currentColor , color )
                this.$store.state.editor.current.css.css = this.allCss
                this.opened = false
                if ( color != this.currentColor ) this.$emit('close')
        },
    },
    watch:{
    },
    mounted(){
        let clearCss = this.$store.state.editor.current.css.css.split(' ')
        this.$store.state.editor.current.css.css = [ ...new Set ( clearCss) ].join(' ')
        this.twClass = this.$store.state.editor.current.css.css
        this.allCss = this.twClass
        if ( !this.twClass || !this.twClass.length ) return
        let classes = this.allCss.split(' ')
        classes.forEach ( cl => {
            this.colors.forEach ( color => {
                if ( cl.includes ( color ) ){
                    if ( cl.indexOf('hover') > -1 ){
                        this.currentColor = cl.replace('hover:','')
                        this.hoverColor = cl.replace('hover:','')
                    } else {
                        this.currentColor = cl
                        this.frontColor = cl
                    }
                }
            })

        })
        
        let coords = this.$refs.blockColor.getBoundingClientRect()
        this.$emit ( 'position' , coords.height )
        if ( coords.right > window.innerWidth - 200 ){
            this.$refs.blockColor.style.left = coords.left - (coords.width * 2) + 'px'
        }
    }
}
</script>