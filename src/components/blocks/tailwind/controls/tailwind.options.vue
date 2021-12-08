<template>
    <div class="flex flex-col clear-both">
        <span class="capitalize">{{$attrs.title||$attrs.attr}}</span>
        <select class="w-full bg-white text-black p-1" v-model="selected" @change="$emit('input',selected)">
            <option value=""></option>
            <option v-for="opt in options" :value="opt.hasOwnProperty('label')?opt.value:opt">{{ option(opt) }}</option>
        </select>
    </div>
</template>

<script>
import classes from '@/scripts/tw.classes'
export default {
    data:()=>({
        selected: '',
    }),
    computed:{
        options(){
            return classes[this.$attrs.attr]
        }
    },
    props: [ 'css' ],
    watch:{
        selected(v){
            this.$emit('input', this.$attrs.required ? this.$attrs.required + ' ' + v : v)
            this.$emit('css', this.$attrs.required ? this.$attrs.required + ' ' + v : v)
        }
    },
    methods:{
        option(opt){
            if ( !opt.hasOwnProperty('label') ){
              const strArr = opt.split('-');
              strArr.shift()
              const label = strArr.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
                if ( opt.charAt(0) === '-' ){
                    return '-' + opt.split('-')[opt.split('-').length-1]
                }
                return label;
            } else {
                return opt.label
            }
        }
    },
    mounted(){
        if ( !this.css ) return
        let classes = this.css.split(' ')
        let options
        if ( this.options[0].hasOwnProperty ( 'label') ){
            options = this.options.map ( opt => {
                return opt.value
            })
        } else {
            options = this.options
        }
        classes.forEach ( cl => {
            if ( options.indexOf ( cl ) > -1 ){
                this.selected = cl
                this.$emit('input',this.$attrs.required ? this.$attrs.required + ' ' + cl : cl)
                this.$emit('css', this.$attrs.required ? this.$attrs.required + ' ' + cl : cl)
                return
            }
        })
    }

}
</script>
