<template>
    <div>
        Gradient
        <div class="flex flex-row justify-between">
            <div>
                From  
                <div :class="'mb-1 w-8 h-8 border-2 rounded-full ' + color('from')" @click="getColor('from')"></div>
            </div>
            <div>
                Via
                <div :class="'mb-1 w-8 h-8 border-2 rounded-full ' + color('via')" @click="getColor('via')"></div>    
            </div>
            <div>
                To
                <div :class="'mb-1 w-8 h-8 border-2 rounded-full ' + color('to')" @click="getColor('to')"></div>
            </div>
        </div>
        Direction                            
        <select class="nodark" v-model="direction" @change="update">
            <option value="">reset</option>
            <option v-for="(dr,index) in directions" :value="dr.value" :key="dr.label">{{dr.label}}</option>
        </select>
        <div :class="'w-full border my-1 h-10 ' + direction + ' ' + Object.values ( twgradient ).join( ' ' )"></div>
        <transition name="slidedown">
            <Palette v-if="palette" css="" @close="palette=!palette" @color="setColor"/>
        </transition>
    </div>
</template>

<script>
import classes from '@/scripts/tw.classes'
export default {
    data:()=>({
        twgradient: {
            direction: '',
            from: '',
            via: '',
            to: '',
        },
        gradients: [ 'from' , 'to' , 'via'],        
        direction: '',
        directions : [
            
            { label: 'Top'          , value: 'bg-gradient-to-t'     },
            { label: 'Top Right'    , value: 'bg-gradient-to-tr'    },
            { label: 'Right'        , value: 'bg-gradient-to-r'     },
            { label: 'Bottom Right' , value: 'bg-gradient-to-br'    },
            { label: 'Bottom'       , value: 'bg-gradient-to-b'     },
            { label: 'Bottom Left'  , value: 'bg-gradient-to-bl'    },
            { label: 'Left'         , value: 'bg-gradient-to-l'     },
            { label: 'Top Left'     , value: 'bg-gradient-to-tl'    }
        ],
        palette: false,
        currentCss: '',
        target: null
    }),
    props: [ 'css' ],// 'gradient','from','to','via'],
    computed:{
        colors(){
            return classes.colors
        }
    },
    mounted(){
        if ( !this.css ) return
        let allCss = this.css
        let classi = allCss.split(' ')
        classi.forEach ( (cl,index) => {
            if ( cl.replaceAll(' ','') != ' '){
                this.gradients.forEach ( gr => {
                    if ( cl.indexOf ( gr ) > -1 ){
                        this.colors.forEach ( color => {
                            if ( cl.indexOf ( gr + '-' + color) > - 1 ){
                                this.twgradient[gr] = cl
                            }
                        })
                    }
                    // if ( cl.indexOf ( gr ) > - 1 ){
                    //     this.twgradient[gr] = cl
                    //     allCss = allCss.replace(cl,'')
                    // }
                })
            }
            
            
        })
        this.directions.forEach ( dr => {
                if ( this.css.indexOf ( dr.value ) > -1 ){
                    this.direction = dr.value
                    allCss = allCss.replace(dr.value,'')
                }
        })
        //this.$emit ( 'input' , Object.values(this.twgradient).join(' ') )
        /*
        this.direction ?
            this.$emit ( 'input' , Object.values(this.twgradient).join(' ') ) :
                    this.$emit ('input','')
        this.$emit('css', this.twgradient.from )
        this.$emit('css', this.twgradient.to )
        this.$emit('css', this.twgradient.via )
        this.$emit('css', this.direction )
        */
        //this.$emit ( 'input' , Object.values(this.twgradient).join(' '))
        /*
        this.twgradient.gradient = this.gradient
        this.twgradient.from = this.from
        this.twgradient.to = this.to
        this.twgradient.via = this.via
        this.directions.forEach ( (values,index) => {
            if ( this.gradient === values.value ) { this.direction = index }
        })
        this.$emit('input' , Object.values(this.twgradient).join(' ') )
        //this.twgradient.from = this.twgradient.from ? this.twgradient.from.replace('bg','from') : ''
        //this.twgradient.to = this.twgradient.to ? this.twgradient.to.replace('bg','to') : ''
        //this.twgradient.via = this.twgradient.via ? this.twgradient.via.replace('bg','via') : ''
        */
    },
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
        update(){
            if ( !this.direction )  { 
                let nogradient = {
                    direction: '',
                    gradient: '',
                    from: '',
                    to: '',
                    via: ''
                }
                this.$emit ( 'input' , Object.values(nogradient).join(' ') )
                this.$emit('css','')
                return
            }
            this.twgradient.direction = this.direction
            this.$emit ( 'input' , Object.values(this.twgradient).join(' ') )
            this.$emit ( 'css' , Object.values(this.twgradient).join(' ') )
            
        },
        color(attr){
            return this.twgradient[attr] ? this.twgradient[attr].replace(attr,'bg') : ''
        },
        getColor(mode){
            this.target = mode
            this.palette =! this.palette
        },
        setColor(color,tone){

            this.palette = false
            if ( color ){
                let t = tone ? '-' + tone : ''
                
                    this.target === 'from' ? this.twgradient[this.target] = 'from-' + color + t :
                        this.target === 'to' ? this.twgradient[this.target] = 'to-' + color + t : 
                            this.target === 'via' ? this.twgradient[this.target] = 'via-' + color + t : '' 

                //this.twgradient.gradient = this.directions[this.direction].value
                //this.$emit ( 'gradient' , this.twgradient )
                this.update()
                /*
                this.direction ?
                    this.$emit ( 'input' , Object.values(this.twgradient).join(' ') ) :
                        this.$emit ('input','')
                this.$emit('css', this.$clean(Object.values(this.twgradient).join(' ')))
                */
            }

        }
    }
}
</script>