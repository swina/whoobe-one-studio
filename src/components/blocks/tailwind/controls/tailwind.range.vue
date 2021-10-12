<template>
    <div class="flex flex-col">
            <div class="flex flex row">
                <input class="w-3/4" type="range" :min="min" :max="le" v-model="selected">
                <label class="capitalize">{{ $attrs.title || $attrs.attr }} 
                    {{valore}}
                </label>
            </div>
    </div>
</template>

<script>
import classes from '@/scripts/tw.classes'
export default {
    data:()=>({
        min:-1,
        max:null,
        le: 0,
        selected: -1,
        values:[]
    }),
    computed:{
        valore(){
            if ( this.min < -1 ){
                return this.selected === 0 ? '' : '[' + (parseInt(this.selected)-1) + ']'
            }
        },
        options(){
            if ( this.$attrs.negative ){
                this.le = parseInt((this.le/2))
                this.min = -this.le
                this.selected = 0
            }
            return classes[this.$attrs.attr]
        }
    },
    props: [ 'css' ],
    watch:{
        selected(v){
            let index = v
            if ( this.$attrs.negative ) {
                index = parseInt(v) + parseInt(this.le)
            }
            this.$emit('input', this.$attrs.required ? this.$attrs.required + ' ' + this.options[index] : this.options[index])
            this.$emit('css', this.$attrs.required ? this.$attrs.required + ' ' + this.options[index] : this.options[index])
            
        },
    },
    
    mounted(){  
        if ( !this.css.length ) return
        this.min = -1
        this.le = parseInt(classes[this.$attrs.attr].length)-1
        if ( this.$attrs.negative ){
            this.selected = 0
        }
        let cls = this.css.split(' ')
        cls.forEach ( cl => {
            if ( this.options.indexOf ( cl ) > -1 ){
                this.selected = this.options.indexOf ( cl )
                if ( this.$attrs.negative ){
                    this.selected = parseInt(this.options.indexOf ( cl )) - this.le
                }
                this.$emit('input',this.$attrs.required ? this.$attrs.required + ' ' + cl : cl)
                this.$emit('css', this.$attrs.required ? this.$attrs.required + ' ' + cl : cl)
                return
            }
        })
    }

}
</script>