<template>
    <div v-if="attr" :key="$randomID()" class="flex flex-row">
        <div class="mr-2">
            Color 
            <div :class="'mb-1 w-8 h-8 border-2 rounded-full ' + color.front.replace('text','bg')" @click="palette=!palette,is_over=false"></div>
        </div>
        <div>
            Over 
            <div :class="'mb-1 w-8 h-8 border-2 rounded-full ' + color.over.replace('hover:text','bg').replace('hover:','')" @click="palette=!palette,is_over=true"></div>
        </div>
        
        <Palette v-if="palette" @color="setColor" @close="palette=!palette"/>
    </div>
</template>

<script>
import classes from '@/scripts/tw.classes'
export default {
    name: 'TailwindColor',
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
            return this.attr === 'bgcolor' ? 'bg-' : 'text-'
        }
    },
    methods:{
        setColor ( color , tone ){
            let c = this.context
            if ( color ){
                tone ? c += color + '-' + tone : c += color
                !this.is_over ?
                    this.color.front = c : this.color.over= 'hover:' + c
            } else {
                !this.is_over ?
                    this.color.front = '' : this.color.over= ''
            }
            console.log ( this.color )
            this.$emit('input', Object.values(this.color).join(' ') + ' ' )
            this.$emit('css', Object.values(this.color).join(' ') + ' ')
            this.palette = false
        },
        update(css){
            if ( !css.length || !css ) return
            this.allCss = css
            let classes = this.allCss.split(' ')
            classes.forEach ( cl => {
                this.colors.forEach ( color => {
                    if ( cl.indexOf ( color ) ){
                        if ( cl.indexOf('hover') ){
                            this.allCss = this.allCss.replace(cl,'')
                            this.color.front = cl
                            this.$emit('css',cl)
                        } else {
                            this.allCss = this.allCss.replace(cl,'')
                            this.color.over = cl
                            this.$emit('css',cl)
                        }
                    }
                })

            })
        }
    },
    watch:{
        css(v){
            if ( this.$attrs.front ) this.color.front = this.$attrs.front
            if ( this.$attrs.hover ) this.color.over = this.$attrs.hover
        }   
    },
    mounted(){
        if ( !this.css || !this.css.length ) return
        this.allCss = this.css
        let classes = this.allCss.split(' ')
        
        classes.forEach ( cl => {
            this.colors.forEach ( color => {
                if ( cl.indexOf ( color ) > -1 ){
                    if ( cl.indexOf('hover') > -1 ){
                        this.color.over = cl
                        this.$emit('css',cl)
                    } else {
                        this.allCss = this.allCss.replace(cl,'')
                        this.color.front = cl
                        this.$emit('css',cl)
                    }
                }
            })

        })
        if ( this.$attrs.front ) this.color.front = this.$attrs.front
        if ( this.$attrs.hover ) this.color.over = this.$attrs.hover
        this.$emit('input', Object.values(this.color).join(' ') )
    }
}
</script>