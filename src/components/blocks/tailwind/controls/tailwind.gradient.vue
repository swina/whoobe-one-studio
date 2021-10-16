<template>
    <div>
        Presets
        <div class="flex flex-wrap w-full justify-start cursor-pointer">
            <template v-for="gradient in presets">
                <div class="h-8 w-8 mx-1 mb-1" :title="gradient" :class="gradient + direction" @click="setCSS(gradient)"></div>
            </template>
        </div>
        <button class="btn" @click="clearGradient">Clear</button><button class="btn" @click="randomGradient">Random</button>
    </div>
</template>

<script>
import classes from '@/scripts/tw.classes'
export default {
    name: 'TailwindBGGradient',
    data:()=>({
        allCss:'',
        direction: ' bg-gradient-to-bl',
        presets: [
            ' from-white to-black ',
            ' from-blue-800 to-pink-700 ',
            ' from-orange-300 to-red-900 ',
            ' from-blue-300 to-blue-900 ',
            ' from-green-300 to-blue-900 ',
            ' from-white to-blue-300 ',
            ' from-red-200 to-red-700 ',
            ' from-lime-400 to-red-700 ',
            ' from-pink-400 to-black ',
            ' from-white to-red-700 ',
            ' from-yellow-100 to-gray-800 ',
            ' from-yellow-300 to-black ',
        ]
    }),
    props: [ 'css' ],
    computed:{
        colors(){
            return classes.colors
        },
        gradients(){
            return classes.gradients
        }
    },
    // mounted(){
    //     if ( !this.css ) return
    //     let allCss = this.css
    //     let classi = allCss.split(' ')
    //     classi.forEach ( (cl,index) => {
    //         if ( cl.replaceAll(' ','') != ' '){
    //             this.gradients.forEach ( gr => {
    //                 if ( cl.indexOf ( gr ) > -1 ){
    //                     this.colors.forEach ( color => {
    //                         if ( cl.indexOf ( gr + '-' + color) > - 1 ){
    //                             this.twgradient[gr] = cl
    //                         }
    //                     })
    //                 }
    //             })
    //         }
            
            
    //     })
    //     this.directions.forEach ( dr => {
    //             if ( this.css.indexOf ( dr.value ) > -1 ){
    //                 this.direction = dr.value
    //                 allCss = allCss.replace(dr.value,'')
    //             }
    //     })
       
    // },
    watch:{
        
        
        /*
        twgradient:{

            handler(v){
                    
                    this.twgradient.direction.length ?
                        this.$emit ( 'input' , Object.values(this.twgradient).join(' ') ) :
                            this.$emit ('input','')
                    this.$emit('css', this.$clean(Object.values(this.twgradient).join(' ')))
                    //this.$emit ( 'input' , Object.values(this.twgradient).join(' ') )
                
            },
            deep: true
        }
        */
    },
    methods:{
        setCSS(css){
            this.clearGradient()
            this.$store.state.editor.current.css.css += css + this.direction
        },
        clearGradient(){
            if ( !this.css ) return 
            this.allCss = this.css
            let classi = this.css.split(' ')
            classi.forEach ( (cl,i) => {
                if ( cl.includes('from-') || cl.includes('to-') || cl.includes('via-') ){
                    this.allCss = this.allCss.replace ( cl , '')
                }
            })
            this.$store.state.editor.current.css.css = this.allCss
        },
        randomGradient(){
            let color1 = parseInt(Math.random() * (this.colors.length - 0) + 0);
            let color2 = parseInt(Math.random() * (this.colors.length - 0) + 0);
            let gradient1 = parseInt(Math.random() * (9 - 1) + 1)*100;
            let gradient2 = parseInt(Math.random() * (9 - 1) + 1)*100;
            let gradient = ' from-' + this.colors[color1] + '-' + gradient1 + ' to-' + this.colors[color2] + '-' + gradient2 + ' '
            this.clearGradient()
            this.$store.state.editor.current.css.css += gradient + this.direction
            this.presets.push ( gradient )
        }
    },
    mounted(){
        if ( !this.css ) return
        let classi = this.css.split(' ')
        classi.forEach ( cl => {
            if ( cl.includes ( 'bg-gradient-to') ){
                this.direction = cl
            }
        })
        this.allCss = this.css
    }
}
</script>