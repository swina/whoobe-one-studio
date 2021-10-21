<template>
    <div ref="blockColor" id="blockColor" class="w-64 flex flex-col w-full justify-center items-center shadow">
        <div class="flex justify-center items-center w-64 py-2 cursor-pointer">
            <div class="flex flex-col items-center justify-center">
                Foreground
                <span class="w-8 h-8 rounded-full border mr-2" :class="frontColor.replace('text-','bg-')" @click="palette=true,hover=false"/>
            </div>
            <div class="flex flex-col items-center justify-center">
                Over
                <span class="w-8 h-8 rounded-full border ml-2" :class="hoverColor.replace('hover:','').replace('text-','bg-')" @click="palette=true,hover=true"></span>
            </div>
        </div>
        <div v-if="palette" class="absolute -mt-40">
            <palette class="-mt-40" @color="setColorNew" @close="palette=!palette" :context="context" :css="hover?hoverColor:frontColor"/>
        </div>
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
        hoverColor: '',
        palette:false,
        hover: false
    }),
    components: {
        'TextColor' : () => import ( '@/components/blocks/tailwind/controls/tailwind.color.vue'),
        'BackgroundColor' : () => import (  '@/components/blocks/tailwind/controls/tailwind.bgcolor.vue' )
    },
    computed:{
         colors(){
            return classes[this.$attrs.options.context]
        },
        context(){
            return this.$attrs.options.context === 'bgcolor' ? 'bg-' : 'text-'
        }
    },
    methods:{
        setColorNew ( color , tone ){
            this.palette = false
            tone ? color += '-' + tone : null
            if ( !this.hover ){
                this.context + color
                this.allCss =  this.allCss.replace ( this.frontColor , ' ' + this.context + color )
                this.frontColor = this.context + color
            } else {
                this.allCss =  this.allCss.replace ( this.hoverColor , ' hover:' + this.context + color )
                this.hoverColor = 'hover:' + this.context + color
            }
            this.$store.state.editor.current.css.css = this.$clean ( this.allCss )
        },
        // setColor(color){
        //         color.includes('hover:') ?
        //             ( this.allCss = this.allCss.replace ( this.hoverColor , color ) , this.hoverColor = color ) :
        //             ( this.allCss = this.allCss.replace ( this.frontColor , color ) , this.frontColor = color )
                
        //         this.$store.state.editor.current.css.css = this.allCss
        //         this.opened = false
        //         if ( color != this.currentColor ) this.$emit('close')
        // },
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
                        this.currentColor = cl //.replace('hover:','')
                        this.hoverColor = cl //.replace('hover:','')
                    } else {
                        this.currentColor = cl
                        this.frontColor = cl
                    }
                }
            })

        })

        
    }
}
</script>