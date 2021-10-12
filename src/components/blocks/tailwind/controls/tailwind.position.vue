<template>
    <div class="mt-2">
        Translate
        <div class="flex flex-row text-center w-full items-center justify-center">
            <i :class="'material-icons cursor-pointer'">chevron_left</i>
            <input type="range" :min="-pixels.length+1" :max="pixels.length-1" v-model="posX" class="mx-2">
            <i class="material-icons cursor-pointer">chevron_right</i>
        </div>
        <div class="w-full text-center">{{posX}}</div>
        <div class="flex flex-row text-center w-full items-center justify-center">
            <i class="material-icons cursor-pointer" @click="posY > -pixels.length+1 ? posY-- : null">expand_less</i>
            <input type="range" :min="-pixels.length+1" :max="pixels.length-1" v-model="posY" class="mx-2">
            <i class="material-icons cursor-pointer" @click="posY < pixels.length-1 ? posY++ : null">expand_more</i>
            
        </div>
        <div class="w-full text-center">{{posY}}</div>
    </div>
</template>

<script>
export default {
    data:()=>({
        posX: 0,
        posY:0,
        marginLeft: 0,
        pixels : [ 1 , 4 , 8 , 12 , 16 , 20 , 24 , 32 , 40 , 48, 64 , 80 , 96 , 128 , 160 , 192 , 224 , 256 ],
        xcss: '',
        ycss: '',
        axisScope: {
            x : 'l',
            y : 't'
        },
        translates: [
            'translate-x',
            'translate-y'
        ],
        scope:''
    }),
    props: [ 'css' ],
    computed:{
        init(){
            this.position = this.css
            return true
        }
    },
    mounted(){
        if (!this.css) return
        let classi = this.css.split( ' ' )
        classi.forEach ( cl => {
            this.translates.forEach ( tr => {
                if ( cl.indexOf ( tr ) > -1 ){
                    let value = cl.split('-')[cl.split('-').length-1]
                    let negative = cl.charAt(0,1) === '-' ? -1 : 1
                    cl.indexOf ( '-x-') > -1  ?
                        value ? this.posX = (this.pixels.indexOf ( parseInt(value)*4 )*negative) : this.posX = 0 :
                            value ? this.posY = (this.pixels.indexOf ( parseInt(value)*4 )*negative) : this.posY = 0 
                }

            })
        })
        /*
        if ( this.position ){
            let value =  this.position.split('-')[this.position.split('-').length-1]
            this.scope = this.axisScope[this.$attrs.axis]
            if ( this.$attrs.axis === 'x' )
                
                this.position ? this.posX = this.pixels.indexOf ( parseInt(value)*4 )  : this.posX = 0
            if ( this.$attrs.axis === 'y' )
                this.position ? this.posY = this.pixels.indexOf ( parseInt(value)*4 ) : this.posY = 0
            
            if ( this.position.charAt(0,1) === '-' ){
                this.$attrs.axis === 'x' ? this.posX = -this.posX : this.posY = -this.posY
            }
        } */
        
    },
    watch:{
        posX(v){
            if ( v === 0 ) { 
                this.$emit ( 'input' , '' )
                return
            }
            let p = -v
            let axis
            v < 0 ? p = -v : p = v
            v < 0 ?  axis = '-translate-x-' : axis = 'translate-x-'
            parseInt(p) ? this.xcss = axis + this.pixels[p]/4 : this.xcss = ''
            this.$emit ( 'input' , ' transform ' + this.xcss + ' ' + this.ycss + ' ')
            this.$emit ( 'css' , this.xcss + ' ' + this.ycss + ' ')
        },
        posY(v){
            if ( v === 0 ) { 
                this.$emit ( 'input' , '' )
                return
            }
            let p = -v
            let axis
            v < 0 ? p = -v : p = v
            v < 0 ?  axis = ' -translate-y-' : axis = ' translate-y-'
            parseInt(p) ? this.ycss = axis + this.pixels[p]/4 : this.ycss = ''
            this.$emit ( 'input' , ' transform ' + this.xcss + ' ' + this.ycss + ' ')
            this.$emit ( 'css' , this.xcss + ' ' + this.ycss + ' ')
        },
    },
}
</script>