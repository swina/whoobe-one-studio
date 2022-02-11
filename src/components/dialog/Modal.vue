<template>
    <div class="whoobe-modal w-full bg-white z-modal" :class="classe" v-if="display">
        <m-icon class="absolute top-0 right-0 h-10 w-10 z-modal bg-gray-800 text-white text-3xl" icon="close" @click="display=!display,dialogComponent=null"/>
        <div class="h-10 w-full flex items-center text-white text-lg px-2 font-bold" :class="topBar?'bg-gray-800':'bg-transparent'">
            {{ title || $attrs.title }}
       </div>
        <div class="p-2">
            <component :is="dialogComponent" :options="options" @close="dialogComponent=null"/>
            <slot name="content"/>
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
        topBar: true,
        display: false
    }),
    computed: {
        classe(){
            let cls = this.width
            this.topBar ? cls += ' shadow rounded' : null
            return cls
        }
    },
    watch:{
        dialogComponent(value){
            if ( value ) this.display = true
        }
    },
    mounted(){
        this.$attrs.title ?
            this.display = true : null
        modalBus.$on ( 'confirm' , (html) => {
            this.dialogComponent = () => import ( '@/components/common/Confirm.vue')
            this.title = 'Confirm'
            this.width = 'w-1/4 h-auto modal'
            this.topBar = true
            this.options = { html: 'Do you want to save before to close?'}
        }),
        modalBus.$on ( 'confirmYesNo' , (html,context) => {
            this.dialogComponent = () => import ( '@/components/common/ConfirmYesNo.vue')
            this.title = 'Confirm'
            this.width = 'w-1/3 h-auto modal'
            this.topBar = true
            this.options = { html: 'Do you want to save before to close?' , context: context }
        }),
        modalBus.$on ( 'viewHTML' , (html) => {
            this.dialogComponent = () => import ( '@/components/blocks/components/BlockHtml.vue')
            this.title = 'HTML source'
            this.width = 'w-3/4 h-3/4 modal'
            this.topBar = true
            this.options = { html: html}
        }),
        modalBus.$on ( 'blockSettings' , () => {
            this.dialogComponent = () => import ( '@/components/blocks/components/BlockSettings.vue')
            this.title = 'Page Settings modal'
            this.width = 'w-1/4'
            this.topBar = true
            this.options = {}
        })
        modalBus.$on ( 'blocksGallery' , () => {
            this.dialogComponent = () => import ( '@/components/blocks/gallery/ComponentsGallery.vue')
            this.title = 'Components'
            this.width = 'w-1/2 modal-top-right h-screen'
            this.topBar = true
            this.options = {}
        })
        modalBus.$on ( 'website' , (mode) => {
            //this.dialogComponent = () => import ( '@/components/blocks/components/BlockAddToWebsite.vue')
            this.dialogComponent = () => import ( '@/components/desktop/Website.vue')
            this.title = 'Add to website'
            this.width = 'w-5/6 h-4/5 modal'
            this.topBar = true
            this.options = { mode : mode | null }
        })

    }
}
</script>