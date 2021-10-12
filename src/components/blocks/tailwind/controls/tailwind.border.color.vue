<template>
    <div class="flex flex-row">
        <div class="mr-2">
            Color 
            <div :class="'mb-1 w-8 h-8 border-2 rounded-full ' + color.color.replace('border','bg').replace('hover:','')" @click="palette=!palette,is_over=false"></div>
        </div>
        <div>
            Over 
            <div :class="'mb-1 w-8 h-8 border-2 rounded-full ' + color.hover.replace('hover:border','bg').replace('hover:','')" @click="palette=!palette,is_over=true"></div>
        </div>
        
        <Palette v-if="palette" @color="setColor" @close="palette=!palette"/>
    </div>
</template>

<script>
import classes from '@/scripts/tw.classes'
export default {
    name: 'TailwindBorderColor',
    data:()=>({
        allCss: null,
        palette: false,
        is_over: false,
        color:{
            color: '',
            hover: '',
        },
        color_over: '',
    }),
    props: ['css','attr'],
    computed:{
        colors(){
            return classes[this.attr]
        },
        context(){
            return 'border-'
        }
    },
    methods:{
        setColor ( color , tone ){
            let c = this.context
            tone ? c += color + '-' + tone : c += color
            !this.is_over ?
                this.color.color = c :
                    this.color.hover = 'hover:' + c
            this.$emit('input', Object.values(this.color).join(' ') )
            this.$emit('css', Object.values(this.color).join(' '))
            this.palette = false
        },
        update(css){
            if ( !css.length ) return
            this.allCss = css
            let classes = this.allCss.split(' ')
            classes.forEach ( cl => {
                this.colors.forEach ( color => {
                    if ( cl.indexOf ( color ) ){
                        if ( cl.indexOf('hover') > -1 ){
                            this.allCss = this.allCss.replace(cl,'')
                            this.color.hover = cl
                            this.$emit('css',cl)
                        } else {
                            this.allCss = this.allCss.replace(cl,'')
                            this.color.color = cl
                            this.$emit('css',cl)
                        }
                    }
                })

            })
            this.$emit('input', Object.values(this.color).join(' ') )
        }
    },
    watch:{
        /*
        css(v){
            this.update(v)
        }
        */
    },
    mounted(){
        if ( !this.css.length ) return
        this.allCss = this.css
        let classes = this.allCss.split(' ')
        classes.forEach ( cl => {
            this.colors.forEach ( color => {
                if ( cl.indexOf ( color ) > -1 ){
                    if ( cl.indexOf('hover') > -1 ){
                        this.color.hover = cl
                        this.$emit('css',cl)
                    } else {
                        this.allCss = this.allCss.replace(cl,'')
                        this.color.color = cl
                        this.$emit('css',cl)
                    }
                }
            })

        })
        this.$emit('input', Object.values(this.color).join(' ') )
    }
}
</script>