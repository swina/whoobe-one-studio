<template>
    <div ref="dialogContainer" class="modal z-modal w-full bg-white" :class="classe">
        
        <div ref="dialogHeader" class="dialogHeader capitalize cursor-move h-10 w-full flex items-center text-white text-base px-2 bg-purple-800 rounded-t" >
            {{ title }}
            <m-icon class="cursor-pointer absolute top-0 right-0 z-highest text-gray-100 mt-1 text-2xl" icon="close" @click="closeDialog"/>
        </div>
        <div class="p-2">
            <component v-if="dialogComponent" :is="dialogComponent" :options="options" @close="dialogComponent=null"/>
        </div>
    </div>
</template>

<script>
import Element from '@/scripts/ElementsClass'
import Block from '@/scripts/BlocksClass'
import { eventBus , dialogBus , modalBus , editorBus } from '@/main'
import actions from '@/scripts/actions'
import { mapState } from 'vuex'
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
        ...mapState ( ['editor'] ),
        classe(){
            let cls = this.width
            this.topBar ? cls += ' shadow rounded' : null
            this.dialogComponent ? null : cls += ' hidden'
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
            this.topBar = true
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
            window.localStorage.setItem('whoobe-preview-mode',false)
            this.topBar = true
            this.closeDialog()
        })
        
        dialogBus.$on ( 'help' , (context) => {
            this.dialogComponent = () => import ('@/components/help/Index.vue')
            this.title = 'Documentation'
            this.width = 'w-full h-screen'
            this.topBar = true
            this.options = { context : context }
        })

        dialogBus.$on ( 'startEmpty' , () => {
            actions.createEmptyBlock()
            this.dialogComponent = () => import ('@/components/blocks/components/BlockLibrary.vue')
            this.title = 'Select a snippet'
            this.width = 'w-full md:w-1/2 h-3/4'
            this.topBar = true
            this.options = null
        })

        dialogBus.$on ( 'snippets' , () => {
            this.dialogComponent = () => import ('@/components/blocks/components/BlockLibrary.vue')
            this.title = 'Select a snippet'
            this.width = 'w-full md:w-1/2 h-3/4'
            this.topBar = true
            this.options = null
        })

        dialogBus.$on ( 'startDefault' , () => {
            actions.openDefaultBlock()
        })
        
        dialogBus.$on ( 'linkToGithub' , () => {
            window.open ( 'https://github.com/swina/whoobe-one-studio' )
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
            this.width = 'w-full md:w-1/3'
            this.traceDialogs( 'settingsPage' )
        })

        dialogBus.$on ( 'sliderSettings' , () => {
            this.dialogComponent = () => import ( '@/components/blocks/components/BlockSliderControls.vue')
            this.title = 'Slider settings'
            this.width = 'w-full md:w-1/4'
        })

        dialogBus.$on ( 'JSEditor' , (lang) => {
            this.dialogComponent = () => import ( '@/components/blocks/components/BlockJSEditor.vue' )
            this.title = lang + ' Editor',
            this.width = 'w-3/4'
            this.options = { lang: lang }
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
            this.width = 'w-1/3'
            this.topBar = true
            this.options = null
            this.traceDialogs ( 'importDatabase' )
        })

        dialogBus.$on ( 'importDialog' , (mode) => {
            this.dialogComponent = () => import ( '@/components/common/ImportFile.vue')
            this.title = 'Import'
            this.width = 'w-1/3'
            this.topBar = true
            this.options = { mode: mode ? 'document' : 'block' }
            this.traceDialogs ( 'importDialog' )
        })

        dialogBus.$on ( 'importPage' , () => {
            this.dialogComponent = () => import ( '@/components/common/ImportFile.vue')
            this.title = 'Import'
            this.width = 'w-1/3'
            this.topBar = true
            this.options = { mode: 'page' }
            this.traceDialogs ( 'importPage' )
        })

        dialogBus.$on ( 'importUIKit' , () => {
            this.dialogComponent = () => import ( '@/components/common/ImportFile.vue')
            this.title = 'Import'
            this.width = 'w-1/3'
            this.topBar = true
            this.options = { mode: 'kit' }
            this.traceDialogs ( 'importUIKit' )
        })

        dialogBus.$on ( 'UIKit' , () => {
            this.$store.dispatch ( 'add_tab' , {
                label: 'UI Kit',
                object: () => import ( '@/components/blocks/gallery/UiKits.vue' ),
                type: 'component',
                mode: 'uikit'
            })
        })


        dialogBus.$on ( 'importBlock' , () => {
            this.dialogComponent = () => import ( '@/components/common/ImportFile.vue')
            this.title = 'Import'
            this.width = 'w-1/3'
            this.topBar = true
            this.options = { mode: 'block' }
            this.traceDialogs('importBlock')
        })
        
        dialogBus.$on ( 'blockPreview' , (mode) => {
            this.dialogComponent = () => import ( '@/components/blocks/preview/BlockWindowPreview.vue')
            this.title = 'Preview'
            this.width = 'w-full h-screen'
            this.topBar = true
            this.options = { mode: mode }
            this.traceDialogs('blockPreview')
        })

        dialogBus.$on ( 'pagePreview' , () => {
            this.dialogComponent = () => import ( '@/components/blocks/preview/BlockWindowPreview.vue')
            this.title = 'Preview'
            this.width = 'w-full h-screen'
            this.topBar = true
            this.options = { mode: 'fullscreen' } 
            this.traceDialogs( 'pagePreview' )
        })


        dialogBus.$on ( 'createUIKit' , () => {
            //if ( window.localStorage.getItem('whoobe-custom-library') ){
                this.dialogComponent = () => import ( '@/components/desktop/Library.vue')
                this.title = 'UI Kit'
                this.width = 'w-full md:w-1/3'
                this.topBar = true
                this.options = null                
            //}
        })

         dialogBus.$on ( 'addToUIKit' , () => {
            //if ( window.localStorage.getItem('whoobe-custom-library') ){
                this.dialogComponent = () => import ( '@/components/blocks/components/BlockAddToUIKit.vue')
                this.title = 'Add to UI Kit'
                this.width = 'w-full md:w-1/3'
                this.topBar = true
                this.options = null                
            //}
        })

        dialogBus.$on ( 'loadCustomLibrary' , () => {
            //if ( window.localStorage.getItem('whoobe-custom-library') ){
                this.dialogComponent = () => import ( '@/components/blocks/gallery/CustomLibrary.vue')
                this.title = 'Custom Library'
                this.width = 'w-full md:w-1/3'
                this.topBar = true
                this.options = null                
            //}
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

        dialogBus.$on ( 'pages' , (mode='Templates') => {
            this.$store.dispatch('dbmode',true)
            this.$store.dispatch ( 'add_tab' , {
                label: 'Templates',
                object: () => import ( '@/components/blocks/gallery/Templates.vue' ),
                type: 'component',
                mode: 'dbmode'
            })
        })

        dialogBus.$on ( 'shortcuts' , () => {
            this.dialogComponent = () => import ( '@/components/blocks/components/BlockShortcuts.vue')
            this.width = 'w-1/2'
            this.options = null
            this.title = 'Keyboard Shortcuts'
        })

        dialogBus.$on ( 'website' , () => {
            this.dialogComponent = () => import ( '@/components/desktop/Website.vue')
            this.width = 'w-full h-screen'
            this.options = null
            this.title = 'Whoobe Website'
        })

        dialogBus.$on ( 'addToWebsite' , () => {
            if ( this.$store.state.editor.page && this.$store.state.editor.project ){
                this.dialogComponent = () => import ( '@/components/blocks/components/BlockAddToWebsite.vue')
            } else {
                this.dialogComponent = () => import ( '@/components/desktop/Website.vue')
            }
            this.width = 'w-1/2'
            this.options = null
            this.title = 'Add to website'
        })



        const wrapper = this.$refs.dialogContainer
        let header = this.$refs.dialogHeader;

        function onDrag({movementX, movementY}){
            let getStyle = window.getComputedStyle(wrapper);
            let leftVal = parseInt(getStyle.left);
            let topVal = parseInt(getStyle.top);
            wrapper.style.left = `${leftVal + movementX}px`;
            wrapper.style.top = `${topVal + movementY}px`;
        }

        header.addEventListener("mousedown", ()=>{
            header.classList.add("active");
            header.addEventListener("mousemove", onDrag);
        });

        document.addEventListener("mouseup", ()=>{
            header.classList.remove("active");
            header.removeEventListener("mousemove", onDrag);
        });
        

        
    }
}
</script>