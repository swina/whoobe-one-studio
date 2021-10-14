<template>
<div class="overflow-hidden mt-10" v-if="display">
    <div class="editor-container min-h-screen top-0 right-0 left-0 bottom-0 flex flex-row">
        <div class="w-full overflow-y-hidden overflow-x-hidden">
            <div class="w-full grid grid-cols-12 relative">
                <div class="col-span-12 relative md:col-span-12 lg:col-span-12 mr-10 min-h-screen pb-20" :class="classe">
                    <!-- {{ sidebar }} {{ sidebarName }} -->
                    <div class="flex flex-col absolute inset-0 mb-10" ref="blockEditor">
                        <BlockEditor :scroll="scrollTop"/>
                    </div>
                </div>
                <transition name="slideright">
                    <div v-if="sidebar" class="min-h-screen fixed z-modal right-0 top-0 mt-8 bg-bluegray-200 w-1/5 border-l pr-10">
                        <EditorSidebar :tab="sidebarName" @close="sidebar=false,sidebarName=''"/>
                    </div>
                </transition>
                <div class="fixed bg-bluegray-200 z-modal mt-8 w-10 right-0 top-0 h-screen flex flex-col items-center justify-start text-center shadow">
                    <div class="chip bg-black text-white my-1 text-xs px-1 rounded">Tools</div>
                    <!-- <div class="h-10 w-full mb-2 flex items-center bg-gray-200 text-white justify-center">
                        
                    </div> -->
                    <EditorSidebarTabs :tab="sidebarName"/>
                </div>
                <EditorFooter :tab="sidebarName"/>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import { eventBus , editorBus , dialogBus } from '@/main'
import jp from 'jsonpath'
import Block from '@/scripts/BlocksClass'
import Element from '@/scripts/ElementsClass'

export default {
    name: 'Editor',
    data:()=>({
        el: null,
        scrollTop: 0,
        sidebar: false,
        sidebarName: '',
        display:true
    }),
    components:{
        'EditorFooter'      : () => import ( '@/components/editor/EditorFooter.vue'),
        'BlockEditor'       : () => import ( '@/components/blocks/BlockEditor.vue' ),
        'EditorSidebar'     : () => import ( '@/components/editor/EditorSidebar.vue' ),
        'EditorSidebarTabs' : () => import ( '@/components/editor/EditorSidebarTabs.vue' ),
    },
    computed:{
        ...mapState ( ['editor'] ),
        classe(){
            return this.sidebar ? 'w-4/5' : ''
        }
    },
    watch: {
        sidebar(value){
            //this.$editorBus('isSidebar',value)
        }
    },
    mounted(){
        editorBus.$on ( 'preview' , () => {
            //this.display = false
        })
        dialogBus.$on ( 'closeDialog' , () => {
            this.display = true
        })
        
        eventBus.$on('sidebar', (sidebar) =>{
            if ( !this.sidebar ){
                this.sidebar = true
                this.sidebarName = sidebar
                return
            }
            if ( sidebar != this.sidebarName ){
                this.sidebar = true
                this.sidebarName = sidebar
            } else {
                this.sidebar = false
                //this.$editorBus('closeSidebar')
                this.sidebarName = null
            }
        })

        
        

        //duplicate block
        editorBus.$on ( 'duplicateBlock' , () => {
            this.$duplicateBlock()
            return
            // let component = this.editor.document //comp //this.$mapState().desktop.tabs[this.$mapState().desktop.currentTab].blocks
            // var parent = jp.parent ( component , '$..blocks[?(@.id=="' + this.editor.current.id + '")]' )
            // let i 
            // if ( parent ){
            //     parent.forEach ( (p,index) => {
            //         if ( p.id === this.editor.current.id ){
            //             i = index
            //         }
            //     })
            //     let el = JSON.parse(JSON.stringify(this.editor.current))
            //     let obj = this.$clone ( el )
            //     obj.id = this.$randomID()
            //     parent.splice ( i+1 , 0 , obj )
            //     this.$editorBus('editorMessage','Block duplicated')
            // }
        })
        
        //delete block
        editorBus.$on ( 'deleteBlock' , () => {
            if ( this.editor.current && this.editor.current.id ){
                this.$removeNode(this.editor.current.id)
                this.$editorBus('editorMessage','Block removed')
            }
        })
        
        //move block
        editorBus.$on ( 'moveBlock' , (up) => {
            if ( !this.editor.current ) return
            let component = this.editor.document
            var parent = jp.parent ( component , '$..blocks[?(@.id=="' + this.editor.current.id + '")]' )
            if ( parent.length === 1 ) return
            let i
            parent.forEach ( (p,index) => {
                if ( p.id === this.editor.current.id ){
                    i = index
                }
            })
            if ( i > 0 ){
                let obj = Object.assign({},this.editor.current)
                parent.splice(i,1)
                parent.splice(i-1,0,obj)
            }
            this.$store.dispatch ( 'setCurrent' , null )
        })
        
        //copy block to clipboard
        editorBus.$on ( 'copyBlock' , (block) => {
            window.localStorage.setItem ( 'whoobe-clipboard' , JSON.stringify ( block ) )
            return
            // block ? 
            //     window.localStorage.setItem ( 'whoobe-editor-clipboard' , JSON.stringify(block) ) :
            //         window.localStorage.setItem ( 'whoobe-editor-clipboard' , JSON.stringify(this.editor.current) ) 
            // this.$editorBus('editorMessage','Block copied')
        })

        //paste block from clipboard
        editorBus.$on ( 'pasteBlock' , (type) => {
            if ( this.editor.current ){
                this.$pasteBlock()
                this.$store.dispatch ( 'setCurrent' , null )
            }
            
            // let block = JSON.parse(window.localStorage.getItem ( 'whoobe-editor-clipboard' ))
            // let pasteBlock = this.$clone ( block )
            // type === 'document' ?
            //     this.editor.document = pasteBlock : this.editor.current.blocks.push ( pasteBlock )
            // return
        })

        //preview block 
        editorBus.$on ( 'preview' , (mode) => {
                this.$store.dispatch ( 'preview' , true )
                window.localStorage.setItem('whoobe-preview',JSON.stringify(this.editor.document))
                window.localStorage.setItem('whoobe-page',JSON.stringify(this.editor.page))
                this.$dialogBus ( 'blockPreview' , (this.editor.document , mode) )
        })

        
        

        editorBus.$on ( 'importPage' , (mode='page') => {
            if ( mode === 'page' ){
                let confirm = window.confirm( 'Importing will be overwrite the current document. Continue?')
                if ( confirm ){
                    dialogBus.$emit('importPage','common/ImportFile.vue')
                } else {
                    return
                }
            } else {
                return //dialogBus.$emit('importBlock',('common/ImportFile.vue',mode))
            }
        })

        editorBus.$on ( 'importBlock' , () => {

            dialogBus.$emit('importBlock',('common/ImportFile.vue','block'))
        })

        editorBus.$on ( 'exportDocument' , () => {
            this.$exportDocument()
        })

        

        

        // editorBus.$on ( 'exportBlock' , () => {
        //     this.$exportDocument(true,'whoobe-block','block')
        // })

        // editorBus.$on ( 'importBlock' , () => {
        //     dialogBus.$emit ( 'importDialog' )
        // })

        // this.$refs.blockEditor.addEventListener ( 'scroll' , (e) => {
        //     this.scrollTop =  e.target.scrollTop 
        // })


        
        
    }
}
</script>