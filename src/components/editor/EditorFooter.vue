<template>
    <div class="w-screen bg-bluegray-200 shadow z-modal h-10 flex items-center fixed bottom-0 px-2">
        <!-- <label>CSS</label>
        <input v-if="editor.current" type="text" class="editor-input" v-model="editor.current.css.css"/>
        <label>Container</label>
        <input v-if="editor.current" type="text" class="editor-input" v-model="editor.current.css.container"/> 
        <m-icon icon="edit" css="icon-button"/>
        -->
        <!-- <m-icon icon="menu" css="icon-button" @click="confirmClose" title="Main menu"/> 
        <div class="border-r h-10 mx-1"></div>
        <m-icon icon="auto_fix_high" css="icon-button" @click="$editorBus('createPage','page')" title="Create empty page"/>  -->
        <!-- <div class="border-r h-10 mx-1"></div> -->
        <!-- <m-icon icon="laptop" css="icon-button" @click="$editorBus('preview','fullscreen')" title="Laptop  preview"/>
        <m-icon icon="tablet" css="icon-button" @click="$editorBus('preview','tablet')" title="Tablet Preview"/>
        <m-icon icon="smartphone" css="icon-button" @click="$editorBus('preview','smartphone')" title="Smartphone Preview"/> -->
        <div class="border-r h-10 mx-1"></div>
        <m-icon icon="save" css="icon-button" @click="$savePage()" title="Save template"/>
        <m-icon icon="file_copy" css="icon-button" title="Save as" @click="saveAs()"/>
        <m-icon icon="download" css="icon-button" @click="$editorBus('importPage','page')" title="Import template"/>
        <m-icon icon="upload" css="icon-button" @click="$exportDocument()" title="Export template"/>
        <m-icon icon="delete" css="icon-button" @click="$deletePage()" title="Delete template"/>
        <!-- <m-icon icon="health_and_safety" css="icon-button" @click="$saveDB()" title="Backup Database"/> -->
        <!-- <m-icon icon="content_paste" css="icon-button" @click="$editorBus('pasteBlock','document')" title="Paste document"/> -->
        <div class="border-r h-10 mx-1 border-white"></div>
        <m-icon icon="highlight_alt"/>
        <div class="px-2" v-if="editor.current">
            <span v-if="editor.component" class="font-bold cursor-pointer" title="Block settings" @click="$dialogBus('settingsComponent')">{{ editor.component.name }}</span>  {{ editor.current.semantic }} {{ editor.current.element }} {{ editor.current.tag }} #{{editor.current.id}} 
            <span v-if="editor.current.coords">
                [ w:{{parseInt(editor.current.coords.width)}} x h:{{parseInt(editor.current.coords.height)}} ] - x:{{ parseInt(editor.current.coords.x )}} - y:{{parseInt(editor.current.coords.y)}} 
            </span>
        </div>
        <!-- <div class="border-r h-10 mx-1"></div>
        <div class="bg-blue-400 text-white h-full px-2 flex justify-center items-center animate-pulse" v-if="message">
            <m-icon icon="notifications" class=""/><span class="">{{ message }}</span>
        </div> -->
        
        <!-- <EditorSidebarTabs :tab="$attrs.tab" :expand="true"/> -->
        <div class="font-light flex absolute right-0 items-center mr-10">
            <div class="bg-blue-400 h-10 text-white px-2 flex justify-center items-center animate-pulse" v-if="message">
                <m-icon icon="notifications" class=""/><span class="">{{ message }}</span>
            </div>
            <button class="text-xs flex font-light items-center h-10 btn btn-purple" @click="$editorBus('preview','fullscreen')" title="Full preview"><m-icon icon="remove_red_eye" css="mr-2"/>Preview</button> 
            <!-- <span>whoobe-studio</span> <m-icon icon="bubble_chart" class="mx-2 animate-spin"/> -->
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { editorBus, modalBus } from '@/main'
export default {
    name: 'EditorFooter',
    data:()=>( {
        newcss: '',
        message: ''
    }),
    components:{
        'EditorSidebarTabs' : () => import ( './EditorSidebarTabs.vue' )
    },
    computed:{
        ...mapState ( ['editor' ] )
    },
    methods: {
        confirmClose(){
            modalBus.$emit ( 'confirm' )
        },
        saveAs(){
            this.editor.page.name = this.editor.page.name + ' COPY'
            this.editor.page.id = 0
            modalBus.$emit ( 'blockSettings')
            
        }
        // savePage(){
        //     this.$savePage().then ( res => {
        //         console.log ( res )
        //         this.$eventBus ( 'notification' , 'Page saved')
        //     })
        // },
    },
    mounted(){
        editorBus.$on ( 'editorMessage' , (msg,type='info') => {
            this.message = msg
            window.setTimeout( ()=> {
                this.message = ''
            },4000)
        })
    }
}
</script>