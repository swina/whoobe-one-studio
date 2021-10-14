<template>
    <div class="modal z-modal w-full bg-white" :class="classe" v-if="dialogComponent">
        <m-icon class="absolute top-0 right-0 z-highest bg-gray-800 h-10 w-10 flex items-center justify-center text-white text-3xl" icon="close" @click="closeDialog"/>
        <div class="h-10 w-full flex items-center text-white text-lg px-2 font-bold" :class="topBar?'bg-gray-800':'bg-transparent'">
            {{ title }}
       </div>
        <div class="p-2">
            <component :is="dialogComponent" :options="options" @close="dialogComponent=null"/>
        </div>
    </div>
</template>

<script>
import Element from '@/scripts/ElementsClass'
import Block from '@/scripts/BlocksClass'
import { eventBus , dialogBus , modalBus , editorBus } from '@/main'
import actions from '@/scripts/actions'

export default {
    name: 'DialogEvents',
    data:()=>({
        dialogComponent: null,
        title: '',
        width: 'w-1/3',
        options: null,
        topBar: true,
        lastDialog : []
    }),
    computed: {
        classe(){
            let cls = this.width
            this.topBar ? cls += ' shadow rounded' : null
            return cls
        }
    },
    methods:{
        traceDialogs(dialog){
            let arr = this.lastDialog
            arr.push ( dialog )
            this.lastDialog = [ ...new Set(arr) ]
        },
        closeDialog(){
            this.$store.dispatch ( 'preview' , false )
            if ( this.lastDialog.length > 1 ){
                dialogBus.$emit ( this.lastDialog[0] )
                this.lastDialog.pop()
            } else {
                this.lastDialog = []
                this.dialogComponent = null
            }
        }
    },
    mounted(){

        dialogBus.$on ( 'closeDialog' , () => {
            this.closeDialog()
        })
        
        dialogBus.$on ( 'startEmpty' , () => {
            actions.createEmptyBlock()
        })

        dialogBus.$on ( 'startDefault' , () => {
            actions.openDefaultBlock()
        })
        
        dialogBus.$on ( 'importDB' , () => {
            modalBus.$emit ( 'confirmYesNo' , ( 'Importing new data will overwrite all current data' , 'importDB' ))
        })

        dialogBus.$on ( 'exportDB' , () => {
            this.$saveDB()
        })

        dialogBus.$on ( 'settings' , () => {
            this.dialogComponent = () => import ('@/components/desktop/Settings.vue')
            this.title = 'Settings'
            this.width = 'w-full md:w-1/2 lg:w-1/3 h-auto'
            this.topBar = true
            this.options = null
            this.traceDialogs( 'settings' )
        })
        dialogBus.$on ( 'settingsPage' , () => {
            this.dialogComponent = () => import ('@/components/blocks/components/BlockSettings.vue')
            this.title = this.$store.state.editor.page.name || 'A new page'
            this.width = 'w-full md:w-1/4'
            this.traceDialogs( 'settingsPage' )
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
            this.traceDialogs( 'TipTapEditor' )
        })

        dialogBus.$on ( 'importDatabase' , (mode) => {
            this.dialogComponent = () => import ( '@/components/common/ImportDatabase.vue')
            this.title = 'Import'
            this.width = 'w-1/4'
            this.topBar = true
            this.options = null
            this.traceDialogs ( 'importDatabase' )
        })

        dialogBus.$on ( 'importDialog' , (mode) => {
            this.dialogComponent = () => import ( '@/components/common/ImportFile.vue')
            this.title = 'Import'
            this.width = 'w-1/4'
            this.topBar = true
            this.options = { mode: mode ? 'document' : 'block' }
            this.traceDialogs ( 'importDialog' )
        })

        dialogBus.$on ( 'importPage' , () => {
            this.dialogComponent = () => import ( '@/components/common/ImportFile.vue')
            this.title = 'Import'
            this.width = 'w-1/4'
            this.topBar = true
            this.options = { mode: 'page' }
            this.traceDialogs ( 'importPage' )
        })

        dialogBus.$on ( 'importBlock' , () => {
            this.dialogComponent = () => import ( '@/components/common/ImportFile.vue')
            this.title = 'Import'
            this.width = 'w-1/4'
            this.topBar = true
            this.options = { mode: 'block' }
            this.traceDialogs('importBlock')
        })
        
        dialogBus.$on ( 'blockPreview' , (mode) => {
            this.dialogComponent = () => import ( '@/components/blocks/preview/BlockWindowPreview.vue')
            this.title = 'Preview'
            this.width = 'w-full h-screen'
            this.topBar = false
            this.options = { mode: mode }
            this.traceDialogs('blockPreview')
        })

        dialogBus.$on ( 'pagePreview' , () => {
            this.dialogComponent = () => import ( '@/components/blocks/preview/PagePreview.vue')
            this.title = 'Preview'
            this.width = 'w-full h-screen'
            this.topBar = false
            this.options = null 
            this.traceDialogs( 'pagePreview' )
        })

        dialogBus.$on ( 'pixabay' , () => {
            this.dialogComponent = () => import ( '@/components/media/pixabay.vue')
            this.title = 'Pixabay'
            this.width = 'w-full h-screen'
            this.traceDialogs ( 'pixabay' )
        })

        dialogBus.$on ( 'media' , (options) => {
            this.dialogComponent = () => import ( '@/components/media/Media.vue')
            this.title = 'Media'
            this.width = 'w-full h-screen'
            this.options = options
            this.traceDialogs ( 'media' )
        })

        dialogBus.$on ( 'pages' , (mode) => {
            this.$store.dispatch ( 'add_tab' , {
                label: 'Templates',
                object: () => import ( '@/components/blocks/gallery/PagesGallery.vue' ),
                type: 'component'
            })
            // this.dialogComponent = () => import ( '@/components/blocks/gallery/PagesGallery.vue')
            // this.title = 'Templates'
            // this.width = 'w-screen h-screen'
            // this.topBar = true
            // this.options = { mode: mode }
            // this.traceDialogs( 'pages' )

        })

        

        
    }
}
</script>