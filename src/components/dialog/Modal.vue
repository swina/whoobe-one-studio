<template>
    <div class="modal whoobe-modal w-full bg-white z-modal" :class="classe" v-if="dialogComponent">
        <m-icon class="absolute top-0 right-0 m-1 z-modal bg-gray-800 text-white text-3xl" icon="close" @click="dialogComponent=null"/>
        <div class="h-10 w-full flex items-center text-white text-lg px-2 font-bold" :class="topBar?'bg-gray-800':'bg-transparent'">
            {{ title }}
       </div>
        <div class="p-2">
            <component :is="dialogComponent" :options="options" @close="dialogComponent=null"/>
        </div>
    </div>
</template>

<script>
import { eventBus , modalBus , editorBus } from '@/main'
export default {
    name: 'Modal',
    data:()=>({
        dialogComponent: null,
        title: '',
        width: 'w-1/3',
        options: null,
        topBar: true
    }),
    computed: {
        classe(){
            let cls = this.width
            this.topBar ? cls += ' shadow rounded' : null
            return cls
        }
    },
    mounted(){
        modalBus.$on ( 'confirm' , (html) => {
            this.dialogComponent = () => import ( '@/components/common/Confirm.vue')
            this.title = 'Confirm'
            this.width = 'w-1/4 h-auto'
            this.topBar = true
            this.options = { html: 'Do you want to save before to close?'}
        }),
        modalBus.$on ( 'viewHTML' , (html) => {
            this.dialogComponent = () => import ( '@/components/blocks/components/BlockHtml.vue')
            this.title = 'HTML source'
            this.width = 'w-3/4 h-3/4'
            this.topBar = true
            this.options = { html: html}
        }),
        modalBus.$on ( 'blockSettings' , () => {
            this.dialogComponent = () => import ( '@/components/blocks/components/BlockSettings.vue')
            this.title = 'Page Settings'
            this.width = 'w-1/4'
            this.topBar = true
            this.options = {}
        })

    }
}
</script>