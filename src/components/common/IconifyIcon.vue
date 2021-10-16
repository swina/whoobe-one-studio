<template>
    <span :ref="icona" v-if="$attrs.block || $attrs.icon" :id="id" @click="setCurrent($event)" class="z-highest" :class="selected">
        <Icon :is="component" :icon="icona" />
    </span>
</template>

<script>
import { Icon } from '@iconify/vue2';

export default {
    name: 'IconifyIcon',
    components: { Icon },
    data: ()=>({
        block: null,
        key: null
    }),
    computed:{
        id(){
            return this.$attrs.block ? this.$attrs.block.id : this.$attrs.icon
        },
        icona(){
            return this.$attrs.block && this.$attrs.block.data.icon ? this.$attrs.block.data.icon :
                this.$attrs.icon ? this.$attrs.icon : 'mi:home'
        },
        selected(){
            if ( !this.$attrs.block ) return this.$attrs.class
            if ( this.$attrs.mode ) return this.$attrs.block.css.css
            //let border =  'border border-dashed border-green-500'
            let borderUnselected = ' border border-dashed border-transparent hover:border-green-500 '
            if ( this.$attrs.block.css.css.includes ( 'border') ){
                borderUnselected = ' hover:border-green-500 '
            }
            return this.$store.state.editor.current && this.$store.state.editor.current.id === this.$attrs.block.id ?
                    'border border-dashed border-green-500' : borderUnselected
        },
        component(){
            return Icon
        }
    },
    
    methods:{
        setCss(){
            return this.$attrs.block.css.css
        },
        setCurrent(e){
            if ( !this.$attrs.mode ) {
                this.$store.dispatch('setCurrent',this.$attrs.block)
                this.$editorBus('floatingElement',this.$attrs.block.id) 
            } else {
                //e.preventDefault()
                this.$emit('click')
            }
        }
    },
    mounted(){
        if ( this.$attrs.block ){
            let el = this.$attrs.block
            if ( el.data.alpine ){
                Object.keys ( el.data.alpine ).forEach ( attr => {
                    this.$refs[el.data.icon].setAttribute(attr,el.data.alpine[attr])
                })
            }
        }
    }
}
</script>