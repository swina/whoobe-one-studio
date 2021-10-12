<template>
    <div class="flex flex-col">
        <div class="mr-2">
            <span class="capitalize">{{ attr }}</span>
            <div :class="'mb-1 w-8 h-8 border-2 rounded-full ' + color.front.replace(context,'bg-')" @click="palette=!palette,is_over=false"></div>
        </div>
        <Palette v-if="palette" @color="setColor" @close="palette=!palette"/>
    </div>
</template>

<script>
import classes from '@/scripts/tw.classes'
//import Palette from '@/components/common/Palette'
export default {
    name: 'TailwindBgGradient',
    //components: { palette },
    data:()=>({
        allCss: null,
        palette: false,
        is_over: false,
        color:{
            front: '',
            over: ''
        },
        color_over: '',
        
    }),
    props: ['css','attr'],
    computed:{
        colors(){
            return classes[this.attr]    
        },
        context(){
            return this.attr + '-'
        }
    },
    methods:{
        setColor ( color , tone ){
            let c = this.context
            if ( color ){
                tone ? c += color + '-' + tone : c += color
                this.color.front = c
            } else {
                this.color.front = ''
            }

            this.$emit('input', this.color.front + ' ')
            this.$emit('css', this.color.front + ' ' )
            this.palette = false
        },
        update(css){
            if ( !css.length ) return
            this.allCss = css
            let classes = this.allCss.split(' ')
            classes.forEach ( cl => {
                this.colors.forEach ( color => {
                    if ( cl.indexOf ( color ) ){
                            this.allCss = this.allCss.replace(cl,'')
                            this.color.front = cl
                            this.$emit('css',cl)
                    }
                })

            })
        }
    },
    
    mounted(){
        if ( !this.css || !this.css.length ) return
        this.allCss = this.css
        let classes = this.allCss.split(' ')
        classes.forEach ( cl => {
            this.colors.forEach ( color => {
                if ( cl.indexOf ( color ) > -1 ){
                    this.allCss = this.allCss.replace(cl,'')
                    this.color.front = cl
                    this.$emit('css',cl)
                }
            })

        })
        this.$emit('input', this.color.front )
    }
}
</script>