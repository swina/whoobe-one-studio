<template>
    <div class="modal whoobe-modal shadow w-full bg-white z-highest rounded" :class="$attrs.width" v-if="dialog">
        <m-icon css="absolute top-0 right-0 h-10 w-10 flex items-center justify-center m-2" icon="close" @click="closeDialog"/>
        <div class="h-10 flex items-center border-b bg-indigo-500 text-white text-lg px-2 font-bold">
            <slot name="title"></slot>
       </div>
        <div class="p-2">
            <slot name="content">

            </slot>
        </div>
    </div>
</template>

<script>
import { dialogBus } from '@/main'
export default {
    name: 'Dialog',
    data:()=>({
        dialog: true,
        name: ''
    }),
    computed:{
        component(){
            this.name = this.$attrs.component
            return () => import ( '@/components/' + this.name )
        }
    },
    methods:{
        closeDialog(){
            dialogBus.$emit ( 'closeDialog' )
        }
    }
}
</script>