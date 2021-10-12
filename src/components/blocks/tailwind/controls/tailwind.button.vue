<template>
    <i :key="$randomID()" :class="active" class="rounded shadow h-8 w-8 flex items-center justify-center border mt-2 material-icons mr-1 hover:bg-indigo-300" @click="selected=!selected">{{$attrs.icon}}</i>
</template>

<script>
import classes from '@/scripts/tw.classes'
export default {
    name: 'MokaTailwindButton',
    data:()=>({
        selected: false
    }),
    
    props: [ 'css' ],
    computed:{
        active(){
            return this.selected ? 
                this.$attrs.classe + ' border-white bg-indigo-500 text-white' : this.$attrs.classe + ' border-transparent text-gray-600'
        }
    },
    watch:{
        selected(v){
            if ( v ){
                this.$emit('input', this.$attrs.attr)
                this.$emit ( 'css' , this.$attrs.attr )
            } else {
                this.$emit('input','')
                this.$emit('css','')
            }
        },
    },
    mounted(){
        if ( !this.css.length ) return
        let classes = this.css.split(' ')
        classes.forEach ( cl => {
            if ( this.$attrs.attr === cl ){
                this.selected = true
            }
        })
    },
    

}
</script>