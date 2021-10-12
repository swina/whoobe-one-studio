<template>
    <div class="flex flex-col">
        Height  
        <select class="w-full nodark" v-model="model" @change="$emit('input',model),$emit('css',model)">
            <option value=""></option>
            <option v-for="opt in options" :value="opt.value">{{ opt.label }}</option>
        </select>
    </div>
</template>

<script>
import classes from '@/scripts/tw.classes'
export default {
    data:()=>({
        model: '',
    }),
    computed:{
        options(){
            return classes[this.$attrs.attr]
        }
    },
    props: [ 'css' ],
    mounted(){
        if ( !this.css.length ) return
        let classes = this.css.split(' ')
        classes.forEach ( cl => {
            this.options.forEach ( opt => {
                if ( this.$clean(cl) === opt.value  ){
                    this.model = cl
                    this.$emit('input',cl)
                    this.$emit('css',cl)
                }
            })
        })
    }

}
</script>