<template>
    <div :class="'flex flex-col mr-2 '">
        <input type="checkbox" v-model="selected"/> {{ $attrs.title || $attrs.attr }}
    </div>
</template>

<script>
import classes from '@/scripts/tw.classes'
export default {
    data:()=>({
        selected: ''
    }),
    computed:{
        options(){
            return classes[this.$attrs.attr]
        }
    },
    props: [ 'css' ],
    watch:{
        selected(v){
            if ( v ){
                this.$emit('input', this.$attrs.prefix ? this.$attrs.prefix + this.options[0] : this.options[0])
                this.$emit ( 'css' , this.$attrs.prefix ? this.$attrs.prefix + this.options[0] : this.options[0] )
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
            if ( this.options.indexOf ( cl ) > -1 ){
                this.selected = true
                this.$emit('input',cl)
                this.$emit('css',cl)
                return
            }
        })
    }

}
</script>