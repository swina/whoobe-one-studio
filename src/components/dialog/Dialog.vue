<template>
    <div class="modal z-modal w-full bg-white" :class="classe" v-if="dialogComponent">
        <m-icon class="absolute top-0 right-0 z-modal bg-gray-800 h-10 w-10 flex items-center justify-center text-white text-3xl" icon="close" @click="$dialogBus('closeDialog')"/>
        <div class="h-10 w-full flex items-center text-white text-lg px-2 font-bold" :class="topBar?'bg-gray-800':'bg-transparent'">
            {{ title }}
       </div>
        <div class="p-2">
            <component :is="dialogComponent" :options="options" @close="dialogComponent=null"/>
        </div>
    </div>
</template>

<script>
import { eventBus , dialogBus , editorBus } from '@/main'
export default {
    name: 'DialogEvents',
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
        dialogBus.$on ( 'startEmpty' , () => {
            this.$editorBus('createPage','page')
            this.$store.dispatch ( 'add_tab' , {
                label: 'New page',
                object : this.$store.state.editor.page
            })
            this.$router.push ( 'editor' )
        })
        dialogBus.$on ( 'startDefault' , () => {
            let page = require ( '@/assets/pages/default.json')
            this.$store.dispatch ( 'setPage' , page )
            this.$store.dispatch ( 'document' , page.json.blocks )
            this.$store.dispatch ( 'add_tab' , {
                label: page.name ,
                object: page 
            })
            this.$router.push ( 'editor' )
        })
        dialogBus.$on ( 'settings' , () => {
            this.dialogComponent = () => import ('@/components/desktop/Settings.vue')
            this.title = 'Settings'
            this.width = 'w-full md:w-1/2 lg:w-1/3 h-auto'
            this.topBar = true
            this.options = null
        })
        dialogBus.$on ( 'settingsPage' , () => {
            this.dialogComponent = () => import ('@/components/blocks/components/BlockSettings.vue')
            this.title = this.$store.state.editor.page.name || 'A new page'
            this.width = 'w-full md:w-1/4'
        })

        dialogBus.$on ( 'editorHelper' , (dialog) => {
            this.dialogComponent = () => import ( '@/components/' + dialog.content )
            this.title = dialog.title
            this.width = dialog.width
        })

        dialogBus.$on ( 'TipTapEditor' , (mode) => {
            this.dialogComponent = () => import ( '@/components/blocks/components/BlockTipTap.vue')
            this.title = 'Editor'
            this.width = 'w-3/4'
            this.topBar = true
            this.options = null
        })

        dialogBus.$on ( 'importDatabase' , (mode) => {
            this.dialogComponent = () => import ( '@/components/common/ImportDatabase.vue')
            this.title = 'Import'
            this.width = 'w-1/4'
            this.topBar = true
            this.options = null
        })

        dialogBus.$on ( 'importDialog' , (mode) => {
            this.dialogComponent = () => import ( '@/components/common/ImportFile.vue')
            this.title = 'Import'
            this.width = 'w-1/4'
            this.topBar = true
            this.options = { mode: mode ? 'document' : 'block' }
        })

        dialogBus.$on ( 'importPage' , () => {
            this.dialogComponent = () => import ( '@/components/common/ImportFile.vue')
            this.title = 'Import'
            this.width = 'w-1/4'
            this.topBar = true
            this.options = { mode: 'page' }
        })

        dialogBus.$on ( 'importBlock' , () => {
            this.dialogComponent = () => import ( '@/components/common/ImportFile.vue')
            this.title = 'Import'
            this.width = 'w-1/4'
            this.topBar = true
            this.options = { mode: 'block' }
        })
        
        dialogBus.$on ( 'closeDialog' , () => {
            this.dialogComponent = null
        })

        dialogBus.$on ( 'pagePreview' , (mode) => {
            console.log ( mode )
            this.dialogComponent = () => import ( '@/components/blocks/preview/BlockWindowPreview.vue')
            this.title = 'Preview'
            this.width = 'w-full h-screen'
            this.topBar = false
            this.options = { mode: mode }
        })

        dialogBus.$on ( 'pixabay' , () => {
            this.dialogComponent = () => import ( '@/components/media/pixabay.vue')
            this.title = 'Pixabay'
            this.width = 'w-full h-screen'
        })

        dialogBus.$on ( 'media' , (options) => {
            this.dialogComponent = () => import ( '@/components/media/Media.vue')
            this.title = 'Media'
            this.width = 'w-full h-screen'
            this.options = options
        })

        dialogBus.$on ( 'pages' , (mode='') => {
            this.dialogComponent = () => import ( '@/components/blocks/gallery/PagesGallery.vue')
            this.title = 'Pages'
            this.width = 'w-full h-screen'
            this.topBar = true
            this.options = { mode: mode }
        })

        

        
    }
}
</script>